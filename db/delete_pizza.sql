DELETE FROM pizzas
WHERE pizza_id = $1;
SELECT * FROM pizzas where orders_id = $2;