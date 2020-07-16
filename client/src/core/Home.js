import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import texture from "../assets/texture.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
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
    <Card elevation={5} className={classes.card}>
      <Typography variant="h6" className={classes.title}>
        Página Inicial
      </Typography>
      <CardMedia
        className={classes.media}
        image={texture}
        title="placeholder logo"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          Uma aplicação para implementar operações em um banco de dados.
        </Typography>
      </CardContent>
    </Card>
  );
}
