import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function DatePickers(props) {
  const classes = useStyles();
  // console.log(props.selected);

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label={props.tag}
        type="date"
        value={props.selected}
        className={classes.textField}
        onChange={(el) => props.onChange(props.id, el.target.value)}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}
