// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
        <svg className={styles.logo} viewBox="0 0 100 120">
          <path className={styles.svgcolor} d="M40.2,77c0.4-0.6,0.8-1,1.2-1.2l-1.1,0.5C40.3,76.5,40.3,76.8,40.2,77z"/>
          <path className={styles.svgcolor} d="M63.4,94.3c-2.1-3.7-2.6-7.1-2.7-9.2c-0.2,0.7-0.5,1.4-0.8,2.1c0.1,0.9,1,7.8-2.7,9.8c-0.7,0.4-1.1,2.6-1.2,4l0,0.1
            c0,0-1.5,4.3-5.6,4.4c-4.1-0.1-5.6-4.3-5.6-4.4l0-0.1c-0.1-1.3-0.6-3.6-1.2-4c-3.6-2.1-2.8-9-2.7-9.9c-0.3-0.7-0.6-1.4-0.8-2.1
            c-0.1,2.1-0.5,5.5-2.7,9.2c-1.9,3.4-1,9.1,0.1,11l0.2,0.3c1.4,2.3,5.1,8.6,12.5,8.6l0.2,0l0.2,0c7.5,0,11.1-6.3,12.5-8.6l0.2-0.3
            C64.4,103.4,65.3,97.7,63.4,94.3z"/>
          <path className={styles.svgcolor} d="M39.4,78.8l-0.1-0.1c0.1-0.2,1.7-3.8,3-4.3l0,0.1C41.1,75,39.4,78.8,39.4,78.8z"/>
          <path className={styles.svgcolor} d="M61.3,78.6c0,0-1.7-3.8-2.9-4.2l0-0.1c1.3,0.4,2.9,4.1,3,4.3L61.3,78.6z"/>
          <path className={styles.svgcolor} d="M96.9,33.9c-0.1-1.4-0.6-0.4-0.6-0.4s-1.4,5.1-1.8,5.8c-0.4,0.7-1.4,3-3,4.2c-1.5,1.2-2.5,1.9-2.9,1.9
            c-0.4,0.1-0.6,0-0.2-1.3c0.4-1.4,1.4-6.4,1.4-6.9c0.1-0.5,1-4.6,0.9-6.1c-0.1-0.9,0.6-5.7,0.7-6.1c0.1-0.4,1.1-6.7,1-7.9
            c-0.1-1.3-1.3-4.1-1.5-4.9c-0.3-0.8-0.5-3.1-1-4.1c-0.5-1-0.3-1.9-0.8-1.8c-0.5,0.1,0,1.8,0,2.1c0,0.2,0.2,2.6,0.2,3.3
            c0,0.7,0.5,3.3,0.8,3.9c0.2,0.6,0.4,1.7,0.3,2.7c-0.2,1-0.3,2.7-0.7,3.2c-0.4,0.5-1.4,2.2-2.7,0.8c-0.4-0.4-1.6-3.1-2.1-3.9
            c-0.5-0.8-1.1-2.4-1.8-3.3c-0.7-0.9-1.3-1.6-2.9-3.1c-1.6-1.5-1.7-2-2.2-2.6c-0.5-0.7-1.7-2.3-2.3-3c-0.4-0.4-1-0.5-0.1,0.9
            c0.9,1.4,2.3,4.3,3,5.2c0.7,0.9,1.9,3.2,2.3,3.9c0.4,0.7,1.5,3,2,3.9c0.5,0.9,1.4,2.9,2,4.3c0.7,1.4,1.8,4.2,2,6.7
            c0.2,2.5-0.1,4.3-0.6,6.2c-0.5,1.9-0.4,3.8-0.7,5.2c0,0-0.2,3.3-2.3,5.4c-0.8,0.9-1.7,1.6-2.6,2.3c0-2-0.1-3.7-0.1-4
            c0,0-0.6-0.2-0.9,1.6c-0.1,1.1-0.2,2.3-0.3,3.4c-0.6,0.4-1,0.7-1.2,0.8c-0.6,0.4-4.6,2.3-6.1,3.4c-1.5,1.1-9.6,6.4-10,6.8
            c-0.4,0.5-1,0.6-1,0.6s0-3.7,0-4.1c0.1-0.4,0.1-3.9,0.1-4.3c0.1-0.4,0.2-3.3,0.3-3.7c0.1-0.5,0.8-4.3,0.1-4.4
            c-0.7-0.1-0.6,1.6-1.2,2.8c-0.6,1.2-0.8,4-1,4.8c-0.2,0.8-0.6,6.1-0.5,6.4c0,0.3-0.1,2.9-0.5,3.4c-0.4,0.5-0.7,1.2-0.7,1.8
            c0.1,0.6-1.5,1.4-1.6,1.5c-0.9-0.3-3.3-0.4-3.6,0.1c-0.2,0.2-0.2,0.7-1.7,0.7c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0
            c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-1.5,0.1-1.6-0.4-1.7-0.7c-0.2-0.4-2.7-0.4-3.7-0.1c-0.4-0.2-1.6-0.8-1.6-1.3
            c0.1-0.6-0.2-1.2-0.7-1.8c-0.4-0.5-0.6-3.1-0.5-3.4c0-0.3-0.3-5.5-0.5-6.4c-0.2-0.8-0.4-3.6-1-4.8c-0.6-1.2-0.5-2.9-1.2-2.8
            c-0.7,0.1,0,4,0.1,4.4c0.1,0.5,0.2,3.3,0.3,3.7c0.1,0.4,0.1,3.9,0.1,4.3c0.1,0.4,0,4.1,0,4.1s-0.6-0.2-1-0.6
            c-0.4-0.5-8.5-5.7-10-6.8c-1.5-1.1-5.4-3-6.1-3.4c-0.2-0.1-0.7-0.4-1.2-0.8c-0.1-1.1-0.2-2.3-0.3-3.4c-0.3-1.9-0.9-1.7-0.9-1.7
            c0,0.3-0.1,2-0.1,4c-0.8-0.6-1.7-1.4-2.6-2.3c-2-2.1-2.3-5.4-2.3-5.4c-0.4-1.3-0.3-3.3-0.7-5.1c-0.5-1.9-0.7-3.7-0.6-6.2
            c0.2-2.5,1.3-5.3,2-6.7c0.7-1.4,1.5-3.4,2-4.3c0.5-0.9,1.6-3.2,2-3.9c0.4-0.7,1.6-3,2.3-3.9c0.7-0.9,2.1-3.8,3-5.2
            c0.9-1.4,0.2-1.3-0.1-0.9c-0.6,0.6-1.7,2.3-2.3,3c-0.5,0.7-0.7,1.2-2.2,2.6c-1.6,1.5-2.2,2.2-2.9,3.1c-0.7,0.9-1.3,2.5-1.8,3.3
            c-0.5,0.8-1.7,3.5-2.1,3.9c-1.3,1.4-2.3-0.3-2.7-0.8c-0.4-0.5-0.5-2.2-0.7-3.2c-0.2-1,0.1-2.1,0.3-2.7c0.2-0.6,0.7-3.1,0.8-3.9
            c0-0.7,0.2-3.1,0.2-3.3c0-0.2,0.5-2,0-2.1c-0.5-0.1-0.3,0.9-0.8,1.8c-0.5,1-0.7,3.3-1,4.1c-0.2,0.8-1.4,3.6-1.5,4.9
            c-0.1,1.2,0.9,7.6,1,7.9c0.1,0.4,0.8,5.2,0.7,6.1c-0.2,1.5,0.8,5.6,0.9,6.1c0.1,0.5,1,5.5,1.5,6.9c0.4,1.3,0.3,1.3-0.2,1.3
            c-0.4-0.1-1.4-0.7-2.9-1.9c-1.5-1.2-2.6-3.5-3-4.2c-0.4-0.7-1.8-5.8-1.8-5.8S4.1,32.7,4,34c0,1.4,0.5,5.3,1.4,7.7
            c0.9,2.3,3,4.3,3.3,4.6c0.3,0.3,3.7,2.1,5.1,4c1,1.4,4.3,3.7,6.5,5c0,0.2,0,0.3,0.1,0.5c0.5,3.3,1.5,5.2,5.1,7.3
            c3.7,2.2,6,0.7,10.3,2c3.8,1.1,3.4,3.9,3.3,4.6c-0.5-0.6-8.6-4.6-13.9-4.6c-1.9,0-1.2,2.2,0.1,5.2c0.9,1.9,3.7,5.2,5.9,6.6
            c1.9,1.2,6,2.2,7.6,2c0,0,0.3-0.3,0.6-0.9c-0.1,0.5-0.2,1-0.2,1.6c0,1,0.2,2.1,0.5,3.2c0.2,0.6,0.5,1.7,0.8,2.6
            c0.3,0.8,0.6,1.5,0.6,1.6c0,0-1.1,7.5,2.4,9.6c0.8,0.5,1.2,2.8,1.3,3.8l0,0.4H45c0,0,1.4,4.3,5.3,4.3c0,0,0.1,0,0.1,0
            c0,0,0.1,0,0.1,0c3.3,0,4.8-3,5.2-4h0v0c0.1-0.2,0.1-0.3,0.1-0.3s0.3-3.6,1.3-4.1c3.5-2.1,2.4-9.6,2.4-9.6c0-0.1,0.1-0.2,0.1-0.3
            c0,0,0.2-0.5,0.5-1.2c0.3-0.8,0.6-1.9,0.8-2.6c0.3-1.1,0.5-2.2,0.5-3.2c0-0.6-0.1-1.1-0.2-1.6C61.7,78.6,62,79,62,79
            c1.6,0.2,5.8-0.8,7.6-2c2.1-1.3,5-4.6,5.9-6.6c1.4-3,2-5.2,0.1-5.2c-5.2,0-13,3.8-13.8,4.5c-0.1-0.4-0.8-3.6,3.2-4.8
            c4.3-1.3,6.6,0.1,10.3-2c3.6-2.1,4.6-4,5.1-7.3c0-0.2,0-0.3,0.1-0.5c2.2-1.3,5.5-3.6,6.5-5c1.4-1.9,4.8-3.7,5.1-4
            c0.3-0.3,2.5-2.2,3.3-4.6C96.4,39.1,97,35.2,96.9,33.9z M24.2,58.6c-0.4-0.4-0.8-1.1-1.1-1.9c1.4,0.7,3.8,1.9,3.8,1.9
            s4.5,2.6,4.3,2.6C27.8,61.4,25.2,59.5,24.2,58.6z M30,74.8c-3.3-3-5-6.5-4.7-8.2c0.1-0.4,4.3-0.2,7.1,2.8c2.1,2.2,5.7,7.7,5.7,7.7
            C36.6,77.2,32.5,77.1,30,74.8z M68.5,69.5c2.8-3,7-3.3,7.1-2.8c0.4,1.7-1.3,5.2-4.7,8.2c-2.6,2.3-6.7,2.5-8.1,2.3
            C62.8,77.1,66.4,71.7,68.5,69.5z M69.7,61c-0.2,0,4.3-2.6,4.3-2.6s2.3-1.3,3.8-1.9c-0.3,0.8-0.7,1.5-1.1,1.9
            C75.7,59.3,73.1,61.2,69.7,61z"/>
          </svg>
          <h2>deer recruity</h2>
          <p className={styles.intro}>Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
          <Link className={styles.linktotests} to="/steps/0">Show me the questions!</Link>
        </div>
      </div>
    );
  }
}
