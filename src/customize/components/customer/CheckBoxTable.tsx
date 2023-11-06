import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Divider,
  Chip,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderRight: `2px solid ${theme.palette.divider}`,
  borderTop: `2px solid ${theme.palette.divider}`,
  borderBottom: `2px solid ${theme.palette.divider}`,
  padding: "10px",
  fontSize: "14px",

  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100px",
  fontFamily: theme.typography.fontFamily,
  textAlign: "center",
}));

interface MenuRoleItem {
  id: number;
  nameMenu: string;
  nameRole: string;
  canAccess: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

interface CheckBoxTableProps {
  rows: MenuRoleItem[];
  onCheckboxChange: (id: number, accessType: keyof MenuRoleItem) => void;
}

const CheckBoxTable: React.FC<CheckBoxTableProps> = ({
  rows,
  onCheckboxChange,
}) => {
  const renderGroupedRows = () => {
    const groupedRows: { [key: string]: MenuRoleItem[] } = {};

    rows.forEach((row) => {
      if (!groupedRows[row.nameRole]) {
        groupedRows[row.nameRole] = [];
      }
      groupedRows[row.nameRole].push(row);
    });

    const renderedRows: JSX.Element[] = [];

    Object.entries(groupedRows).forEach(([groupName, groupItems], index) => {
      renderedRows.push(
        <Chip
          label={groupName}
          sx={{ marginTop: 2, marginBottom: 2 }}
          color="primary"
        />
      );

      groupItems.forEach((item) => {
        renderedRows.push(
          <TableRow key={item.id} sx={{ textAlign: "center" }}>
            <StyledTableCell>{item.id}</StyledTableCell>
            <StyledTableCell>{item.nameMenu}</StyledTableCell>
            <StyledTableCell>
              <Checkbox
                checked={item.canAccess}
                color="primary"
                onChange={() => onCheckboxChange(item.id, "canAccess")}
              />
            </StyledTableCell>
            <StyledTableCell>
              <Checkbox
                checked={item.canAdd}
                color="primary"
                onChange={() => onCheckboxChange(item.id, "canAdd")}
              />
            </StyledTableCell>
            <StyledTableCell>
              <Checkbox
                checked={item.canEdit}
                color="primary"
                onChange={() => onCheckboxChange(item.id, "canEdit")}
              />
            </StyledTableCell>
            <StyledTableCell>
              <Checkbox
                checked={item.canDelete}
                color="primary"
                onChange={() => onCheckboxChange(item.id, "canDelete")}
              />
            </StyledTableCell>
          </TableRow>
        );
      });
    });

    return renderedRows;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "1400px",
        whiteSpace: "nowrap",
        mt: 4,
        margin: "auto",
        border: "3px solid #ddd",
        borderRadius: "22px",
        textAlign: "center",
      }}
    >
      <Table>
        <TableHead
          sx={{
            height: "70px",
          }}
        >
          <TableRow sx={{ textAlign: "center", fontWeight: "bold" }}>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name Menu</StyledTableCell>
            <StyledTableCell>Access</StyledTableCell>
            <StyledTableCell>Add</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderGroupedRows()}</TableBody>
      </Table>
    </TableContainer>
  );
};
export default CheckBoxTable;
