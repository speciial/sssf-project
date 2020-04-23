import React, { Component } from 'react';
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
import { graphql } from 'react-apollo';

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

class Materials extends Component {
  state = {};

  displayMaterial() {
    const data = this.props.data;

    if (data.loading) {
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
  }

  render() {
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
          <TableBody>{this.displayMaterial()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default graphql(materialQuery)(Materials);
