import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField } from '../actions'

function App(props) {
  const [robots, setRobots] = useState([]);
  const searchField = useSelector(state => state.searchField);
  const dispatch = useDispatch();
  const onSearchChange = (event) => dispatch(setSearchField(event.target.value));

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {return response.json();})
      .then(users => { setRobots(users) });
  }, []);

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return !robots.length ?
  <h1>Loading</h1> :
  (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots}/>
          </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default connect(null, null)(App);