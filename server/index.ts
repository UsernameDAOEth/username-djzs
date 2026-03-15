import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "DJZS Agent Server",
    status: "running",
    version: "0.1.0"
  });
});

app.listen(PORT, () => {
  console.log(`DJZS Agent running on port ${PORT}`);
});
