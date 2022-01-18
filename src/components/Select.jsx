import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { id, label, options, onChange } = this.props;

    return (
      <div className="settingsInputs">
        <div className="settingsLabel">
          <label htmlFor={id}>{label}</label>
        </div>
        <select
          name={id}
          id={id}
          onChange={onChange}
          className="settingsSelect"
        >
          <option value="">Any</option>
          {options.map(({ id: optionId, name }) => (
            <option value={optionId} key={optionId}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;

export default Select;
