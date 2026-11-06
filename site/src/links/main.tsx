import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import LinksPage from "./LinksPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LinksPage />
  </StrictMode>,
);
