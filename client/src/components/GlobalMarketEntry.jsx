import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, GridList, Paper, GridListTile } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    backgroundColor: "#fafafa",
  },
  gridList: {
    padding: 0,
    margin: 0,
  },
  itemImage: {
    minHeight: 100,
  },
}));

const GlobalMarketEntry = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          User Name
        </Grid>
        <Grid>
          <GridList className={classes.gridList} cols={5} cellHeight={100}>
            <GridListTile cols={1} className={classes.gridList}>
              <Paper className={classes.paper} elevation={3} square>
                item
              </Paper>
            </GridListTile>
            <GridListTile>
              <Paper className={classes.paper} elevation={3} square>
                item
              </Paper>
            </GridListTile>
            <GridListTile>
              <Paper className={classes.paper} elevation={3} square>
                item
              </Paper>
            </GridListTile>
            <GridListTile>
              <Paper className={classes.paper} elevation={3} square>
                item
              </Paper>
            </GridListTile>
            <GridListTile>
              <Paper className={classes.paper} elevation={3} square>
                item
              </Paper>
            </GridListTile>
          </GridList>
        </Grid>
        <Grid item xs={12}>
          Price
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default GlobalMarketEntry;
