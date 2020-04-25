import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import MaterialRow from './MaterialRow';

const materialQuery = gql`
  {
    materials {
      id
      Name
      Size
      Weight
      Picture
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

const Materials = () => {
  const { loading, error, data } = useQuery(materialQuery);

  const displayMaterial = () => {
    if (error) {
      console.log(error);
    }
    if (loading) {
      return (
        <TableRow key={'loading'}>
          <TableCell component="th" scope="row">
            Loading
          </TableCell>
          <TableCell align="right">/</TableCell>
          <TableCell align="right">/</TableCell>
          <TableCell align="right">/</TableCell>
        </TableRow>
      );
    } else {
      return data.materials.map((material) => {
        return <MaterialRow key={material.id} material={material} />;
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Material Name</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Picture</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{displayMaterial()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default Materials;
