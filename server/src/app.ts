import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

import { authorization } from "./middlewares/auth";

import auth from "./routes/auth";
import rickAndMortyRoutes from "./routes/rickAndMorty";

app.use("/auth", auth);
app.use("/rick-and-morty", authorization, rickAndMortyRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.send("Server is running");
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
