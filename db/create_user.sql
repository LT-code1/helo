INSERT INTO users (username, password, address, city, state, zipcode)
VALUES ($1,$2,$3,$4,$5,$6)
returning *