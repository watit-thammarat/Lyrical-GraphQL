import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
  handleClick(id, likes, content) {
    this.props
      .mutate({
        variables: { id },
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id,
            __typename: 'LyricType',
            likes: likes + 1,
            content
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        <div className="vote-box">
          <i
            className="material-icons"
            onClick={this.handleClick.bind(this, id, likes, content)}
          >
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }
  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation($id: ID) {
    likeLyric(id: $id) {
      id
      likes
      content
    }
  }
`;

export default graphql(mutation)(LyricList);
