import React from 'react';

import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'left',
    fontSize: 20,
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  button: {
    width: 120,
    backgroundColor: '#e9e9e9',
  },
}));

const SideProfile = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={8}>
          Player Profile
        </Grid>
        <Grid item xs={4}>
          <Button
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              history.push('/profile');
            }}
          >
            Details
          </Button>
        </Grid>
        <Grid item xs={5}>
          Username:
        </Grid>
        <Grid item xs={7}>
          {user.Username}
        </Grid>
        <Grid item xs={5}>
          Money:
        </Grid>
        <Grid item xs={7}>
          {user.Money}
        </Grid>
        <Grid item xs={5}>
          Materials:
        </Grid>
        <Grid item xs={7}>
          <ul className={classes.list}>
            {user.Materials.slice(0, 5).map((material, index) => {
              return (
                <li key={index}>
                  {material.Material.Name} ({material.Quantity})
                </li>
              );
            })}
          </ul>
        </Grid>
        <Grid item xs={5}>
          Buildings:
        </Grid>
        <Grid item xs={7}>
          <ul className={classes.list}>
            {user.Buildings.slice(0, 5).map((building, index) => {
              return (
                <li key={index}>
                  {building.Name}({building.MaterialID.Name})
                </li>
              );
            })}
          </ul>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SideProfile;
