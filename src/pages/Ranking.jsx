import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerReset } from '../redux/actions';
import { getFromLocalStorage } from '../services/localStorage';
import Header from '../components/Header';

import '../styles/Ranking.css';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
    };

    this.getRanking = this.getRanking.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = getFromLocalStorage('ranking').sort(
      (a, b) => b.score - a.score
    );
    this.setState({ ranking });
  }

  redirect(route) {
    const { dispatch, history } = this.props;
    dispatch(playerReset());
    history.push(`${route}`);
  }

  render() {
    const { ranking } = this.state;

    return (
      <div className="rankingPage">
        <Header />
        <div className="rankingBox">
          <h1 data-testid="ranking-title">Ranking</h1>
          {ranking.map(({ name, score, picture }, index) => (
            <div key={index} className="rankingLine">
              <img src={picture} alt={name} />
              <div className='rankingInfo'>
                <p data-testid={`player-name-${index}`}>{name}</p>

                <p data-testid={`player-score-${index}`}>Score: {score}</p>
              </div>
            </div>
          ))}
          <button
            data-testid="btn-go-home"
            onClick={() => this.redirect('/')}
            type="button"
            className='goHomeButton'
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect()(Ranking);
