UPDATE users
SET address=$2,city=$3,state=$4,zipcode=$5
WHERE username = $1
returning *