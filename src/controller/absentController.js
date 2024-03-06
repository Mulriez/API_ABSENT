const absentInModel = require("../models").absentIn;
const absentOutModel = require("../models").absentOut;
const { post, del } = require("./cloudinaryController");
const { Op } = require("sequelize");
const checkQuery = require("../utils/queryString");


//absent_in
async function getAbsent(req, res) {
  const { id } = req.params;
  try {
    const absen = await absentInModel.findByPk(id);

    if (!absen) {
      return res.status(404).json({
        status: "Fail",
        msg: "Absen tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      msg: "Absen Ditemukan",
      data: absen,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      msg: "Ada kesalahan",
    });
  }
}

async function getAbsentByUserId(req, res) {
  const { page, offset, pageSize, keyword } = req.query;
  try {
    const absen = await absentInModel.findAndCountAll({
      where: {
        ...(checkQuery(keyword) && {
          [Op.or]: [
            {
              user_id: { [Op.substring]: keyword },
            },
          ],
        }),
      },
      attributes: [
        "id",
        "user_id",
        "clock_in",
        "latitude_in",
        "longitude_in",
        "selfie_in",
      ],
      offset: offset,
      limit: pageSize,
    });

    if (!absen) {
      return res.status(404).json({
        status: "Fail",
        msg: "Absen tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      msg: "Absen Ditemukan",
      data: absen.rows,
      pagination: {
        page: page,
        pageSize: pageSize,
        total: absen.count,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      msg: "Ada kesalahan",
    });
  }
}

async function createAbsentIn(req, res) {
  try {
    const payload = req.body;
    let { user_id, clock_in, latitude_in, longitude_in } = payload;
    const { secure_url, public_id } = await post(req.file.path, "selfie_in");
    selfie_in = secure_url;
    thumbnail_id = public_id;
    const absen = await absentInModel.create({
      user_id,
      clock_in,
      latitude_in,
      longitude_in,
      selfie_in,
      thumbnail_id,
    });
    console.log(absen instanceof absentInModel);
    res.status(201).json({
      status: "Success",
      message: "Absen berhasil dibuat",
      data: absen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: "Ada kesalahan",
      error: error,
    });
  }
}

//absent_out
async function createAbsentOut(req, res) {
  try {
    const payload = req.body;
    let { absent_id, clock_out, latitude_out, longitude_out } = payload;
    const { secure_url, public_id } = await post(req.file.path, "selfie_out");
    selfie_out = secure_url;
    thumbnail_id = public_id;
    const absenOut = await absentOutModel.create({
      absent_id,
      clock_out,
      latitude_out,
      longitude_out,
      selfie_out,
      thumbnail_id,
    });
    console.log(absenOut instanceof absentOutModel);
    res.status(201).json({
      status: "Success",
      message: "Absen berhasil dibuat",
      data: absenOut,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: "Ada kesalahan",
      error: error,
    });
  }
}


module.exports = {
  getAbsent,
  getAbsentByUserId,
  createAbsentIn,
  createAbsentOut
};