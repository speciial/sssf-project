import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    height: 250,
    backgroundImage: 'url(assets/header_final.png)',
    backgroundSize: 'cover',
    backgroundPositionY: -110,
    borderRadius: 5,
  },
  title: {
    fontSize: 55,
    padding: 0,
    margin: 0,
    paddingTop: 20,
    textAlign: 'center',
    color: '#f0f0f0',
  },
}));

const HeaderLogo = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.image}>
        <p className={classes.title}>Trading Game</p>
      </div>
    </React.Fragment>
  );
};

export default HeaderLogo;
