const Pool = require("pg").Pool;
require("dotenv").config();
// Development environment
const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

// Production environment
const productionConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? productionConfig : devConfig,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
