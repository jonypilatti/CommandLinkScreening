const express = require("express");
const router = express.Router();
const dynamicForm = require("../utils/field-set-js.json");

router.get("/getDynamicForm", async (req, res) => {
  try {
    if (dynamicForm.length > 0) return res.status(200).send(dynamicForm);
    else return res.status(200).send({ Error: "The form has no values to render." });
  } catch (err) {
    console.error(err, "An error happened while fetching the form");
    return res.status(400).send({ Error: "An unexpected error happened: " + err?.message || err?.code });
  }
});

module.exports = router;
