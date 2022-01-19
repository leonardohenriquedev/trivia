import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Question.css';
import { htmlDecode } from '../helpers';

const RANDOM_RANGE = 0.5;

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = { alternatives: [] };

    this.populateAlternatives = this.populateAlternatives.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;

    if (question !== prevProps.question) {
      this.populateAlternatives();
    }
  }

  populateAlternatives() {
    const { question } = this.props;

    const alternatives = question.incorrect_answers.map((answer, index) => [
      answer,
      `wrong-answer-${index}`,
      'wrong',
    ]);

    alternatives.push([question.correct_answer, 'correct-answer', 'correct']);

    alternatives.sort(() => RANDOM_RANGE - Math.random());
    this.setState({ alternatives });
  }

  render() {
    const { question = {}, onAnswer, disableAlternatives } = this.props;
    const { alternatives } = this.state;

    return (
      <div className="questionBox">
        {alternatives.length > 0 ? (
          <div className="questionBox">
            <p data-testid="question-category" className="category">
              {htmlDecode(question.category)}
            </p>
            <p data-testid="question-text" className="question">
              {htmlDecode(question.question)}
            </p>

            {/* Função de ambaralhamento retirada do site https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj */}

            <div data-testid="answer-options" className="alternatives">
              {alternatives.map(([text, testid, buttonClass]) => (
                <button
                  disabled={disableAlternatives}
                  className={`answerButton ${buttonClass}`}
                  data-testid={testid}
                  key={testid}
                  onClick={() => onAnswer(testid)}
                  type="button"
                >
                  {htmlDecode(text)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.objectOf(String),
}.isRequired;

export default Question;
