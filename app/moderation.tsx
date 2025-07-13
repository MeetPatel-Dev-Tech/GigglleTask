import { getSubmissions } from "@/utils/storage";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function ModerationScreen() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getSubmissions().then(setData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧐 Moderation Queue</Text>
      <FlatList
        data={data}
        keyExtractor={(item, i) => `${item.uri}-${i}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
            <Text>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  thumbnail: { width: 100, height: 60, marginRight: 10 },
});
