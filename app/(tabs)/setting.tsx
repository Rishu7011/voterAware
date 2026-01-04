import { View, Text, ScrollView, Switch, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useState } from "react";

export default function SettingsScreen() {
  const [fontScale, setFontScale] = useState(1);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState("English");

  /* ---------- HANDLERS ---------- */

  const toggleTTS = () => {
    setTtsEnabled((prev) => !prev);
    if (!ttsEnabled) {
      Speech.speak("Text to speech enabled");
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-100">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-4 py-4 border-b border-slate-200">
          <Text className="text-lg font-bold text-center">
            Accessibility & Settings
          </Text>
        </View>

        {/* ---------- DISPLAY ---------- */}
        <Section title="Display & Appearance">
          <SettingCard>
            <Text className="text-base font-medium mb-2">
              Font Size
            </Text>
            <Text className="text-sm text-slate-500">
              Scale: {fontScale.toFixed(1)}x
            </Text>
          </SettingCard>
        </Section>

        {/* ---------- LANGUAGE ---------- */}
        <Section title="Language & Region">
          <SettingCard row>
            <View className="flex-row items-center gap-3">
              <Feather name="globe" size={18} />
              <Text className="text-base font-medium">
                App Language
              </Text>
            </View>
            <Text className="text-slate-500">
              {language}
            </Text>
          </SettingCard>
        </Section>

        {/* ---------- ACCESSIBILITY ---------- */}
        <Section title="Accessibility">
          <SettingCard row>
            <View className="flex-row items-center gap-3">
              <Feather name="volume-2" size={18} />
              <Text className="text-base font-medium">
                Text-to-Speech
              </Text>
            </View>
            <Switch
              value={ttsEnabled}
              onValueChange={toggleTTS}
            />
          </SettingCard>

          <SettingCard row>
            <View className="flex-row items-center gap-3">
              <Feather name="eye" size={18} />
              <Text className="text-base font-medium">
                High Contrast
              </Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={setHighContrast}
            />
          </SettingCard>
        </Section>

        {/* ---------- ABOUT ---------- */}
        <Section title="About">
          <SettingCard row>
            <Text className="text-base font-medium">
              Privacy Policy
            </Text>
            <Feather name="chevron-right" />
          </SettingCard>

          <SettingCard row>
            <Text className="text-base font-medium">
              App Version
            </Text>
            <Text className="text-slate-500">
              1.0.0 (Build 42)
            </Text>
          </SettingCard>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-6 px-4">
      <Text className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
        {title}
      </Text>
      <View className="rounded-xl overflow-hidden bg-white">
        {children}
      </View>
    </View>
  );
}

function SettingCard({
  children,
  row,
}: {
  children: React.ReactNode;
  row?: boolean;
}) {
  return (
    <View
      className={`px-4 py-4 border-b border-slate-100 ${
        row ? "flex-row justify-between items-center" : ""
      }`}
    >
      {children}
    </View>
  );
}
