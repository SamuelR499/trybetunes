import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
state = {
  inputSearch: '',
  artist: '',
  ButtonDisable: true,
  isLoading: false,
  albumList: [],
  invalidArtist: '',
}

handleChange = ({ target }) => {
  const { name } = target;
  const valor = target.value;
  this.setState({
    [name]: valor,
  });

  this.setState(({ inputSearch }) => {
    const minLength = 2;
    if (inputSearch.length >= minLength) {
      return this.setState({ ButtonDisable: false });
    }
    return this.setState({ ButtonDisable: true });
  });
}

handleClick = async () => {
  const { inputSearch } = this.state;
  this.setState({ isLoading: true });
  const album = await searchAlbumsAPI(inputSearch);
  this.setState({
    inputSearch: '',
    isLoading: false,
    albumList: [...album],
    invalidArtist: 'Nenhum álbum foi encontrado' });
  console.log(album);
  if (inputSearch.length > 0) {
    return this.setState({ artist: inputSearch });
  }
};

render() {
  const { ButtonDisable,
    inputSearch,
    isLoading,
    albumList,
    artist,
    invalidArtist } = this.state;
  return (
    <div data-testid="page-search">
      <Header />

      <br />
      {isLoading ? <span>Carregando...</span> : (
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            name="inputSearch"
            value={ inputSearch }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ ButtonDisable }
            onClick={ this.handleClick }
          >
            Pesquisar

          </button>
        </div>
      )}
      {albumList.length > 0 ? (
        <h3>
          Resultado de álbuns de:
          {' '}
          { artist }
        </h3>
      )
        : <p>{invalidArtist}</p>}

      {albumList.map(({ artworkUrl100,
        collectionName,
        artistName,
        collectionId }, index) => (
        (
          <div key={ index }>
            <img src={ artworkUrl100 } alt="collectionName" />
            <p>{artistName}</p>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              { collectionName }
            </Link>
          </div>
        )
      ))}
    </div>
  );
}
}
