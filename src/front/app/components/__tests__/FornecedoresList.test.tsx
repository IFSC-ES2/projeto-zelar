import { render, screen } from '@testing-library/react';
import FornecedoresList from '../FornecedoresList';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('FornecedoresList', () => {
  it('renderiza a lista de fornecedores', () => {
    render(<FornecedoresList />);

    expect(screen.getByRole('heading', { name: 'Fornecedores' })).toBeInTheDocument();
    expect(screen.getByText('Fornecedor A Ltda')).toBeInTheDocument();
    expect(screen.getByText('Fornecedor B S.A.')).toBeInTheDocument();
    expect(screen.getByText('Fornecedor C')).toBeInTheDocument();
  });

  it('exibe busca, filtro e colunas esperadas', () => {
    render(<FornecedoresList />);

    expect(screen.getByPlaceholderText(/buscar por nome, cnpj, categoria/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filtrar' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Nome' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'CNPJ' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Telefone' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Categoria' })).toBeInTheDocument();
  });

  it('renderiza links de cadastro e edicao dos fornecedores', () => {
    render(<FornecedoresList />);

    expect(screen.getByRole('link', { name: /novo fornecedor/i })).toHaveAttribute('href', '/fornecedores/novo');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/fornecedores/novo',
      '/fornecedores/editar/1',
      '/fornecedores/editar/2',
      '/fornecedores/editar/3',
    ]);
  });

  it('renderiza uma acao de exclusao para cada fornecedor', () => {
    render(<FornecedoresList />);

    expect(screen.getAllByRole('button')).toHaveLength(4);
  });
});
