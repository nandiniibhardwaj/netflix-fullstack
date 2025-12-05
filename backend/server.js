import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Load users from JSON
const loadUsers = () => {
  const data = fs.readFileSync("users.json");
  return JSON.parse(data);
};

// Save users to JSON
const saveUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

// ---------------- SIGN UP ---------------- //
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  let users = loadUsers();

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ email, password: hashedPassword });
  saveUsers(users);

  res.json({ success: true, message: "Signup successful" });
});

// ---------------- LOGIN ---------------- //
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let users = loadUsers();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.json({ success: false, message: "Invalid password" });
  }

  res.json({ success: true, message: "Login successful" });
});

// ---------------- START SERVER ---------------- //
app.listen(5000, () => console.log("Backend running on port 5000"));
