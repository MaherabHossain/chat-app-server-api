const seeAllUser = async (req, res) => {
  try {
    const allData = await Request.find({ receive: req.id }).populate("send");
    res.status(200).json({
      status: "success",
      data: allData,
    });
  } catch {
    res.status(500).json({
      error: "server side error",
    });
  }
};

module.exports = seeAllUser;
