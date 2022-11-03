import axios from "axios";
import { Api, editor } from "../config/config.json";

const urls = Api.api_server_url;

export const export_wizard = async (data, response) => {
  try {
    const posts = await axios.post(urls + "wizard/build", data).catch((err) => {
      console.log(err);
    });
    response(posts.data);
  } catch (error) {
    console.log(error);
  }
};

export const getPapperRequest = async (id, response) => {
  try {
    const posts = await axios
      .get(urls + "wizard/getPapperRequest/" + id)
      .catch((err) => {
        console.log(err);
      });
    response(posts.data);
  } catch (error) {
    console.log(error);
  }
};
