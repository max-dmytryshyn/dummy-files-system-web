import React from "react";
import {
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import VirtualElement from "types/virtualElement";
import MenuItemInfo from "types/menuItemInfo";

interface DirectoryContentContextMenuProps {
  anchorRef: React.MutableRefObject<VirtualElement | null>;
  isOpen: boolean;
  handleClose: () => void;
  menuItems: MenuItemInfo[];
}

const DirectoryContentContextMenu: React.FC<
  DirectoryContentContextMenuProps
> = ({ anchorRef, isOpen, handleClose, menuItems }) => {
  return (
    <Popper open={isOpen} anchorEl={anchorRef.current} placement="bottom-start">
      <Paper>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {menuItems.map((menuItem) => (
              <MenuItem onClick={menuItem.action} key={menuItem.name}>
                {menuItem.label}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Paper>
    </Popper>
  );
};

export default DirectoryContentContextMenu;
