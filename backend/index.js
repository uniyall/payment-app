const express = require("express");
const app = express();
const apiRouter = require("./routes/index");
const cors = require("cors");
PORT = 3000;

app.use(cors());
app.use(express.json());

require("./db");

app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log("app listening");
});
