const express = require("express");
const {
  getContact,
  createContact,
  singleGet,
  updateContact,
  singleDelete,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(singleGet).put(updateContact).delete(singleDelete);

module.exports = router;
