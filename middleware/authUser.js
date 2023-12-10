const query = require("../database/index");

async function verifyUser(req, res, next) {
  if (!req.session.uuid)
    return res.status(401).json({ message: "Mohon Login Ke akun Anda" });

  const user = await query(`SELECT * FROM users WHERE uuid = ?`, [
    req.session.uuid,
  ]);

  if (!user) return res.satus(401).json({ message: "User Tidak Ditemukan" });

  req.userId = user[0].id;
  req.role = user[0].role;
  next();
}
async function adminOnly(req, res, next) {
  const user = await query(`SELECT * FROM users WHERE uuid = ?`, [
    req.session.uuid,
  ]);
  if (user[0].role !== "admin") {
    return res.status(401).json({ message: "Akses Dilarang" });
  }
  next();
}

module.exports = { verifyUser, adminOnly };
