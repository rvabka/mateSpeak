import axios from 'axios';

const API_HOST = 'https://lingua-robot.p.rapidapi.com';
const API_KEY = '26400c0db8msh6c69b7e25f24928p19f20cjsnbdc144ab0ba5';

const fetchWordDefinition = async word => {
  try {
    const response = await axios.get(
      `${API_HOST}/language/v1/entries/en/${word}`,
      {
        headers: {
          'x-rapidapi-host': 'lingua-robot.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching word definition:',
      error.response?.data || error.message
    );
    throw error;
  }
};
// sk-2e2d17343d444413a52882a1c4ab6025
export default fetchWordDefinition;
