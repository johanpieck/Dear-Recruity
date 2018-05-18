import React, {Component} from 'react'
import styles from './TechnicalQuestion.css';
import {editor, resizeEditor} from '../public/editor'
import {Link} from 'react-router-dom';

export default class TechnicalQuestion extends Component<Props> {
  props: Props;

  componentDidMount() {
    editor();
    resizeEditor();
  }

  emitChange() {
    console.log('changed');
    console.log(this.editor.innerHTML);
    sessionStorage.setItem(this.props.question, this.editor.innerHTML);

  }

  render() {
    return (
      <div className={styles.container}>
        <h2>{this.props.question.fields.question}</h2>
        <div className={styles["theme-switcher"]}>
          <a href="#" className="theme-light">Switch to light theme</a>&nbsp;
          <a href="#" className="theme-dark">Switch to dark theme</a>
        </div>
        <div id="editor" onInput= {this.emitChange} className={styles.editor}>{this.props.question.fields.codeEditor}</div>
      </div>
    );
  }

}
