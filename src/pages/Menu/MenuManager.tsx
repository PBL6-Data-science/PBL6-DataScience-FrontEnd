import CheckBoxTable from "@/customize/components/customer/CheckBoxTable";
import CustomizedDialog from "@/customize/components/customer/CustomizedDialog";
import NotificationCard from "@/customize/components/customer/Notification";
import DashboardCard from "@/customize/components/shared/DashboardCard";
import { convertJsonToList } from "@/service/Helper/helper";
import MenuService from "@/service/Service/Menu/MenuService";
import { Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface MenuRoleItem {
  id: number;
  nameMenu: string;
  nameRole: string;
  canAccess: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const mapToMenuRole = (item: any) => {
  return {
    id: item.menuRoleId,
    nameMenu: item.mnuName.toString(),
    nameRole: item.arName.toString(),
    canAccess: item.mnuCanAccess,
    canAdd: item.mnuCanAdd,
    canEdit: item.mnuCanEdit,
    canDelete: item.mnuCanDelete,
  };
};

const MenuManagerPage: React.FC = () => {
  const router = useRouter();
  const menuService = useMemo(() => MenuService(), []);
  const [menuRoleItems, setMenuRoleItems] = useState<MenuRoleItem[]>([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    success: boolean;
    title: string;
  }>({ open: false, success: false, title: "" });
  const fetchMenuRoleItems = useCallback(async () => {
    try {
      await menuService
        .getAllMenuRole()
        .then((res) => {
          setMenuRoleItems(convertJsonToList(res.response.data, mapToMenuRole));
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  }, [menuService]);

  useEffect(() => {
    fetchMenuRoleItems();
  }, [fetchMenuRoleItems]);

  const handleCheckboxChange = (id: number, accessType: keyof MenuRoleItem) => {
    setMenuRoleItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [accessType]: !item[accessType] } : item
      )
    );
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirm = () => {
    handleSaveChanges();
    handleCloseConfirmationDialog();
  };

  const handleCancel = () => {
    handleCloseConfirmationDialog();
  };

  const handleSaveChanges = async () => {
    handleOpenConfirmationDialog();

    const convertToNewStructure = (oldObject: MenuRoleItem) => {
      return {
        menuRoleId: oldObject.id,
        mnuName: oldObject.nameMenu,
        arName: oldObject.nameRole,
        mnuCanAccess: oldObject.canAccess,
        mnuCanAdd: oldObject.canAdd,
        mnuCanEdit: oldObject.canEdit,
        mnuCanDelete: oldObject.canDelete,
        menuRoleDelFlg: false,
      };
    };

    const menuRoleItemsUpdate = menuRoleItems.map(convertToNewStructure);

    await menuService
      .updateMenuRole(menuRoleItemsUpdate)
      .then((res) => {
        setNotification({
          open: true,
          success: true,
          title: "Create Successfull",
        });
      })
      .catch((error) => {
        setNotification({
          open: true,
          success: false,
          title: "Create Successfull",
        });
      });
  };

  return (
    <DashboardCard title="News Management">
      <>
        <CheckBoxTable
          rows={menuRoleItems}
          onCheckboxChange={handleCheckboxChange}
        />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          mt={6}
        >
          <Button
            type="reset"
            variant="outlined"
            color="warning"
            sx={{ marginRight: 3.5 }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenConfirmationDialog}
          >
            Save Changes
          </Button>
        </Stack>
        <CustomizedDialog
          open={confirmationDialogOpen}
          onClose={handleCloseConfirmationDialog}
          title="Confirm Submission"
          content="Are you sure you want to submit the form?"
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          onPrimaryButtonClick={handleConfirm}
          onSecondaryButtonClick={handleCancel}
        />
        <NotificationCard
          open={notification.open}
          onClose={() => {
            setNotification({ open: false, success: false, title: "" });
            router.refresh();
          }}
          success={notification.success}
          title={notification.title}
        />
      </>
    </DashboardCard>
  );
};

export default MenuManagerPage;
