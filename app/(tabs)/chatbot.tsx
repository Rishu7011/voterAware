import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

/* ======================= TYPES ======================= */





/* ======================= UTIL ======================= */

function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ======================= KNOWLEDGE BASE ======================= */

const KNOWLEDGE: Record<IntentKey, string> = {
  REGISTER:
    "🗳️ **Voter Registration (India)**\n\n" +
    "Step-by-step:\n" +
    "1️⃣ Visit https://voters.eci.gov.in\n" +
    "2️⃣ Click *Register as a new voter*\n" +
    "3️⃣ Fill Form 6\n" +
    "4️⃣ Upload age & address proof\n" +
    "5️⃣ Submit and track application\n\n" +
    "Eligibility:\n" +
    "• Indian citizen\n" +
    "• 18+ years\n\n" +
    "Processing usually takes 2–4 weeks.",

  CORRECTION:
    "✏️ **Correction in Voter ID**\n\n" +
    "Use Form 8 for:\n" +
    "• Name correction\n" +
    "• Date of birth\n" +
    "• Photo change\n\n" +
    "Steps:\n" +
    "1️⃣ Login at voters.eci.gov.in\n" +
    "2️⃣ Select *Correction in entries*\n" +
    "3️⃣ Upload supporting document\n\n" +
    "Correction is free of cost.",

  ADDRESS_CHANGE:
    "🏠 **Address Change**\n\n" +
    "If you moved to a new constituency:\n" +
    "• Use Form 8A (now merged into Form 8)\n\n" +
    "Steps:\n" +
    "1️⃣ Login to voters.eci.gov.in\n" +
    "2️⃣ Choose *Shifting of residence*\n" +
    "3️⃣ Submit new address proof\n\n" +
    "Old registration will be deleted automatically.",

  HOW_TO_VOTE:
    "✅ **How to Vote (Voting Day Guide)**\n\n" +
    "1️⃣ Carry voter ID or approved ID\n" +
    "2️⃣ Go to your polling booth\n" +
    "3️⃣ Finger ink marking\n" +
    "4️⃣ Press button on EVM\n" +
    "5️⃣ Verify slip on VVPAT\n\n" +
    "Your vote is secret and cannot be traced.",

  POLLING_BOOTH:
    "📍 **Find Polling Booth**\n\n" +
    "Ways to find:\n" +
    "• voters.eci.gov.in → *Know your booth*\n" +
    "• Voter Helpline App\n" +
    "• Booth Level Officer (BLO)\n\n" +
    "You must vote only at your assigned booth.",

  DOCUMENTS:
    "🪪 **Documents Accepted for Voting**\n\n" +
    "Primary:\n" +
    "• EPIC (Voter ID)\n\n" +
    "Alternatives:\n" +
    "• Aadhaar\n" +
    "• Passport\n" +
    "• Driving License\n" +
    "• PAN Card\n\n" +
    "Document list is notified before every election.",

  EVM:
    "🖥️ **EVM & VVPAT Explained**\n\n" +
    "• EVM records your vote electronically\n" +
    "• VVPAT shows printed slip for 7 seconds\n\n" +
    "Machines are:\n" +
    "✔️ Standalone (no internet)\n" +
    "✔️ Tested before polling\n" +
    "✔️ Audited randomly",

  FAKE_NEWS:
    "🚫 **Fake News & Misinformation**\n\n" +
    "How to verify:\n" +
    "• PIB Fact Check\n" +
    "• Official ECI handles\n" +
    "• Trusted news portals\n\n" +
    "Never forward unverified election messages.",

  MCC:
    "📜 **Model Code of Conduct (MCC)**\n\n" +
    "Applies once elections are announced.\n\n" +
    "Restricts:\n" +
    "• Govt announcements\n" +
    "• Transfers of officials\n" +
    "• Use of public funds for campaigns\n\n" +
    "Ensures fair elections.",

  FIRST_TIME:
    "🎉 **First-Time Voter Guide**\n\n" +
    "• Check name in voter list\n" +
    "• Visit booth early\n" +
    "• Follow polling officer instructions\n\n" +
    "Voting is your constitutional right!",

  ONE_NATION:
    "🏛️ **One Nation, One Election**\n\n" +
    "Proposal to conduct all elections together.\n\n" +
    "Status:\n" +
    "• Under discussion\n" +
    "• No final implementation\n\n" +
    "This assistant remains neutral.",

  OVERSEAS:
    "🌍 **Overseas Voters**\n\n" +
    "NRIs can register as voters.\n\n" +
    "• Must vote in person\n" +
    "• No proxy voting (except service voters)\n\n" +
    "Register using Form 6A.",

  SENIOR:
    "♿ **Senior Citizens & Disabled Voters**\n\n" +
    "Facilities:\n" +
    "• Wheelchair access\n" +
    "• Home voting (in some cases)\n" +
    "• Priority entry\n\n" +
    "Contact BLO for assistance.",

  UNKNOWN:
    "I may not have complete information on this.\n\n" +
    "For authoritative guidance, please visit:\n" +
    "👉 https://eci.gov.in\n\n" +
    "Would you like help navigating the official site?",
};

/* ======================= INTENT DETECTION ======================= */

function detectIntent(text: string): IntentKey {
  const t = text.toLowerCase();

  if (t.includes("register")) return "REGISTER";
  if (t.includes("correction") || t.includes("wrong")) return "CORRECTION";
  if (t.includes("address")) return "ADDRESS_CHANGE";
  if (t.includes("how to vote")) return "HOW_TO_VOTE";
  if (t.includes("booth") || t.includes("polling")) return "POLLING_BOOTH";
  if (t.includes("document") || t.includes("id")) return "DOCUMENTS";
  if (t.includes("evm")) return "EVM";
  if (t.includes("fake")) return "FAKE_NEWS";
  if (t.includes("mcc")) return "MCC";
  if (t.includes("first")) return "FIRST_TIME";
  if (t.includes("one nation")) return "ONE_NATION";
  if (t.includes("overseas") || t.includes("nri")) return "OVERSEAS";
  if (t.includes("senior") || t.includes("disabled")) return "SENIOR";

  return "UNKNOWN";
}

/* ======================= COMPONENT ======================= */

export default function Chatbot() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      text:
        "Hello! I am your **Voter Assistant** 🗳️\n\n" +
        "I provide official, neutral election guidance for India.\n\n" +
        "You can ask about registration, voting process, polling booths, documents, or election rules.",
      time: now(),
    },
  ]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  function send(text: string) {
    if (!text.trim() || thinking) return;

    Keyboard.dismiss();
    setThinking(true);

    const intent = detectIntent(text);

    setMessages((prev) => [
      ...prev,
      { id: Date.now() + "_u", role: "user", text, time: now() },
      {
        id: Date.now() + "_a",
        role: "assistant",
        text: KNOWLEDGE[intent],
        time: now(),
      },
    ]);

    setInput("");
    setThinking(false);
  }

  /* ======================= UI ======================= */

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#f6f7f8]">
      {/* Header */}
      <View className="px-4 py-3 bg-white border-b border-slate-200 flex-row items-center justify-center rounded-b-xl">
        
        <Text className="text-lg font-bold text-slate-900">
          Voter Assistant
        </Text>
        <MaterialIcons name="verified" size={22} color="#22c55e" />
      </View>

      {/* Chat */}
      <ScrollView ref={scrollRef} className="flex-1 px-4 py-4">
        {messages.map((m) => (
          <View
            key={m.id}
            className={`mb-5 ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <View
              className={`max-w-[85%] p-4 rounded-2xl ${
                m.role === "user"
                  ? "bg-[#137fec] rounded-tr-none"
                  : "bg-white border border-slate-200 rounded-tl-none"
              }`}
            >
              <Text
                className={`text-[15px] ${
                  m.role === "user" ? "text-white" : "text-slate-800"
                }`}
              >
                {m.text}
              </Text>
              <Text className="text-[11px] text-slate-400 mt-1">
                {m.time}
              </Text>
            </View>
          </View>
        ))}
      {/* Quick Actions */}
      <ScrollView horizontal className="px-4 py-2">
        {[
          "Register to vote",
          "How to vote",
          "Find polling booth",
          "Documents required",
          "Fake news check",
        ].map((q) => (
          <Pressable
            key={q}
            onPress={() => send(q)}
            className="mr-2 px-4 py-2 mb-8 bg-white border border-slate-200 rounded-full"
          >
            <Text className="text-[#137fec] text-sm font-medium">{q}</Text>
          </Pressable>
        ))}
      </ScrollView>
      </ScrollView>


      {/* Input */}
      <View className="px-4 pb-2">
        <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-3 py-2">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask about voting, registration, rules..."
            className="flex-1 text-base"
            returnKeyType="send"
            onSubmitEditing={() => send(input)}
          />
          <Pressable
            onPress={() => send(input)}
            className="bg-[#137fec] p-2 rounded-lg ml-2"
          >
            <MaterialIcons name="send" size={20} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Disclaimer */}
      <View className="py-3 px-6 border-t border-slate-200 bg-white">
        <Text className="text-[11px] text-center text-slate-400">
          Official voter guidance only • Neutral • No political endorsements
        </Text>
      </View>
    </SafeAreaView>
  );
}
