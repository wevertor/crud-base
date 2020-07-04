import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import mongoose, { Mongoose } from "mongoose";
import config from "../config";
import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  throw new Error(`Incapaz de conectar ao banco de dados: ${config.mongoUri}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/", userRoutes, authRoutes);

/* trata erros relativos a autorização */
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.info("Servidor iniciado na porta " + config.port + "!");
});
