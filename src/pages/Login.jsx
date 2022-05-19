import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  state = {
    inputName: '',
    ButtonDisable: true,
    loading: false,
  }

  onIputChange = ({ target }) => {
    const { name } = target;
    const valor = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: valor,
    });

    this.setState(({ inputName }) => {
      const minLength = 3;
      if (inputName.length >= minLength) {
        return this.setState({ ButtonDisable: false });
      }
      return this.setState({ ButtonDisable: true });
    });
  }

onButtonClick = async () => {
  const { inputName } = this.state;
  const { history } = this.props;
  this.setState({ loading: true });
  await createUser({ name: inputName });
  history.push('search');
}

render() {
  const { ButtonDisable, inputName, loading } = this.state;
  return (
    <div data-testid="page-login">
      {loading ? <p>Carregando...</p> : (
        <form action="">
          <label htmlFor="login-name-input">
            Name
            <input
              type="text"
              id="login-name-input"
              data-testid="login-name-input"
              name="inputName"
              value={ inputName }
              onChange={ this.onIputChange }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ ButtonDisable }
              onClick={ this.onButtonClick }
            >
              Entrar
            </button>
          </label>
        </form>
      ) }

    </div>
  );
}
}
Login.propTypes = {
  history: PropTypes.string.isRequired,
};
