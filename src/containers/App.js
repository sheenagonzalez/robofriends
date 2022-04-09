import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { requestRobots, setSearchField } from '../actions'

function App() {
  const robots = useSelector(state => state.requestRobots.robots);
  const isPending = useSelector(state => requestRobots.isPending);
  const error = useSelector(state => requestRobots.error);
  const searchField = useSelector(state => state.searchRobots.searchField);
  const dispatch = useDispatch();
  const onSearchChange = (event) => dispatch(setSearchField(event.target.value));
  const onRequestRobots = () => dispatch(requestRobots());

  useEffect(() => {
    onRequestRobots();
  }, []);

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return isPending ?
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