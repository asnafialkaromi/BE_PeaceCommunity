const query = require("../database");
const { randomUUID } = require("crypto");
const bcryptjs = require("bcryptjs");

async function register(req, res) {
  const { name, email, noTelp, password, confPassword, role } = req.body;

  if (
    !name ||
    !email ||
    !noTelp ||
    isNaN(+noTelp) ||
    !password ||
    !confPassword
  ) {
    return res.status(400).json("Masukkan semua data yang diperlukan!");
  }

  if (password !== confPassword) {
    return res.status(400).json("Password dan konfirmasi password tidak sama!");
  }

  const isDuplicate = await query(
    `SELECT id FROM users WHERE noTelp = ? OR email = ?`,
    [noTelp, email]
  );

  if (isDuplicate.length > 0) {
    return res.status(400).json("Pengguna sudah ada!");
  }

  try {
    const salt = await bcryptjs.genSalt(12);
    const hash = await bcryptjs.hash(password, salt);

    await query(
      `INSERT INTO users ( uuid, name, email, noTelp, password, role ) VALUES ( ?, ?, ?, ?, ?, ?);`,
      [randomUUID(), name, email, noTelp, hash, role]
    );

    return res.status(200).json("Pendaftaran Berhasil!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Terdapat kesalahan pada server!");
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Masukkan Semua Data");
  }

  try {
    const [checkLogin] = await query("SELECT * FROM users WHERE email = ?;", [
      email,
    ]);

    if (!checkLogin) {
      return res.status(400).json({ error: "Pengguna tidak ditemukan" });
    }

    const checkPassword = await bcryptjs.compare(password, checkLogin.password);

    if (!checkPassword) {
      return res.status(400).json({ error: "Password anda salah" });
    }

    req.session.uuid = checkLogin.uuid;

    const { uuid, name, role } = checkLogin;

    return res.status(200).json({ uuid, name, role });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Terdapat kesalahan pada server");
  }
}

async function getMe(req, res) {
  if (!req.session.uuid) return res.status(401).json("Anda Belum Login");
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
    return res.status(400).json("Terdapat kesalahan pada server");
  }
}

async function logout(req, res) {
  req.session = null;
  res.json({ message: "Logout Berhasil" });
}

module.exports = {
  register,
  login,
  getMe,
  logout,
};
