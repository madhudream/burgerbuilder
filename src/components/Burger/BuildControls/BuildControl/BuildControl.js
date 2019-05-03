
import React from 'react';
import classes from './BuildControl.module.css';
const buildControl = (props) => {
   return (<div className={classes.BuildControl}> 
        <div   className={classes.Label} >{props.label}</div>
        <button disabled={props.disabled} onClick={props.remove}  className={classes.Less} >Less</button>
        <button onClick={props.add} className={classes.More} >More</button>
    </div>
)}
    

 
export default buildControl;