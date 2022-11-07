import axios from 'axios';
const urls = JSON.parse(localStorage.getItem('init'))?.ActionUrl ?? '';

export const export_wizard = async (data, response) => {
  try {
    const posts = await axios
      .post(urls?.save_result_url, data, {
        'Content-Type': 'application/json',
      })
      .catch((err) => {
        console.log(err.response);
      });
    response(posts.data);
  } catch (error) {
    console.log(error);
  }
};

export const getPapperRequest = async (id, response) => {
  try {
    const posts = await axios.get(urls?.request_url + id).catch((err) => {
      console.log(err);
    });
    response(posts.data);
  } catch (error) {
    console.log(error);
  }
};
