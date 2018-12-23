import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetatil extends Component {
  render() {
    const { song, loading } = this.props.data;
    let content = null;
    if (loading) {
      content = <div>Loading...</div>;
    } else if (song) {
      content = (
        <div>
          <Link to="/">Back</Link>
          <h1>{song.title}</h1>
          <LyricList lyrics={song.lyrics} />
          <LyricCreate songId={song.id} />
        </div>
      );
    }
    return content;
  }
}

const options = {
  options: props => {
    const id = props.match.params.id;
    return { variables: { id } };
  }
};

export default graphql(query, options)(SongDetatil);
