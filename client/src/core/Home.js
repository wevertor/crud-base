import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import texture from "../assets/texture.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography variant="h6" classname={classes.title}>
        Home Page
      </Typography>
      <CardMedia
        className={classes.media}
        image={texture}
        title="placeholder logo"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          Página inicial de uma aplicação CRUD.
        </Typography>
      </CardContent>
    </Card>
  );
}
