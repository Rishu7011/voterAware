import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SourcesScreen() {
  const router = useRouter();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="flex-1 ">
        {/* Top App Bar */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-100">
          <Pressable onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={32} color="#137fec" />
          </Pressable>

          <Text className="text-lg font-bold ">
            Transparency & Sources
          </Text>

          <View className="w-8" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Intro */}
          <View className="px-5 pt-6 pb-2">
            <Text className="text-2xl font-bold text-black mb-2">
              Trusted Data Sources
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
              We aggregate data strictly from official government repositories
              and verified non-partisan organizations to ensure absolute accuracy
              and neutrality.
            </Text>
          </View>

          {/* Sources */}
          <View className="px-4 py-2 space-y-3">
            {/* Election Commission */}
            <Pressable
              onPress={() => openLink("https://eci.gov.in")}
              className="flex-row items-center gap-4 px-4 py-4 rounded-2xl"
            >
              <View className="w-12 h-12 rounded-lg bg-blue-100 items-center justify-center">
                <MaterialIcons name="account-balance" size={26} color="#137fec" />
              </View>

              <View className="flex-1">
                <View className="flex-row items-center gap-1">
                  <Text className="font-semibold text-black ">
                    Election Commission of India
                  </Text>
                  <MaterialIcons
                    name="verified"
                    size={16}
                    color="#137fec"
                  />
                </View>
                <Text className="text-sm text-slate-500 ">
                  Official electoral rolls & reports
                </Text>
              </View>

              <MaterialIcons
                name="open-in-new"
                size={22}
                color="#94a3b8"
              />
            </Pressable>

            {/* PIB Fact Check */}
            <Pressable
              onPress={() => openLink("https://factcheck.pib.gov.in")}
              className="flex-row items-center gap-4 px-4 py-4 rounded-2xl"
            >
              <View className="w-12 h-12 rounded-lg bg-blue-100 items-center justify-center">
                <MaterialIcons name="campaign" size={26} color="#137fec" />
              </View>

              <View className="flex-1">
                <View className="flex-row items-center gap-1">
                  <Text className="font-semibold text-black ">
                    PIB Fact Check
                  </Text>
                  <MaterialIcons
                    name="verified"
                    size={16}
                    color="#137fec"
                  />
                </View>
                <Text className="text-sm text-slate-500 ">
                  Govt. press verification unit
                </Text>
              </View>

              <MaterialIcons
                name="open-in-new"
                size={22}
                color="#94a3b8"
              />
            </Pressable>

            {/* Supreme Court */}
            <Pressable
              onPress={() => openLink("https://main.sci.gov.in")}
              className="flex-row items-center gap-4 px-4 py-4 rounded-2xl"
            >
              <View className="w-12 h-12 rounded-lg bg-blue-100 items-center justify-center border border-slate-200 ">
                <MaterialIcons name="gavel" size={26} color="#137fec" />
              </View>

              <View className="flex-1">
                <Text className="font-semibold text-black ">
                  Supreme Court Judgments
                </Text>
                <Text className="text-sm text-slate-500 ">
                  Public legal records
                </Text>
              </View>

              <MaterialIcons
                name="open-in-new"
                size={22}
                color="#94a3b8"
              />
            </Pressable>

            {/* GDELT / Google News */}
            <Pressable
              onPress={() =>
                openLink("https://www.gdeltproject.org/")
              }
              className="flex-row items-center gap-4 px-4 py-4 rounded-2xl"
            >
              <View className="w-12 h-12 rounded-lg bg-blue-100 items-center justify-center">
                <MaterialIcons name="public" size={26} color="#137fec" />
              </View>

              <View className="flex-1">
                <Text className="font-semibold text-black ">
                  GDELT / Global News
                </Text>
                <Text className="text-sm text-slate-500 ">
                  Global Database of Events & Google News
                </Text>
              </View>

              <MaterialIcons
                name="open-in-new"
                size={22}
                color="#94a3b8"
              />
            </Pressable>
          </View>

          {/* Verification Timeline */}
          <View className="px-5 mt-6">
            <Text className="text-lg font-bold text-black mb-4">
              How We Verify
            </Text>

            {[
              {
                icon: "cloud-download",
                title: "Automated Retrieval",
                desc: "Data is fetched from official APIs every 24 hours.",
              },
              {
                icon: "person",
                title: "Human Cross-Check",
                desc: "Editors verify anomalies against official releases.",
              },
              {
                icon: "verified-user",
                title: "Neutrality Audit & Publish",
                desc: "Final audit ensures non-partisan language.",
              },
            ].map((step, i) => (
              <View key={i} className="flex-row gap-4 mb-6">
                <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
                  <MaterialIcons
                    name={step.icon as any}
                    size={16}
                    color="white"
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-black ">
                    {step.title}
                  </Text>
                  <Text className="text-sm text-slate-500  mt-1">
                    {step.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Privacy Card */}
          <View className="px-4 pb-8">
            <View className="bg-blue-50 rounded-2xl p-6 items-center border border-blue-100">
              <View className="w-14 h-14 rounded-full bg-white items-center justify-center mb-4">
                <MaterialIcons name="shield" size={30} color="#137fec" />
              </View>

              <Text className="text-lg font-bold text-black mb-2">
                Neutral & Private
              </Text>

              <Text className="text-sm text-slate-600 text-center mb-6">
                We never track political preferences, voting intent, or
                location. No data is shared with third parties.
              </Text>

              <Pressable
                onPress={() => openLink("https://your-privacy-policy-url")}
                className="w-full bg-blue-500 py-3 rounded-xl items-center flex-row justify-center gap-2"
              >
                <Text className="text-white font-medium">
                  Read Full Privacy Policy
                </Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={18}
                  color="white"
                />
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <View className="py-6 bg-slate-50 border-t border-slate-200 items-center">
            <View className="flex-row items-center gap-2 mb-1">
              <MaterialIcons name="public" size={16} color="#94a3b8" />
              <Text className="text-xs uppercase tracking-wider text-slate-500">
                Made for Democracy
              </Text>
            </View>
            <Text className="text-xs text-slate-400">
              Version 1.0.0 (Build 2026)
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
