import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable("x-powered-by");

app.get("/", (req: Request, res: Response) => {
  return res.send("Server is running");
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
