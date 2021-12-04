const seeAllRequest = async (req, res) => {
  try {
    const user = await Request.find({ receive: req.id, status: false });
    res.status(200).json({
      user,
    });
  } catch {
    res.status(500).json({
      error: "server error",
    });
  }
};
module.exports = seeAllRequest;
