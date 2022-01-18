import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGravatarUrl } from '../helpers';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = { picture: '' };
    this.initComponent = this.initComponent.bind(this);
  }

  componentDidMount() {
    this.initComponent();
  }

  initComponent() {
    const { gravatarEmail } = this.props;
    const picture = getGravatarUrl(gravatarEmail);
    this.setState({ picture });
  }

  render() {
    const { picture } = this.state;
    return (
      <img
        alt="userAvatar"
        data-testid="header-profile-picture"
        src={ picture }
        className='avatarImage'
      />
    );
  }
}

const mapStateToProps = ({ player: { name, gravatarEmail } }) => ({
  name,
  gravatarEmail,
});

Avatar.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Avatar);
