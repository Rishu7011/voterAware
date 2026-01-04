async function translateHiToEn(text: string) {
  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "hi",
        target: "en",
        format: "text",
      }),
    });

    const data = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("Translation failed", err);
    return text; // fallback to Hindi
  }
}
