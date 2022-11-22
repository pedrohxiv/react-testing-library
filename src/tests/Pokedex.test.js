import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <NotFound.js />', () => {
  test('Verifica se a página contém um heading "h2" com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    const pokedexTitleEl = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(pokedexTitleEl).toBeInTheDocument();
  });
  test('Verifica se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemonButtonEl = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemonButtonEl);
    const charmanderTitleEl = screen.getByText(/charmander/i);
    expect(charmanderTitleEl).toBeInTheDocument();
  });
  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonEl = screen.getAllByTestId('pokemon-name');
    expect(pokemonEl).toHaveLength(1);
  });
  test('Verifica se a Pokédex tem os botões de filtro', () => {
    const arrPokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    renderWithRouter(<App />);
    const pokemonTypesButtonsEl = screen.getAllByTestId('pokemon-type-button');
    pokemonTypesButtonsEl.forEach((pokemonTypeButton, index) => {
      expect(pokemonTypeButton).toHaveTextContent(arrPokemonTypes[index]);
    });
  });
  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButtonEl = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButtonEl).toBeInTheDocument();
    userEvent.click(allButtonEl);
    const pikachuTitleEl = screen.getByText(/pikachu/i);
    expect(pikachuTitleEl).toBeInTheDocument();
  });
});
