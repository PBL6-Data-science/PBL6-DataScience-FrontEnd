import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  IconButton,
  styled,
  Stack,
  Paper,
  Popover,
  Tooltip,
  Chip,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ApprovalIcon from "@mui/icons-material/Approval";

interface DataItem {
  [key: string]: any;
}

interface TableColumn {
  label: string;
  field: keyof DataItem;
  render?: (value: any) => React.ReactNode;
  width?: string;
  centered?: boolean;
  type?: string;
}

interface CustomTableProps {
  data: DataItem[];
  tableHeaders: TableColumn[];
  title: string;
  identifierField: keyof DataItem;
  onDelete: (itemId: any) => void;
  onUpdate: (itemId: any) => void;
  onApprove?: (itemId: any) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: "12px",
  fontWeight: "bold",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100px",
  fontFamily: theme.typography.fontFamily,
  borderRadius: "8px",
}));

const CustomTable = ({
  data,
  tableHeaders,
  title,
  identifierField,
  onDelete,
  onUpdate,
  onApprove,
}: CustomTableProps) => {
  const [sortedField, setSortedField] = useState<keyof DataItem | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<String | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSort = (field: keyof DataItem) => {
    if (sortedField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedField(field);
      setSortOrder("asc");
    }
  };

  const getSortedData = () => {
    if (!sortedField) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortedField];
      const bValue = b[sortedField];

      if (sortOrder === "asc") {
        return aValue.toString().localeCompare(bValue.toString());
      } else {
        return bValue.toString().localeCompare(aValue.toString());
      }
    });
  };

  const sortedData = getSortedData();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(sortedData.length / rowsPerPage) - 1)
    );
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    itemId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const openPopover = Boolean(anchorEl);

  return (
    <Paper
      sx={{
        width: {
          xs: "300px",
          sm: "100%",
        },
        overflowX: "auto",
        padding: 3,
        margin: 3,
        borderRadius: "12px",
      }}
    >
      {title ? <Typography variant="h5">{title}</Typography> : ""}
      <TableContainer
        sx={{
          margin: "auto",
          mt: 4,
          width: "100%",
          border: "2px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <Table aria-label="sortable table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header: TableColumn) => (
                <StyledTableCell
                  key={header.field}
                  sx={{ width: header.width, height: "50px" }}
                >
                  <Typography
                    color="Secondary"
                    variant="h6"
                    onClick={() => handleSort(header.field)}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {header.label}
                  </Typography>
                </StyledTableCell>
              ))}
              <StyledTableCell sx={{ width: "100px", textAlign: "center" }}>
                <Typography variant="h6">Actions</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item: any, index: any) => (
                <TableRow key={index}>
                  {tableHeaders.map((header: TableColumn) => (
                    <StyledTableCell
                      key={header.field}
                      sx={{
                        maxWidth: header.width,
                        width: header.width,
                        textAlign: header.centered ? "center" : "left",
                        fontSize: "0.85rem",
                        height: "65px",
                      }}
                    >
                      {header.type === "chip" ? (
                        <Chip label={item[header.field]} color="primary" />
                      ) : header.render ? (
                        header.render(item[header.field])
                      ) : (
                        item[header.field] || "-"
                      )}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell sx={{ width: "100px", textAlign: "center" }}>
                    <IconButton
                      onClick={(e) =>
                        handlePopoverOpen(e, item[identifierField])
                      }
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack sx={{ padding: 2 }} direction="row">
          {onApprove && (
            <Tooltip title="Approve">
              <IconButton onClick={() => onApprove(selectedItemId)}>
                <ApprovalIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Update">
            <IconButton onClick={() => onUpdate(selectedItemId)}>
              <SecurityUpdateGoodIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(selectedItemId)}>
              <DeleteForeverRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Popover>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={() => (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            spacing={1}
            direction="row"
          >
            <IconButton
              onClick={handlePreviousPage}
              disabled={page === 0}
              aria-label="previous page"
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              onClick={handleNextPage}
              disabled={page >= Math.ceil(sortedData.length / rowsPerPage) - 1}
              aria-label="next page"
            >
              <NavigateNextIcon />
            </IconButton>
          </Stack>
        )}
        sx={{
          marginTop: 2,
        }}
      />
    </Paper>
  );
};

export default CustomTable;
