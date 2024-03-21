import {
  BookOpenIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MonitorIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import { GithubLogo, XLogo } from "@/components/icons/logos";

export const Pages = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    name: "Documentation",
    href: "/docs",
    icon: BookOpenIcon,
  },
];

export const ChangeTheme = [
  {
    name: "Light Theme",
    param: "light",
    icon: SunIcon,
  },
  {
    name: "Dark Theme",
    param: "dark",
    icon: MoonIcon,
  },
  {
    name: "System Theme",
    param: "system",
    icon: MonitorIcon,
  },
];

export const SocialPages = [
  {
    name: "X (Twitter)",
    href: "https://twitter.com/pheralb_",
    icon: XLogo,
  },
  {
    name: "GitHub Repository",
    href: "https://github.com/pheralb/slug",
    icon: GithubLogo,
  },
];
