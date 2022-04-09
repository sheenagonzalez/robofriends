import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { requestRobots, setSearchField } from '../actions'

const App = ({ store }) => {
  const [searchResults, setSearchResults] = useState([]);
  const searchField = useSelector(state => state.searchRobots.searchField);
  const robots = useSelector(state => state.requestRobots.robots);
  const isPending = useSelector(state => requestRobots.isPending);
  const error = useSelector(state => requestRobots.error);
  const dispatch = useDispatch();
  const onSearchChange = (event) => dispatch(setSearchField(event.target.value));

  useEffect(() => {
    dispatch(requestRobots());
  }, [dispatch]);

  useEffect(() => {
    let filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    setSearchResults(filteredRobots);
  }, [searchField, robots]);

  return isPending ?
  <h1>Loading</h1> :
  (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={searchResults}/>
          </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default connect(null, null)(App);