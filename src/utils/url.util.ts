import axios from 'axios';

async function urlExist(url: string) {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (_error) {
    return false;
  }
}

export default urlExist;
