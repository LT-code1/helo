UPDATE users
SET password=$2
WHERE username = $1
returning *