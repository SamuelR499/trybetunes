import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
    state = {
      user: {},
      isLoading: true,
    }

    async componentDidMount() {
      const itUser = await getUser();
      this.setState({
        user: itUser.name,
        isLoading: false });
    }

    render() {
      const { user, isLoading } = this.state;
      return (
        <header data-testid="header-component">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <br />
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <br />
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <br />
          {isLoading ? (<span>Carregando...</span>) : (
            <div>
              <h2 data-testid="header-user-name">{user}</h2>
            </div>
          )}

        </header>
      );
    }
}
