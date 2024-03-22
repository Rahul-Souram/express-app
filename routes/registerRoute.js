const express = require("express");
const {
  getRegister,
  createRegister,
  loginUser,
  dashBoardData,
} = require("../controllers/registerController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.route("/").get(getRegister).post(createRegister);
router.route("/login").post(loginUser);
router.get("/dashboard", validateToken, dashBoardData);

module.exports = router;
