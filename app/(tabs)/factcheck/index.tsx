import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";


/* ---------------- CONSTANTS ---------------- */

const PRIMARY = "#137fec";
const BG = "#f6f7f8";
const CARD = "#ffffff";
const MUTED = "#64748B";


/* ---------------- HELPERS ---------------- */

function timeAgo() {
  return "Just now";
}

function normalize(text: string) {
  return text.trim();
}

/* ---------------- FACT CHECK ENGINE ---------------- */

async function factCheckClaim(text: string): Promise<FactResult> {
  // Use EXPO_PUBLIC_ prefix for environment variables in Expo
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY; 
  console.log("Using API Key:", API_KEY);
  const BASE_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search";
  
  const query = normalize(text);
  const url = `${BASE_URL}?query=${encodeURIComponent(query)}&key=${API_KEY}&languageCode=en`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    
    const json: FactCheckResponse = await res.json();
    // console.log("Fact Check API Response:", json.claims[4]);
     
    // json.claims.map((i) => {
    //   if(i.claimReview[0].textualRating.toLowerCase().includes("true")) {
    //     console.log("TRUE CLAIM:", i);
    //   }
    // })

    // If no claims are found in the Google database
    if (!json?.claims?.length) {
      return {
        id: Date.now().toString(),
        verdict: "UNVERIFIED",
        claim: text,
        explanation: "No verified public fact-check exists for this claim yet.",
        source: "Investigation Pending",
        time: timeAgo(),
      };
    }

    // Process the most relevant match
    const claimData = json.claims[0];
    const review = claimData.claimReview[0];
    const rating = review.textualRating.toLowerCase();

    // Map the textual rating to your VerdictType
    let verdict: VerdictType = "UNVERIFIED";
    if (rating.includes("false") || rating.includes("incorrect") || rating.includes("misleading")) {
      verdict = "FALSE";
    } else if (rating.includes("true") || rating.includes("correct")) {
      verdict = "TRUE";
    }

    return {
      id: Date.now().toString(),
      verdict,
      claim: claimData.text,
      explanation: review.title || "Verified by independent fact-checking organizations.",
      source: review.publisher.name,
      url: review.url,
      time: timeAgo(),
    };
  } catch (error) {
    console.error("Fact check failed:", error);
    return {
      id: Date.now().toString(),
      verdict: "UNVERIFIED",
      claim: text,
      explanation: "Unable to verify at the moment. Please try again later.",
      source: "System",
      time: timeAgo(),
    };
  }
}

/* ---------------- MAIN SCREEN ---------------- */

export default function FactCheckScreen() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FactResult[]>([]);

  async function handleCheck() {
    if (!input.trim()) return;
    setLoading(true);

    const result = await factCheckClaim(input);
    setResults((prev) => [result, ...prev]);

    setLoading(false);
  }

  function VerdictCard({ item }: { item: FactResult }) {
    const verdictConfig = {
      TRUE: {
        bg: "#ecfdf5",
        border: "#bbf7d0",
        icon: "check-circle",
        color: "#15803d",
        label: "Verified True",
      },
      FALSE: {
        bg: "#fef2f2",
        border: "#fecaca",
        icon: "x-circle",
        color: "#b91c1c",
        label: "False Claim",
      },
      UNVERIFIED: {
        bg: "#fffbeb",
        border: "#fde68a",
        icon: "alert-circle",
        color: "#a16207",
        label: "Unverified",
      },
    };

    const styles = verdictConfig[item.verdict];

    return (
      <View
        style={{
          backgroundColor: CARD,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: styles.border,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: styles.bg,
            padding: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Feather name={styles.icon as any} size={18} color={styles.color} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: styles.color,
            }}
          >
            {styles.label}
          </Text>
          <Text style={{ marginLeft: "auto", fontSize: 11, color: MUTED }}>
            {item.time}
          </Text>
        </View>

        <View style={{ padding: 14 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              marginBottom: 6,
            }}
            numberOfLines={2}
          >
            {item.claim}
          </Text>

          <Text style={{ fontSize: 13, color: MUTED, marginBottom: 10 }}>
            {item.explanation}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 11, color: MUTED }}>
              Source: {item.source}
            </Text>

            {item.url && (
              <Pressable onPress={() => router.push(item.url as any)}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: PRIMARY,
                  }}
                >
                  Read More
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: BG,  }}>
      <View
        style={{
          padding: 14,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: "#e5e7eb",
        }}
      >

        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
            
          }}
        >
          Fact Check
        </Text>

        <Feather name="info" size={20} className="absolute right-2"/>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 6 }}>
            Verify News Instantly
          </Text>
          <Text style={{ fontSize: 15, color: MUTED }}>
            Paste a message or claim to verify it against verified public records.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Paste news link or text here...."
            placeholderTextColor="gray"
            multiline
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#cbd5e1",
              padding: 14,
              minHeight: 120,
              fontSize: 15,
            }}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Pressable
            onPress={handleCheck}
            disabled={loading}
            style={{
              backgroundColor: PRIMARY,
              height: 54,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Feather name="shield" size={20} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Check Authenticity
                </Text>
              </>
            )}
          </Pressable>
        </View>

        {results.length > 0 && (
          <>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "#e5e7eb" }} />
              <Text style={{ fontSize: 11, fontWeight: "700", color: MUTED }}>
                RECENT RESULTS
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: "#e5e7eb" }} />
            </View>

            <View style={{ paddingHorizontal: 20, gap: 14 }}>
              {results.map((r) => (
                <VerdictCard key={r.id} item={r} />
              ))}
            </View>
          </>
        )}
      <View
        style={{
          borderTopWidth: 1,
          borderColor: "#e5e7eb",
          padding: 14,
        }}
      >
        <Text style={{ fontSize: 11, color: MUTED }}>
          Results are based on Google Fact Check Tools. This tool is informational only.
        </Text>
      </View>
      </ScrollView>

    </SafeAreaView>
  );
}