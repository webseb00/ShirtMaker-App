import React from 'react';
import { makeStyles } from '@material-ui/core';
import front from '../../../images/front.png';
import back from '../../../images/back.png';

const useStyles = makeStyles({
  main: {
    position: 'relative'
  },
  image: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    maxWidth: '160px'
  }
});

const ShirtGraphicPreview = ({ img, type }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <img src={type === 'front' ? front : back} alt="shirt" />
      <img src={img} className={classes.image} /> 
    </div>
  )
}

export default ShirtGraphicPreview;