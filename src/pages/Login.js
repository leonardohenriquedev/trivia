import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import {
  fetchToken as fetchTokenACTION,
  playerLogin as playerLoginACTION,
  saveRoute as saveRouteACTION,
} from '../redux/actions';

import '../styles/Login.css';
import trivia from '../styles/images/trivia.png';
import { playSong, pauseSong } from '../helpers/player';

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
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleLogin() {
    const { playerLogin, history, fetchToken } = this.props;
    await fetchToken();
    const { token } = this.props;
    this.setState({ token }, () => {
      playerLogin(this.state);
      history.push('/game');
    });

    playSong();
  }

  isValidForm() {
    const { name, email } = this.state;
    return (
      (name.length > 0 && email.includes('@') && email.includes('.com')) ||
      (name.length > 0 && email.includes('@') && email.includes('.co'))
    );
  }

  redirectTo(route) {
    const { history } = this.props;

    if (route === '/settings') {
      const { saveRoute } = this.props;
      saveRoute(true);
      history.push(route);
    }

    // history.push(route);
  }

  onEnterPress(event) {
    if (event.key === 'Enter') {
      if (this.isValidForm()) {
        this.handleLogin();
      }
    }
  }

  render() {
    const { logged } = this.state;
    return (
      <div className="loginPage">
        {logged ? () => pauseSong() : null}
        <div className="loginBox">
          <img src={trivia} className="triviaLogo" alt="triviaLogo" />
          <form className="loginForm">
            <Input
              id="name"
              label="Name"
              onChange={this.handleChange}
              testId="input-player-name"
              type="text"
              autocomplete="off"
              className="loginInput"
              onKeyPress={this.onEnterPress}
            />
            <Input
              id="email"
              label="Email"
              onChange={this.handleChange}
              testId="input-gravatar-email"
              type="email"
              // autocomplete="off"
              className="loginInput"
              onKeyPress={this.onEnterPress}
            />
            <input
              data-testid="btn-play"
              disabled={!this.isValidForm()}
              onClick={this.handleLogin}
              type="button"
              value="Play"
              className="btnLogin"
              onKeyPress={this.onEnterPress}
            />

            <button
              data-testid="btn-settings"
              type="button"
              className="btnConfig"
              onClick={() => this.redirectTo('/settings')}
            >
              Settings
            </button>
          </form>
        </div>
        {/* <div className="loginSidebar">
          <p>
            Projeto desenvolvido durante o modulo de <b>Front-End</b> enquanto
            estudava na <b>Trybe</b>.
          </p>

          <p><b>Para fazer login preencha um email válido!</b></p>
        </div> */}
        <div className="footer">
          <div className="developedBy">
            <p>
              Projeto desenvolvido durante o modulo de <b>Front-End</b> enquanto
              estudava na <b>Trybe</b>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveRoute: (value) => dispatch(saveRouteACTION(value)),
  fetchToken: () => dispatch(fetchTokenACTION()),
  playerLogin: (payload) => dispatch(playerLoginACTION(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
