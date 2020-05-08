import React from "react";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Card,
  CardMedia,
  Collapse,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { isAuth } from "../utils/Auth";
import { addBuildingToUser } from "../queries/BuildingQueries";
import { useMutation } from "@apollo/react-hooks";
import { getUsernameAndIdFromStorage } from "../utils/Auth";

import EditBuilding from "./EditBuilding";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 80,
    padding: 0,
    margin: 0,
  },
  media: {
    height: 80,
  },
  cell: {
    width: 90,
    padding: 5,
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headline: {
    textAlign: "left",
    padding: 0,
    margin: 0,
    paddingLeft: 30,
    fontSize: 40,
  },
  button: {
    width: 120,
    backgroundColor: "#e9e9e9",
  },
}));

const BuildingRowNoCrafting = ({ building }) => {
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const classes = useStyles();

  // TODO: implemenet selling buildings!
  const sell = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogText("Successfully sold your building !");
    setDialogTitle("Done");
    setOpenDialog(true);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
      </Dialog>
      <TableRow>
        <TableCell className={classes.cell}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={"/assets/" + building.Picture + ".png"}
              title={building.Picture}
            />
          </Card>
        </TableCell>
        <TableCell>{building.Name}</TableCell>
        <TableCell>{building.Cost}</TableCell>
        <TableCell>{building.MaterialID.Name}</TableCell>
        <TableCell>
          <Button disabled={true} className={classes.button} onClick={sell}>
            Sell
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const BuildingRow = ({ building }) => {
  const [open, setOpen] = React.useState(false);
  const [addBuilding] = useMutation(addBuildingToUser);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const { id } = getUsernameAndIdFromStorage();

  const classes = useStyles();

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

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
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
        <TableCell className={classes.cell}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={"/assets/" + building.Picture + ".png"}
              title={building.Picture}
            />
          </Card>
        </TableCell>
        <TableCell>{building.Name}</TableCell>
        <TableCell>{building.Cost}</TableCell>
        <TableCell>{building.MaterialID.Name}</TableCell>
        {isAuth() && (
          <TableCell>
            <Button className={classes.button} onClick={buy}>
              Buy
            </Button>
          </TableCell>
        )}
        {isAuth() && (
          <TableCell>
            <EditBuilding building={building} />
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={11}>
                <h4>Construction Materials:</h4>
              </Grid>
              {building.CraftingRecipe.map((mat, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={1} />
                    <Grid item xs={4}>
                      <p>Material: {mat.Material.Name}</p>
                    </Grid>
                    <Grid item xs={4}>
                      <p>Quantity: {mat.Quantity}</p>
                    </Grid>
                    <Grid item xs={3} />
                  </React.Fragment>
                );
              })}
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const BuildingTable = ({ buildings, noCrafting }) => {
  const classes = useStyles();
  const history = useHistory();

  const pickDisplay = () => {
    if (noCrafting) {
      return (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((building, index) => {
              return (
                <BuildingRowNoCrafting
                  key={index}
                  building={building}
                />
              );
            })}
          </TableBody>
        </Table>
      );
    } else {
      return (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((building, index) => {
              return (
                <BuildingRow
                  key={index}
                  building={building}
                />
              );
            })}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={8}>
          <h2 className={classes.headline}>Buildings</h2>
        </Grid>
        <Grid className={classes.gridItem} item xs={4}>
          <Button
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              history.push("/");
            }}
          >
            Home
          </Button>
        </Grid>
      </Grid>
      <TableContainer>{pickDisplay()}</TableContainer>
    </React.Fragment>
  );
};

export default BuildingTable;
