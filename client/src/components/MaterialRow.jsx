import React, { Component } from 'react';
import { TableCell, TableRow, Collapse } from '@material-ui/core';

class MaterialRow extends Component {
  state = {
    open: false,
  };

  render() {
    const material = this.props.material;

    const showCR = () => {
      if (material.CraftingRecipe.length === 0) {
        return <p>Base Material</p>;
      } else {
        return material.CraftingRecipe.map((matRatio) => {
          return (
            <p key={matRatio.id}>
              Material: {matRatio.Material.Name}, Quantity:
              {matRatio.Quantity}
            </p>
          );
        });
      }
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
            {material.Name}
          </TableCell>
          <TableCell align="right">{material.Size}</TableCell>
          <TableCell align="right">{material.Weight}</TableCell>
          <TableCell align="right">{material.Picture}</TableCell>
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

export default MaterialRow;
