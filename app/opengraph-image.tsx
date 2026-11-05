import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

/* Auto-generated Open Graph image (1200×630) shown when the link is shared. */
export const dynamic = "force-static";
export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #06110c 0%, #171717 60%, #2a0d0d 100%)",
          color: "#EDEDED",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            border: "4px solid #A31C1B",
            fontSize: 52,
            fontWeight: 700,
            marginBottom: 48,
          }}
        >
          {profile.initials}
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
        <div style={{ fontSize: 36, color: "#A3A3A3", marginTop: 16 }}>{profile.title}</div>
        <div style={{ width: 160, height: 6, background: "#A31C1B", marginTop: 40, borderRadius: 3 }} />
      </div>
    ),
    size
  );
}
