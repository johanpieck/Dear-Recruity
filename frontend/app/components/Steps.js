// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Steps.css';

const Steps = (props) => (
  <div className={styles.container} data-tid="container">
    <h2>Steps</h2>
    <Link to="/">Back to frontpage</Link>
    <div className={styles.steps}>
      {props.fields.map((object, i) => <div key={object.fields.question}> Step {i}: {object.fields.question} </div>)}
    </div>
  </div>
);
export default Steps