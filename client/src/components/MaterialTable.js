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
} from "@material-ui/core";

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

const MaterialRowNoCrafting = ({ material }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className={classes.cell}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={"/assets/" + material.Material.Picture + ".png"}
              title={material.Material.Picture}
            />
          </Card>
        </TableCell>
        <TableCell>{material.Material.Name}</TableCell>
        <TableCell>{material.Material.Weight}</TableCell>
        <TableCell>{material.Material.Size}</TableCell>
        <TableCell>{material.Quantity}</TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const MaterialRow = ({ material }) => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  return (
    <React.Fragment>
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
              image={"/assets/" + material.Picture + ".png"}
              title={material.Picture}
            />
          </Card>
        </TableCell>
        <TableCell>{material.Name}</TableCell>
        <TableCell>{material.Weight}</TableCell>
        <TableCell>{material.Size}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={11}>
                <h4>Crafting Recipe:</h4>
              </Grid>
              {material.CraftingRecipe.map((mat, index) => {
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

const MaterialTable = ({ materials, noCrafting }) => {
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
              <TableCell>Weight</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material, index) => {
              return <MaterialRowNoCrafting key={index} material={material} />;
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
              <TableCell>Weight</TableCell>
              <TableCell>Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material, index) => {
              return <MaterialRow key={index} material={material} />;
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
          <h2 className={classes.headline}>Materials</h2>
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

export default MaterialTable;
