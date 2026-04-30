import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const IS_WEB = Platform.OS === "web";

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", icon: "home" as const },
  { id: "nosotros", label: "Nosotros", icon: "info" as const },
  { id: "servicios", label: "Servicios", icon: "grid" as const },
  { id: "destinos", label: "Destinos", icon: "map-pin" as const },
  { id: "reserva", label: "Reserva", icon: "calendar" as const },
  { id: "contacto", label: "Contacto", icon: "phone" as const },
];

interface HeaderProps {
  activeSection: string;
  onNavPress: (id: string) => void;
}

export default function Header({ activeSection, onNavPress }: HeaderProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (menuOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 280,
          useNativeDriver: !IS_WEB,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: !IS_WEB,
        }),
      ]).start(() => setMenuOpen(false));
    } else {
      setMenuOpen(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 60,
          friction: 10,
          useNativeDriver: !IS_WEB,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: !IS_WEB,
        }),
      ]).start();
    }
  };

  const handleNavPress = (id: string) => {
    onNavPress(id);
    toggleMenu();
  };

  const topPad = IS_WEB ? 67 : insets.top;

  return (
    <>
      <View style={[styles.header, { paddingTop: topPad + 10, backgroundColor: colors.navBackground }]}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={[styles.appTitle, { color: "#ffffff" }]}>Calakmul Explore</Text>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={toggleMenu}
          activeOpacity={0.7}
        >
          <Feather name={menuOpen ? "x" : "menu"} size={26} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <Animated.View
          style={[styles.overlay, { opacity: overlayAnim }]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={toggleMenu}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {menuOpen && (
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
              backgroundColor: colors.navBackground,
              paddingTop: topPad + 80,
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.navItem,
                    isActive && { backgroundColor: colors.primary },
                  ]}
                  onPress={() => handleNavPress(item.id)}
                  activeOpacity={0.75}
                >
                  <View style={[styles.navIconWrap, isActive && { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                    <Feather name={item.icon} size={20} color="#ffffff" />
                  </View>
                  <Text style={styles.navLabel}>{item.label}</Text>
                  {isActive && (
                    <Feather name="chevron-right" size={16} color="#ffffff" style={styles.chevron} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.drawerFooter}>
            <Text style={styles.drawerFooterText}>© 2025 Calakmul Explore</Text>
            <Text style={styles.drawerFooterSub}>Campeche, México</Text>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    zIndex: 100,
    elevation: 10,
  },
  logo: {
    width: 44,
    height: 44,
    marginRight: 10,
  },
  appTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    flex: 1,
    letterSpacing: 0.3,
  },
  menuBtn: {
    padding: 6,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 200,
    height: SCREEN_HEIGHT,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT,
    zIndex: 300,
    elevation: 20,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 12,
    marginVertical: 3,
    borderRadius: 10,
  },
  navIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    marginRight: 14,
  },
  navLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.2,
    flex: 1,
  },
  chevron: {
    marginLeft: 4,
  },
  drawerFooter: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  drawerFooterText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  drawerFooterSub: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
});
