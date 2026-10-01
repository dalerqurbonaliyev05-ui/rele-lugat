import React from "react";
import { AbsoluteFill } from "remotion";
import type { Aspect } from "../theme";
import { SAFE } from "../theme";

export interface SceneProps {
  lang: "uz" | "ru" | "en";
  aspect: Aspect;
}

/**
 * Matnni xavfsiz zonada ushlab turadi: TikTok/Reels interfeysi vertikal
 * formatda tepadan ~260 px va pastdan ~410 px ni yopadi.
 */
export const Safe: React.FC<{
  aspect: Aspect;
  children: React.ReactNode;
  /** Kontent qayerga tiqilsin. */
  place?: "top" | "center" | "bottom";
  style?: React.CSSProperties;
}> = ({ aspect, children, place = "center", style }) => {
  const s = SAFE[aspect];
  return (
    <AbsoluteFill
      style={{
        paddingTop: s.top,
        paddingBottom: s.bottom,
        paddingLeft: s.side,
        paddingRight: s.side,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: place === "top" ? "flex-start" : place === "bottom" ? "flex-end" : "center",
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Sahnalar uchun umumiy o'lchamlar — vertikal va kvadrat uchun boshqacha. */
export function metrics(aspect: Aspect) {
  const square = aspect === "square";
  return {
    square,
    /**
     * Telefon ekranining kengligi.
     *
     * Balandligi × 2.164 (1170:2532). Vertikalda xavfsiz zonalardan keyin
     * ~1250 px qoladi: 370 px kenglik (≈800 px balandlik) tepada sarlavhaga
     * ~300 px, pastda shtampga ~150 px joy qoldiradi.
     */
    phone: square ? 270 : 370,
    /** Sarlavha o'lchami. */
    title: square ? 62 : 86,
    /** Kichik matn. */
    body: square ? 34 : 44,
    /** Subtitr pastdan qancha balandda. */
    subBottom: square ? 44 : 300,
    /** Kontent markazining vertikal siljishi. */
    shiftY: square ? 0 : -60,
  };
}
