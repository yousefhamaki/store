## API Endpoints

#### Products

- Index {link: http://localhost:5000/api/product, method: [GET], required: [token]}
- Show {link: http://localhost:5000/api/product/:id, method: [GET], required: [token][:id is product id]}
- Create {link: http://localhost:5000/api/product/create, method: [POST], required: [token][name, price]}
- Update {link: http://localhost:5000/api/product/change, method: [PUT], required: [token][id: productid, name, price]}
- Delete {link: http://localhost:5000/api/product, method: [DELETE], required: [token][id: productid]}

#### Users

- Index {link: http://localhost:5000/api/user, method: [GET], required: [token]}
- Show {link: http://localhost:5000/api/user/:id, method: [GET], required: [:id equal user id][token]}
- Create {link: http://localhost:5000/api/user, method: [POST], required: [username,firstname,
  lastname, email, password]}
- login {link: http://localhost:5000/api/user/login, method: [POST], required: [email, password]}
- Update {link: http://localhost:5000/api/user/change, method: [PUT], required: [token][username,firstname, lastname, email]}
- Update {link: http://localhost:5000/api/user/change/:id, method: [PUT], required: [token][:id equal user id][oldpass, newpass]}
- Delete {link: http://localhost:5000/api/user/delete/:id, method: [DELETE], required: [token][:id equal user id]}

#### Orders

- Index (User Orders) {link: http://localhost:5000/api/order/me, method: [GET], required: [token]}
- Show {link: http://localhost:5000/api/order/details/:id, method: [GET], required: [token][:id is order_id]} **Notice** It will only return the order details to the initiator of the order otherwise it will return an empty object
- Create {link: http://localhost:5000/api/order/, method: [POST], required: [token][product_id, quantity]}
- Update {link: http://localhost:5000/api/order/update, method: [PUT], required: [token][id: order_id,product_id, quantity, status]}**Notice** It will only change the order details to the initiator of the order otherwise it will return an empty object
- Delete {link: http://localhost:5000/api/order/delete/:id, method: [DELETE], required: [token][:id is order_id]}**Notice** It will only delete the order if you are the initiator of the order otherwise it will return an empty object

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
