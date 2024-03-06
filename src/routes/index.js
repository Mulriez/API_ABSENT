const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/authControllers");
const jwtValidateMiddleware = require("../middleware/JwtValidateMiddleware");
const { getUser, getUserID } = require("../controller/userController");
const uploadSingle = require("../storage/uploadSingle");
const { getAbsent, getAbsentByUserId, createAbsentIn, createAbsentOut } = require("../controller/absentController");
//auth
router.post("/api/login", login);
router.post("/api/register", register);
//jwt
router.use(jwtValidateMiddleware);
//user
router.get("/api/user", getUser);
router.get("/api/user/:id", getUserID);
//absent_in
router.get("/api/absent/:id", getAbsent);
router.get("/api/absent", getAbsentByUserId);
router.post("/api/absent-in", uploadSingle, createAbsentIn);
//absent_out
router.post("/api/absent-out", uploadSingle, createAbsentOut);

module.exports = router;
