const query = require("../database");
const { randomUUID } = require("crypto");
const bcryptjs = require("bcryptjs");

async function register(req, res) {
  const { name, email, noTelp, password, confPassword, role } = req.body;

  if (
    name === undefined ||
    name === "" ||
    email === undefined ||
    email === "" ||
    noTelp === undefined ||
    isNaN(+noTelp) ||
    password === undefined ||
    password === "" ||
    confPassword === undefined ||
    confPassword === ""
  )
    return res.status(400).json("Invalid data!");

  if (password !== confPassword)
    return res.status(400).json("Password not match!");

  try {
    // logic handling
    const isDuplicate = await query(
      `
        SELECT id FROM users WHERE noTelp = ? OR email = ? 
    `,
      [noTelp, email]
    );

    if (isDuplicate.length > 0)
      return res.status(400).json("User already exists!");

    const salt = await bcryptjs.genSalt(12);
    const hash = await bcryptjs.hash(password, salt);

    await query(
      `INSERT INTO users ( uuid, name, email, noTelp, password, role ) VALUES ( ?, ?, ?, ?, ?, ?);`,
      [randomUUID(), name, email, noTelp, hash, role]
    );

    return res.status(200).json("Register success!");
  } catch (error) {
    res.status(400).json("Something went wrong!");
    res.status(400).json(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (
    email === undefined ||
    email === "" ||
    password === undefined ||
    password === ""
  )
    return res.status(400).json("Masukkan Semua Data");
  try {
    // logic handling
    const checkLogin = await query(
      `
        SELECT * FROM users WHERE email = ?;
    `,
      [email]
    );

    if (!checkLogin) return res.status(400).json("User not found");

    const checkPassword = await bcryptjs.compare(
      password,
      checkLogin[0].password
    );

    if (!checkPassword) return res.status(400).json("Password not match");

    req.session.uuid = checkLogin[0].uuid;
    req.session.authorized = true;

    const { uuid, name, role } = checkLogin[0];

    return res
      .status(200)
      .json({ uuid, name, role, sessionStorage: req.session.uuid });
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong!");
  }
}

async function getMe(req, res) {
  if (!req.session.authorized) return res.status(401).json("Anda Belum Login");
  try {
    const getMe = await query(
      `
        SELECT * FROM users WHERE uuid = ?;
    `,
      [req.session.uuid]
    );

    const { uuid, name, email, role } = getMe[0];

    return res.status(200).json({ uuid, name, email, role });
  } catch (error) {
    return res.status(400).json("Something went wrong!");
  }
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
}

module.exports = {
  register,
  login,
  getMe,
  logout,
};
