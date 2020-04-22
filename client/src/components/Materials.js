import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const materialQuery = gql`
  {
    materials {
      id
      Name
      Size
      Weight
      Picture
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
        // console.log(material);
        return (
          <TableRow key={material.id}>
            <TableCell component="th" scope="row">
              {material.Name}
            </TableCell>
            <TableCell align="right">{material.Size}</TableCell>
            <TableCell align="right">{material.Weight}</TableCell>
            <TableCell align="right">{material.Picture}</TableCell>
          </TableRow>
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
