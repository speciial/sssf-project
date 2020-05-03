import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';

import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { userQuery } from '../queries/UserQueries';
import { isAuth, disconnectUser } from '../utils/Auth';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    maxWidth: 1000,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  quantity: { maxWidth: 200 },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
  },
}));

const sellMaterialsQuery = gql`
  mutation AddMarketEntry(
    $marketName: String!
    $user: ID!
    $suggestedPrice: Int!
    $materials: [addMatRatioType]!
  ) {
    addMarketEntry(
      MarketName: $marketName
      MarketEntry: {
        User: $user
        SuggestedPrice: $suggestedPrice
        Materials: $materials
      }
    ) {
      User {
        Username
      }
      SuggestedPrice
      Materials {
        Material {
          Name
        }
        Quantity
      }
    }
  }
`;

/**
 * NOTE:
 *  Right now each material will be set individually, and no array is
 *  used, because I have not found a better way of doing it, that
 *  isn't super convoluted.
 */
const CreateMarketEntry = () => {
  const [material0, setMaterial0] = React.useState('');
  const [quantity0, setQuantity0] = React.useState(0);
  const [material1, setMaterial1] = React.useState('');
  const [quantity1, setQuantity1] = React.useState(0);
  const [material2, setMaterial2] = React.useState('');
  const [quantity2, setQuantity2] = React.useState(0);
  const [material3, setMaterial3] = React.useState('');
  const [quantity3, setQuantity3] = React.useState(0);
  const [material4, setMaterial4] = React.useState('');
  const [quantity4, setQuantity4] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  const [AddMarketEntry] = useMutation(sellMaterialsQuery);

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

  const buildMaterialArray = () => {
    const mats = [];
    if (material0 !== '' && quantity0 !== 0) {
      mats.push({
        MaterialID: material0.id + '',
        Quantity: parseInt(quantity0),
      });
    }
    if (material1 !== '' && quantity1 !== 0) {
      mats.push({
        MaterialID: material1.id + '',
        Quantity: parseInt(quantity1),
      });
    }
    if (material2 !== '' && quantity2 !== 0) {
      mats.push({
        MaterialID: material2.id + '',
        Quantity: parseInt(quantity2),
      });
    }
    if (material3 !== '' && quantity3 !== 0) {
      mats.push({
        MaterialID: material3.id + '',
        Quantity: parseInt(quantity3),
      });
    }
    if (material4 !== '' && quantity4 !== 0) {
      mats.push({
        MaterialID: material4.id + '',
        Quantity: parseInt(quantity4),
      });
    }
    return mats;
  };

  const sell = () => {
    const materials = buildMaterialArray();
    AddMarketEntry({
      variables: {
        marketName: 'global',
        user: user.id + '',
        suggestedPrice: parseInt(price),
        materials: materials,
      },
    });
  };

  return (
    <React.Fragment>
      <Grid className={classes.formContainer} container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{user.Username}</Paper>
        </Grid>
        {/* MATERIAL 0 */}
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel id="mat-label-0">Material</InputLabel>
              <Select
                labelId="mat-label-0"
                value={material0}
                onChange={(e) => {
                  setMaterial0(e.target.value);
                }}
              >
                {user.Materials.map((mat, index) => {
                  if (
                    mat.Material.Name !== material1.Name &&
                    mat.Material.Name !== material2.Name &&
                    mat.Material.Name !== material3.Name &&
                    mat.Material.Name !== material4.Name
                  ) {
                    return (
                      <MenuItem key={index} value={mat.Material}>
                        {mat.Material.Name}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                id="quantity-0"
                name="quantity-0"
                label="Quantity"
                type="number"
                value={quantity0}
                onChange={(e) => {
                  setQuantity0(e.target.value);
                }}
                className={classes.quantity}
                defaultValue={0}
                fullWidth
              />
            </FormControl>
          </Paper>
        </Grid>
        {/* MATERIAL 1 */}
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel id="mat-label-1">Material</InputLabel>
              <Select
                labelId="mat-label-1"
                value={material1}
                onChange={(e) => {
                  setMaterial1(e.target.value);
                }}
              >
                {user.Materials.map((mat, index) => {
                  if (
                    mat.Material.Name !== material0.Name &&
                    mat.Material.Name !== material2.Name &&
                    mat.Material.Name !== material3.Name &&
                    mat.Material.Name !== material4.Name
                  ) {
                    return (
                      <MenuItem key={index} value={mat.Material}>
                        {mat.Material.Name}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                id="quantity-1"
                name="quantity-1"
                label="Quantity"
                type="number"
                value={quantity1}
                onChange={(e) => {
                  setQuantity1(e.target.value);
                }}
                className={classes.quantity}
                defaultValue={0}
                fullWidth
              />
            </FormControl>
          </Paper>
        </Grid>
        {/* MATERIAL 2 */}
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel id="mat-label-2">Material</InputLabel>
              <Select
                labelId="mat-label-2"
                value={material2}
                onChange={(e) => {
                  setMaterial2(e.target.value);
                }}
              >
                {user.Materials.map((mat, index) => {
                  if (
                    mat.Material.Name !== material0.Name &&
                    mat.Material.Name !== material1.Name &&
                    mat.Material.Name !== material3.Name &&
                    mat.Material.Name !== material4.Name
                  ) {
                    return (
                      <MenuItem key={index} value={mat.Material}>
                        {mat.Material.Name}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                id="quantity-2"
                name="quantity-2"
                label="Quantity"
                type="number"
                value={quantity2}
                onChange={(e) => {
                  setQuantity2(e.target.value);
                }}
                className={classes.quantity}
                defaultValue={0}
                fullWidth
              />
            </FormControl>
          </Paper>
        </Grid>
        {/* MATERIAL 3 */}
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel id="mat-label-3">Material</InputLabel>
              <Select
                labelId="mat-label-3"
                value={material3}
                onChange={(e) => {
                  setMaterial3(e.target.value);
                }}
              >
                {user.Materials.map((mat, index) => {
                  if (
                    mat.Material.Name !== material0.Name &&
                    mat.Material.Name !== material1.Name &&
                    mat.Material.Name !== material2.Name &&
                    mat.Material.Name !== material4.Name
                  ) {
                    return (
                      <MenuItem key={index} value={mat.Material}>
                        {mat.Material.Name}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                id="quantity-3"
                name="quantity-3"
                label="Quantity"
                type="number"
                value={quantity3}
                onChange={(e) => {
                  setQuantity3(e.target.value);
                }}
                className={classes.quantity}
                defaultValue={0}
                fullWidth
              />
            </FormControl>
          </Paper>
        </Grid>
        {/* MATERIAL 4 */}
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel id="mat-label-4">Material</InputLabel>
              <Select
                labelId="mat-label-4"
                value={material4}
                onChange={(e) => {
                  setMaterial4(e.target.value);
                }}
              >
                {user.Materials.map((mat, index) => {
                  if (
                    mat.Material.Name !== material0.Name &&
                    mat.Material.Name !== material1.Name &&
                    mat.Material.Name !== material2.Name &&
                    mat.Material.Name !== material3.Name
                  ) {
                    return (
                      <MenuItem key={index} value={mat.Material}>
                        {mat.Material.Name}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                id="quantity-4"
                name="quantity-4"
                label="Quantity"
                type="number"
                value={quantity4}
                onChange={(e) => {
                  setQuantity4(e.target.value);
                }}
                className={classes.quantity}
                defaultValue={0}
                fullWidth
              />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                id="price"
                name="price"
                label="Price"
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                defaultValue={0}
                fullWidth
              />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Button onClick={sell}>Sell</Button>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CreateMarketEntry;
