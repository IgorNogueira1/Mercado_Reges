import { ItemVenda } from "./item-venda";

export interface Venda {
  id: number;
  cliente_id?: number; // opcional
  data: string; // usar formato ISO string
  valor_total: number;
  forma_pagamento: 'Dinheiro' | 'Cartão' | 'Pix' | 'Outro';
  itens: ItemVenda[]; // <-- lista de produtos vendidos
}
