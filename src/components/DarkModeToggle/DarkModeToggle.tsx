import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";


type Theme = "light" | "dark";

interface Props {
    size?: number,
    onChange?: (theme: Theme) => void;
    darkColor?: string;
    lightColor?: string;
}

const DarkModeToggle = ({size=32, onChange, darkColor="white", lightColor= "black"}: Props) => {
    const [theme, setTheme] = useState<Theme>(localStorage.getItem("theme")  === "light" ? "light" : "dark");
    const onThemeChange = () => {
        const newTheme = theme == "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        onChange && onChange(newTheme);
    };

  return (
    <ToggleSwitch 
    checked={theme === "dark"} 
    onChange={onThemeChange}
    size={size}
    moonColor={darkColor}
    sunColor={lightColor}
    />
  );
}

export default DarkModeToggle;