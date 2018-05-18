import React, {Component} from "react";
import {Link} from 'react-router-dom';
import styles from './Home.css';
import pagerStyles from './Pager.css';

export default class Pager extends Component<Props> {

  render() {
    let currentQuestion = parseInt(this.props.id);
    let maxQuestions = (parseInt(this.props.max) - 1); // Minus 1, array starts at 0.

    let previous = [];
    let next = [];

    if (currentQuestion === maxQuestions || currentQuestion > 0) {
      previous = <Link key="previous" className={styles.linktotests} to={"/steps/" + (currentQuestion - 1)}>Previous question</Link>;
    }

    if (currentQuestion === 0 || (currentQuestion < maxQuestions && currentQuestion > 0)) {
      next = <Link key="next" className={styles.linktotests} to={"/steps/" + (currentQuestion + 1)}>Next question</Link>;
    }

    return [
      <div key="pager-container" className={[styles.container, pagerStyles.container].join(' ')}>{previous} {next}</div>
    ];
  }

}