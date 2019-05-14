const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_DATABASE || 'document',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        charset: 'utf8mb4'
      },
      pool: {
        min: 2,
        max: 10
      }
  }
};