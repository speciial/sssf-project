import React, { useState } from "react";
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
  gridList: {
    width: 500,
    height: 450,
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
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Materials" {...a11yProps(1)} />
          <Tab label="Buildings" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {
          //INFO
        }
        <p>First name : {user.FirstName}</p>
        <p>Last name : {user.LastName}</p>
        <p>Username : {user.Username}</p>
        <p>Email : {user.Email}</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          //MATERIAL
        }
        <div className={classes.grid}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {user.Materials &&
              user.Materials.map((materialUser) => (
                <GridListTile>
                  <p>{materialUser.Material.Name}</p>
                  <p>{materialUser.Quantity}</p>
                </GridListTile>
              ))}
          </GridList>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          //BUILDINGS
        }
        <div className={classes.grid}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {user.Buildings &&
              user.Buildings.map((building) => (
                <GridListTile>
                  <p>{building.Name}</p>
                </GridListTile>
              ))}
          </GridList>
        </div>
      </TabPanel>
    </div>
  );
};

export default UserTabs;
