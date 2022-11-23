import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <PokemonDetails.js />', () => {
  test('Verifica se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsEl);
    const pikachuDetailsEl = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(pikachuDetailsEl).toBeInTheDocument();
    expect(pokemonDetailsEl).not.toBeInTheDocument();
    const summaryTitleEl = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryTitleEl).toBeInTheDocument();
    const pikachuResumeEl = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(pikachuResumeEl).toBeInTheDocument();
  });
  test('Verifica se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsEl);
    const locationTitleEl = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(locationTitleEl).toBeInTheDocument();
    const locationImageEl = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(locationImageEl[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locationImageEl[0]).toHaveAttribute('alt', 'Pikachu location');
    const kantoViridianForest = screen.getByText(/kanto viridian forest/i);
    expect(kantoViridianForest).toBeInTheDocument();
    expect(locationImageEl[1]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(locationImageEl[1]).toHaveAttribute('alt', 'Pikachu location');
    const kantoPowerPlant = screen.getByText(/kanto power plant/i);
    expect(kantoPowerPlant).toBeInTheDocument();
  });
  test('Verifica se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetailsEl);
    const favoriteCheckboxEl = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteCheckboxEl).toBeInTheDocument();
    userEvent.click(favoriteCheckboxEl);
    const favoriteImageEl = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteImageEl).toBeInTheDocument();
    userEvent.click(favoriteCheckboxEl);
    expect(favoriteImageEl).not.toBeInTheDocument();
    const favoriteCheckboxLabelEl = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteCheckboxLabelEl).toBeInTheDocument();
  });
});
