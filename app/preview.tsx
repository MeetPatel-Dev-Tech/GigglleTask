import { saveSubmission } from "@/utils/storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import StickerPicker from "./StickerPicker";

export default function PreviewScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!uri) return Alert.alert("No video to submit!");
    await saveSubmission({ uri, status: "pending", createdAt: Date.now() });
    Alert.alert("✅ Submission Pending Review by Moderator");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.preview} />
      <StickerPicker
        onSelect={(index) => {
          console.log("Selected icon index:", index);
          // store icon index or symbol if needed
        }}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  preview: { width: 300, height: 200, marginBottom: 10 },
});
