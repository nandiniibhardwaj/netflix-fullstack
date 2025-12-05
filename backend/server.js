import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import cors from "cors";

const app = express();
app.use(express.json());

// --- FIX: Allow your Vercel frontend ---
app.use(
  cors({
    origin: "https://netflixclone-six-gamma.vercel.app", // your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// --- FIX: Users file safe load ---
const loadUsers = () => {
  try {
    if (!fs.existsSync("users.json")) {
      fs.writeFileSync("users.json", "[]");
    }
    const data = fs.readFileSync("users.json");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Save users
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

// --------------- RENDER PORT FIX ---------------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
