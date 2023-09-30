const express = require("express");
const routes = require("./routes/routes");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/", routes);
app.listen(3001, () => console.log("Server listening at port 3001"));
