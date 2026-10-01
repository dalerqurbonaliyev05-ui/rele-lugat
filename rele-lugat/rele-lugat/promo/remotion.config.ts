import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setConcurrency(4);
/* Reels/TikTok uchun yetarli sifat, fayl hajmi esa katta emas. */
Config.setCrf(18);
Config.setChromiumOpenGlRenderer("angle");
Config.overrideWebpackConfig((c) => c);
