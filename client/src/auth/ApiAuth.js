import axios from "axios";

const apiUrl = "http://localhost:5000/auth";

const signin = async (user) => {
  try {
    let response = undefined;
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
        console.log(erro.response.data);
        response = erro.response.data;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const signout = async () => {
  try {
    let response = await axios.get(apiUrl + "/signout");
    return await response.json;
  } catch (error) {
    console.log(error);
  }
};

export { signin, signout };
