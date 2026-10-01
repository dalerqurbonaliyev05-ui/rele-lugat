import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "uz.relelugat.app",
  appName: "Rele Lug'at",

  // `npm run build` natijasi. Workflow `cap sync` dan oldin build qiladi.
  webDir: "dist",
  android: {
    allowMixedContent: false,
    backgroundColor: "#0d3d99",
  },
  server: {
    androidScheme: "https",
  },
};

export default config;
