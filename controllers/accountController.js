const passport = require("passport");
const jwt = require("jsonwebtoken");

const { COOKIE_OPTIONS, verifyUser } = require("../authenticate");
const { okAccountRequest } = require("../utils/httpMiddlewareStatus");
const accountService = require("../services/accountService");

module.exports = (app) => {
  app.post("/api/account/signup", async (req, res, next) => {
    if (!req.body.name) {
      res.statusCode = 500;
      res.send({
        name: "NameError",
        message: "The name is required",
      });
    }

    try {
      okAccountRequest(await accountService.register(req.body), res);
    } catch (err) {
      res.statusCode = 500;
      res.send(err);
    }
  });

  app.post(
    "/api/account/login",
    passport.authenticate("local"),
    async (req, res, next) => {
      try {
        okAccountRequest(await accountService.login(req.user._id), res);
      } catch (err) {
        res.statusCode = 500;
        res.send(err);
      }
    },
  );

  app.post("/api/account/refreshToken", async (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    if (refreshToken) {
      try {
        const payload = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );
        const userId = payload._id;

        okAccountRequest(await accountService.refreshToken(userId), res);
      } catch (err) {
        res.statusCode = 401;
        res.send(err);
      }
    }
  });

  app.get("/api/account/logout", verifyUser, async (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    try {
      await accountService.logout(req.user._id, refreshToken);
      res.clearCookie("refreshToken", COOKIE_OPTIONS);
      res.send({ success: true });
    } catch (err) {
      res.statusCode = 500;
      res.send(err);
    }
  });
};
