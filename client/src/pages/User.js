import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Container, CssBaseline, Grid, Paper } from "@material-ui/core";

import { useParams } from "react-router-dom";

import HeaderLogo from "../components/HeaderLogo";
import UserTabs from "../components/UserTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
  headerPaper: {
    padding: 0,
    margin: 0,
  },
}));

const User = () => {
  const classes = useStyles();
  const { username } = useParams("");

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* HEADER LOGO */}
            <Paper className={classes.headerPaper}>
              <HeaderLogo />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {/* PUBLIC PROFILE */}
            <Paper className={classes.paper}>
              <UserTabs username={username} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default User;
