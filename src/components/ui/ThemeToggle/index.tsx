import * as React from "react";
import { clsx } from "clsx";
import { Sun, Moon } from "lucide-react";
import messages from "./messages";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default" | "lg";
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, size = "default" }, ref) => {
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);
      if (shouldUseDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    }, []);

    const toggleTheme = () => {
      const newIsDark = !isDark;
      setIsDark(newIsDark);

      if (newIsDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    const sizeClasses = {
      sm: "w-8 h-8",
      default: "w-10 h-10",
      lg: "w-12 h-12",
    };

    const iconSize = {
      sm: 14,
      default: 16,
      lg: 18,
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleTheme}
        className={clsx(
          "relative transition-colors duration-300 ",
          "flex items-center justify-center",
          sizeClasses.sm,
          className
        )}
        aria-label={
          isDark ? messages.light.defaultMessage : messages.dark.defaultMessage
        }
      >
        {/* Moon (shown in light mode) */}
        <Moon
          size={iconSize[size]}
          className={clsx(
            "absolute transition-all text-blue-950 duration-300 transform ",
            isDark
              ? "opacity-0 scale-75 pointer-events-none"
              : "opacity-100 scale-100"
          )}
        />

        {/* Sun (shown in dark mode) */}
        <Sun
          size={iconSize[size]}
          className={clsx(
            "absolute transition-all text-yellow-500 duration-300 transform",
            isDark
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75 pointer-events-none"
          )}
        />
      </button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
