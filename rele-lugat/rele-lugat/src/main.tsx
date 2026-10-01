import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initPwa } from "./pwa";
import "./styles.css";

// Render'dan OLDIN: `beforeinstallprompt` sahifa yuklanishi bilanoq kelishi mumkin.
initPwa();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
