// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Steps.css';

type Props = {};

export default class Steps extends Component {

    props: Props;

    render() {
        const steps = [
            {
                'step': 1,
                'question': 'Hoelang is een chinees?'
            },
            {
                'step': 2,
                'question': "Is't eten nog niet gereed?"
            },
            {
                'step': 3,
                'question': 'Wat ben je aan het doen?'
            },
            {
                'step': 4,
                'question': 'Wat eten we vanavond?'
            }
        ];

        return (
            <div className={styles.container} data-tid="container">
                <h2>Steps</h2>
                <Link to="/">Back to frontpage</Link>
                <div className={styles.steps}>
                    {steps.map(el => <div key={el.step}> Step {el.step}: {el.question} </div>)}
                </div>
            </div>
        );
    }
}

