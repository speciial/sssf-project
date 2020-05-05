import React from "react";

import { Typography } from "@material-ui/core";
import MaterialLink from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MaterialLink color="inherit" href="#">
        SSSF Project
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </Typography>
  );
};

export default Copyright;
