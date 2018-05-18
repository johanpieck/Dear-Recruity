/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import StepsPage from './containers/StepsPage';
import QuestionPage from './containers/QuestionPage';


export default () => (
  <App>
    <Switch>
      <Route path="/question" component={QuestionPage} />
      <Route path="/steps/:id" component={StepsPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
