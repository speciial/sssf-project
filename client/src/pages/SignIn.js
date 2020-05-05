import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";

import {
  isAuth,
  saveTokenToStorage,
  saveUsernameAndIdToStorage,
} from "../utils/Auth";

import { useLazyQuery } from "@apollo/react-hooks";

import { Login } from "../queries/UserQueries";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credential, setCredential] = useState();
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  const classes = useStyles();

  const onErrorLogin = (error) => {
    setError(error.message);
  };
  const [login, { data }] = useLazyQuery(Login, {
    variables: credential,
    onError: onErrorLogin,
  });

  const messages = history.location.state
    ? history.location.state.messages
    : "";

  if (isAuth()) {
    history.push("/profile");
  }
  if (data) {
    saveTokenToStorage(data.login.Token, remember);
    saveUsernameAndIdToStorage(data.login.Username, data.login.id, remember);
    history.push("/profile");
  }

  const submitLogin = async (e) => {
    e.preventDefault();
    setCredential({ username: username, password: password });
    login();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          {error && (
            <Alert
              onClose={() => {
                setError(null);
              }}
              severity="error"
            >
              {error}
            </Alert>
          )}
          {messages && (
            <>
              {messages.map((message) => (
                <Alert severity="success">{message}</Alert>
              ))}
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            onChange={(e) => {
              setRemember(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
