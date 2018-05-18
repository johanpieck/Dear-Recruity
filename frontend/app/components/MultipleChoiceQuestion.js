import React from 'react'
import styles from './MultipleChoiceQuestion.css';

const MultipleChoiceQuestion = (props) => (
  <div className={styles.container}>
    <h1>{props.question}</h1>

    {props.answer.map(function(name, index){
      return <label key={name}>
        <input type="radio" name={props.question} value={index} /> {name}
        </label>;
    })}
  </div>
);
export default MultipleChoiceQuestion