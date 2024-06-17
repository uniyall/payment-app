const { User, Accounts } = require("../db");
const { authMiddleware } = require("../middleware");
const db = require("mongoose");
const router = require("express").Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.username,
  });

  const account = await Accounts.findOne({
    userId: user._id,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res, next) => {
  const { to, amount } = req.body;

  const fromUser = await User.findOne({
    username: req.username,
  });

  const toUser = await User.findById(to)

  if (!toUser) {
    return res.status(400).json({
      message: "Invalid Account",
    });
  }

  const fromUserAccount = await Accounts.findOne({
    userId: fromUser._id,
  });

  // ! Transaction Starts
  const session = await db.startSession();
  try {
    session.startTransaction();
    if (fromUserAccount.balance < amount)
      throw new Error("Insufficient balance");

    // Deducting from FROM
    await Accounts.updateOne(
      {
        userId: fromUser._id,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    // Adding to TO
    await Accounts.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    let eMessage = null;
    if (e.message === "Insufficient balance") eMessage = e.message;
    return res.status(400).json({
      message: eMessage ? eMessage : "Transaction Failed due to some reason",
    });
  } finally {
    session.endSession();
  }

  return res.status(200).json({
    message: "Transfer successful",
  });
});

const toAccount = (module.exports = router);
