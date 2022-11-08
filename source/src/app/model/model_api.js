import axios from 'axios';

export async function export_wizard(data, response) {
  const urls = JSON.parse(localStorage.getItem('init'))?.ActionUrl ?? '';
  const posts = await axios.post(urls?.save_result_url, data).catch((error) => {
    throw new Error(error);
  });
  if (posts) {
    response(posts.data);
  }
}

export const getPapperRequest = async (id, response) => {
  const urls = JSON.parse(localStorage.getItem('init'))?.ActionUrl ?? '';
  try {
    const posts = await axios.get(urls?.request_url + id).catch((err) => {
      console.log(err);
    });
    response(posts.data);
  } catch (error) {
    console.log(error);
  }
};
