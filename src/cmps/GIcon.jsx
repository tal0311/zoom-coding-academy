import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

const iconMap = {
  Home: HomeIcon,
  Menu: MenuIcon,
  Settings: SettingsIcon,
};

const GIcon = ({ iconName, ...props }) => {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    return <span>Icon not found</span>; // Fallback if the icon name is invalid
  }

  return <IconComponent {...props} />;
};



export default GIcon;
