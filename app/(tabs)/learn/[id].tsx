import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router, Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Feather } from "@expo/vector-icons";

function timeAgoFromGDELT(seendate: string): string {
  if (!seendate || seendate.length < 15) return "";

  const year = seendate.slice(0, 4);
  const month = seendate.slice(4, 6);
  const day = seendate.slice(6, 8);
  const hour = seendate.slice(9, 11);
  const minute = seendate.slice(11, 13);

  const iso = `${year}-${month}-${day}T${hour}:${minute}:00Z`;
  const date = new Date(iso);

  if (isNaN(date.getTime())) return "";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

  return date.toDateString();
}


export default function LearnArticle() {
  const { title, url, image, source, link, pubDate } = useLocalSearchParams<{
    title: string;
    url: string;
    image: string;
    source: string;
    link: string;
    pubDate: string;
  }>();

  const openSource = async () => {
    if (!url) return;
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#f6f7f8]">
      {/* ---------------- HEADER ---------------- */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-slate-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full active:bg-slate-100"
        >
          <Feather name="chevron-left" size={28} color="#334155" />
        </Pressable>

        <Text
          className="flex-1 text-center text-xl font-bold text-slate-900 px-4"
          numberOfLines={1}
        >
          Article Summary
        </Text>

        <View className="w-10" />
      </View>

      {/* ---------------- CONTENT ---------------- */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120, paddingLeft: 20, paddingRight: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Meta */}
        <View className=" pt-6 pb-2">
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-blue-100 px-2 py-1 rounded">
              <Text className="text-blue-600 text-xs font-bold uppercase">
                Official Source
              </Text>
            </View>

            <Text className="text-xs text-slate-400">
              {source} • {timeAgoFromGDELT(pubDate)}
            </Text>
          </View>

          {/* Title */}
          <Text className="text-[26px] font-bold leading-tight text-slate-900 mb-4">
            {title} 
          </Text>

          <Text className="text-xl text-slate-400 pb-4">{timeAgoFromGDELT(pubDate)}</Text>

          {/* Source Info */}
          <View className="flex-row items-center gap-3 mb-6">
            <View className="w-9 h-9 rounded-full bg-slate-200 items-center justify-center">
              <Feather name="briefcase" size={18} color="#475569" />
            </View>

            <View>
              <Text className=" font-semibold text-slate-900">
                {source}
              </Text>
              {/* <Text className="text-xs text-slate-500">
                Official Government Publication
              </Text> */}
            </View>
          </View>
        </View>

        {image && (<Image
          source={{ uri: image }}
          style={{ width: "100%", height: 200, borderRadius: 12, marginBottom: 12 }}
          className=" items-center justify-center"
        />)}

        {/* Notice Card */}
        <View className=" mb-8">
          <View className="bg-white border border-slate-200 rounded-xl p-4">
            <Text className="text-slate-700 text-base leading-relaxed">
              This article is published by {source}. For more detailed information, please visit the full article by clicking the "Read Full" button below.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ---------------- FOOTER CTA ---------------- */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4">
        <Pressable
          onPress={openSource}
          className="bg-blue-600 h-12 rounded-xl flex-row items-center justify-center gap-2 active:bg-blue-700"
        >
          <Feather name="external-link" size={18} color="white" />
          <Link href={link as any} className="text-white font-semibold text-base">
            Read Full
          </Link>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
