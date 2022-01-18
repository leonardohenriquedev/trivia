import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configuration from './pages/Configuration';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Player from './components/Player';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Player} />
      <Route exact path="/" component={Login} />
      <Route path="/configuration" component={Configuration} />
      <Route path="/game" component={Game} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/ranking" component={Ranking} />
    </BrowserRouter>
  );
}
