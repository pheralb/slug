import IconButton from "@/ui/iconButton";
import { useTheme } from "next-themes";

import { BiSun, BiMoon } from "react-icons/bi";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <IconButton
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      icon={theme === "light" ? <BiMoon size={22} /> : <BiSun size={22} />}
    />
  );
};

export default Theme;
