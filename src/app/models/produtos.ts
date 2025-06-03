export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria_id: number;
  fornecedor_id: number;
  codigo_barras: string;
}
