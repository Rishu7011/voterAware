// src/services/fetchECI.ts

const GDELT_URL =
  "https://api.gdeltproject.org/api/v2/doc/doc?query=India%20Election&mode=ArtList&maxrecords=30&format=json";



export async function fetchECINews() {
  try {

    const res = await fetch(GDELT_URL);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();
    
    const articles = json?.articles ?? [];


    if (!articles.length) {
      throw new Error("No election articles found");
    }

    return articles.map((item: any, i: number) => ({
      id: i.toString(),
      title: item.title || "Election Update",
      description: item.seendate || "",
      link: item.url || "",
      pubDate: item.seendate,
      source: item.domain,
      image: item.socialimage,
    }));
  } catch (err) {
    

    // ✅ App-safe fallback
    return [];
  }
}
