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
import { modifyMaterialMutation } from "../queries/MaterialQueries";

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
 *  Size
 *  Weight
 *  CarftingRecipe??
 *
 */
const EditMaterial = ({ material }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(material.Name);
  const [picture, setPicture] = React.useState(material.Picture);
  const [size, setSize] = React.useState(material.Size);
  const [weight, setWeight] = React.useState(material.Weight);

  const [ModifyMaterial] = useMutation(modifyMaterialMutation);

  const classes = useStyles();

  const buildMaterialArray = () => {
    const mats = [];
    material.CraftingRecipe.map((matRatio) => {
      return mats.push({
        MaterialID: matRatio.Material.id + "",
        Quantity: matRatio.Quantity,
      });
    });
    return mats;
  };

  const edit = async () => {
    const materials = buildMaterialArray();
    await ModifyMaterial({
      variables: {
        id: material.id + "",
        name: name,
        picture: picture,
        size: parseInt(size),
        weight: parseInt(weight),
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
        <DialogTitle id="form-dialog-title">Edit {material.Name}</DialogTitle>
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
              Size
            </Grid>
            <Grid item xs={8}>
              <FormControl>
                <TextField
                  label="Size"
                  type="number"
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  className={classes.textField}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              Weight
            </Grid>
            <Grid item xs={8}>
              <FormControl>
                <TextField
                  label="Weight"
                  type="number"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
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
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditMaterial;
