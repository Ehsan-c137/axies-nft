import { Button } from "@ui/button";
import SunIcon from "@icons/sun-icon";
import MoonIcon from "@icons/moon-icon";
import { useTheme } from "@/context/theme/theme-context";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      aria-label="toggle-theme"
      className="w-10 h-10 px-0 relative flex justify-center overflow-x-hidden"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon
        className="w-10 absolute left-1/2 transition-all duration-300 ease-in-out"
        style={{
          transform: theme === "dark" ? "translateX(-50%)" : "translateX(200%)",
        }}
      />
      <MoonIcon
        className="w-10 absolute left-1/2 transition-transform duration-300"
        style={{
          transform:
            theme === "light" ? "translateX(-50%)" : "translateX(200%)",
        }}
      />
    </Button>
  );
}
