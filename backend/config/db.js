const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  (process.env.DB_NAME || "securenotes").trim(),
  (process.env.DB_USER || "admin").trim(),
  (process.env.DB_PASSWORD || "admin123").trim(),
  {
    host: (process.env.DB_HOST || "db").trim(),
    dialect: "postgres",
    logging: false,
  }
);

const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("PostgreSQL Connected Successfully 🚀");
      return;
    } catch (error) {
      console.log("DB not ready, retrying...", retries);
      retries--;

      await new Promise(res => setTimeout(res, 5000));
    }
  }

  console.error("Database connection failed permanently");
};
console.log("FINAL DB NAME:", process.env.DB_NAME);
console.log("DB CONFIG:", {
  db: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
});
module.exports = { sequelize, connectDB };
