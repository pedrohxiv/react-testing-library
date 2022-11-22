import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <NotFound.js />', () => {
  test('Verifica se a página contém um heading "h2" com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/digimon');
    });
    const notFoundTitleEl = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFoundTitleEl).toBeInTheDocument();
  });
  test('Verifica se a página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/digimon');
    });
    const notFoundImageEl = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(notFoundImageEl).toBeInTheDocument();
    expect(notFoundImageEl).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
