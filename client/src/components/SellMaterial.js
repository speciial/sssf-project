import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { sellMaterialsQuery } from "../queries/MaterialQueries";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 180,
    backgroundColor: "#e9e9e9",
  },
  content: {
    overflow: "hidden !important",
  },
  materialSelect: {
    minWidth: 350,
  },
}));

const SellMaterial = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const [material0, setMaterial0] = React.useState("");
  const [quantity0, setQuantity0] = React.useState(0);
  const [material1, setMaterial1] = React.useState("");
  const [quantity1, setQuantity1] = React.useState(0);
  const [material2, setMaterial2] = React.useState("");
  const [quantity2, setQuantity2] = React.useState(0);
  const [material3, setMaterial3] = React.useState("");
  const [quantity3, setQuantity3] = React.useState(0);
  const [material4, setMaterial4] = React.useState("");
  const [quantity4, setQuantity4] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  const [AddMarketEntry] = useMutation(sellMaterialsQuery);

  const classes = useStyles();

  const buildMaterialArray = () => {
    const mats = [];
    if (material0 !== "" && quantity0 !== 0) {
      mats.push({
        MaterialID: material0.id + "",
        Quantity: parseInt(quantity0),
      });
    }
    if (material1 !== "" && quantity1 !== 0) {
      mats.push({
        MaterialID: material1.id + "",
        Quantity: parseInt(quantity1),
      });
    }
    if (material2 !== "" && quantity2 !== 0) {
      mats.push({
        MaterialID: material2.id + "",
        Quantity: parseInt(quantity2),
      });
    }
    if (material3 !== "" && quantity3 !== 0) {
      mats.push({
        MaterialID: material3.id + "",
        Quantity: parseInt(quantity3),
      });
    }
    if (material4 !== "" && quantity4 !== 0) {
      mats.push({
        MaterialID: material4.id + "",
        Quantity: parseInt(quantity4),
      });
    }
    return mats;
  };

  const sell = () => {
    const materials = buildMaterialArray();
    AddMarketEntry({
      variables: {
        marketName: "global",
        user: user.id + "",
        suggestedPrice: parseInt(price),
        materials: materials,
      },
    });
  };

  return (
    <React.Fragment>
      <Button
        className={classes.button}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Sell
      </Button>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sell Material</DialogTitle>
        <DialogContent className={classes.content} dividers>
          <Grid className={classes.formContainer} container spacing={3}>
            <Grid item xs={12}>
              Username
            </Grid>
            {/* MATERIAL 0 */}
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.materialSelect}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl>
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
                  fullWidth
                />
              </FormControl>
            </Grid>
            {/* MATERIAL 1 */}
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.materialSelect}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl>
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
                  fullWidth
                />
              </FormControl>
            </Grid>
            {/* MATERIAL 2 */}
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.materialSelect}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl>
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
                  fullWidth
                />
              </FormControl>
            </Grid>
            {/* MATERIAL 3 */}
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.materialSelect}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl>
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
                  fullWidth
                />
              </FormControl>
            </Grid>
            {/* MATERIAL 4 */}
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.materialSelect}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl>
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
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl>
                <TextField
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              sell();
            }}
          >
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SellMaterial;
