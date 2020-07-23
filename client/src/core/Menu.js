import React from "react";
import { withRouter } from "react-router";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import auth from "./../auth/AuthHelper";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgba(44, 45, 51)",
    color: "#FFF",
  },
  title: {
    color: "#FFF",
    padding: theme.spacing(2),
    textDecoration: "none",
    transition: "0.3s",
    "&:visited, &:hover, &:active": {
      textDecoration: "none",
    },
    "&:hover": {
      background: "rgb(39, 91, 102)",
    },
  },
  content: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    justifyContent: "space-between",
  },
  links: {
    textDecoration: "none",
    "&:visited, &:hover, &:active": {
      textDecoration: "none",
    },
  },
}));

const Menu = withRouter(({ history }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.content}>
        <Link to="/" className={classes.title}>
          <Typography variant="h6">CRUD Base</Typography>
        </Link>
        <div className={classes.links}>
          <Link to="/users" className={classes.links}>
            <Button className={classes.title}>Usuários</Button>
          </Link>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup" className={classes.links}>
                <Button className={classes.title}>Cadastrar</Button>
              </Link>
              <Link to="/signin" className={classes.links}>
                <Button className={classes.title}>Acessar</Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              <Link
                to={`/user/${auth.isAuthenticated().user._id}`}
                className={classes.links}
              >
                <Button className={classes.title}>Meu Perfil</Button>
              </Link>
              <Button
                className={classes.title}
                onClick={() => {
                  auth.clearJWT(() => history.push("/"));
                }}
              >
                Sair
              </Button>
            </span>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Menu;
