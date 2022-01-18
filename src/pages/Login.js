import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import { fetchToken, playerLogin } from '../redux/actions';

import '../styles/Login.css';
import trivia from '../styles/images/trivia.png';
import { playSong } from '../helpers/player';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleLogin() {
    const { dispatch, history } = this.props;
    await dispatch(fetchToken());
    const { token } = this.props;
    this.setState({ token }, () => {
      dispatch(playerLogin(this.state));
      history.push('/game');
    });

    playSong();
  }

  isValidForm() {
    const { name, email } = this.state;
    return name.length > 0 && email.length > 0;
  }

  redirectTo(route) {
    const { history } = this.props;
    history.push(route);
  }

  render() {
    return (
      <div className="loginPage">
        <img src={trivia} className="triviaLogo" />
        <form className="loginForm">
          <Input
            id="name"
            label="Name"
            onChange={this.handleChange}
            testId="input-player-name"
            type="text"
            autocomplete="off"
            className="loginInput"
          />
          <Input
            id="email"
            label="Email"
            onChange={this.handleChange}
            testId="input-gravatar-email"
            type="email"
            autocomplete="off"
            className="loginInput"
          />
          <input
            data-testid="btn-play"
            disabled={!this.isValidForm()}
            onClick={this.handleLogin}
            type="button"
            value="Play"
            className="btnLogin"
          />

          <button
            data-testid="btn-settings"
            type="button"
            className="btnConfig"
            onClick={() => this.redirectTo('/configuration')}
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect()(Login);
