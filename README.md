# 🗣️ MateSpeak 🌍

MateSpeak to aplikacja mobilna stworzona z myślą o nauce języka angielskiego, która umożliwia użytkownikom naukę słówek za pomocą fiszek (flashcards) oraz śledzenie swojego postępu w nauce. Aplikacja korzysta z **Lingua Robot API** do wyświetlania słówek i przykładów użycia, a także **MyMemory API** do tłumaczeń.

Aplikacja oferuje różne poziomy trudności: `beginner`, `elementary`, `intermediate`, `advanced`, a dla każdego z poziomów dostępne są zestawy słówek. Użytkownicy mogą ćwiczyć swoje umiejętności w interaktywny sposób i obserwować, jak rozwija się ich znajomość języka.

## Funkcje

- **Fiszkowanie (flashcards)** – nauka słówek z tłumaczeniem oraz przykładem użycia.
- **Poziomy trudności** – aplikacja oferuje cztery poziomy trudności słówek: `beginner`, `elementary`, `intermediate`, `advanced`.
- **Śledzenie postępu** – możliwość monitorowania swojego rozwoju w nauce.
- **Autoryzacja użytkowników** – integracja z Appwrite, umożliwiająca logowanie się i zarządzanie danymi użytkownika.
- **Lingua Robot API** – wykorzystywane do wyświetlania słówek oraz przykładów użycia.
- **MyMemory API** – tłumaczenia słówek w czasie rzeczywistym.

## Instalacja

Aby uruchomić MateSpeak na swoim urządzeniu, wystarczy kilka prostych kroków:

### 1. Zainstaluj Expo CLI

Jeśli jeszcze nie masz zainstalowanego Expo CLI, zainstaluj go globalnie za pomocą npm:

```bash
npm install -g expo-cli
```

### 2. Klonowanie repozytorium
Skopiuj repozytorium na swoje lokalne urządzenie:

```bash
git clone https://github.com/TwojaNazwaUzytkownika/MateSpeak.git
cd MateSpeak
```

### 3. Instalacja zależności
Zainstaluj wszystkie wymagane zależności przy użyciu npm:

```bash
npm install
```

### 4. Uruchomienie aplikacji
Aby uruchomić aplikację na swoim urządzeniu lub emulatorze, użyj polecenia:

```bash
expo start
```

Otworzy się strona w przeglądarce, z której możesz zeskanować kod QR, aby uruchomić aplikację na urządzeniu mobilnym za pomocą aplikacji Expo Go.

## Wymagania

Aby uruchomić projekt, musisz spełnić następujące wymagania:

- Node.js w wersji 14 lub wyższej
- Expo CLI
- Konto w Appwrite do autoryzacji użytkowników
- Dostęp do API:
  - Lingua Robot API
  - MyMemory API

## Technologie

W projekcie wykorzystano następujące technologie:

- **React Native** – do budowy aplikacji mobilnej
- **Expo** – framework do uruchamiania aplikacji
- **Appwrite** – do autoryzacji użytkowników
- **Lingua Robot API** – do wyświetlania słówek i przykładów użycia
- **MyMemory API** – do tłumaczeń słówek

## Kontrybucja

Chciałbyś pomóc w rozwoju aplikacji? Świetnie! Oto jak możesz to zrobić:

1. **Sforkuj to repozytorium** (Fork this repo)
2. **Utwórz nową gałąź** (Create your feature branch):  
```bash
git checkout -b feature/AmazingFeature
```
### Powyższe `README.md` zawiera wszystkie istotne informacje, które mogą pomóc innym użytkownikom oraz programistom w zrozumieniu projektu, jego funkcji oraz procesu instalacji. Jeśli potrzebujesz dodatkowych zmian lub poprawek, daj znać!
