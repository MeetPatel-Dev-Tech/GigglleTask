import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Challenge App</Text>
      <Button
        title="Go to Challenge"
        onPress={() => router.push("/challenge")}
      />
    </View>
  );
}
