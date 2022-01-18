import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from './Avatar';
import triviaLogo from '../styles/images/trivia.png';

import '../styles/Header.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
    this.redirectTo = this.redirectTo.bind(this)
  }

  redirectTo() {
    this.setState({
      redirect: true,
    });
  }
  render() {
    const { name, score } = this.props;
    const { redirect } = this.state;

    return (
      <div className="header">
        {redirect ? (
          <Redirect to="/" />
        ) : (
          <div className="header">
            <img src={triviaLogo} className="headerLogo" />
            <div className="headerWrapper">
              <Avatar />
              <div className="name headerButton">
                <p data-testid="header-player-name" className="playerName">
                  {name}
                </p>
              </div>
              <div className="score headerButton">
                <p data-testid="header-score" className="playerScore">
                  Score: {score}
                </p>
              </div>
            </div>
            <div className="logoutBox">
              <button className="logout" onClick={this.redirectTo}>
                Logout
              </button>
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
