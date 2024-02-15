import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { orderBy } from "lodash";
import {
  AppBar,
  Toolbar,
  IconButton,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SortableField } from "types/constants";
import { ItemInList } from "types/items";
import getErrorDetails from "utils/getErrorDetails";
import { searchInDirectory } from "services/api/directory";
import DirectoryNavbarSort from "components/items/directory/directoryContent/directoryNavbar/DirectoryNavbarSort";
import DirectoryNavbarSearch from "components/items/directory/directoryContent/directoryNavbar//DirectoryNavbarSearch";

interface DirectoryNavbarProps {
  name: string;
  absolutePath: string;
  goBackDisabled: boolean;
  onGoBack: () => void;
  setItems: React.Dispatch<React.SetStateAction<ItemInList[]>>;
  items: ItemInList[];
  directoryItems: ItemInList[];
  isSearchView: boolean;
  setIsSearchView: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DirectoryNavbar: React.FC<DirectoryNavbarProps> = ({
  name,
  absolutePath,
  goBackDisabled,
  onGoBack,
  setItems,
  items,
  directoryItems,
  isSearchView,
  setIsSearchView,
  setIsLoading,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [sortField, setSortField] = useState<SortableField>("createdAt");
  const [isDesc, setIsDesc] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [title, setTitle] = useState<string>(name ? name : "root");

  const handleSort = (
    items: ItemInList[],
    sortField: SortableField,
    isDesc: boolean,
  ) => {
    const sortedItems = orderBy(items, sortField, isDesc ? "desc" : "asc");
    setItems(sortedItems);
  };

  useEffect(() => {
    handleSort(directoryItems, sortField, isDesc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directoryItems]);

  const onIsDescChange = (): void => {
    handleSort(items, sortField, !isDesc);
    setIsDesc(!isDesc);
  };

  const onSortFieldChange = (e: SelectChangeEvent<SortableField>): void => {
    const value = e.target.value as SortableField;
    setSortField(value);
    handleSort(items, value, isDesc);
  };

  const onSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setSearchKeyword(e.target.value);
  };

  const onSearch = (): void => {
    if (searchKeyword.length === 0) {
      return;
    }
    setIsLoading(true);
    searchInDirectory(searchKeyword, absolutePath)
      .then((response) => {
        handleSort(response.data, sortField, isDesc);
        setIsSearchView(true);
        setTitle(
          `Search results in ${name ? name : "root"} for ${searchKeyword} `,
        );
      })
      .catch((error) => {
        enqueueSnackbar(getErrorDetails(error), { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onGoBackFromSearch = () => {
    handleSort(directoryItems, sortField, isDesc);
    setIsSearchView(false);
    setTitle(name ? name : "root");
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      variant={"outlined"}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          onClick={isSearchView ? onGoBackFromSearch : onGoBack}
          disabled={goBackDisabled && !isSearchView}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          noWrap
          variant={"h5"}
          textAlign={"center"}
          sx={{ marginLeft: "4px", marginRight: "4px" }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <DirectoryNavbarSearch
            searchKeyword={searchKeyword}
            onSearchKeywordChange={onSearchKeywordChange}
            onSearch={onSearch}
          />
          <DirectoryNavbarSort
            sortField={sortField}
            onSortFieldChange={onSortFieldChange}
            isDesc={isDesc}
            onIsDescChange={onIsDescChange}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DirectoryNavbar;
