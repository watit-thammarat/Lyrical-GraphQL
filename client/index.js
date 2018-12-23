import './style/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HashRouter, Route } from 'react-router-dom';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App>
          <Route exact path="/" component={SongList} />
          <Route exact path="/songs/new" component={SongCreate} />
          <Route exact path="/songs/:id" component={SongDetail} />
        </App>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
