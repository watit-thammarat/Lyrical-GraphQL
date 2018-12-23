import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  handleInput(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title } = this.state;
    this.props
      .mutate({ variables: { title }, refetchQueries: [{ query }] })
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleInput.bind(this)}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
