import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { playerReset } from '../redux/actions';

import '../styles/Feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect(route) {
    const { history } = this.props;

    history.push(`${route}`);
  }

  render() {
    const { score, assertions, dispatch } = this.props;
    const CORRECT_ANSWERS = 3;

    return (
      <div data-testid="feedback-text" className="feedbackPage">
        <Header {...this.props} />
        <div className="feedbackBox">
          <p data-testid="feedback-text" className="feedbackText">
            {assertions < CORRECT_ANSWERS
              ? 'Could be better... 👀'
              : 'Well Done! 🥳'}
          </p>
          <p data-testid="feedback-total-score" className="feedbackInfos">
            Score: {score}
          </p>
          <p data-testid="feedback-total-question" className="feedbackInfos">
            Assertions: {assertions}
          </p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={() => {
              dispatch(playerReset());
              this.redirect('/game');
            }}
            className='playAgainButton'
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={() => this.redirect('/ranking')}
            className='rankingButton'
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
