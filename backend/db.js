const db = require("mongoose");

(async () => {
  await db.connect(
    "mongodb+srv://prateekkuniyal:uniyal@work-test.5vrxvyy.mongodb.net/paytm?retryWrites=true&w=majority&appName=work-test"
  );
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

const User = db.model("users", UserSchema);

module.exports = {
  User,
};
