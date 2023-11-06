import { useRouter } from "next/navigation";
import {Box, List } from "@mui/material";
import NavGroup from "./NavGroup/NavGroup";
import NavItem from "./NavItem/index";

interface SidebarItemsProps {
  menuItems: any[];
}
const SidebarItems = ({ menuItems }: SidebarItemsProps) => {
  const router = useRouter();

  const MenuItemArray = Array.isArray(menuItems)
    ? menuItems
    : Object.values(menuItems);

  return (
    <>
      {MenuItemArray && (
        <Box sx={{ px: 3 }}>
          <List sx={{ pt: 0 }} className="sidebarNav" component="div">
            {MenuItemArray.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
              } else {
                return (
                  <NavItem
                    item={item}
                    key={item.id}
                    pathDirect={router.toString()}
                  />
                );
              }
            })}
          </List>
        </Box>
      )}
    </>
  );
};
export default SidebarItems;
