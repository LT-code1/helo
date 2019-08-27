INSERT INTO orders (user_id)
VALUES ($1);
SELECT orders_id FROM orders
WHERE user_id = $1;
