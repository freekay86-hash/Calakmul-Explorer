import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import SectionTitle from "./SectionTitle";

export default function ContactoSection() {
  const colors = useColors();

  return (
    <View style={[styles.section, { backgroundColor: colors.navBackground }]}>
      <View style={styles.logoWrap}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.brand}>Calakmul Explore</Text>
        <Text style={styles.tagline}>Tu aventura maya comienza aquí</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: "#25D366" }]}
          onPress={() => Linking.openURL("https://wa.me/521982105306")}
          activeOpacity={0.85}
        >
          <Feather name="message-circle" size={22} color="#ffffff" />
          <Text style={styles.socialBtnText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: "#E1306C" }]}
          onPress={() => Linking.openURL("https://www.instagram.com/calakmulexplore")}
          activeOpacity={0.85}
        >
          <Feather name="instagram" size={22} color="#ffffff" />
          <Text style={styles.socialBtnText}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: "#1877F2" }]}
          onPress={() => Linking.openURL("https://www.facebook.com/calakmulexplore")}
          activeOpacity={0.85}
        >
          <Feather name="facebook" size={22} color="#ffffff" />
          <Text style={styles.socialBtnText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBlock}>
        {[
          { icon: "map-pin" as const, text: "Xpujil, Campeche, México" },
          { icon: "phone" as const, text: "+52 982 105 3064" },
          { icon: "mail" as const, text: "info@calakmulexplore.com" },
          { icon: "clock" as const, text: "Lun - Dom: 6:00am - 8:00pm" },
        ].map((item, i) => (
          <View key={i} style={styles.infoRow}>
            <Feather name={item.icon} size={16} color={colors.accent} />
            <Text style={styles.infoText}>{item.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />
      <Text style={styles.copyright}>
        © 2025 Calakmul Explore · Todos los derechos reservados
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  logoWrap: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  brand: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  tagline: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 20,
  },
  grid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 6,
  },
  socialBtnText: {
    color: "#ffffff",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  infoBlock: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  copyright: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginTop: 8,
  },
});
