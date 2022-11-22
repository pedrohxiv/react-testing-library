import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <FavoritePokemon.js />', () => {
  test('Verifica se é exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<App />);
    const favoriteLinkEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoriteLinkEl);
    const notFavoriteFound = screen.getByText(/no favorite pokémon found/i);
    expect(notFavoriteFound).toBeInTheDocument();
  });
  test('Verifica se são exibidos todos os cards de Pokémon favoritados.', () => {
    renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsEl);
    const pokemonFavoriteCheckboxEl = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(pokemonFavoriteCheckboxEl);
    const favoriteLinkEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoriteLinkEl);
    const pikachuTitleEl = screen.getByText(/pikachu/i);
    expect(pikachuTitleEl).toBeInTheDocument();
  });
});
