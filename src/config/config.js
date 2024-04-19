const knex = require("knex");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, PGURL } = process.env;

module.exports = {
  db: knex({
    client: "pg",
    connection: {
        host: PGHOST,
        port: PGPORT,
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD,
    //   connectString: PGURL,
      ssl: { rejectUnauthorized: false }
    },
  }),
};
