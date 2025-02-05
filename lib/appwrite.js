import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query
} from 'react-native-appwrite';
import { wordsData } from './data';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm_mateSpeak',
  projectID: '67897f5b002801b53f5c',
  databaseID: '6789807e0024494cb2a1',
  userCollectionID: '67898091001da281fc6d',
  progressCollectionID: '6799ffee00090f7c9616',
  wordsCollectionID: '6799ffdd002ee71b53a8',
  storageID: '6789817d003dee77ddc8'
};

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectID)
  .setPlatform(config.platform);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();
    const avatarUrl = avatars.getInitials(username);

    await signInToAccount(email, password);

    const newUser = await databases.createDocument(
      config.databaseID,
      config.userCollectionID,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const signInToAccount = async (email, password) => {
  logoutUser();
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error('Error signing in');
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAcct = await account.get();

    if (!currentAcct) throw new Error('No user found');

    const currentUser = await databases.listDocuments(
      config.databaseID,
      config.userCollectionID,
      [Query.equal('accountId', currentAcct.$id)]
    );

    if (!currentUser) throw new Error('No user found');

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  try {
    const sessions = await account.listSessions();
    for (const session of sessions.sessions) {
      await account.deleteSession(session.$id);
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting sessions');
  }
};

// tylko do stworzenia zbioru danych
const addWordsToDatabase = async () => {
  try {
    const promises = [];
    console.log(wordsData);
    for (const level in wordsData) {
      console.log(`📌 Adding words for level: ${level}`);

      for (const wordData of wordsData[level]) {
        console.log(`🔄 Attempting to add word: ${JSON.stringify(wordData)}`);

        const promise = databases
          .createDocument(
            config.databaseID,
            config.wordsCollectionID,
            ID.unique(),
            wordData
          )
          .then(response => {
            console.log(`✅ Added word: ${wordData.word}`, response);
          })
          .catch(error => {
            console.error(`❌ Error adding ${wordData.word}:`, error);
          });

        promises.push(promise);
      }
    }

    await Promise.all(promises);
    console.log('🎉 Finished adding words');
  } catch (error) {
    console.error('⚠️ Error:', error);
  }
};

export const fetchWords = async levelID => {
  try {
    const response = await databases.listDocuments(
      config.databaseID,
      config.wordsCollectionID,
      [Query.equal('level_id', levelID)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fatching words:', error);
    throw error;
  }
};

export const fetchProgress = async accountId => {
  try {
    const response = await databases.listDocuments(
      config.databaseID,
      config.progressCollectionID,
      [Query.equal('accountId', accountId)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fatcvhing words:', error);
    throw error;
  }
};

export const updateProgress = async (accountId, levelID) => {
  try {
    const response = await databases.listDocuments(
      config.databaseID,
      config.progressCollectionID,
      [Query.equal('accountId', accountId)],
      [Query.equal('level_id', levelID)]
    );

    await databases.createDocument(
      config.databaseID,
      config.progressCollectionID,
      'unique()',
      {
        accountId,
        level_id: levelID,
        if_passed: true
      }
    );
    console.log(
      `Dodano nowy progres dla użytkownika ${accountId} na poziomie ${levelID}.`
    );
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};
