/*import React, { useState } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  simpleTabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imgMaterial: {
    height: "50px",
    width: "50px",
  },
}));

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserTabs = ({ user }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.simpleTabs}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Materials" {...a11yProps(1)} />
          <Tab label="Buildings" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {
          //MATERIAL
        }
        <div className={classes.grid}>
          {user.Materials && (
            <GridList cellHeight={160} cols={1}>
              {user.Materials.map((materialUser) => (
                <GridListTile cols={1} key={materialUser.id}>
                  <p>{materialUser.Material.Name}</p>
                  <p>{materialUser.Quantity}</p>
                  <img
                    className={classes.imgMaterial}
                    src={`../assets/${materialUser.Material.Picture}.png`}
                    alt={materialUser.Material.Picture}
                  ></img>
                </GridListTile>
              ))}
            </GridList>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          //BUILDINGS
        }
        <div className={classes.grid}>
          {user.Buildings && (
            <GridList cellHeight={160} cols={1}>
              {user.Buildings.map((building) => (
                <GridListTile cols={1} key={building.id}>
                  <p>{building.Name}</p>
                </GridListTile>
              ))}
            </GridList>
          )}
        </div>
      </TabPanel>
    </div>
  );
};

export default UserTabs;*/

import React from "react";

import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { useLazyQuery } from "@apollo/react-hooks";
import { public_userQuery } from "../queries/UserQueries";

import {
  Typography,
  Box,
  AppBar,
  Tabs,
  Tab,
  Grid,
  Button,
} from "@material-ui/core";

import MaterialTable from "../components/MaterialTable";
import BuildingTable from "../components/BuildingTable";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    textAlign: "left",
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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const ProfileTabs = ({ username }) => {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = React.useState(0);

  const [getUser, { data, error, loading }] = useLazyQuery(public_userQuery, {
    variables: {
      username: username,
    },
  });

  console.log(username);

  let user;
  React.useEffect(() => {
    console.log("use effect");
    getUser();
  }, [username, getUser]);

  if (loading) return <p>Loading ...</p>;

  if (error) {
    console.log(error);
    return (
      <div>
        User not found{" "}
        <Button
          className={classes.button}
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
        >
          Home
        </Button>
      </div>
    );
  }
  if (data) {
    user = data.public_user;
  } else {
    console.log(error);
    return (
      <div>
        User not found{" "}
        <Button
          className={classes.button}
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
        >
          Home
        </Button>
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar elevation={0} className={classes.appBar} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Materials" {...a11yProps(1)} />
          <Tab label="Buildings" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid className={classes.grid} container spacing={2}>
          <Grid item xs={8}>
            <h2 className={classes.headline}>Profile Info</h2>
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
          <Grid item xs={3}>
            Username:
          </Grid>
          <Grid item xs={9}>
            {user.Username}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MaterialTable materials={user.Materials} noCrafting={true} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BuildingTable buildings={user.Buildings} noCrafting={true} />
          </Grid>
        </Grid>
      </TabPanel>
    </React.Fragment>
  );
};

export default ProfileTabs;
