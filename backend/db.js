const db = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

(async () => {
  await db.connect(process.env.DB_URI);
  console.log("DB connection successful");
})();

const Schema = db.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const User = db.model("users", UserSchema);

const AccountsSchema = new Schema({
  userId: {
    type: db.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Accounts = db.model("accounts", AccountsSchema);

module.exports = {
  User,
  Accounts,
};
