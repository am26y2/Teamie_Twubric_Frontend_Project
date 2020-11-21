import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h1">
          <div className="rowcardheader">
            <div>Sample user {props.id}</div>
            <div>{props.total}</div>
          </div>
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Friends :- {props.friends}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          influence :- {props.influence}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          chirpiness :- {props.chirpiness}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Date :-{" "}
          {props.month + 1 >= 10
            ? props.month + 1
            : "0" + parseInt(props.month + 1)}
          /{props.date >= 10 ? props.date : "0" + parseInt(props.date)}/
          {props.year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="secondary"
          size="small"
          onClick={() => props.onDelete(props.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
