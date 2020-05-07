import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControl,
} from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { modifyBuildingMutation } from "../queries/BuildingQueries";

const useStyles = makeStyles((theme) => ({
  openButton: {
    width: 180,
    backgroundColor: "#e9e9e9",
  },
  actionButton: {
    width: 100,
    backgroundColor: "#e9e9e9",
  },
  textField: {
    width: 350,
  },
  info: {
    color: "#ff0000",
    fontSize: 16,
    margin: 0,
    padding: 0,
    marginBottom: 20,
  },
}));

/**
 *  id??
 *  Name
 *  Picture
 *  Cost
 *  Material??
 *  CraftingRecipe??
 */
const EditBuilding = ({ building }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(building.Name);
  const [picture, setPicture] = React.useState(building.Picture);
  const [cost, setCost] = React.useState(building.Cost);

  const [ModifyBuilding] = useMutation(modifyBuildingMutation);

  const classes = useStyles();

  const buildMaterialArray = () => {
    const mats = [];
    building.CraftingRecipe.map((matRatio) => {
      return mats.push({
        MaterialID: matRatio.Material.id + "",
        Quantity: matRatio.Quantity,
      });
    });
    return mats;
  };

  const edit = async () => {
    const materials = buildMaterialArray();
    await ModifyBuilding({
      variables: {
        id: building.id + "",
        name: name,
        cost: cost,
        picture: picture,
        materialID: building.MaterialID.id,
        craftingRecipe: materials,
      },
    });
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Button
        className={classes.openButton}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog
        maxWidth="md"
        open={open}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Edit Building</DialogTitle>
        <DialogContent dividers>
          <p className={classes.info}>
            DANGER ZONE: These modification and deletion options are not meant
            for normal users. In this version of the project, they are just
            enabled to expose as much of the backend functionality as possible.
            Please DO NOT just delete everything for fun. Otherwise, we will
            have to restore the database.
          </p>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              Name
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={4}>
              Picture
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Picture"
                value={picture}
                onChange={(e) => {
                  setPicture(e.target.value);
                }}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={4}>
              Cost
            </Grid>
            <Grid item xs={8}>
              <FormControl>
                <TextField
                  label="Cost"
                  type="number"
                  value={cost}
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                  className={classes.textField}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.actionButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              edit();
            }}
          >
            Edit
          </Button>
          <Button
            className={classes.actionButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditBuilding;
