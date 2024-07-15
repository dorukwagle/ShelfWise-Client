import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";


interface Props {
    size?: number,
    onChange?: (theme?: string) => void;
}

const Toggle = ({size=32, onChange}: Props) => {
    const [theme, setTheme] = useState<"light" | "dark">(localStorage.getItem("theme")  === "light" ? "light" : "dark");
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
    />
  );
}

export default Toggle;