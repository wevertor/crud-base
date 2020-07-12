import React, { useState, useEffect } from "react";
import { list } from "./ApiUser";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import { ArrowForward, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: "auto",
    maxWidth: 600,
    marginTop: "5%",
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  users: {
    textDecoration: "none",
    color: "#000000",
  },
  list: {
    paddingBottom: "5%",
  },
}));

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    list().then((data) => {
      console.log(data);
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
    return;
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Todos os usuários
      </Typography>
      <List dense className={classes.list}>
        {users.map((item, i) => {
          return (
            <Link to={"/user/" + item._id} key={i} className={classes.users}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
};

export default Users;
