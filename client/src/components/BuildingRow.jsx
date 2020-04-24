import React, { Component } from 'react';
import { TableCell, TableRow, Collapse } from '@material-ui/core';

class BuildingRow extends Component {
  state = {
    open: false,
  };

  render() {
    const building = this.props.building;

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

    return (
      <>
        <TableRow
          hover
          style={{ cursor: 'pointer' }}
          onClick={() => {
            this.setState({ open: !this.state.open });
          }}
        >
          <TableCell component="th" scope="row">
            {building.Name}
          </TableCell>
          <TableCell align="right">{building.Cost}</TableCell>
          <TableCell align="right">{building.Picture}</TableCell>
          <TableCell align="right">{building.MaterialID.Name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              {showCR()}
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
}

export default BuildingRow;
