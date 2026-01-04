import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { XMLParser } from "fast-xml-parser";
import { Feather } from "@expo/vector-icons";
import { useLearnStore } from "@/src/store/useLearnStore";

/* ---------------- CONSTANT ---------------- */

const PIB_HINDI_RSS =
  "https://api.codetabs.com/v1/proxy?quest=https://pib.gov.in/RssMain.aspx?ModId=6&Lang=2&Regid=6";

/* ---------------- HELPERS ---------------- */

const calculateReadTime = (text: string) =>
  Math.max(1, Math.ceil(text.split(" ").length / 200));

async function translateHiToEn(text: string) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=hi|en`
    );
    const json = await res.json();
    return json?.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

/* ---------------- MAIN ---------------- */

export default function LearnIndex() {
  const [language, setLanguage] = useState<"hi" | "en">("en");
  const [query, setQuery] = useState("");

  const {
    hindiArticles,
    translatedArticles,
    loading,
    news_,
    setHindiArticles,
    setTranslatedArticles,
    setLoading,
    setNews_,
  } = useLearnStore();

  /* ---------------- FETCH FUNCTION ---------------- */
  const fetchHindiArticles = async () => {
    try {
      setLoading(true);

      const res = await fetch(PIB_HINDI_RSS);
      const xmlText = await res.text();

      const parser = new XMLParser();
      const parsedXml = parser.parse(xmlText);

      const rawItems = parsedXml?.rss?.channel?.item;
      const items = Array.isArray(rawItems)
        ? rawItems
        : rawItems
        ? [rawItems]
        : [];

      const parsed = items.map((item: any, i: number) => ({
        id: i.toString(),
        title: item.title || "",
        description: item.description || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
      }));

      setHindiArticles(parsed);
      setTranslatedArticles([]); // invalidate EN cache
    } catch (e) {
      console.error("❌ Fetch failed:", e);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- INITIAL FETCH (ONCE) ---------------- */
  useEffect(() => {
    if (hindiArticles.length === 0) {
      fetchHindiArticles();
    }
  }, []);

  /* ---------------- TRANSLATE ON FIRST EN SWITCH ---------------- */
  useEffect(() => {
    async function translateOnce() {
      if (language !== "en") return;
      if (translatedArticles) return;

      setLoading(true);

      const translated = await Promise.all(
        hindiArticles.map(async (a: { id: string; title: string; description: string; link: string; pubDate: string }) => ({
          ...a,
          title: await translateHiToEn(a.title),
          description: await translateHiToEn(a.description),
        }))
      );

      setTranslatedArticles(translated);
      setLoading(false);
    }

    if (hindiArticles.length > 0) {
      translateOnce();
    }
  }, [language, hindiArticles]);

  /* ---------------- DATA ---------------- */
  const articles =
    language === "en" ? translatedArticles || hindiArticles : hindiArticles;

  const filtered = articles.filter(
    (a: { title: string; description: string }) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
      
  );

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} className="flex-1 bg-[#f6f7f8]">
        {/* HEADER */}
        <View className="px-4 py-4 flex-row justify-between items-center">
          <Text className="text-2xl font-bold">
            Civic Update Center
          </Text>

          <View className="flex-row bg-slate-200 rounded-lg p-1">
            {["en", "hi"].map((l) => (
              <Pressable
                key={l}
                onPress={() => setLanguage(l as any)}
                className={`px-3 py-1 rounded ${
                  language === l ? "bg-blue-600" : ""
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    language === l
                      ? "text-white"
                      : "text-slate-500"
                  }`}
                >
                  {l.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* SEARCH */}
        <View className="px-4 pb-3">
          <View className="flex-row items-center bg-white rounded-xl px-4 h-11 shadow-sm">
            <Feather name="search" size={18} color="#94A3B8" />
            <TextInput
              placeholder="Search civic topics..."
              value={query}
              onChangeText={setQuery}
              className="flex-1 ml-2 text-base"
            />
          </View>
        </View>

        {/* CONTENT */}
        {loading && hindiArticles.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#2563EB" />
            <Text className="mt-3 text-slate-500">
              Preparing civic content…
            </Text>
          </View>
        ) : (
          <FlatList
            data={news_}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ padding: 16 }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={fetchHindiArticles}
                tintColor="#2563EB"
              />
            }
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/learn/[id]",
                    params: {
                      id: item.id,
                      url: item.link,
                      title: item.title,
                      image: item?.image,
                      source: item.source,
                      link: item.link,
                      pubDate: item.pubDate,
                    },
                  })
                }
                className="bg-white rounded-xl p-4 mb-4 shadow-sm"
              >
                {item.image && (<Image 
                  source={{ uri: item?.image }}
                  style={{ width: "100%", height: 200, borderRadius: 12, marginBottom: 12 }}
                />)}
                <Text className="text-lg font-bold">
                  {item.title}
                </Text>

                <View className="flex-row justify-between mt-4">
                  <View className="bg-blue-100 px-3 py-2 rounded-lg">
                    <Text className="text-blue-600 font-semibold">
                      Read More
                    </Text>
                  </View>

                  <Text className="py-2 text-slate-400">
                    {calculateReadTime(item.description)} min read · PIB
                  </Text>
                </View>
              </Pressable>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
