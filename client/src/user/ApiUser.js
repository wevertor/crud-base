import axios from "axios";

const apiUrl = "http://localhost:5000/users";

const create = async (user) => {
  try {
    let res = undefined;
    await axios
      .post(apiUrl, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log("deu certo");
        console.log(res.data);
        res = response.data;
      })
      .catch((error) => {
        console.log("deu errado");
        //console.log(error.response.data);
        res = error.response.data;
      });
    return res;
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
    let response = undefined;
    await axios
      .get("http://localhost:5000/user/" + params.userId, {
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
    console.log(error);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await axios.put(
      "http://localhost:5000/user/" + params.userId,
      user,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer  + ${credentials.t}`,
        },
      }
    );
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { create, list, read, update, remove };
