import axios from "axios";

const apiUrl = "http://localhost:5000/users";

const create = async (user) => {
  try {
    let response = await axios.post(apiUrl, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const list = async () => {
  try {
    let response = await axios.get(apiUrl, {
      headers: {
        Timeout: 3000,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const read = async (params, credentials) => {
  try {
    let response = await axios.get(apiUrl + params.userId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer  + ${credentials.t}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await axios.put(apiUrl + params.userId, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer  + ${credentials.t}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await axios.delete(apiUrl + params.userId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer  + ${credentials.t}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { create, list, read, update, remove };
