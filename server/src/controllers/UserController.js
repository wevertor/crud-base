import User from "../models/UserModel";
import extend from "lodash/extend";
import errorHandler from "../helpers/dbErrorHandler";

/*
 * Essa função cria um novo usuário com o objeto JSON recebido na requisição POST
 * do frontend.
 */
const create = async (req, res, next) => {
  const user = new User(req.body);

  /* tenta salvar o usuário no banco de dados */
  try {
    await user.save();
    return res.status(200).json({
      message: "Cadastrado com sucesso!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/*
 * Essa função retorna todos os usuários no banco de dados como um array de
 * objetos JSON.
 */
const list = async (req, res) => {
  try {
    let users = await User.find().select(
      "name email updated created hashed_password"
    );
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/*
 * usa o valor do id para encontrar o usuário respectivo no banco de dados.
 */
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status("400").json({
        error: "Usuário não encontrado.",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Impossível recuperar usuário.",
    });
  }
};

/*
 * Recupera os detalhes de um usuário ocultando informações sensíveis.
 */
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, update };
