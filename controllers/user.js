const query = require("../database");

async function getUser(req, res) {
  try {
    const user = await query(
      `SELECT uuid, name, email, noTelp, role FROM users`
    );
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(req, res) {
  const uuid = req.params.uuid;

  try {
    const user = await query(`DELETE FROM users WHERE uuid = ?`, [uuid]);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getUser,
  deleteUser,
};
