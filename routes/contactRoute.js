const express = require("express");
const {
  getContact,
  createContact,
  singleGet,
  updateContact,
  singleDelete,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/").get(getContact).post(createContact);
router.route("/:id").get(singleGet).put(updateContact).delete(singleDelete);

module.exports = router;
