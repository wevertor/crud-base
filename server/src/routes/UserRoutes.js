import express from "express";
import userCtrl from "../controllers/UserController";
import authCtrl from "../controllers/AuthController";

const router = express.Router();

router.route("/users").get(userCtrl.list).post(userCtrl.create);

/* funções possíveis ao passar um ID de usuário específico */
router
  .route("/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

/* configura o router para tratar o parametro com uma função */
router.param("userId", userCtrl.userByID);

export default router;
