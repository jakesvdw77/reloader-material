import React from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createUser } from "../../services/UserService";
import User from "../../models/User";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Copyright from "../layout/Copyright";

const Signup: React.FC<{ onViewChange: (view: number) => void }> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const history = useHistory();


  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const gotoLogin = () => {
    props.onViewChange(0);
  };

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

  const setProfile = (data: any) => {
    setOpen(false);
    history.push("/home");    
  };


  const registerUser = (event:React.FormEvent) => {

    event.preventDefault();

    let user = new User(email, password, firstName, lastName, consent);

    createUser(user)
      .then((data) =>  setProfile(user))
      .catch((err) => 
      {        
        setError(err.message);
        setOpen(true);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {open && (
                  <Alert severity="error" variant="outlined">
                    {error}
                  </Alert>
                )}
        <form className={classes.form} onSubmit={registerUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setOpen(false);
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => {
                  setLastName(e.target.value);
                  setOpen(false);
                }}
              />
            </Grid>
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
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setOpen(false);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setOpen(false);
                    }}
                  />
                }
                label="I want to receive marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={gotoLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Signup;
