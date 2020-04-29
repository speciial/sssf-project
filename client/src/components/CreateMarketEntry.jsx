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
} from '@material-ui/core';

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

const MaterialInput = () => {
  const classes = useStyles();
  const [material, setMaterial] = React.useState('');

  const handleSelect = (event) => {
    setMaterial(event.target.value);
  };

  return (
    <>
      <Grid item xs={12} sm={8}>
        <Paper className={classes.paper}>
          <FormControl className={classes.formControl}>
            <InputLabel id="mat-label">Material</InputLabel>
            <Select
              labelId="mat-label"
              id="mat"
              value={material}
              onChange={handleSelect}
            >
              <MenuItem value={'Trees'}>Trees</MenuItem>
              <MenuItem value={'Stone'}>Stone</MenuItem>
              <MenuItem value={'Wood'}>Wood</MenuItem>
              <MenuItem value={'Iron'}>Iron</MenuItem>
              <MenuItem value={'Tools'}>Tools</MenuItem>
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
              className={classes.quantity}
              defaultValue={0}
              fullWidth
            />
          </FormControl>
        </Paper>
      </Grid>
    </>
  );
};

const CreateMarketEntry = () => {
  const classes = useStyles();

  const renderMaterialInput = () => {
    let matInput = [];
    for (let i = 0; i < 5; i++) {
      matInput.push(<MaterialInput />);
    }
    return matInput;
  };

  return (
    <React.Fragment>
      <Grid className={classes.formContainer} container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>User Name</Paper>
        </Grid>
        {renderMaterialInput()}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                id="price"
                name="price"
                label="Price"
                type="number"
                defaultValue={0}
                fullWidth
              />
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CreateMarketEntry;
