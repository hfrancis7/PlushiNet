import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Followers from './pages/Followers';

import PlushiDetails from './pages/PlushiDetails';
import UserProfile from './pages/UserProfile';

import PostDisplay from './components/PostDisplay';
import ViewPost from './pages/ViewPost';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//Routes we still need:
//createPost
//viewPost
//Profile
//FriendList
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/followers"
              element={<Followers />}
            />
            <Route
              path="/createPost"
              element={<CreatePost />}
            />
            <Route 
              path="/userprofile" 
              element={<UserProfile/>} 
            />
            <Route 
              path="/plushidetails" 
              element={<PlushiDetails/>} 
            />
            <Route
            path="/postdisplay" 
              element={<PostDisplay/>} 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
