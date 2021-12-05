import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Welcome: React.FC = () => {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles();

  return (
   
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/reloading.jpg"
            title="Reloading"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              What is Ultimate Reloader
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Ultimate Reloader is designed to help the enthusiast ammunition reloader with his or her passion.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Take a tour
          </Button>
        </CardActions>
      </Card>

      
  );
};

export default Welcome;
