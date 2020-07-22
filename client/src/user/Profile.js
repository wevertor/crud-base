import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { Person, Edit } from "@material-ui/icons";
import auth from "./../auth/AuthHelper";
import { read } from "./ApiUser";

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
}));

export default function Profile({ match }) {
  const classes = useStyles();

  // estados
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    //verifica se o usuário está autenticado
    const jwt = auth.isAuthenticated();

    read({ userId: match.params.userId }, { t: jwt.token }).then((data) => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });
  }, [match.params.userId]);

  if (redirectToSignin) return <Redirect to="/signin" />;

  if (
    auth.isAuthenticated().user &&
    auth.isAuthenticated().user._id === user._id
  ) {
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
              <Link to={"/user/edit/" + user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              {/*DELETE USER!!!!!!!*/}
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
}
