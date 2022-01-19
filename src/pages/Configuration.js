import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../components/Select';
import {
  saveOptions as saveOptionsACTION,
  saveRoute as saveRouteACTION,
} from '../redux/actions';
import { getCategories } from '../services';

import '../styles/Settings.css';

const DIFFICULTIES = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

const TYPES = [
  { id: 'boolean', name: 'Boolean' },
  { id: 'multiple', name: 'Multiple' },
];

class Configuration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      options: {
        category: '',
        difficulty: '',
        type: '',
      },
    };

    this.getCategories = this.getCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveOptions = this.saveOptions.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange({ target: { name, value } }) {
    this.setState((state) => ({
      options: Object.assign(state.options, { [name]: value }),
    }));
  }

  saveOptions() {
    const { history, fromLogin, saveRoute, saveOptions } = this.props;

    const { options } = this.state;
    saveOptions(options);

    if (fromLogin) {
      console.log('caiu uuuu');
      history.push('/');
      saveRoute(false);
    } else history.push('/game');
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="settingsPage">
        <div className="settingsBox">
          <h1 data-testid="settings-title">Settings</h1>
          <Select
            id="category"
            label="Category: "
            options={categories}
            onChange={this.handleChange}
          />
          <Select
            id="difficulty"
            label="Difficulty: "
            options={DIFFICULTIES}
            onChange={this.handleChange}
          />
          <Select
            id="type"
            label="Type: "
            options={TYPES}
            onChange={this.handleChange}
          />
          <button
            type="button"
            onClick={this.saveOptions}
            className="saveSettings"
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

Configuration.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapStateToProps = (state) => ({
  fromLogin: state.configuration.fromLogin,
});

const mapDispatchToProps = (dispatch) => ({
  saveRoute: (value) => dispatch(saveRouteACTION(value)),
  saveOptions: (payload) => dispatch(saveOptionsACTION(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
