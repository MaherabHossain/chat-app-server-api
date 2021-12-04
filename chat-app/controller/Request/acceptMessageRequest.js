const acceptMessageRequest = async (req, res) => {
  try {
    const result = await Request.findOneAndUpdate(
      { send: req.params.id, receive: req.id },
      {
        $set: {
          status: true,
        },
      },
      {
        new: true,
      }
    );
    const convertation = new Convertation({
      participantOne: req.id,
      participantTwo: req.params.id,
      messages: [],
    });
    await convertation.save();
    res.status(200).json({
      message: "message request accept successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = acceptMessageRequest;
