import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Available routes:");
  console.log("- POST /api/auth/signup");
  console.log("- POST /api/auth/login");
});