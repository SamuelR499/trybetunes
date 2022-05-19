import React, { Component } from 'react';
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
          {isLoading ? (<span>Carregando...</span>) : (
            <div>
              <h1>Cabeçalho</h1>
              <h2 data-testid="header-user-name">{user}</h2>
            </div>
          )}

        </header>
      );
    }
}
