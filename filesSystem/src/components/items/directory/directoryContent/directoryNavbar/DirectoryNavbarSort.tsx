import React from "react";
import { Select, SelectChangeEvent, MenuItem, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { SortableField, SortableFields } from "types/constants";
import variableNameToHumanText from "utils/variableNameToHumanText";

interface DirectoryNavbarSortProps {
  sortField: SortableField;
  onSortFieldChange: (e: SelectChangeEvent<SortableField>) => void;
  isDesc: boolean;
  onIsDescChange: () => void;
}

const DirectoryNavbarSort: React.FC<DirectoryNavbarSortProps> = ({
  sortField,
  onSortFieldChange,
  isDesc,
  onIsDescChange,
}) => {
  return (
    <>
      <Select
        labelId="sort-by-label"
        size={"small"}
        id="sort-by"
        value={sortField}
        sx={{ width: "128px" }}
        onChange={onSortFieldChange}
      >
        {SortableFields.map((sortableField) => {
          return (
            <MenuItem value={sortableField} key={sortableField}>
              {variableNameToHumanText(sortableField)}
            </MenuItem>
          );
        })}
      </Select>
      <IconButton color="inherit" onClick={onIsDescChange}>
        {isDesc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </IconButton>
    </>
  );
};

export default DirectoryNavbarSort;
