import { create } from "zustand";

// Create a Zustand store for managing themes
const useThemeStore = create((set) => ({
  theme: "light", // Initialize theme to 'light'
  setTheme: (theme) => set({ theme }),
}));

useThemeStore.subscribe(
  (state) => {
    sessionStorage.setItem("theme", JSON.stringify(state));
  }
  // Specify which parts of the state to subscribe to
);

export default useThemeStore;
