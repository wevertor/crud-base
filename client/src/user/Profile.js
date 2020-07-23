import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Person, Edit } from "@material-ui/icons";
import {
  Paper,
  Typography,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from "@material-ui/core";

import auth from "./../auth/AuthHelper";
import { read } from "./ApiUser";
import DeleteUser from "./DeleteUser";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.openTitle,
  },
  button: {
    marginTop: theme.spacing(2),
    textDecoration: "none",
  },
}));

export default function Profile({ match }) {
  const classes = useStyles();

  // estados
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [erro, setErro] = useState(undefined);
  //verifica se o usuário está autenticado
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    let mounted = true;
    read({ userId: match.params.userId }, { t: jwt.token }).then((data) => {
      if (mounted) {
        if (data.error) setErro(data.error);
        else setUser(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [match.params.userId]);

  const handleReturn = () => setRedirectToSignin(true);

  if (redirectToSignin) return <Redirect to="/" />;

  // se der erro
  if (erro)
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          {erro}
        </Typography>
        <Button
          className={classes.button}
          onClick={handleReturn}
          color="primary"
        >
          Voltar
        </Button>
      </Paper>
    );

  // se der bom
  if (jwt.user && jwt.user._id === user._id) {
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Perfil
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />{" "}
            <ListItemSecondaryAction>
              <Link to={`/user/edit/${jwt.user._id}`}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={user._id} />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={"Juntou-se em: " + new Date(user.created).toDateString()}
            />
          </ListItem>
        </List>
      </Paper>
    );
  }

  // enquanto carrega
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Carregando...
      </Typography>
    </Paper>
  );
}
