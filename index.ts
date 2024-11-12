// index.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// Create a new user with mobile and city fields
app.post("/users", async (req: Request, res: Response) => {
  const { name, email, mobile, city } = req.body;

//   console.log(req.body);
  try {
    const user = await prisma.user.create({
      data: { name, email, mobile, city },
    });
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Error creating user" });
  }
});

// Get all users
app.get("/users", async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get a single user by ID
app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

// Update a user by ID
app.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, mobile, city } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, mobile, city },
    });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
