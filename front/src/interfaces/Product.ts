export interface Product {
  id?: number;
  name: string;
  category_id: number;
  price: string | number;
  sold_quantity?: number;
  stock_qty: number;
  code: string;
}
