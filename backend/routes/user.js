const router = require("express").Router();
const { z } = require("zod");
const { User } = require("../db.js");

const ZSignupUser = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
});

const ZSigninUser = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

// ! TODO : Hashing Password before storing

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  const zValidation = ZSignupUser.safeParse({
    username,
    firstName,
    lastName,
    password,
  });

  console.log(zValidation);
  // Logic for checking if user already exists

  const existingUser = await User.find({
    username,
  });

  console.log(existingUser);

  if (!zValidation.success || existingUser.length != 0) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  // storing user in DB
  const newUser = new User({
    username,
    password,
    firstName,
    lastName,
  });

  await newUser.save();

  res.status(200).json({
    message: "User created successfully",
    token: "jwt",
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const zValidation = ZSigninUser.safeParse({
    username,
    password,
  });

  const ourUser = await User.findOne({
    username,
  });

  if (!zValidation.success || !ourUser) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  res.status(200).json({
    token: "jwt",
  });
});

module.exports = router;
