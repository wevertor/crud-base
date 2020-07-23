import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

import auth from "./../auth/AuthHelper";
import { remove } from "./ApiUser";

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // a janela abre ao clicar no botão de deletar
  const clickButton = () => {
    setOpen(true);
  };

  // a janela fecha ao clicar no bottão de fechar
  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    const jwt = auth.isAuthenticated();
    remove({ userId: props.userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) console.log(data.error);
      else {
        auth.clearJWT(() => console.log("apagado"));
        setRedirect(true);
      }
    });
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <span>
      <IconButton aria-label="Apagar" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Apagar Conta</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirme para apagar sua conta.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};
