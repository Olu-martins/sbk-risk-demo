import {
  MdOutlineHome,
  MdOutlineLibraryBooks,
  MdOutlineStore,
  MdOutlineShield,
  MdOutlineFactCheck,
  MdOutlineSource,
  MdOutlineEngineering
} from "react-icons/md";

interface MenuItemType {
  title: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

export const sideMenu: MenuItemType[] = [
  {
    title: "Dashboard",
    icon: <MdOutlineHome color="#5A5654" size={22} />,
    activeIcon: <MdOutlineHome color="#F7F7F2" size={22} />,
    path: "/dashboard",
  },
  {
    title: "Business Context",
    icon: <MdOutlineLibraryBooks color="#5A5654" size={22} />,
    activeIcon: <MdOutlineLibraryBooks color="#F7F7F2" size={22} />,
    path: "/dashboard/business-context",
  },
  {
    title: "Assets Inventory",
    icon: <MdOutlineStore color="#5A5654" size={22} />,
    activeIcon: <MdOutlineStore color="#F7F7F2" size={22} />,
    path: "/dashboard/assets-inventory",
  },
  {
    title: "Risk Management",
    icon: <MdOutlineShield color="#5A5654" size={22} />,
    activeIcon: <MdOutlineShield color="#F7F7F2" size={22} />,
    path: "/dashboard/risk-assesment",
  },
  {
    title: "Policy Checklist",
    icon: <MdOutlineFactCheck color="#5A5654" size={22} />,
    activeIcon: <MdOutlineFactCheck color="#F7F7F2" size={22} />,
    path: "/dashboard/policy-checklist",
  },
  {
    title: "Education",
    icon: <MdOutlineSource color="#5A5654" size={22} />,
    activeIcon: <MdOutlineSource color="#F7F7F2" size={22} />,
    path: "/dashboard/education",
  },
  {
    title: "Engineering",
    icon: <MdOutlineEngineering color="#5A5654" size={22} />,
    activeIcon: <MdOutlineEngineering color="#F7F7F2" size={22} />,
    path: "/dashboard/engineering",
  },
  
];
