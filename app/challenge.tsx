import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import StickerPicker from "./StickerPicker";

export default function ChallengeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Dance Challenge!</Text>
      {/* <Image
        source={require("../assets/placeholder.jpg")}
        style={styles.preview}
      /> */}
      <Button
        title="Record Your Response"
        onPress={() => router.push("/record")}
      />
      <Text style={styles.stickerTitle}>Add Stickers:</Text>
      <StickerPicker disabled />
      <Button
        title="Go to Moderation Queue"
        onPress={() => router.push("/moderation")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  preview: { width: 300, height: 200, marginBottom: 20 },
  stickerTitle: { marginVertical: 10, fontSize: 16 },
});
