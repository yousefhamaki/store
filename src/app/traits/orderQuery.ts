const insertOrder = (
  products: [{ [key: string]: string | number }],
  userId: string,
  status: string
): string => {
  let result = `WITH orders as (
    INSERT INTO orders(user_id, status) 
    VALUES ('${userId}', '${status}') returning *)
    INSERT INTO product_orders(order_id, product_id, quantity) 
    VALUES  `;

  const returning = " returning *;";

  for (let x = 0; x < products.length; x++) {
    let plus = "";
    if (x === products.length - 1) {
      plus = `((select orders.id from orders), '${products[x].id}','${products[x].quantity}')`;
    } else {
      plus = `((select orders.id from orders),'${products[x].id}','${products[x].quantity}'), `;
    }
    result = result + plus;
  }
  result = result + returning;
  return result;
};

export default insertOrder;
