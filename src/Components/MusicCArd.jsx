import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { music: { trackName, previewUrl } } = this.props;
    return (

      <div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <h1>{trackName}</h1>
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};
