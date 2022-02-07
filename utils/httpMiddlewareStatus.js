const { COOKIE_OPTIONS } = require("../authenticate");

exports.okAccountRequest = (tokens, res) => {
  if (tokens) {
    res.cookie("refreshToken", tokens.refreshToken, COOKIE_OPTIONS);
    res.send({ success: true, token: tokens.token });
  } else {
    res.statusCode = 500;
    res.send({ success: false });
  }
};
