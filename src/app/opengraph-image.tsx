import { ImageResponse } from "next/og";
import { weddingConfig } from "@/lib/weddingConfig";

export const alt = `${weddingConfig.couple.partnerOne} & ${weddingConfig.couple.partnerTwo} are getting married`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight = 400): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await fetch(cssUrl, {
    headers: {
      // Older Safari UA so Google returns a TTF Satori can embed.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((response) => response.text());

  const match = css.match(/src: url\(([^)]+)\)/);

  if (!match?.[1]) {
    throw new Error(`Could not resolve a font file for ${family}`);
  }

  const font = await fetch(match[1]);

  if (!font.ok) {
    throw new Error(`Failed to download ${family}`);
  }

  return font.arrayBuffer();
}

export default async function Image() {
  const { couple, event, venue, copy } = weddingConfig;
  const [cursive, display, sans] = await Promise.all([
    loadGoogleFont("Great Vibes"),
    loadGoogleFont("Playfair Display", 500),
    loadGoogleFont("Jost", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf6f0",
          color: "#2b2622",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Jost",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#5c6b50",
          }}
        >
          {copy.greetingEyebrow}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Great Vibes",
              fontSize: 118,
              lineHeight: 1.15,
              paddingRight: 18,
            }}
          >
            {couple.partnerOne}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Playfair Display",
              fontSize: 42,
              color: "#b28e5c",
              fontStyle: "italic",
              paddingBottom: 18,
            }}
          >
            &
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Great Vibes",
              fontSize: 118,
              lineHeight: 1.15,
              paddingLeft: 18,
            }}
          >
            {couple.partnerTwo}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 72,
              height: 1,
              backgroundColor: "#ddc7a1",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 8,
              height: 8,
              backgroundColor: "#b28e5c",
              transform: "rotate(45deg)",
              marginLeft: 16,
              marginRight: 16,
            }}
          />
          <div
            style={{
              display: "flex",
              width: 72,
              height: 1,
              backgroundColor: "#ddc7a1",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Playfair Display",
            fontSize: 32,
            marginTop: 32,
          }}
        >
          {event.displayDate}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Jost",
            fontSize: 22,
            color: "#756a5e",
            marginTop: 8,
          }}
        >
          {event.displayTime}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Jost",
            fontSize: 22,
            color: "#756a5e",
            marginTop: 6,
          }}
        >
          {`${venue.name}, Kegalle`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Great Vibes", data: cursive, weight: 400, style: "normal" },
        { name: "Playfair Display", data: display, weight: 500, style: "normal" },
        { name: "Jost", data: sans, weight: 500, style: "normal" },
      ],
    }
  );
}
