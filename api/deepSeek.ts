import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY =
  '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';

const fetchExampleSentence = async (word: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are an English teacher. You provide example sentences for given words in natural English.'
          },
          {
            role: 'user',
            content: `Provide a natural example sentence using the word "${word}" in English.`
          }
        ],
        max_tokens: 50
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('API Response:', response.data);
    return response.data.choices[0]?.message?.content || 'No example found.';
  } catch (error) {
    console.error(
      'Error fetching example sentence:',
      (error as any).response?.data || (error as any).message
    );
    return 'Error loading example.';
  }
};

export default fetchExampleSentence;
