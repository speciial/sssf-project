import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Container, CssBaseline, Grid, Paper, Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { userQuery } from '../queries/UserQueries';
import { isAuth, disconnectUser } from '../utils/Auth';

import HeaderLogo from '../components/HeaderLogo';
import ProfileTabs from '../components/ProfileTabs';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
  headerPaper: {
    padding: 0,
    margin: 0,
  },
  button: {
    width: '100%',
    backgroundColor: '#e9e9e9',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();

  const { loading, error, data } = useQuery(userQuery);

  if (!isAuth()) {
    history.push('/signin');
    return null;
  }

  if (loading) return <p>Loading ...</p>;

  if (error) {
    disconnectUser();
    history.push('/signin', {
      messages: ['Error fetching login, please log in'],
    });
    return null;
  }
  const user = data.user;

  const disconnect = (e) => {
    disconnectUser();
    history.push('/signin');
  };

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
            {/* PROFILE */}
            <Paper className={classes.paper}>
              <ProfileTabs user={user} />
              <Button
                className={classes.button}
                onClick={(e) => {
                  e.preventDefault();
                  disconnect(e);
                }}
              >
                Logout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
