import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { songId } = this.props;
    const { content } = this.state;
    this.props
      .mutate({
        variables: { content, songId }
      })
      .then(() => {
        this.setState({ content: '' });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          type="text"
          value={this.state.content}
          onChange={this.handleContentChange.bind(this)}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyric($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
