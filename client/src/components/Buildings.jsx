import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

import BuildingRow from "./BuildingRow";
import { isAuth } from "../utils/Auth";

const buildingQuery = gql`
  {
    buildings {
      id
      Name
      Cost
      Picture
      MaterialID {
        id
        Name
      }
      CraftingRecipe {
        id
        Material {
          Name
        }
        Quantity
      }
    }
  }
`;

const Buildings = () => {
  const { loading, error, data } = useQuery(buildingQuery);

  const displayBuildings = () => {
    if (error) {
      console.log(error);
    }
    if (loading) {
      return (
        <TableRow key={"loading"}>
          <TableCell component="th" scope="row">
            Loading
          </TableCell>
          <TableCell align="right">/</TableCell>
          <TableCell align="right">/</TableCell>
          <TableCell align="right">/</TableCell>
          {isAuth() && <TableCell align="right">/</TableCell>}
        </TableRow>
      );
    } else {
      if (data) {
        return data.buildings.map((building) => {
          return <BuildingRow key={building.id} building={building} />;
        });
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Building Name</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Picture</TableCell>
            <TableCell align="right">Product</TableCell>
            {isAuth() && <TableCell align="right">Buy</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>{displayBuildings()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default Buildings;
