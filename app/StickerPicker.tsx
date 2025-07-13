import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const emojis = ["😎", "😂", "🔥", "🎉"];

export default function StickerPicker({
  disabled = false,
  onSelect,
}: {
  disabled?: boolean;
  onSelect?: (emoji: string) => void;
}) {
  return (
    <View style={styles.row}>
      {emojis.map((emoji, idx) => (
        <TouchableOpacity
          key={idx}
          disabled={disabled}
          onPress={() => {
            onSelect?.(emoji);
            console.log("Tapped", emoji);
          }}
          style={styles.emojiBox}
        >
          <Text style={styles.emoji}>{emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  emojiBox: {
    marginHorizontal: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 8,
  },
  emoji: {
    fontSize: 32,
  },
});
