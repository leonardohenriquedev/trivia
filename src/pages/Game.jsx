import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import Timer from '../components/Timer';
import {
  fetchToken as fecthTokenACTION,
  updateScore as updateScoreACTION,
} from '../redux/actions';
import { getQuestions } from '../services';
import { getGravatarUrl, saveRanking, toggleAnsweredClass } from '../helpers';

import '../styles/Game.css';

const POINTS = {
  hard: 3,
  medium: 2,
  easy: 1,
};

const EXPIRED_TOKEN_CODE = 3;
const FINAL_QUESTION = 4;
const MIN_POINTS = 10;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enableButton: false,
      indexAnswer: 0,
      results: [],
      timeLeft: 30,
      resetTimer: false,
      stopTimer: false,
    };

    this.getNewQuestions = this.getNewQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.setTimeLeft = this.setTimeLeft.bind(this);
  }

  componentDidMount() {
    this.getNewQuestions();
  }

  async getNewQuestions() {
    const { token, fetchToken, options } = this.props;
    const { response_code: responseCode, results } = await getQuestions(
      token,
      options
    );
    if (responseCode === EXPIRED_TOKEN_CODE) {
      await fetchToken();
      const { token: newToken } = this.props;
      const { results: newResults } = await getQuestions(newToken, options);
      this.setState({ results: newResults });
    } else {
      this.setState({ results });
    }
  }

  setTimeLeft(timeLeft) {
    // toggleAnsweredClass();
    this.setState({
      enableButton: true,
      stopTimer: true,
      resetTimer: false,
      timeLeft,
    });
  }

  handleNext() {
    const { history } = this.props;
    const { indexAnswer } = this.state;

    if (indexAnswer + 1 <= FINAL_QUESTION) {
      this.setState({
        enableButton: false,
        indexAnswer: indexAnswer + 1,
        resetTimer: true,
        stopTimer: false,
      });
      toggleAnsweredClass();
    } else {
      history.push('/feedback');
    }
  }

  handleAnswer(id) {
    const { name, gravatarEmail, updateScore, score } = this.props;

    const { results, indexAnswer, timeLeft } = this.state;
    const { difficulty } = results[indexAnswer];
    const picture = getGravatarUrl(gravatarEmail);
    let newScore = score;
    let assertion = 0;

    if (id === 'correct-answer') {
      newScore += MIN_POINTS + timeLeft * POINTS[difficulty];
      assertion += 1;
    }

    saveRanking(name, picture, newScore);
    updateScore({ score: newScore, assertion });

    toggleAnsweredClass();
    this.setState({ enableButton: true, resetTimer: false, stopTimer: true });
  }

  render() {
    const { results, indexAnswer, enableButton, resetTimer, stopTimer } =
      this.state;

    return (
      <div className="gamePage">
        <Header />

        <div className="gameBox">
          <Timer
            setTimeLeft={this.setTimeLeft}
            reset={resetTimer}
            stop={stopTimer}
          />

          <Question
            question={results[indexAnswer]}
            onAnswer={this.handleAnswer}
            disableAlternatives={stopTimer}
          />

          {enableButton ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={this.handleNext}
              className="nextButton"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              data-testid="btn-next"
              onClick={this.handleNext}
              className="nextButton"
              disabled
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  options: state.configuration,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fecthTokenACTION()),
  updateScore: (score) => dispatch(updateScoreACTION(score)),
});

Game.propTypes = {
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
