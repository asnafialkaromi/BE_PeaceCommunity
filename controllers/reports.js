const query = require("../database");
const { randomUUID } = require("crypto");
const path = require("path");
const fs = require("fs/promises");

async function getReports(req, res) {
  let response;
  try {
    if (req.role === "admin") {
      response = await query(`SELECT * FROM reports`);
    } else {
      response = await query(`SELECT * FROM reports WHERE userId = ?`, [
        req.userId,
      ]);
    }
    return res.status(200).json(response);
  } catch (error) {}
}

async function createReport(req, res) {
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ msg: "No file uploaded" });

  const { name, email, noTelp, alamat, pengaduan, status } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  try {
    await fs.writeFile(`./public/uploads/${fileName}`, file.data);

    await query(
      `INSERT INTO reports (userId, name, email, noTelp, alamat, pengaduan, status, image, url, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [
        req.userId,
        name,
        email,
        noTelp,
        alamat,
        pengaduan,
        status,
        fileName,
        url,
      ]
    );
    res.status(201).json({ msg: "Report Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function updateReport(req, res) {
  const report = await query(`SELECT * FROM reports WHERE reportId = ?`, [
    req.body.reportId,
  ]);
  if (!report || report.length === 0)
    return res.status(404).json({ msg: "Report not found" });
  try {
    const { status } = req.body;

    if (req.role === "admin") {
      const updateReport = await query(
        `UPDATE reports SET  status = ? WHERE reportId = ?`,
        [status, req.body.reportId]
      );
      return res.status(200).json({ msg: "Report Updated" });
    } else if (req.role === "user") {
      return res.status(400).json({ msg: "You are not authorized" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getReports,
  createReport,
  updateReport,
};
