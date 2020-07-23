import axios from "axios";

const create = async (user) => {
  let response;

  try {
    await axios
      .post("http://localhost:5000/users", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
        response = error.response.data;
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const list = async () => {
  let response;

  try {
    await axios
      .get("http://localhost:5000/users", {
        headers: { Timeout: 3000 },
      })
      .then((res) => {
        response = res.data;
      })
      .catch((erro) => {
        response = erro.response.data;
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const read = async (params, credentials) => {
  let response;

  try {
    await axios
      .get(`http://localhost:5000/user/${params.userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${credentials.t}`,
        },
      })
      .then((res) => {
        response = res.data;
      })
      .catch((erro) => {
        response = erro.response.data;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const update = async (params, credentials, user) => {
  let response;

  try {
    await axios
      .put(`http://localhost:5000/user/${params.userId}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${credentials.t}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        response = res.data;
      })
      .catch((erro) => {
        console.log(erro.response.data);
        response = erro.response.data;
      });

    return response;
  } catch (error) {
    console.error(error);
  }
};

const remove = async (params, credentials) => {
  let response;

  try {
    await axios
      .delete(`http://localhost:5000/user/${params.userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer  + ${credentials.t}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        response = res.data;
      })
      .catch((erro) => {
        console.log(erro.response.data);
        response = erro.response.data;
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { create, list, read, update, remove };
