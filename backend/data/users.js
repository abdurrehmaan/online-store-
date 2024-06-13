const bcrpt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrpt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Abdur Rehman",
    email: "abdurrehman@gmail.com",
    password: bcrpt.hashSync("123456", 10),
  },
];

module.exports = users;
