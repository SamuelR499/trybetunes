import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCArd';

export default class Album extends React.Component {
  state = {
    musicList: [],
    artist: {},
  }

  componentDidMount() {
    this.pegarMusica();
  }

  pegarMusica = async () => {
  // `https://itunes.apple.com/lookup?id=$1490302875&entity=song`
    const { match: { params: { id } } } = this.props;
    const Musics = await getMusics(id);
    this.setState({ musicList: Musics.filter((musica) => musica.trackId),
      artist: Musics[0],
    });
  }

  render() {
    const { musicList, artist } = this.state;
    console.log(musicList);
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artist.artistName}</p>
        <p data-testid="album-name">{artist.collectionName}</p>
        {musicList.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
          />

        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
