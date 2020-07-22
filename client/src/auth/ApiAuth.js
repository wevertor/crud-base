import axios from "axios";

const apiUrl = "http://localhost:5000/auth";

const signin = async (user) => {
  let response;

  try {
    await axios
      .post(apiUrl + "/signin", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

const signout = async () => {
  let response;

  try {
    await axios
      .get(apiUrl + "/signout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export { signin, signout };
