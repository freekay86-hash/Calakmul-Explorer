import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import SectionTitle from "./SectionTitle";

const TOURS = [
  "Tour Zona Arqueológica Calakmul",
  "Tour Cueva de los Murciélagos",
  "Tour Balamkú + Chicannà",
  "Paquete 2 días todo incluido",
  "Paquete 3 días todo incluido",
  "Tour Observación de Aves",
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

    const message = `Hola, quiero reservar un tour 👋\n\n👤 Nombre: ${name}\n🧭 Tour: ${TOURS[tourIdx]}\n📅 Fecha: ${date}`;
    const phone = "521982105306";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <View style={[styles.section, { backgroundColor: colors.sectionBg3 }]}>
      <View style={styles.titleWrap}>
        <SectionTitle
          title="Reserva Tu Tour"
          subtitle="Contáctanos directamente por WhatsApp para confirmar tu aventura"
        />
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
          Te responderemos en menos de 24 horas
        </Text>
      </View>

      <View style={[styles.contactCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.contactTitle}>También puedes contactarnos</Text>
        <View style={styles.contactRow}>
          <Feather name="phone" size={16} color="rgba(255,255,255,0.8)" />
          <Text style={styles.contactText}>+52 982 105 3064</Text>
        </View>
        <View style={styles.contactRow}>
          <Feather name="mail" size={16} color="rgba(255,255,255,0.8)" />
          <Text style={styles.contactText}>info@calakmulexplore.com</Text>
        </View>
        <View style={styles.contactRow}>
          <Feather name="map-pin" size={16} color="rgba(255,255,255,0.8)" />
          <Text style={styles.contactText}>Xpujil, Campeche, México</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 36,
  },
  titleWrap: {
    paddingHorizontal: 20,
  },
  formCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
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
    shadowColor: "#25D366",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
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
  contactCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 20,
    gap: 12,
  },
  contactTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contactText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
