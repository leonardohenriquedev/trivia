import React, { Component } from 'react';
import kahoot from '../styles/songs/kahoot.mp3';

export default class Player extends Component {
  render() {
    return (
      <div>
        <audio loop id='kahoot'>
          <source src={kahoot}></source>
        </audio>
      </div>
    );
  }
}
