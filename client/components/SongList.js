import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

import query from '../queries/fetchSongs';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        <Link to={`songs/${id}`}>{title}</Link>
        <i
          className="material-icons"
          onClick={this.handleDelete.bind(this, id)}
        >
          delete
        </i>
      </li>
    ));
  }

  handleDelete(id) {
    this.props
      .mutate({ variables: { id } })
      .then(() => {
        this.props.data.refetch();
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { loading } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
