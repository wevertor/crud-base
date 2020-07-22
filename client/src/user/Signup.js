import React from "react";
import { create } from "./ApiUser";
import { validateEmail, validatePassword } from "./../auth/Validation";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Icon,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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

export default function Signup() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    open: false,
    error: "",
  });

  const [errorText, setErrorText] = React.useState({
    name: "",
    nameError: false,
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
  });

  // lida com uma eventual mudança nos valores e atualiza o estado
  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value });
    setErrorText({
      ...errorText,
      [fieldName]: "",
      [fieldName + "Error"]: false,
    });
  };

  // envia os dados para o bd
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    if (!user.name || user.name.length < 3) {
      setErrorText({
        ...errorText,
        name: "Insira um nome de usuário com ao menos 3 caracteres.",
        nameError: true,
      });
    }

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

    create(user).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else setValues({ ...values, error: "", open: true });
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Cadastrar
          </Typography>
          <form>
            <TextField
              id="nome"
              label="Nome"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
              error={errorText.nameError}
              helperText={errorText.name}
              autoComplete="off"
            />
            <br />
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
              autoComplete="off"
            />
          </form>

          <br />
          {/* se houver algum erro mostra um componente erro */}
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

      {/* pop-up mostrando mensagem de sucesso */}
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>Nova Conta</DialogTitle>
        <DialogContent>
          <DialogContentText>Nova conta criada com sucesso!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Entrar
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
