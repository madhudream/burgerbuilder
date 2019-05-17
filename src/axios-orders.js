import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-d4faf.firebaseio.com/"
});
export default instance;
