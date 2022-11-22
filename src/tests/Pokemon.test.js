import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <Pokemon.js />', () => {
  test('Verifica se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pikachuNameEl = screen.getByTestId('pokemon-name');
    expect(pikachuNameEl).toHaveTextContent(/pikachu/i);
    const pikachuTypeEl = screen.getByTestId('pokemon-type');
    expect(pikachuTypeEl).toHaveTextContent(/electric/i);
    const pikachuWeightEl = screen.getByTestId('pokemon-weight');
    expect(pikachuWeightEl).toHaveTextContent(/Average weight: 6.0 kg/i);
    const pikachuImageEl = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuImageEl).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(pikachuImageEl).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonDetailsEl).toHaveAttribute('href', '/pokemon/25');
  });
  test('Verifica se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsEl);
    const pikachuDetailsEl = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(pikachuDetailsEl).toBeInTheDocument();
  });
  test('Verifica também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsEl);
    expect(history.location.pathname).toBe('/pokemon/25');
  });
  test('Verifica se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsEl);
    const pikachuFavoriteEl = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(pikachuFavoriteEl);
    const favoriteImageEl = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteImageEl).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImageEl).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
