const router = require("express").Router();
const { z } = require("zod");
const { User, Accounts } = require("../db.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware.js");

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

const ZUpdateUser = z.object({
  password: z.string().min(6).optional(),
});

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  const zValidation = ZSignupUser.safeParse({
    username,
    firstName,
    lastName,
    password,
  });

  const existingUser = await User.find({
    username,
  });

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

  // giving random balance logic
  const randomBalance = 9999 * Math.random() + 1;
  const newAccount = new Accounts({
    userId: newUser._id,
    balance: randomBalance,
  });

  await newAccount.save();

  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "User created successfully",
    token,
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

  const passwordsMatch = await bcrypt.compare(password, ourUser.password);

  if (!passwordsMatch) {
    return res.status(403).json({
      message: "Wrong password",
    });
  }

  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET
  );

  res.status(200).json({
    token,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const updateObject = req.body;

  const zValidation = ZUpdateUser.safeParse({
    ...updateObject,
  });

  if (!zValidation.success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  if (updateObject.password) {
    const salt = await bcrypt.genSalt();
    updateObject.password = await bcrypt.hash(updateObject.password, salt);
  }

  await User.updateOne(
    {
      username: req.username,
    },
    {
      $set: updateObject,
    }
  );

  return res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res, next) => {
  const filter = req.query.filter;

  const user = await User.find({
    firstName: {
      $regex: filter ? `.*${filter}.*` : ".*",
      $options: "i",
    },
  });

  console.log(user);

  const withoutCurUser = user.filter((ele) => ele.username != req.username);

  res.json(withoutCurUser);
});

module.exports = router;
