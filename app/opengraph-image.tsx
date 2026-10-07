import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nexora Staffing LLP";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0F19",
          backgroundImage: "radial-gradient(circle at center, #1A202C 0%, #0B0F19 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            border: "2px solid rgba(0, 242, 254, 0.2)",
            borderRadius: "40px",
            background: "rgba(0, 242, 254, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              background: "linear-gradient(135deg, #F26A21 0%, #8FB8D8 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "20px",
            }}
          >
            NEXORA
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#94A3B8",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            America's Leading IT Placement & Talent Solutions Firm
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
