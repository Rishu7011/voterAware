# 🗳️ VoterAware

**Empowering Informed Voters through Verified, Neutral & Official Information**

VoterAware is a civic-tech mobile application designed to help citizens access official election information, verify viral news, and understand voting processes in a simple, trustworthy, and non-partisan way.



---

## 🎯 Problem Statement

* **Misinformation:** Election misinformation spreads rapidly on social media platforms.
* **Identification:** Citizens struggle to identify official vs. fake information.
* **Fragmentation:** Access to verified election data is often fragmented across multiple portals.

**VoterAware** solves this by centralizing official sources, providing real-time verification, and offering guided civic education.

---

## 🚀 Key Features

### 1️⃣ Verified Election News
- Real-time election-related news.
- Cross-verified from trusted public datasets.
- **News Confidence Indicator** to help users gauge source reliability.

img1

### 2️⃣ Civic Learning Center
- Official articles & guides sourced from **PIB**.
- Multi-language support (**English / Hindi**).
- Concise article summaries with clear source attribution.

img2

### 3️⃣ Fact Check System
- Verify claims using the **Google Fact Check Tools API**.
- Clear Verdicts: `TRUE` | `FALSE` | `UNVERIFIED`.
- Source transparency with direct external links to investigations.

img3

### 4️⃣ Voter Assistant (AI-guided)
- Rule-based civic chatbot.
- Guides users through registration, voting processes, required documents, and rules.
- Direct redirection to official government portals when action is needed.

img4

---

## 🧠 Application Architecture



### High-Level Flow
`User` ➔ `Mobile App (React Native)` ➔ `Feature Modules` ➔ `Zustand State` ➔ `Official APIs & Public Data Sources`

---

## 🔗 Data Sources & APIs

| Source | Purpose |
| :--- | :--- |
| **GDELT API** | Global election & political news aggregation |
| **PIB RSS Feed** | Official government announcements & press releases |
| **Google Fact Check API** | Database of verified fact-check claims |
| **ECI Official Portals** | Authoritative election data & voter services |

---

## 🧩 Technology Stack

* **Frontend:** [React Native](https://reactnative.dev/) (Expo)
* **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)
* **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
* **APIs:** REST (Public & Official)
* **Auth:** [Better Auth](https://www.better-auth.com/) (Optional)

---

## 📂 Project Structure

```text
voterAware/
├── app/                  # Expo Router - Screen definitions
│   ├── (tabs)/           # Tab-based navigation
│   │   ├── home.tsx
│   │   ├── learn.tsx
│   │       ├── index.tsx
│   │       ├── [id].tsx
│   │   ├── factcheck.tsx
│   │   └── chatbot.tsx
│   ├── index.tsx         # Home page
│   ├── settings.tsx      # Settings page
│   └── _layout.tsx       # Root layout & providers
├── src/
│   ├── store/            # Zustand stores (useLearnStore, useFactStore)
│   ├── services/         # API integration (gdelt.ts, pib.ts, factcheck.ts)
│   └── components/       # Reusable UI components
├── assets/               # Images, icons, and local datasets
├── README.md
└── package.json

```

⚖️ Ethics & Neutrality

    Non-Partisan: No political opinions or endorsements.

    Transparent: All sources are clearly disclosed for every piece of data.

    Fact-Based: Clear disclaimers provided on unverified data.

    Private: No tracking of political preferences, location, or voting intent.

---

🏆 Why VoterAware Stands Out (USP)

    🔍 Trust-First Design: Using only official and verified primary sources.

    🧭 Guided Awareness: Focuses on user education rather than just raw data dumping.

---

👤 Authors

Rishabh Negi & Vineet Pandey CSE Students | Civic-Tech Enthusiasts

📌 Disclaimer

    This application is for informational purposes only. All data is sourced from public and official records. VoterAware does not influence political opinions or electoral outcomes. Empowering informed voters strengthens democracy.

⭐ If you find this project useful, consider giving it a star on GitHub!
