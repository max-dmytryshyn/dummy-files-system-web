import React from "react";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface DirectoryNavbarSearchProps {
  searchKeyword: string;
  onSearchKeywordChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSearch: () => void;
}

const DirectoryNavbarSearch: React.FC<DirectoryNavbarSearchProps> = ({
  searchKeyword,
  onSearchKeywordChange,
  onSearch,
}) => {
  return (
    <TextField
      id="search"
      label="Search"
      variant="outlined"
      size={"small"}
      style={{ marginRight: "16px" }}
      value={searchKeyword}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onSearchKeywordChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch();
        }
      }}
    />
  );
};

export default DirectoryNavbarSearch;
