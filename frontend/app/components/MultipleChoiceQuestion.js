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
              onChange={onChange} />
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
      this.setState({ selectedOption: e.target.value});
    }
  
    render() {
      return (
        <div className="poll">
          <MultipleChoice
            props = {this.props}
            onChange={(e) => this.handleOnChange(e)}
            selected={this.state.selectedOption} />
          <button onClick={() => this.handleClick()}>Submit</button>
        </div>
      );
    }
  }