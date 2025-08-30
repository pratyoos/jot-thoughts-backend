import app from "./app";
import connectDb from "./config/db";
import { env } from "./config/env.js";

connectDb();

const server = app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Server is working on http://localhost:${env.PORT}`);
});

//handling uncaught exception
process.on("uncaughtException", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

//handling promise rejection
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting Down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});