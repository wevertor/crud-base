import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { signin } from "./ApiAuth.js";
import auth from "./AuthHelper";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Icon,
  CardActions,
  Button,
} from "@material-ui/core";
import { validateEmail, validatePassword } from "./../auth/Validation";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function Signin(props) {
  const classes = useStyles();

  // estados
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const [errorText, setErrorText] = React.useState({
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
  });

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
    setErrorText({
      ...errorText,
      [fieldName]: "",
      [fieldName + "Error"]: false,
    });
  };

  // valida e envia os dados do formulário
  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    // validação dos dados
    if (!user.email || !validateEmail(user.email)) {
      setErrorText({
        ...errorText,
        email: "Insira um endereço de email válido.",
        emailError: true,
      });
    }

    if (!user.password || !validatePassword(user.password)) {
      setErrorText({
        ...errorText,
        password: "Insira uma senha com pelo menos 6 caracteres.",
        passwordError: true,
      });
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Entrar
          </Typography>
          <form autoComplete="off">
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
              error={errorText.emailError}
              helperText={errorText.email}
            />
            <br />
            <TextField
              id="senha"
              label="Senha"
              type="password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
              error={errorText.passwordError}
              helperText={errorText.password}
            />
          </form>
          <br />{" "}
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Confirmar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
