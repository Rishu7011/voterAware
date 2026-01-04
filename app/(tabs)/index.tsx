import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Href, Link, router } from "expo-router";
import { useEffect } from "react";
import { XMLParser } from "fast-xml-parser";
import { useLearnStore } from "@/src/store/useLearnStore";
import { useECIStore } from "@/src/store/useECIStore";



/* ---------------- CONSTANTS ---------------- */

const PRIMARY = "#1E88E5";
const BG = "#F6F7F8";
const CARD_BG = "#FFFFFF";
const MUTED = "#64748B";

const PIB_HINDI_RSS ="https://api.codetabs.com/v1/proxy?quest=https://pib.gov.in/RssMain.aspx?ModId=6&Lang=2&Regid=6";

/* ---------------- TRANSLATION ---------------- */

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


/* ---------------- HOME ---------------- */

export default function HomeScreen() {
  const {
    hindiArticles,
    translatedArticles,
    news_,
    setHindiArticles,
    setTranslatedArticles,
    setLoading,
    setNews_,
  } = useLearnStore();
  const { news, loading: eciLoading, fetchECI } = useECIStore();


  /* 🔥 FETCH + STORE ON APP ENTRY */
  useEffect(() => {
    async function fetchOnceOnHome() {
      if (hindiArticles.length > 0) return;

      try {
        setLoading(true);
        fetchECI();
        const res = await fetch(PIB_HINDI_RSS);
        const xmlText = await res.text();
        
        const parser = new XMLParser();
        const parsed = parser.parse(xmlText);
        
        const rawItems = parsed?.rss?.channel?.item;
        const items = Array.isArray(rawItems)
        ? rawItems
        : rawItems
        ? [rawItems]
        : [];
        
        const hindi = items.map((item: any, i: number) => ({
          id: i.toString(),
          title: item.title || "",
          description: item.description || "",
          link: item.link || "",
          pubDate: item.pubDate || "",
        }));
        
        setHindiArticles(hindi);
        
        /* 🔁 TRANSLATE ONCE */
        const translated = await Promise.all(
          hindi.map(async (a) => ({
            ...a,
            title: await translateHiToEn(a.title),
            description: await translateHiToEn(a.description),
          }))
        );
        
        setTranslatedArticles(translated);
      } finally {
        setLoading(false);
      }
    }
    
    fetchOnceOnHome();
  }, []);
  
  useEffect(() => {
    setNews_(news);
  },[news])
  
  const recentUpdates = translatedArticles?.slice(0, 5) ?? [];

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: BG }}>
      {/* HEADER */}
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: CARD_BG,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#E8F2FD",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="check-circle" size={20} color={PRIMARY} />
          </View>

          <View>
            <Text style={{ fontSize: 12, color: MUTED }}>
              Hello, Citizen
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              Welcome, Voter
            </Text>
          </View>
        </View>

        <TouchableOpacity>
          <Feather name="bell" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* HERO */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: "800", lineHeight: 34 }}>
            Empowering Informed Voters
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 16,
              color: "#475569",
              lineHeight: 22,
            }}
          >
            Your vote is your voice. Access neutral, verified information to make
            democratic decisions with confidence.
          </Text>
        </View>

        {/* VERIFIED BANNER */}
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              backgroundColor: PRIMARY,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Feather name="shield" size={18} color="white" />
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                OFFICIAL SOURCE
              </Text>
            </View>

            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "700",
                marginTop: 8,
              }}
            >
              Verified & Neutral Information
            </Text>

            <Text style={{ color: "#DBEAFE", marginTop: 6 }}>
              All information is cross-verified using official government and
              public records.
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 16,
                alignSelf: "flex-start",
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 8,
              }}
            >
              <Link href="/sources" style={{ color: "white", fontWeight: "600" }}>
                Learn More →
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
            Quick Actions
          </Text>

          <View style={{ gap: 12 }}>
            <LinkSkeleton
              icon="book-open"
              title="One Nation One Election"
              subtitle="Understand the proposal"
            />

            <LinkSkeleton
              href="/factcheck"
              icon="shield"
              title="Fact Check News"
              subtitle="Verify viral stories"
            />

            <LinkSkeleton
              href="/chatbot"
              icon="message-circle"
              title="Ask Civic AI"
              subtitle="Get instant answers"
            />

            <LinkSkeleton
              href="/report"
              icon="alert-triangle"
              title="Report Fake News"
              subtitle="Flag misleading content"
              danger
            />
          </View>
        </View>

        {/* 🗳️ ECI UPDATES */}
        <View style={{ padding: 10 }}>
          <View className="flex flex-row justify-around items-center">
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
            Election Commission Updates
          </Text>
          <Link href="/learn" style={{ fontSize: 16, fontWeight:"600", marginBottom: 12 }} className="text-blue-500">
            View All
          </Link>
          </View>

          {eciLoading ? (
            <Text style={{ color: MUTED }}>Loading election data…</Text>
          ) : (
            <View style={{ gap: 12 }}>
              {news.slice(0, 10).map((item:any) => (
                item.image ? (
                  <Pressable
                    key={item.id}
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
                  >
                    <View
                      key={item.id}
                      style={{
                        backgroundColor: CARD_BG,
                        padding: 16,
                        borderRadius: 16,
                      }}
                    >
                          
                          <Image
                            source={{ uri: item.image }}
                            style={{ width: "100%", height: 150, borderRadius: 8, marginBottom: 8 }}
                            resizeMode="cover"
                          />
                          <Text style={{ fontSize: 14, fontWeight: "600" }}>
                            {item.title}
                          </Text>
                          <Text style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>
                            {item.source}
                          </Text>
                          <Text style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>
                            {timeAgoFromGDELT(item.pubDate)}
                          </Text>
                      

                    </View>
                  </Pressable>
                  ) : null
              ))}
            </View>
          )}
        </View>


        {/* 🔥 RECENT UPDATES */}
        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              Recent Updates
            </Text>

            <Link href="/learn">
              <Text style={{ color: PRIMARY, fontWeight: "600" }}>
                View All
              </Text>
            </Link>
          </View>

          <View style={{ gap: 12 }}>
            {recentUpdates.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor: CARD_BG,
                  padding: 14,
                  borderRadius: 14,
                }}
              >
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/learn/[id]",
                    params: {
                      id: item.id,
                      title: item.title,
                      url: item.link,
                    },
                  })
                }
              >
                  <Text
                    style={{ fontSize: 15, fontWeight: "600" }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      color: MUTED,
                    }}
                  >
                    Source: PIB
                  </Text>
                </Pressable>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- LINK SKELETON ---------------- */

function LinkSkeleton({
  href,
  icon,
  title,
  subtitle,
  danger,
}: {
  href?: Href;
  icon: any;
  title: string;
  subtitle: string;
  danger?: boolean;
}) {
  return (
    <Link href={href ?? "/"} asChild>
      <TouchableOpacity
        activeOpacity={0.85}
        className={`flex-row items-center gap-4 p-4 rounded-2xl ${
          danger ? "bg-red-50" : "bg-white"
        }`}
      >
        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${
            danger ? "bg-red-200" : "bg-blue-100"
          }`}
        >
          <Feather
            name={icon}
            size={20}
            className={danger ? "text-red-600" : "text-blue-600"}
          />
        </View>

        <View className="flex-1">
          <Text className="text-[15px] font-semibold">
            {title}
          </Text>
          <Text className="text-xs text-slate-500 mt-1">
            {subtitle}
          </Text>
        </View>

        <Feather
          name="chevron-right"
          size={20}
          className="text-slate-400"
        />
      </TouchableOpacity>
    </Link>
  );
}
