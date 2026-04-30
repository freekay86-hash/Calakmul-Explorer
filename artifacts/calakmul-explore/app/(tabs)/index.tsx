import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NosotrosSection from "@/components/NosotrosSection";
import ServiciosSection from "@/components/ServiciosSection";
import DestinosSection from "@/components/DestinosSection";
import ReservaSection from "@/components/ReservaSection";
import ContactoSection from "@/components/ContactoSection";

const SECTIONS = ["inicio", "nosotros", "servicios", "destinos", "reserva", "contacto"];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = useState("inicio");

  const sectionOffsets = useRef<Record<string, number>>({});

  const handleNavPress = (id: string) => {
    setActiveSection(id);
    const offset = sectionOffsets.current[id];
    if (offset !== undefined) {
      scrollRef.current?.scrollTo({ y: offset, animated: true });
    }
  };

  const handleScroll = (e: { nativeEvent: { contentOffset: { y: number } } }) => {
    const y = e.nativeEvent.contentOffset.y;
    let closest = "inicio";
    let minDist = Infinity;
    for (const sec of SECTIONS) {
      const off = sectionOffsets.current[sec] ?? 0;
      const dist = Math.abs(y - off);
      if (dist < minDist) {
        minDist = dist;
        closest = sec;
      }
    }
    setActiveSection(closest);
  };

  const headerHeight = Platform.OS === "web" ? 67 + 64 : insets.top + 64;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header activeSection={activeSection} onNavPress={handleNavPress} />

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: headerHeight }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={60}
        onScroll={handleScroll}
        bounces={false}
      >
        <View
          onLayout={(e) => {
            sectionOffsets.current["inicio"] = e.nativeEvent.layout.y - headerHeight;
          }}
        >
          <HeroSection onExplorePress={() => handleNavPress("destinos")} />
        </View>

        <View
          onLayout={(e) => {
            sectionOffsets.current["nosotros"] = e.nativeEvent.layout.y - headerHeight;
          }}
        >
          <NosotrosSection />
        </View>

        <View
          onLayout={(e) => {
            sectionOffsets.current["servicios"] = e.nativeEvent.layout.y - headerHeight;
          }}
        >
          <ServiciosSection />
        </View>

        <View
          onLayout={(e) => {
            sectionOffsets.current["destinos"] = e.nativeEvent.layout.y - headerHeight;
          }}
        >
          <DestinosSection />
        </View>

        <View
          onLayout={(e) => {
            sectionOffsets.current["reserva"] = e.nativeEvent.layout.y - headerHeight;
          }}
        >
          <ReservaSection />
        </View>

        <View
          onLayout={(e) => {
            sectionOffsets.current["contacto"] = e.nativeEvent.layout.y - headerHeight;
          }}
        >
          <ContactoSection />
        </View>

        <View style={{ height: Platform.OS === "web" ? 34 : insets.bottom + 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});
