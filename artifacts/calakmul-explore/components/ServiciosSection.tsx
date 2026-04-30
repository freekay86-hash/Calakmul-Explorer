import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import SectionTitle from "./SectionTitle";
import WildlifeTrack from "./WildlifeTrack";

const { width: W } = Dimensions.get("window");
const CARD_W = W * 0.72;

const SERVICES = [
  {
    id: "transporte",
    label: "Transporte",
    icon: "truck" as const,
    description: "Traslados cómodos y seguros desde Xpujil o Escárcega hasta la zona arqueológica en vehículos especializados para la selva.",
    images: [
      require("@/assets/images/transport_carts.jpeg"),
      require("@/assets/images/transport_bus.jpeg"),
      require("@/assets/images/tour_group.jpeg"),
    ],
    tag: "Disponible todo el año",
  },
  {
    id: "tours",
    label: "Tours",
    icon: "map" as const,
    description: "Tours guiados por la zona arqueológica de Calakmul, Balamkú, Chicannà y los increíbles cuerpos de agua de la biosfera.",
    images: [
      require("@/assets/images/tour_group.jpeg"),
      require("@/assets/images/ruins_entrance.jpeg"),
      require("@/assets/images/lagoon.jpeg"),
    ],
    tag: "Guía certificado incluido",
  },
  {
    id: "paquetes",
    label: "Paquetes",
    icon: "package" as const,
    description: "Paquetes todo incluido con hospedaje, alimentación, transporte y guía profesional por 2 o 3 días en Calakmul, Campeche.",
    images: [
      require("@/assets/images/pyramid_top_view.jpeg"),
      require("@/assets/images/aerial_jungle.jpeg"),
      require("@/assets/images/monkeys_tree.jpeg"),
    ],
    tag: "Todo incluido",
  },
];

export default function ServiciosSection() {
  const colors = useColors();
  const [activeService, setActiveService] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleServicePress = (idx: number) => {
    if (idx === activeService) return;
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: Platform.OS !== "web",
    }).start(() => {
      setActiveService(idx);
      setActiveImg(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: Platform.OS !== "web",
      }).start();
    });
  };

  const service = SERVICES[activeService];

  return (
    <View style={[styles.section, { backgroundColor: colors.sectionBg3 }]}>
      <WildlifeTrack color="#2d9e5f" opacity={0.09} />
      <View style={styles.titleWrap}>
        <SectionTitle
          title="Nuestros Servicios"
          subtitle="Todo lo que necesitas para una aventura perfecta en Calakmul"
        />
      </View>

      <View style={styles.tabs}>
        {SERVICES.map((s, i) => {
          const isActive = activeService === i;
          return (
            <TouchableOpacity
              key={s.id}
              style={[
                styles.tab,
                {
                  backgroundColor: isActive ? colors.primary : colors.card,
                  borderColor: isActive ? colors.primary : colors.border,
                },
              ]}
              onPress={() => handleServicePress(i)}
              activeOpacity={0.8}
            >
              <Feather
                name={s.icon}
                size={18}
                color={isActive ? "#ffffff" : colors.mutedForeground}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? "#ffffff" : colors.mutedForeground },
                ]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.gallery}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryScroll}
            decelerationRate="fast"
            snapToInterval={CARD_W + 12}
          >
            {service.images.map((img, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setActiveImg(i)}
                activeOpacity={0.9}
                style={[
                  styles.galleryCard,
                  {
                    width: CARD_W,
                    borderColor: activeImg === i ? colors.primary : "transparent",
                    borderWidth: 2,
                  },
                ]}
              >
                <Image
                  source={img}
                  style={styles.galleryImg}
                  contentFit="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.galDots}>
            {service.images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: activeImg === i ? colors.primary : colors.border,
                    width: activeImg === i ? 20 : 6,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.tagRow}>
            <View style={[styles.tag, { backgroundColor: colors.primary + "22" }]}>
              <Feather name="check-circle" size={12} color={colors.primary} />
              <Text style={[styles.tagText, { color: colors.primary }]}>{service.tag}</Text>
            </View>
          </View>
          <Text style={[styles.serviceTitle, { color: colors.foreground }]}>{service.label}</Text>
          <Text style={[styles.serviceDesc, { color: colors.mutedForeground }]}>{service.description}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 36,
    overflow: "hidden",
  },
  titleWrap: {
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  gallery: {
    marginBottom: 16,
  },
  galleryScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  galleryCard: {
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
  },
  galleryImg: {
    width: "100%",
    height: "100%",
  },
  galDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  infoCard: {
    marginHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    elevation: 2,
  },
  tagRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  serviceTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
  },
  serviceDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
  },
});
