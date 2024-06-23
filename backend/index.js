const express = require("express");
const app = express();
const apiRouter = require("./routes/index");
const cors = require("cors");
require("./db");
PORT = 443;

app.use(cors());
app.use(express.json());

app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log("app listening");
});
