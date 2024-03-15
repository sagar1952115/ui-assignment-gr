import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));

useThemeStore.subscribe((state) => {
  sessionStorage.setItem("theme", JSON.stringify(state));
});

export default useThemeStore;
