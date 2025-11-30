import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { FavoriteProvider } from "./context/FavoriteContext";
import { WatchedProvider } from "./context/WatchedContext";
import { CommunityProvider } from "./context/CommunityContext";  // ⭐ THÊM MỚI

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CommunityProvider>                {/* ⭐ BẮT BUỘC */}
      <FavoriteProvider>
        <WatchedProvider>
          <App />
        </WatchedProvider>
      </FavoriteProvider>
    </CommunityProvider>
  </React.StrictMode>
);
