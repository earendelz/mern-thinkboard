import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin:"http://localhost:5173",
        })
    );
}


app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);



if (process.env.NODE_ENV === "production") {
  // path.join(__dirname, "..", "frontend", "dist") mengarah ke root/frontend/dist
  const distPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(distPath));

  // Gunakan wildcard "*" bukan "/*splat"
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        res.status(500).send("File frontend tidak ditemukan di: " + distPath);
      }
    });
  });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
})



