import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { id, label, onChange, testId, type, autocomplete, className } =
      this.props;

    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          data-testid={testId}
          id={id}
          name={id}
          onChange={onChange}
          type={type}
          autoComplete={autocomplete}
          className={className}
        />
      </div>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Input;
