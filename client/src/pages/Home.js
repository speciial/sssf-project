import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { userQuery } from '../queries/UserQueries';
import { isAuth, disconnectUser } from '../utils/Auth';

import HeaderLogo from '../components/HeaderLogo';
import GlobalMarket from '../components/GlobalMarket';
import SideProfile from '../components/SideProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    height: '67vh',
  },
  headerPaper: {
    padding: 0,
    margin: 0,
  },
  globalMarket: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    height: '67vh',
    overflow: 'auto',
  },
  sideContainer: {
    textAlign: 'left',
    fontSize: 20,
  },
  textField: {
    margin: 0,
    padding: 0,
    marginRight: 10,
  },
  button: {
    width: 80,
    backgroundColor: '#e9e9e9',
  },
}));

const Home = () => {
  const [username, setUsername] = useState('');

  const classes = useStyles();
  const history = useHistory();
  const { loading, error, data } = useQuery(userQuery);

  if (!isAuth()) {
    //if not auth redirect to loginpage
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
          <Grid item xs={8}>
            {/* GLOBAL MARKET */}
            <Paper className={classes.globalMarket}>
              <GlobalMarket user={user} />
            </Paper>
          </Grid>
          <Grid className={classes.sideContainer} item xs={4}>
            {/* USER */}
            <Paper className={classes.paper}>
              <SideProfile user={user} />
              <br />
              <hr />
              <p>
                <Link to="/materials">Material Listing</Link>
              </p>
              <p>
                <Link to="/buildings">Building Listing</Link>
              </p>
              <hr />
              <p>Search Users</p>
              <TextField
                className={classes.textField}
                margin="none"
                placeholder="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Button
                className={classes.button}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/user/${username}`);
                }}
              >
                Search
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Home;
