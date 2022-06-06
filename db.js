const Poll = require('pg').Pool;

const poll = new Poll({
  user: "postgres",
  host:"localhost",
  database: "students",
  password: "",
  port: 5432
});

module.exports = poll;