import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../../config";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status("401").json({ error: "Usuário não encontrado." });

    if (!user.authenticate(req.body.password)) {
      return res.status("401").send({ error: "Email e senha não combinam." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Não foi possível conectar." });
  }
};
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "Desconectado.",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

const hasAuthorization = (req, res, next) => {
  // verifica os dados tão de acordo com os salvos nos cookies
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "Usuário não autorizado.",
    });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
