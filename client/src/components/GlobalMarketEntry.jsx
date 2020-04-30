import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridList, Paper, GridListTile } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  image: {
    width: 120,
    height: 'auto',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
  },
  gridTile: {
    height: '100% !important',
  },
}));

const GlobalMarketEntry = ({ entry }) => {
  const classes = useStyles();

  const materials = entry.Materials;

  const renderItems = () => {
    let items = [];
    for (let i = 0; i < 5; i++) {
      if (!materials[i]) {
        items.push(
          <GridListTile key={i} cols={1} className={classes.gridTile}>
            <Paper className={classes.paper} elevation={3} square>
              <img
                className={classes.image}
                src="/assets/NoContent.png"
                alt="No Content"
              />
              N/A
            </Paper>
          </GridListTile>
        );
      } else {
        const imageLink = '/assets/' + materials[i].Material.Picture + '.png';
        const quantity = materials[i].Quantity;
        items.push(
          <GridListTile key={i} cols={1} className={classes.gridTile}>
            <Paper className={classes.paper} elevation={3} square>
              <img
                className={classes.image}
                src={imageLink}
                alt={materials[i].Material.Picture}
              />
              {quantity}
            </Paper>
          </GridListTile>
        );
      }
    }
    return items;
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          User: {entry.User.Username}
        </Grid>
        <Grid>
          <GridList cols={5} cellHeight={100}>
            {renderItems()}
          </GridList>
        </Grid>
        <Grid item xs={12}>
          Price: {entry.SuggestedPrice}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default GlobalMarketEntry;
