SELECT *
FROM pizzas
INNER JOIN orders
ON pizzas.orders_id = orders.orders_id
WHERE pizzas.orders_id = $1;
