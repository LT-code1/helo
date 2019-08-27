import axios from "axios";

const initialState = {
  username: "",
  password: "",
  newPassword: null,
  id: null,
  address: "",
  city: "",
  state: "",
  zipcode: null,
  orders_id: null,
  error: ""
};

const UPDATE_LOGIN = "UPDATE_LOGIN";
const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const UPDATE_INFO = "UPDATE_INFO";
const LOGOUT = "LOGOUT";

export function logout() {
  return {
    type: LOGOUT,
    payload: null
  };
}

export function updateLogin(name, value) {
  return {
    type: UPDATE_LOGIN,
    payload: { name, value }
  };
}
export function loginUser(username, password) {
  let data = axios.post("/api/login", { username, password });
  return {
    type: LOGIN,
    payload: data
  };
}

export function register(username, password, address, city, state, zipcode) {
  let data = axios.post("/api/login/register", {
    username,
    password,
    address,
    city,
    state,
    zipcode
  });
  //console.log(data);
  return {
    type: REGISTER,
    payload: data
  };
}
export function updateInfo(
  username,
  password,
  address,
  city,
  state,
  zipcode,
  newPassword = null
) {
  let info = {
    username,
    password,
    address,
    city,
    state,
    zipcode,
    newPassword
  };
  let data = axios
    .put("/api/login/update", info)
    .then(res => {
      console.log(res);
      // put res.data into data
      //return res.data
    })
    .catch(error => {
      console.log(error);
      this.setState({
        error: "ERROR"
      });
    });
  return {
    type: UPDATE_INFO,
    payload: data
  };
}

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_LOGIN:
      return { ...state, [payload.name]: payload.value, error: "" };
    case LOGOUT:
      return { ...state, id: null };

    case `${UPDATE_INFO}_FULFILLED`:
      return {
        ...state,
        //username: payload.data.username,
        password: "",
        id: payload.data.id,
        address: payload.data.address,
        city: payload.data.city,
        state: payload.data.state,
        zipcode: payload.data.zipcode,
        orders_id: payload.data.orders_id,
        error: ""
      };
    case `${UPDATE_INFO}_REJECTED`:
      return { ...state, password: "", username: "", error: "register" };
    case `${UPDATE_INFO}_PENDING`:
      return { ...state, password: "", username: "", error: "" };

    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        password: "",
        username: payload.data.username,
        id: payload.data.id,
        address: payload.data.address,
        city: payload.data.city,
        state: payload.data.state,
        zipcode: payload.data.zipcode,
        error: ""
      };
    case `${REGISTER}_REJECTED`:
      return { ...state, password: "", username: "", error: "register" };
    case `${REGISTER}_PENDING`:
      return { ...state, password: "", username: "", error: "" };

    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        password: "",
        username: payload.data.username,
        id: payload.data.id,
        address: payload.data.address,
        city: payload.data.city,
        state: payload.data.state,
        zipcode: payload.data.zipcode,
        orders_id: payload.data.orders_id,
        error: ""
      };
    case `${LOGIN}_REJECTED`:
      return { ...state, password: "", username: "", error: "login" };
    case `${LOGIN}_PENDING`:
      return { ...state, password: "", username: "", error: "" };

    default:
      return state;
  }
}

export default reducer;
