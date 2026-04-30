import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import SectionTitle from "./SectionTitle";
import WildlifeTrack from "./WildlifeTrack";

const TOURS = [
  "Tour Zona Arqueológica Calakmul",
  "Tour Chicannà + Balamkú",
  "Tour Lagunas de la Biosfera",
  "Tour Xpuhil + Becán",
  "Paquete 2 días todo incluido",
  "Paquete 3 días todo incluido",
  "Tour Observación de Aves y Fauna",
  "Tour Fotográfico Arqueológico",
];

export default function ReservaSection() {
  const colors = useColors();
  const [name, setName] = useState("");
  const [tourIdx, setTourIdx] = useState(0);
  const [date, setDate] = useState("");
  const [showTourPicker, setShowTourPicker] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Atención", "Por favor ingresa tu nombre.");
      return;
    }
    if (!date.trim()) {
      Alert.alert("Atención", "Por favor ingresa la fecha deseada.");
      return;
    }

    const message = `Hola, quiero reservar un tour 👋\n\n👤 Nombre: ${name}\n🧭 Tour: ${TOURS[tourIdx]}\n📅 Fecha: ${date}\n📍 Calakmul, Campeche, México`;
    const phone = "521982105306";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <View style={[styles.section, { backgroundColor: colors.sectionBg2 }]}>
      <WildlifeTrack color="#2d9e5f" opacity={0.1} />

      <View style={styles.photoBanner}>
        <Image
          source={require("@/assets/images/ruins_entrance.jpeg")}
          style={styles.bannerImg}
          contentFit="cover"
        />
        <View style={[styles.bannerOverlay, { backgroundColor: colors.primary }]}>
          <Feather name="calendar" size={20} color="#ffffff" />
          <Text style={styles.bannerTitle}>Reserva Tu Tour</Text>
          <Text style={styles.bannerSub}>Calakmul, Campeche, México</Text>
        </View>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.fieldWrap}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>Tu nombre</Text>
          <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.muted }]}>
            <Feather name="user" size={16} color={colors.mutedForeground} />
            <TextInput
              style={[styles.input, { color: colors.foreground }]}
              placeholder="Escribe tu nombre completo"
              placeholderTextColor={colors.mutedForeground}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.fieldWrap}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>Tour o servicio</Text>
          <TouchableOpacity
            style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.muted }]}
            onPress={() => setShowTourPicker(!showTourPicker)}
            activeOpacity={0.8}
          >
            <Feather name="map" size={16} color={colors.mutedForeground} />
            <Text style={[styles.input, { color: colors.foreground }]} numberOfLines={1}>
              {TOURS[tourIdx]}
            </Text>
            <Feather
              name={showTourPicker ? "chevron-up" : "chevron-down"}
              size={16}
              color={colors.mutedForeground}
            />
          </TouchableOpacity>

          {showTourPicker && (
            <View style={[styles.picker, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {TOURS.map((t, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.pickerItem,
                    i === tourIdx && { backgroundColor: colors.primary + "18" },
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => {
                    setTourIdx(i);
                    setShowTourPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: i === tourIdx ? colors.primary : colors.foreground },
                    ]}
                  >
                    {t}
                  </Text>
                  {i === tourIdx && <Feather name="check" size={14} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.fieldWrap}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>Fecha deseada</Text>
          <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.muted }]}>
            <Feather name="calendar" size={16} color={colors.mutedForeground} />
            <TextInput
              style={[styles.input, { color: colors.foreground }]}
              placeholder="Ej: 15 de agosto de 2025"
              placeholderTextColor={colors.mutedForeground}
              value={date}
              onChangeText={setDate}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: "#25D366" }]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Feather name="message-circle" size={20} color="#ffffff" />
          <Text style={styles.submitBtnText}>Reservar por WhatsApp</Text>
        </TouchableOpacity>

        <Text style={[styles.hint, { color: colors.mutedForeground }]}>
          Te responderemos en menos de 24 horas · Calakmul, Campeche
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 36,
    overflow: "hidden",
  },
  photoBanner: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    height: 130,
    marginBottom: 20,
    flexDirection: "row",
  },
  bannerImg: {
    flex: 1,
    height: "100%",
  },
  bannerOverlay: {
    width: "42%",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    gap: 6,
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  bannerSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  formCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    elevation: 3,
  },
  fieldWrap: {
    marginBottom: 16,
    zIndex: 1,
  },
  label: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  picker: {
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 6,
    overflow: "hidden",
    elevation: 5,
    zIndex: 100,
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerItemText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 4,
    elevation: 5,
  },
  submitBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  hint: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginTop: 12,
  },
});
