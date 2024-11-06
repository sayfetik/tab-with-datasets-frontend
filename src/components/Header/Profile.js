import { Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { useUserProfile } from "../../useUserProfile";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "../../keycloak";

export const ProfileSection = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const authenticated = keycloak.authenticated;
  const [opened, setOpened] = useState(false);
  const userProfile = useUserProfile();

  const toUploadRequests = () => {
    navigate("/uploadRequests");
  };

  const toMain = () => {
    navigate("/");
  };

  const toUpload = () => {
    navigate("/upload");
  };

  if (!keycloak) {
    return null;
  }

  if (!authenticated) {
    return (
      <button
        className="whiteBlueButton"
        onClick={() => keycloak.login()}
        style={{ padding: "8px 40px", marginRight: "30px" }}
      >
        Войти
      </button>
    );
  }

  return (
    <Menu
      width="target"
      trigger="hover"
      opened={opened}
      onChange={setOpened}
      classNames={{
        item: "menuItem",
        itemLabel: "menuItemLabel",
        dropdown: "menuDropdown",
      }}
    >
      <Menu.Target>
        <div className="userDropdown">
          {userProfile?.email}
          <IconChevronDown />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={toMain}>На главную</Menu.Item>
        <Menu.Item onClick={toUpload}>Загрузить датасет</Menu.Item>
        <Menu.Item onClick={toUploadRequests}>Заявки на загрузку</Menu.Item>
        <Menu.Item onClick={() => keycloak?.logout()}>Выйти</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
