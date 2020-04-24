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

import BuildingRow from './BuildingRow';

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

class Buildings extends Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

  state = {};

  displayBuildings() {
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
      return data.buildings.map((building) => {
        return (
          <BuildingRow
            ref={this.wrapper}
            key={building.id}
            building={building}
          />
        );
      });
    }
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Building Name</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Picture</TableCell>
              <TableCell align="right">Product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.displayBuildings()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default graphql(buildingQuery)(Buildings);
