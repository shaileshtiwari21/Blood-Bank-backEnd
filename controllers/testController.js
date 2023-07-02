const testControllers = (req, res) => {
  res.status(200).json({
    message: "test routes",
    success: true,
  });
};
module.exports = { testControllers };
