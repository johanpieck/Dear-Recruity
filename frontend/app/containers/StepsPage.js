// @flow
import React, {Component} from 'react';
import * as contentful from "contentful";
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import Steps from '../components/Steps';
import { configureStore, history } from '../store/configureStore';
import Pager from '../components/Pager'

type Props = {};

export default class StepsPage extends Component<Props> {

  props: Props;

  state = {
    posts: []
  };

  client = contentful.createClient({
    space: 'a1u244fv3bsz',
    accessToken: 'dd0796aa887494fac937ea656eb9b330db9d69e1e7889e98b99c040ae6854986'
  });

  componentDidMount() {
    this.fetchPosts().then(this.setPosts).then(this.render());
  }

  fetchPosts = () => this.client.getEntries();
  setPosts = response => {
    this.setState({
      posts: response.items
    });
  };

  render() {
    let question = [];
    let pager = [];
    
    if (typeof this.state.posts[this.props.match.params.id] !== "undefined") {
      question = <MultipleChoiceQuestion key="1" {...this.state.posts[this.props.match.params.id].fields} />;
      pager = <Pager key="2" id={this.props.match.params.id} max={this.state.posts.length} />
    }

    return ([
        <Steps key="0" fields={this.state.posts} />,
        question,
        pager,
      ]
    );
  }
}