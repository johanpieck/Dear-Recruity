import React from 'react'
import { Link } from 'react-router-dom';
import * as contentful from 'contentful'
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';

class Question extends React.Component {
  state = {
    posts: []
  }
  client = contentful.createClient({
    space: 'a1u244fv3bsz',
    accessToken: 'dd0796aa887494fac937ea656eb9b330db9d69e1e7889e98b99c040ae6854986'
  })
  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }
  fetchPosts = () => this.client.getEntries()
  setPosts = response => {
    this.setState({
  posts: response.items
})
}
render() {
  return (
    <div>
    <p>This is the Question Pagee</p>
  <Link to="/">Back to frontpage</Link>
  <br/>
  <br/>
  { this.state.posts.map(({fields}, i) =>
  <MultipleChoiceQuestion key={i} {...fields} />
)}

</div>
)
}
}
export default Question