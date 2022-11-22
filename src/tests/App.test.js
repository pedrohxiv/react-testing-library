import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <App.js />', () => {
  test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLinkEl).toBeInTheDocument();
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLinkEl).toBeInTheDocument();
    const favoriteLinkEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(favoriteLinkEl).toBeInTheDocument();
  });
  test('Verifica se a aplicação é redirecionada para a página inicial, na URL "/" ao clicar no link "Home" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLinkEl);
    expect(history.location.pathname).toBe('/');
  });
  test('Verifica se a aplicação é redirecionada para a página de "About", na URL "/about", ao clicar no link "About" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLinkEl);
    expect(history.location.pathname).toBe('/about');
  });
  test('Verifica se a aplicação é redirecionada para a página de "Pokémon Favoritados", na URL "/favorites", ao clicar no link "Favorite Pokémon" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLinkEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoriteLinkEl);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Verifica se a aplicação é redirecionada para a página "Not Found" ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/digimon');
    });
    const notFoundEl = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundEl).toBeInTheDocument();
  });
});
