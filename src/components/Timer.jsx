import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DELAY = 1000;
const QUESTION_SECONDS = 30;

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: QUESTION_SECONDS,
      interval: null,
    };

    this.decrementCount = this.decrementCount.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    const { reset, stop } = this.props;
    if (reset && reset !== prevProps.reset) {
      this.startTimer();
    }
    if (stop && stop !== prevProps.stop) {
      const { count, interval } = this.state;
      const { setTimeLeft } = this.props;
      setTimeLeft(count);
      clearInterval(interval);
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  startTimer() {
    const { interval } = this.state;
    clearInterval(interval);
    const newInterval = setInterval(this.decrementCount, DELAY);
    this.setState({ interval: newInterval, count: QUESTION_SECONDS });
  }

  decrementCount() {
    const { count, interval } = this.state;
    const { setTimeLeft } = this.props;

    if (count - 1 <= 0) {
      clearInterval(interval);
      setTimeLeft(count);
    }

    this.setState({ count: count - 1 });
  }

  render() {
    const { count } = this.state;
    return <div className="cronometer">Timer: {count}s</div>;
  }
}

Timer.propTypes = {
  setTimeLeft: PropTypes.func,
  reset: PropTypes.bool,
  stop: PropTypes.bool,
}.isRequired;

export default Timer;
