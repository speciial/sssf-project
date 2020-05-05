import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  GridList,
  GridListTile,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import SellMaterial from './SellMaterial';

// TODO: move to separate file
const globalMarketQuery = gql`
  {
    marketByName(Name: "global") {
      id
      Name
      Entries {
        id
        User {
          id
          Username
        }
        SuggestedPrice
        Materials {
          id
          Material {
            id
            Name
            Picture
          }
          Quantity
        }
      }
    }
  }
`;

const useStyle = makeStyles((theme) => ({
  headline: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
    paddingTop: 15,
  },
  price: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
  },
  card: {
    maxWidth: 'auto',
    padding: 0,
    margin: 0,
  },
  media: {
    height: 130,
  },
  content: {
    backgroundColor: '#e9e9e9',
    padding: 0,
    margin: 0,
    maxHeight: 35,
  },
  tile: {
    padding: 0,
    margin: 0,
  },
  divider: {
    width: '100%',
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gmHeadline: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
    fontSize: 40,
  },
  button: {
    minWidth: 180,
    backgroundColor: '#e9e9e9',
  },
}));

const GlobalMarketEntry = ({ entry }) => {
  const classes = useStyle();

  const displayItems = (materials) => {
    let items = [];
    for (let i = 0; i < 5; i++) {
      if (materials[i]) {
        items.push(
          <GridListTile key={i} className={classes.tile} cols={1}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={'/assets/' + materials[i].Material.Picture + '.png'}
                title={materials[i].Material.Picture}
              />
              <CardContent className={classes.content}>
                <Typography variant="h6" component="h5">
                  {materials[i].Material.Name} ({materials[i].Quantity})
                </Typography>
              </CardContent>
            </Card>
          </GridListTile>
        );
      } else {
        items.push(
          <GridListTile key={i} className={classes.tile} cols={1}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/assets/NoContent.png"
                title="Nothing"
              />
              <CardContent className={classes.content}>
                <Typography variant="h6" component="h5">
                  N/A
                </Typography>
              </CardContent>
            </Card>
          </GridListTile>
        );
      }
    }

    return items;
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography
          className={classes.headline}
          gutterBottom
          variant="h5"
          component="h4"
        >
          User: {entry.User.Username}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <GridList cellHeight={'auto'} cols={5}>
          {displayItems(entry.Materials)}
        </GridList>
      </Grid>
      <Grid item xs={8}>
        <Typography
          className={classes.price}
          gutterBottom
          variant="h5"
          component="h4"
        >
          Price: {entry.SuggestedPrice}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Button className={classes.button}>Buy</Button>
      </Grid>
      <hr className={classes.divider} />
    </React.Fragment>
  );
};

const GlobalMarket = ({ user }) => {
  const classes = useStyle();

  const {
    loading: marketLoading,
    error: marketError,
    data: marketData,
  } = useQuery(globalMarketQuery);

  if (marketLoading) return <p>Loading</p>;

  // TODO: handle
  if (marketError) console.log(marketError);

  const entries = marketData.marketByName.Entries;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h2 className={classes.gmHeadline}>Global Market</h2>
        </Grid>
        <Grid className={classes.gridItem} item xs={4}>
          <SellMaterial user={user} />
        </Grid>
        {entries.map((entry) => {
          return <GlobalMarketEntry key={entry.id} entry={entry} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default GlobalMarket;
