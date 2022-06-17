import express, { Application } from "express";
import UserRouter from "./app/routes/UserRouter";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import ErrorMiddleware from "./app/middleware/Error.middleware";
import config from "./app/config";
import db from "./app/database/Connect";

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
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:
      "Too many accounts Requests from this IP, please try again after an hour",
  })
);

db.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err);
    });
});

app.use("/user", UserRouter);

app.use(ErrorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "ohh you are lost, read the documentation to find your way",
  });
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

export default app;
