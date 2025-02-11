import * as Notifications from 'expo-notifications';

export default async function scheduleDailyNotification(hour, minute) {
  try {
    // Sprawdź uprawnienia
    const { status } = await Notifications.requestPermissionsAsync();
    console.log('🔄 Status uprawnień:', status); // Dodaj ten log
    if (status !== 'granted') {
      console.warn('❌ Brak uprawnień do powiadomień');
      return;
    }

    // Zaplanuj powiadomienie
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'MateSpeak 📚',
        body: 'Czas na naukę!',
        sound: 'default'
      },
      trigger: {
        hour,
        minute,
        repeats: true
      }
    });

    console.log(`✅ Powiadomienie zaplanowane codziennie o ${hour}:${minute}`);
  } catch (error) {
    console.error('❌ Błąd podczas planowania powiadomienia:', error);
  }
}
