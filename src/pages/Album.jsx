import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCArd';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  state = {
    musicList: [],
    artist: {},
    FavoritsSongs: [],
  }

  componentDidMount() {
    this.pegarMusica();
  }

  pegarMusica = async () => {
    const { match: { params: { id } } } = this.props;
    const Musics = await getMusics(id);
    const favorits = await getFavoriteSongs();
    this.setState({ musicList: Musics.filter((musica) => musica.trackId),
      artist: Musics[0],
      FavoritsSongs: favorits,
    });
  }

  render() {
    const { musicList, artist, FavoritsSongs } = this.state;
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
            favoritMusic={ FavoritsSongs.some((song) => music.trackId === song.trackId) }
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
// 11.test:
