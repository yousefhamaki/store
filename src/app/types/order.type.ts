type Order = {
  id: string;
  user_id: string;
  order_id: string;
  product_id: string;
  products: [{ [id: string]: string | number }];
  status: string;
};

export default Order;
