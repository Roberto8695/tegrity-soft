import { ImageResponse } from "next/og";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

export const SOCIAL_IMAGE_ALT =
  "Tegrity-Soft — Desarrollo web, software a medida y e-commerce con Next.js";

export function createSocialCardResponse() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          backgroundColor: "#07080b",
          backgroundImage:
            "radial-gradient(circle at 82% 24%, rgba(56, 189, 248, 0.22), transparent 46%), radial-gradient(circle at 18% 82%, rgba(52, 211, 153, 0.14), transparent 42%)",
          color: "#f4f6fb",
          fontFamily: "sans-serif",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <svg
              width="58"
              height="52"
              viewBox="0 0 64 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="5"
                width="54"
                height="37"
                rx="6.5"
                stroke="#f4f6fb"
                strokeWidth="4.4"
              />
              <path
                d="M23.5 18L16.5 23.5L23.5 29"
                stroke="#38bdf8"
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M34.5 16L29.5 31"
                stroke="#f4f6fb"
                strokeWidth="4.2"
                strokeLinecap="round"
              />
              <path
                d="M40.5 18L47.5 23.5L40.5 29"
                stroke="#38bdf8"
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 42V52.5M18.5 52.5H45.5"
                stroke="#f4f6fb"
                strokeWidth="4.4"
                strokeLinecap="round"
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#f4f6fb",
                }}
              >
                Tegrity-Soft
              </span>
              <span
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.2em",
                  color: "#38bdf8",
                  marginTop: "2px",
                }}
              >
                INGENIERÍA WEB // BOLIVIA &amp; EE. UU.
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              backgroundColor: "rgba(17, 19, 25, 0.9)",
              fontSize: "16px",
              color: "#38bdf8",
            }}
          >
            <span>COTIZACIÓN A MEDIDA · 30 DÍAS DE GARANTÍA</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            <span>Sitios y software web</span>
            <span>desarrollados con velocidad real.</span>
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "#a7b1c4",
              maxWidth: "920px",
            }}
          >
            Next.js, TypeScript, plataformas e-commerce y arquitectura escalable
            optimizada para SEO técnico, Core Web Vitals y conversión.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "22px",
            fontSize: "18px",
            color: "#c8d0df",
          }}
        >
          <span>tegrity-soft.tech · roberto@tegrity-soft.com</span>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: "26px", height: "8px", backgroundColor: "#38bdf8", borderRadius: "2px" }} />
            <div style={{ width: "26px", height: "8px", backgroundColor: "#34d399", borderRadius: "2px" }} />
            <div style={{ width: "26px", height: "8px", backgroundColor: "#818cf8", borderRadius: "2px" }} />
            <div style={{ width: "26px", height: "8px", backgroundColor: "#f43f5e", borderRadius: "2px" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...SOCIAL_IMAGE_SIZE,
    }
  );
}
