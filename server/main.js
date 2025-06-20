import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/database.js";
import waitlistRouter from "./routes/waitlistRouter.js";
import { PORT } from "./config/constants.js";
import logger from "./config/logger.js";

async function main() {
  try {
    await connectDB();
    const app = express();
    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "https://svwen.com",
        ],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
        credentials: false,
      })
    );
    app.use(bodyParser.json());

    app.use("/waitlist", waitlistRouter);

    app.use("/", (req, res) => {
      res.status(200).json({ message: "Working!" });
    });

    app.use((req, res, next) => {
      res.status(404).json({ error: "404! Not Found" });
    });

    app.listen(PORT, () => {
      logger.info(`Server has started on PORT ${PORT}`);
    });
  } catch (error) {
    logger.error(`Error while starting the server: ${error}`);
  }
}

main();
