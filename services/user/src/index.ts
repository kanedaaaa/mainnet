import authRouter from "./routers/auth.router";
import profileRouter from "./routers/profile.router";
import express from "express";
import errorMiddleware from "./middlewares/error.middleware";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
