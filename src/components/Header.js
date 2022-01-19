import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from './Avatar';
import triviaLogo from '../styles/images/trivia.png';
import soundOn from '../styles/images/soundOn.png';
import soundOff from '../styles/images/soundOff.png';

import '../styles/Header.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { pauseSong, playSong } from '../helpers/player';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHome: false,
      redirectToSettings: false,
      music: true,
    };

    this.redirectTo = this.redirectTo.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  redirectTo(route) {
    if (route === '/') {
      this.setState({
        redirectToHome: true,
      });

      pauseSong();
    }

    if (route === '/settings') {
      this.setState({
        redirectToSettings: true,
      });
    }
  }

  toggleSound(action) {
    if (action === 'mute') {
      this.setState({
        music: false,
      });
      pauseSong();
    }

    if (action === 'unmute') {
      this.setState({
        music: true,
      });
      playSong();
    }
  }

  formatName(name) {
    const str = name;
    const formated = str[0].toUpperCase() + str.substr(1) + ' 😃';
    return formated;
  }

  render() {
    const { name, score } = this.props;
    const { redirectToHome, redirectToSettings, music } = this.state;

    return (
      <div className="header">
        {redirectToHome ? (
          <Redirect to="/" />
        ) : (
          <div className="header">
            <img src={triviaLogo} className="headerLogo" alt="triviaLogo" />
            <div className="headerWrapper">
              <Avatar />
              <div className="headerButton playerName">
                <p data-testid="header-player-name">{this.formatName(name)}</p>
              </div>
            </div>
            <div className="logoutBox">
              {music ? (
                <img
                  src={soundOn}
                  className="soundOn"
                  onClick={() => this.toggleSound('mute')}
                  alt="soundOn"
                ></img>
              ) : (
                <img
                  src={soundOff}
                  className="soundOff"
                  onClick={() => this.toggleSound('unmute')}
                  alt="soundOff"
                ></img>
              )}
              <div className="score headerButton">
                <p data-testid="header-score" className="playerScore">
                  Score: {score}
                </p>
              </div>
              <div className="score headerButton">
                <p
                  data-testid="header-score"
                  onClick={() => this.redirectTo('/settings')}
                >
                  Settings
                </p>
              </div>
              <div>
                <p className="logout" onClick={() => this.redirectTo('/')}>
                  Logout
                </p>
              </div>
            </div>
          </div>
        )}

        {redirectToSettings ? (
          <Redirect
            to={{
              pathname: '/settings',
              state: { settings: true },
            }}
          />
        ) : (
          <div className="header">
            <img src={triviaLogo} className="headerLogo" alt="triviaLogo" />
            <div className="headerWrapper">
              <Avatar />
              <div className="headerButton playerName">
                <p data-testid="header-player-name">{this.formatName(name)}</p>
              </div>
            </div>
            <div className="logoutBox">
              {music ? (
                <img
                  src={soundOn}
                  className="soundOn"
                  onClick={() => this.toggleSound('mute')}
                  alt="soundOn"
                ></img>
              ) : (
                <img
                  src={soundOff}
                  className="soundOff"
                  onClick={() => this.toggleSound('unmute')}
                  alt="soundOff"
                ></img>
              )}
              <div className="score headerButton">
                <p data-testid="header-score" className="playerScore">
                  Score: {score}
                </p>
              </div>
              <div className="settings headerButton">
                <p
                  data-testid="header-score"
                  onClick={() => this.redirectTo('/settings')}
                >
                  Settings
                </p>
              </div>
              <div>
                <p className="logout" onClick={() => this.redirectTo('/')}>
                  Logout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
