import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <About.js />', () => {
  test('Verifica se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLinkEl);
    expect(history.location.pathname).toBe('/about');
  });
  test('Verifica se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLinkEl);
    const aboutTitleEl = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutTitleEl).toBeInTheDocument();
  });
  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLinkEl);
    const aboutFirstParagraphEl = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const aboutSecondParagraph = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    expect(aboutFirstParagraphEl).toBeInTheDocument();
    expect(aboutSecondParagraph).toBeInTheDocument();
  });
  test('Verifica se a página contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
    renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLinkEl);
    const aboutImageEl = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(aboutImageEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
