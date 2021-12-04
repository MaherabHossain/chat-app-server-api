const sendMessageRequest = async (req, res) => {
  try {
    const request = new Request({
      send: req.id,
      receive: req.body.id,
    });
    await request.save();
    res.status(200).json({
      message: "friend request sent sucessfully",
    });
  } catch {
    res.status(500).json({
      error: "there was an server side error",
    });
  }
};

module.exports = sendMessageRequest;
