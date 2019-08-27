const bcrypt = require("bcryptjs");

let loginControl = async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.get("db");

  const user = await db.check_user(username).catch(err => console.log(err));

  if (!user[0]) {
    res.status(401).json("Incorrect username or password");
  } else {
    const isAuthorized = await bcrypt
      .compare(password, user[0].password)
      .catch(err => console.log(err));

    if (!isAuthorized) {
      res.status(401).json("Incorrect username or password");
    } else {
      const orderIdAdd = await db.insert_order(user[0].user_id); //insert into orders tabler returning orders_id
      req.session.user = {
        id: user[0].user_id, //put user info into session
        username: user[0].username,
        address: user[0].address,
        city: user[0].city,
        state: user[0].state,
        zipcode: user[0].zipcode,
        orders_id: orderIdAdd[orderIdAdd.length - 1].orders_id //put orders id into session after login
      };
      res.json(req.session.user);
    }
  }
};

let register = async (req, res) => {
  const { username, password, address, city, state, zipcode } = req.body;
  const db = req.app.get("db");

  const user = await db.check_user(username).catch(err => console.log(err));
  if (user[0]) {
    res.status(401).json("Username is already taken");
  } else {
    const hash = await bcrypt.hash(password, 10).catch(err => console.log(err));

    const newUser = await db.create_user([
      username,
      hash,
      address,
      city,
      state,
      zipcode
    ]);

    req.session.user = {
      id: newUser[0].user_id,
      username,
      address,
      city,
      state,
      zipcode
    };
    res.json(req.session.user);
  }
};

let updatePassword = async (req, res) => {
  const { username, address, city, state, zipcode, newPassword } = req.body;
  const db = req.app.get("db");
  {
    //must be in [                         ]
    const user = await db
      .update_user([username, address, city, state, zipcode])
      .catch(err => console.log(err)); //updates basic info
    req.session.user = {
      id: user[0].user_id,
      username,
      address,
      city,
      state,
      zipcode
    };
  }

  if (newPassword !== null) {
    const hash = await bcrypt
      .hash(newPassword, 10)
      .catch(err => console.log(err));
    const userpass = await db
      .update_password([username, hash])
      .catch(err => console.log(err));

    req.session.user = {
      id: userpass[0].user_id,
      username,
      address,
      city,
      state,
      zipcode
    };
    res.json(req.session.user);
  }
};

let logout = (req, res) => {
  req.session.destroy();
  return res.sendStatus(200);
};

let getOrdersFromUser = async (req, res) => {
  //res.json(req.query.id); // to test postman
  const { id } = req.query;
  const db = req.app.get("db");
  //console.log(id);

  const orderInfo = await db.get_all_info(id).catch(err => console.log(err));
  res.json(orderInfo);
};

module.exports = {
  getOrdersFromUser,
  updatePassword,
  loginControl,
  register,
  logout
};

// const bcrypt = require("bcryptjs");

// let loginControl = async (req, res) => {
//   const { username, password } = req.body;
//   console.log("req.body is:");
//   console.log(req.body);
//   const db = req.app.get("db");

//   const user = await db.check_user(username).catch(err => console.log(err));

//   if (!user[0]) {
//     res.status(401).json("Incorrect username or password");
//   } else {
//     const isAuthorized = await bcrypt
//       .compare(password, user[0].password)
//       .catch(err => console.log(err));

//     if (!isAuthorized) {
//       res.status(401).json("Incorrect username or password");
//     } else {
//       const orderIdAdd = await db.insert_order(user[0].id); //insert into orders tabler returning orders_id
//       req.session.user = {
//         id: user[0].id, //put user info into session
//         username: user[0].first_name,
//         orders_id: orderIdAdd[orderIdAdd.length - 1].orders_id //put orders id into session after login
//       };
//       res.json(req.session.user);
//     }
//   }
// };

// let register = async (req, res) => {
//   const { username, password } = req.body;
//   const db = req.app.get("db");

//   const user = await db.check_user(username).catch(err => console.log(err));
//   if (user[0]) {
//     res.status(401).json("Username is already taken");
//   } else {
//     const hash = await bcrypt.hash(password, 10).catch(err => console.log(err));

//     const newUser = await db.create_user([username, hash]);

//     req.session.user = {
//       id: newUser[0].id,
//       username
//     };
//     res.json(req.session.user);
//   }
// };

// module.exports = {
//   loginControl,
//   register
// };
