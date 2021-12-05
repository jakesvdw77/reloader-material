import React, { Fragment } from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { getProfile, loginUser } from "../../services/UserService";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Copyright from "../layout/Copyright";
import { useAppDispatch } from "../../store/hooks";
import { authenticate, profileLoaded } from "../../store/appstore";

const Login: React.FC<{ onViewChange: (view: number) => void }> = (props) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const dispatch = useAppDispatch();

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const gotoSignup = () => {
    props.onViewChange(1);
  };

  const forgotPassword = () => {
    props.onViewChange(2);
  };

  const submitLogin = (event: React.FormEvent) => {
    event.preventDefault();

    loginUser(email, password)
      .then((data) => {
        dispatch(authenticate(data));
        history.push("/home");
      })
      .catch((err) => {
        setError(err.message);
        setOpen(true);
      });
  };

  

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <form className={classes.form} onSubmit={submitLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setOpen(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setOpen(false);
                  }}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                {open && (
                  <Alert severity="error" variant="outlined">
                    {error}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <Link href="#" variant="body2" onClick={gotoSignup}>
                  Create Account Today
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={forgotPassword}>
                  Forgot your Password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
};

export default Login;
