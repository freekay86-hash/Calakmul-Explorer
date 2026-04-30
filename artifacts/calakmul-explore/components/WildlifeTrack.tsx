import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WildlifeTrackProps {
  color?: string;
  opacity?: number;
}

const JAGUAR_PAW = "🐾";
const BIRD_TRACK = "✦";

const TRACKS = [
  { x: "8%", y: "12%", symbol: JAGUAR_PAW, size: 18, rot: -15 },
  { x: "78%", y: "8%", symbol: JAGUAR_PAW, size: 14, rot: 20 },
  { x: "55%", y: "88%", symbol: JAGUAR_PAW, size: 16, rot: -8 },
  { x: "15%", y: "75%", symbol: BIRD_TRACK, size: 22, rot: 30 },
  { x: "88%", y: "60%", symbol: BIRD_TRACK, size: 18, rot: -25 },
  { x: "35%", y: "5%", symbol: "⋆", size: 28, rot: 45 },
  { x: "92%", y: "30%", symbol: JAGUAR_PAW, size: 12, rot: 10 },
  { x: "3%", y: "45%", symbol: BIRD_TRACK, size: 16, rot: -35 },
  { x: "65%", y: "50%", symbol: "⋆", size: 20, rot: -60 },
  { x: "48%", y: "22%", symbol: JAGUAR_PAW, size: 10, rot: 5 },
];

export default function WildlifeTrack({ color = "#ffffff", opacity = 0.12 }: WildlifeTrackProps) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {TRACKS.map((track, i) => (
        <Text
          key={i}
          style={[
            styles.track,
            {
              left: track.x,
              top: track.y,
              fontSize: track.size,
              color,
              opacity,
              transform: [{ rotate: `${track.rot}deg` }],
            },
          ]}
        >
          {track.symbol}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    position: "absolute",
    fontWeight: "300",
  },
});
