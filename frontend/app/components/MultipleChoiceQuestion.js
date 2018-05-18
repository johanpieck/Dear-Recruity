import React from 'react'
import styles from './MultipleChoiceQuestion.css';
  
  const MultipleChoice = ({ props, selected, onChange }) => {
    return (
        <div className={styles.container}>
        <h1>{props.question}</h1>
        {props.answer.map((name, index) => (
          <label key={name}>
            <input type="radio"
              name={props.question}
              value={index}
              key={index}
              checked={sessionStorage.getItem(props.question) == index}
              onChange={onChange}
               />
            {name}
          </label>
        ))}
      </div>
    );
  };
  
  export default class MultipleChoiceQuestion extends React.Component {
    constructor(props) {
      super(props);
      this.state = { selectedOption: '' }
    }
  
    handleClick() {
      console.log('submitted option', this.state.selectedOption);
    }
  
    handleOnChange(e) {
      console.log('selected option', e.target.value);
      this.setState({
        selectedOption: e.target.value
      });
      sessionStorage.setItem(this.props.question, e.target.value);
      console.log(JSON.stringify(sessionStorage));
      this.sendDataToSymfony();
    }
  
    sendDataToSymfony() {
      fetch('http://10.161.128.60/api/test', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionStorage)
    })
    }

    render() {
      return (
        <div className={styles.container}>
          <MultipleChoice
            props = {this.props}
            selected={this.state.selectedOption}
            onChange={(e) => this.handleOnChange(e)}
            />
          <button onClick={() => this.handleClick()}>Submit</button>
        </div>
      );
    }
  }