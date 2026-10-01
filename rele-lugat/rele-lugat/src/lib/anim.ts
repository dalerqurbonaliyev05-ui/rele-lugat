/** Animatsiya yordamchilari: sanab chiqish, harakatni kamaytirish, ko'rinuvchanlik. */
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "./fx";

/** `prefers-reduced-motion` ni kuzatadi. */
export function useReducedMotion(): boolean {
  const [v, setV] = useState(reducedMotion);
  useEffect(() => {
    let mq: MediaQueryList;
    try {
      mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    } catch {
      return;
    }
    const h = () => setV(mq.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);
  return v;
}

/**
 * 0 dan `to` gacha sanab chiqadi (ease-out). Harakat kamaytirilgan bo'lsa
 * darhol oxirgi qiymatni qaytaradi.
 */
export function useCountUp(to: number, ms = 800, decimals = 0): number {
  const reduce = useReducedMotion();
  const [v, setV] = useState(() => (reduce ? to : 0));
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduce || !Number.isFinite(to)) {
      setV(to);
      return;
    }
    const start = performance.now();
    const from = 0;
    const p = 10 ** decimals;

    const step = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      const eased = 1 - (1 - k) ** 3; // ease-out cubic
      setV(Math.round((from + (to - from) * eased) * p) / p);
      if (k < 1) raf.current = requestAnimationFrame(step);
      else raf.current = null;
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [to, ms, decimals, reduce]);

  return v;
}

/** Element ekranda ko'rinadimi — ko'rinmaganda animatsiyalarni to'xtatish uchun. */
export function useInView<T extends Element>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { rootMargin: "80px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}
