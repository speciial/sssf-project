import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Collapse,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isAuth } from "../utils/Auth";
import { addBuildingToUser } from "../queries/BuildingQueries";
import { useMutation } from "@apollo/react-hooks";
import { getUsernameAndIdFromStorage } from "../utils/Auth";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const BuildingRow = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [addBuilding, { data }] = useMutation(addBuildingToUser);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const building = props.building;
  const { id } = getUsernameAndIdFromStorage();

  const showCR = () => {
    return building.CraftingRecipe.map((matRatio) => {
      return (
        <p key={matRatio.id}>
          Material: {matRatio.Material.Name}, Quantity:
          {matRatio.Quantity}
        </p>
      );
    });
  };
  const buy = async (e) => {
    e.preventDefault();
    try {
      await addBuilding({
        variables: {
          User: id,
          Building: building.id,
        },
      });
      setDialogText("Successfully added your new building !");
      setDialogTitle("Done");
      setOpenDialog(true);
    } catch (e) {
      console.log(e.message);
      setDialogText(e.message);
      setDialogTitle("Error");
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
      </Dialog>
      <TableRow
        hover
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <TableCell component="th" scope="row">
          {building.Name}
        </TableCell>
        <TableCell align="right">{building.Cost}</TableCell>
        <TableCell align="right">{building.Picture}</TableCell>
        <TableCell align="right">{building.MaterialID.Name}</TableCell>
        {isAuth() && (
          <TableCell align="right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={buy}
            >
              Buy
            </Button>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {showCR()}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BuildingRow;
