import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Container, CssBaseline, Grid, Paper } from '@material-ui/core';

import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import HeaderLogo from '../components/HeaderLogo';
import MaterialTable from '../components/MaterialTable';

const materialQuery = gql`
  {
    materials {
      id
      Name
      Size
      Weight
      Picture
      CraftingRecipe {
        id
        Material {
          id
          Name
        }
        Quantity
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
  headerPaper: {
    padding: 0,
    margin: 0,
  },
}));

const MaterialListing = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(materialQuery);

  if (loading) return <p>Loading ...</p>;

  // TODO: handle
  if (error) console.log(error);

  const materials = data.materials;

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
            {/* MATERIAL LISTING */}
            <Paper className={classes.paper}>
              <MaterialTable materials={materials} noCrafting={false} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default MaterialListing;
