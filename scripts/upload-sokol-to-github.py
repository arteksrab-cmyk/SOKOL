#!/usr/bin/env python3
"""Atomically upload a prepared Sokol site tree to GitHub.

Usage:
    GITHUB_PERSONAL_ACCESS_TOKEN=... python3 scripts/upload-sokol-to-github.py /tmp/sokol-upload

The token is read only from the environment and is never printed.
"""

import argparse
import base64
import hashlib
import json
import os
import time
from http.client import RemoteDisconnected
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


REPO = "arteksrab-cmyk/SOKOL"
BRANCH = "main"


class GitHubError(RuntimeError):
    pass


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", type=Path, help="Prepared tree containing public/, api/, deploy/, and source/")
    args = parser.parse_args()
    root = args.root.resolve()

    token = os.environ.get("GITHUB_PERSONAL_ACCESS_TOKEN")
    if not token:
        raise SystemExit("GITHUB_PERSONAL_ACCESS_TOKEN is not available")
    if not root.is_dir():
        raise SystemExit(f"Prepared tree does not exist: {root}")

    api = f"https://api.github.com/repos/{REPO}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
    }

    def call(method: str, url: str, payload: dict | None = None) -> tuple[int, dict]:
        data = None if payload is None else json.dumps(payload).encode("utf-8")
        last_error: Exception | None = None
        for attempt in range(1, 7):
            try:
                request = Request(url, data=data, headers=headers, method=method)
                with urlopen(request, timeout=90) as response:
                    body = response.read().decode("utf-8")
                    return response.status, json.loads(body) if body else {}
            except HTTPError as error:
                body = error.read().decode("utf-8", errors="replace")
                try:
                    details = json.loads(body)
                except json.JSONDecodeError:
                    details = {"message": body[:500]}
                if error.code < 500 and error.code != 429:
                    return error.code, details
                last_error = GitHubError(f"HTTP {error.code}: {details.get('message', '?')}")
            except (RemoteDisconnected, URLError, TimeoutError, OSError) as error:
                last_error = error
            if attempt < 6:
                time.sleep(attempt * 2)
        raise GitHubError(f"request failed after retries: {last_error}")

    status, ref = call("GET", f"{api}/git/ref/heads/{BRANCH}")
    if status == 409:
        readme = root / "README-RU.txt"
        if not readme.is_file():
            raise SystemExit("The empty repository needs README-RU.txt to initialize it")
        status, created = call(
            "PUT",
            f"{api}/contents/README-RU.txt",
            {
                "message": "Initialize Sokol site repository",
                "content": base64.b64encode(readme.read_bytes()).decode("ascii"),
                "branch": BRANCH,
            },
        )
        if status != 201:
            raise SystemExit(f"Repository initialization failed: {created.get('message', '?')}")
        status, ref = call("GET", f"{api}/git/ref/heads/{BRANCH}")
    if status != 200:
        raise SystemExit(f"Branch lookup failed: {status} {ref.get('message', '?')}")

    head_sha = ref["object"]["sha"]
    status, commit = call("GET", f"{api}/git/commits/{head_sha}")
    if status != 200:
        raise SystemExit(f"Commit lookup failed: {status} {commit.get('message', '?')}")
    base_tree = commit["tree"]["sha"]

    status, remote_tree = call("GET", f"{api}/git/trees/{base_tree}?recursive=1")
    if status != 200:
        raise SystemExit(f"Tree lookup failed: {status} {remote_tree.get('message', '?')}")
    remote_files = {
        item["path"]: item["sha"]
        for item in remote_tree.get("tree", [])
        if item.get("type") == "blob"
    }

    local_files = {
        path.relative_to(root).as_posix(): path
        for path in root.rglob("*")
        if path.is_file()
    }
    changed: list[tuple[str, Path, bytes]] = []
    for relative, path in sorted(local_files.items()):
        content = path.read_bytes()
        local_sha = hashlib.sha1(
            f"blob {len(content)}\0".encode("utf-8") + content
        ).hexdigest()
        if remote_files.get(relative) != local_sha:
            changed.append((relative, path, content))

    deletions = sorted(set(remote_files) - set(local_files))
    print(
        f"Matching files: {len(local_files) - len(changed)}; "
        f"upload/update: {len(changed)}; delete: {len(deletions)}"
    )
    if not changed and not deletions:
        print("Nothing to upload.")
        return

    tree_items = []
    for index, (relative, _path, content) in enumerate(changed, 1):
        status, blob = call(
            "POST",
            f"{api}/git/blobs",
            {
                "content": base64.b64encode(content).decode("ascii"),
                "encoding": "base64",
            },
        )
        if status != 201:
            raise SystemExit(f"Blob failed for {relative}: {blob.get('message', '?')}")
        tree_items.append(
            {"path": relative, "mode": "100644", "type": "blob", "sha": blob["sha"]}
        )
        if index % 25 == 0 or index == len(changed):
            print(f"Prepared {index}/{len(changed)} files")

    tree_items.extend(
        {"path": relative, "mode": "100644", "type": "blob", "sha": None}
        for relative in deletions
    )
    status, new_tree = call(
        "POST",
        f"{api}/git/trees",
        {"base_tree": base_tree, "tree": tree_items},
    )
    if status != 201:
        raise SystemExit(f"Tree creation failed: {new_tree.get('message', '?')}")

    status, new_commit = call(
        "POST",
        f"{api}/git/commits",
        {
            "message": "Update Sokol site",
            "tree": new_tree["sha"],
            "parents": [head_sha],
        },
    )
    if status != 201:
        raise SystemExit(f"Commit creation failed: {new_commit.get('message', '?')}")

    status, updated = call(
        "PATCH",
        f"{api}/git/refs/heads/{BRANCH}",
        {"sha": new_commit["sha"], "force": False},
    )
    if status != 200:
        raise SystemExit(f"Branch update failed: {updated.get('message', '?')}")
    print(f"Uploaded successfully. Commit: {new_commit['sha']}")


if __name__ == "__main__":
    main()