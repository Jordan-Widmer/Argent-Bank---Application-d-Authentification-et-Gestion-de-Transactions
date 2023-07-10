const mongoose = require("mongoose");
const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost/argentBankDB";

module.exports = () => mongoose.connect(databaseUrl, {useNewUrlParser: true});
