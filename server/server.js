import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
app.use(cors());

// Log paths for debugging
console.log("Current directory:", __dirname);
const rootDir = path.join(__dirname, "../");
console.log("Root directory:", rootDir);
console.log("Trying to read from:", path.join(rootDir, "data/spaces.json"));

// Serve static files
app.use(express.static(path.join(rootDir, "src")));

// Route for things.json
app.get("/api/things", (req, res) => {
  fs.readFile(path.join(rootDir, "data/things.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading things.json:", err);
      res.status(500).json({ error: "Failed to read file" });
    } else {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseError) {
        console.error("Error parsing things.json:", parseError);
        res.status(500).json({ error: "Failed to parse JSON" });
      }
    }
  });
});

// Route for spaces.json
app.get("/api/spaces", (req, res) => {
  fs.readFile(path.join(rootDir, "data/spaces.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading spaces.json:", err);
      res.status(500).json({ error: "Failed to read file" });
    } else {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseError) {
        console.error("Error parsing spaces.json:", parseError);
        res.status(500).json({ error: "Failed to parse JSON" });
      }
    }
  });
});

// Basic root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
const PORT = process.env.PORT || 5176;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
