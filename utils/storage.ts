import AsyncStorage from "@react-native-async-storage/async-storage";

const SUBMISSIONS_KEY = "submissions";

export async function saveSubmission(submission: any) {
  const existing = await getSubmissions();
  await AsyncStorage.setItem(
    SUBMISSIONS_KEY,
    JSON.stringify([...existing, submission])
  );
}

export async function getSubmissions() {
  const raw = await AsyncStorage.getItem(SUBMISSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}
