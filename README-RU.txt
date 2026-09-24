УСТАНОВКА САЙТА «ПФ СОКОЛ» НА VPS
===================================

Этот архив подготовлен для Ubuntu 22.04/24.04 или Debian 12.
Нужен сервер с доступом по SSH и доменом, направленным на IP сервера.

Что уже есть в архиве:
- готовая production-версия сайта в папке public/;
- готовый API-сервер для заявок в папке api/;
- исходники и pnpm-lock.yaml в папке source/;
- шаблон настроек почты;
- готовые файлы Nginx и systemd.

Первый запуск не требует сборки исходников: используется готовая версия.

ВАЖНО О ПОЧТЕ
-------------

Формы сайта отправляют заявки на pfsokol54@gmail.com через Gmail SMTP.
В настройке MAIL_SMTP_PASSWORD нужен пароль приложения Google, а не обычный
пароль от почты. Пароль приложения создаётся в Google Account после включения
двухэтапной проверки.

ШАГ 1. Подключиться к серверу
-----------------------------

Выполнить на своём компьютере:

    ssh root@IP_СЕРВЕРА

Вместо IP_СЕРВЕРА указать настоящий IP сервера.

ШАГ 2. Установить системные программы и Node.js
-----------------------------------------------

Выполнить на сервере по очереди:

    apt update
    apt install -y nginx curl unzip certbot python3-certbot-nginx
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
    apt install -y nodejs
    node --version

Должна показаться версия Node.js 24.x.

ШАГ 3. Загрузить архив
----------------------

Загрузить файл sokol-site-install.zip в домашнюю папку пользователя root.
Проще всего использовать SFTP-клиент (например, WinSCP):

    Папка на сервере: /root/

После загрузки проверить наличие файла:

    ls -lh /root/sokol-site-install.zip

ШАГ 4. Распаковать сайт
-----------------------

    rm -rf /var/www/sokol-site
    mkdir -p /var/www/sokol-site
    unzip -q /root/sokol-site-install.zip -d /var/www/sokol-site
    chown -R root:root /var/www/sokol-site
    chmod -R a+rX /var/www/sokol-site

ШАГ 5. Настроить почту
----------------------

Создать файл настроек:

    mkdir -p /etc/sokol-site
    cp /var/www/sokol-site/deploy/sokol-api.env.example /etc/sokol-site/sokol-api.env
    nano /etc/sokol-site/sokol-api.env

В nano должны быть такие строки:

    MAIL_SMTP_USER=pfsokol54@gmail.com
    MAIL_SMTP_PASSWORD=СЮДА_ПАРОЛЬ_ПРИЛОЖЕНИЯ_GMAIL

Вставить вместо СЮДА_ПАРОЛЬ_ПРИЛОЖЕНИЯ_GMAIL пароль приложения Google.
Сохранить: Ctrl+O, Enter. Выйти: Ctrl+X.

Защитить файл:

    chmod 600 /etc/sokol-site/sokol-api.env

ШАГ 6. Запустить API-сервер
---------------------------

    cp /var/www/sokol-site/deploy/systemd/sokol-api.service /etc/systemd/system/sokol-api.service
    systemctl daemon-reload
    systemctl enable --now sokol-api
    systemctl status sokol-api --no-pager

В статусе должно быть active (running).

Проверить API:

    curl http://127.0.0.1:8080/api/healthz

Ожидаемый ответ:

    {"status":"ok"}

Если API не запускается, посмотреть причину:

    journalctl -u sokol-api -n 50 --no-pager

ШАГ 7. Настроить домен в Nginx
------------------------------

Скопировать конфигурацию:

    cp /var/www/sokol-site/deploy/nginx/sokol.conf.example /etc/nginx/sites-available/sokol.conf
    nano /etc/nginx/sites-available/sokol.conf

Для ПФ СОКОЛ в строке server_name использовать:

    pf-sokol.ru www.pf-sokol.ru

Сохранить файл и выполнить:

    ln -s /etc/nginx/sites-available/sokol.conf /etc/nginx/sites-enabled/sokol.conf
    rm -f /etc/nginx/sites-enabled/default
    nginx -t
    systemctl enable --now nginx
    systemctl reload nginx

ШАГ 8. Проверить сайт
---------------------

Открыть в браузере:

    http://pf-sokol.ru/

Проверить:
- главная страница открывается;
- карточка реквизитов показывает «ООО «ПФ СОКОЛ»»;
- страницы документов открываются;
- форма заявки открывается.

ШАГ 9. Включить HTTPS
---------------------

Когда домен уже направлен на IP сервера и сайт открывается по HTTP:

    certbot --nginx -d pf-sokol.ru -d www.pf-sokol.ru

Вопросы Certbot отвечать так:
- указать рабочую почту;
- согласиться с условиями;
- выбрать перенаправление HTTP на HTTPS, если будет предложено.

После этого сайт открывать по адресу:

    https://pf-sokol.ru/

ПЕРЕЕЗД УЖЕ РАБОТАЮЩЕГО САЙТА НА НОВЫЙ ДОМЕН
---------------------------------------------

Не переустанавливайте сайт и не копируйте архив заново. Сначала направьте DNS нового домена на текущий IP сервера, затем добавьте новый домен в действующую конфигурацию Nginx и выпустите для него HTTPS-сертификат. Старый домен оставьте подключённым до проверки нового HTTPS-адреса; после проверки настройте с него постоянное перенаправление на https://pf-sokol.ru/. Старый сертификат нужен, пока работает это перенаправление.

ПРОВЕРКА ЗАЯВКИ
----------------

После настройки почты отправить тестовую заявку через форму сайта.
Письмо должно прийти на pfsokol54@gmail.com.

Если письмо не пришло:

    journalctl -u sokol-api -n 100 --no-pager

ЧАСТЫЕ КОМАНДЫ
--------------

Перезапустить API:

    systemctl restart sokol-api

Посмотреть состояние API:

    systemctl status sokol-api --no-pager

Посмотреть последние ошибки API:

    journalctl -u sokol-api -n 100 --no-pager

Проверить Nginx:

    nginx -t

Перезагрузить Nginx:

    systemctl reload nginx

ОБНОВЛЕНИЕ САЙТА ИЗ GITHUB
--------------------------

После загрузки изменений в GitHub обновить уже установленный сайт:

    cd /var/www/sokol-site
    git pull --ff-only origin main
    nginx -t
    systemctl reload nginx

Перезапускать API нужно только при изменении его серверной сборки.

НЕ УДАЛЯТЬ:
- /etc/sokol-site/sokol-api.env;
- пароль приложения Gmail;
- DNS-записи домена.