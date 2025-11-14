import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";

// Load environment variables
config({ quiet: true });

// Initialize app
const app = express();

// Connect to database
await connectDB(); // Express 5 - can use top-level await

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Basic test route - Express 5 auto-handles async errors
app.get("/", async (req, res) => {
  res.json({
    message: "API is running...",
    version: "Express 5",
    node: process.version,
  });
});

// // Routes - Express 5 style with dynamic imports
// const userRoutes = await import("./routes/userRoutes.js");
// const productRoutes = await import("./routes/productRoutes.js");
// const orderRoutes = await import("./routes/orderRoutes.js");

// app.use("/api/users", userRoutes.default);
// app.use("/api/products", productRoutes.default);
// app.use("/api/orders", orderRoutes.default);

// 404 handler - must come before error handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Error handling middleware - Express 5 auto-catches async errors
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
  console.log(`🚀 Express version: ${express.version || "5.x"}`);
});

// Graceful shutdown - Express 5 best practice
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

export default app;
