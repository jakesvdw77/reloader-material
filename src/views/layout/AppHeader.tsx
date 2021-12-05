import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, MemoryRouter as Router } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logOut } from "../../store/appstore";
import Avatar from "@material-ui/core/Avatar";

const AppHeader: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const authenticated = useAppSelector((state) => state.isAuthenticated);

  const firstName = useAppSelector((state) => state.firstLetter);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const logout = () => {
    dispatch(logOut());
  };

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Ultimate Reloader
        </Typography>

        {!authenticated && (
          <Button component={RouterLink} to="/login" color="inherit">
            Login | Register
          </Button>
        )}

        {!authenticated && (
          <Button component={RouterLink} to="/" color="inherit">
            Home
          </Button>
        )}

        {authenticated && (
          <Button onClick={logout} color="inherit">
            Signout
          </Button>
        )}

        {authenticated && <Avatar src="/broken-image.jpg">{firstName}</Avatar>}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
