import { Router, type IRouter } from "express";
import healthRouter from "./health";
import sendRequestRouter from "./send-request";

const router: IRouter = Router();

router.use(healthRouter);
router.use(sendRequestRouter);

export default router;
