import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Detta är TS/Vite-motsvarigheten till din pom.xml + spring-boot-maven-plugin:
// den beskriver hur projektet byggs och paketeras. Ingen "parent" att ärva från
// som spring-boot-starter-parent - varje verktyg (tsc, vite) konfigureras separat.
export default defineConfig({
  plugins: [react()],
});
