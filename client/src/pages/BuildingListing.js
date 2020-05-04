import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Container, CssBaseline, Grid, Paper } from '@material-ui/core';

import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import HeaderLogo from '../components/HeaderLogo';
import BuildingTable from '../components/BuildingTable';

const buildingQuery = gql`
  {
    buildings {
      id
      Name
      Cost
      Picture
      MaterialID {
        id
        Name
      }
      CraftingRecipe {
        id
        Material {
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

const BuildingListing = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(buildingQuery);

  if (loading) return <p>Loading ...</p>;

  // TODO: handle
  if (error) console.log(error);

  const buildings = data.buildings;

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
            {/* BUILDING LISTING */}
            <Paper className={classes.paper}>
              <BuildingTable buildings={buildings} noCrafting={false} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default BuildingListing;
