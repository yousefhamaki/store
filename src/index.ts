import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ErrorMiddleware from "./app/middleware/Error.middleware";
import config from "./app/config";
import Routers from "./app/routes/index";
import JsonReurn from "./app/interface/JsonReturn";

const PORT = config.port || 5000;
const app: Application = express();

//middleware to parse incoming request
app.use(express.json());
//http request loggen middleware
app.use(morgan("common"));
//http security middleware
app.use(helmet());
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message:
      "Too many accounts Requests from this IP, please try again after an hour",
  })
);

//routers
app.get("/", (_: Request, res: Response): Response<JsonReurn> => {
  return res.status(200).json({
    status: "success",
    message: "Welcome to store App",
  });
});
app.use("/api", Routers);

//handle errors
app.use(ErrorMiddleware);

//404 Request
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "ohh you are lost, read the documentation to find your way",
  });
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

export default app;
