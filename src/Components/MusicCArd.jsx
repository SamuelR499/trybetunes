import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends Component {
  state = {
    favorit: false,
    isLoading: false,
  }

  componentDidMount() {
    const { favoritMusic } = this.props;
    this.setState({
      favorit: favoritMusic,
    });
  }

  handleclick = async ({ target: { checked } }) => {
    const { music: { trackId } } = this.props;
    this.setState({
      favorit: checked,
      isLoading: true,
    });

    const musica = await getMusics(trackId);
    if (checked) {
      await addSong(musica[0]);
    } else {
      await removeSong(musica[0]);
    }
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { favorit, isLoading } = this.state;
    return (
      isLoading
        ? <p>Carregando...</p>
        : (
          <div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <h1>{trackName}</h1>
            <label htmlFor="checkbox">
              Favorita
              <input
                name="checkbox"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleclick }
                checked={ favorit }
              />
            </label>
          </div>
        )
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.string,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
  favoritMusic: PropTypes.bool.isRequired,
};
