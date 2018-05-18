import React, {Component} from 'react'
import styles from './TechnicalQuestion.css';
import {editor, resizeEditor} from '../public/editor'

export default class TechnicalQuestion extends Component<Props> {
  props: Props;

  componentDidMount() {
    editor();
    resizeEditor();
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>{this.props.question.fields.question}</h2>
        <div id="editor" className={styles.editor}>{this.props.question.fields.codeEditor}</div>
      </div>
    );
  }

}
