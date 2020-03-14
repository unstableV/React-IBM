import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ItemsList from './components/ItemsList';
import NavBar from './components/NavBar';
import ItemView from './components/ItemView';
import ItemForm from './components/ItemForm';
import DeleteItem from './components/DeleteItem';

function App() {
  return (
      <Router>
        <NavBar />

        <Route exact path="/" component={Dashboard} />
        <Route exact path="/list" component={ItemsList} />
        <Route exact path="/add" component={ItemForm} />
        <Route exact path="/details/:id" component={ItemView} />
        <Route exact path="/edit/:id" component={ItemForm} />
        <Route exact path="/delete/:id" component={DeleteItem} />

      </Router>
  );
}

export default App;
