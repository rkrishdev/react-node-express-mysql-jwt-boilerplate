import express from "express";
import cors from "cors";
import apiAuthRoutesMain from "./routes/api/auth/auth.js";
import apiRoutesMain from "./routes/api/main.js";
import webRoutesMain from "./routes/web/main.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verifyTokenForStatic } from "./middlewares/tokenMiddleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:4173",
    "http://localhost:5173",
    "https://domain.com/",
  ],
  methods: ["GET, POST, PUT, DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/storage/assets", express.static(__dirname + "/public"));

app.use(cookieParser());

async function isAuthenticated(req, res, next) {
  const authStatus = await verifyTokenForStatic(req);
  if (authStatus) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

app.use(
  "/storage/private/assets",
  isAuthenticated,
  express.static(__dirname + "/private")
);

app.use("/api/auth", apiAuthRoutesMain);
app.use("/api", apiRoutesMain);
app.use("/", webRoutesMain);

export default app;
