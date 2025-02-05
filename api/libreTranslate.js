import axios from 'axios';

const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';

const translateText = async (text, targetLang = 'PL', sourceLang = 'EN') => {
  try {
    const response = await axios.get(MYMEMORY_API_URL, {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`
      }
    });
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error(
      'Error translating text with MyMemory:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export default translateText;
