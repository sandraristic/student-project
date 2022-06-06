const Poll = require('pg').Pool;

const poll = new Poll({
  user: "postgres",
  host:"localhost",
  database: "students",
  password: "sandra7/",
  port: 5432
});

module.exports = poll;