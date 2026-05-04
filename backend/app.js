import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { getUsers, getUser, getUserPosts, getLoggedUser } from "./database.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(cookieParser());

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/me", authenticateToken, async (req, res) => {
  const user = await getLoggedUser(req.username);
  user.token = req.token;
  res.send(user);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const check = await getUser(username, password);

  if (!check) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const user = { username: check.username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.cookie("token", accessToken, {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ accessToken: accessToken });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.send({ message: "Logged out" });
});

app.get("/posts", authenticateToken, async (req, res) => {
  const post = await getUserPosts(req.username);
  res.send(post);
});

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server is running on ${process.env.EXPRESS_PORT}`);
});

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.decode(token);
    req.username = decoded.username;
    req.token = token;
    next();
  } catch (err) {
    res.clearCookie("token");
    console.error(err);
    return res.sendStatus(403);
  }
}
