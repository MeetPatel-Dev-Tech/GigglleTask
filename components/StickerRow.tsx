import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const stickers = ["🔥", "🎉", "😂", "😎", "❤️"];

export default function StickerRow({
  onSelect,
}: {
  onSelect: (s: string) => void;
}) {
  return (
    <View style={styles.row}>
      {stickers.map((s, idx) => (
        <TouchableOpacity key={idx} onPress={() => onSelect(s)}>
          <Text style={styles.sticker}>{s}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  sticker: { fontSize: 32, margin: 8 },
});
