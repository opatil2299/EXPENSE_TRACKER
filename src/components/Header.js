import { Card, Group, Text } from "@mantine/core";

import React from "react";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Card shadow="md" p={20} withBorder>
        <div className="flex justify-between">
          <Text size="xl" color="teal" weight="bold">
            EXPENSE TRACKER
          </Text>
          <Group>
            {user?.name}
            <i
              className="ri-logout-circle-r-line"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            ></i>
          </Group>
        </div>
      </Card>
    </div>
  );
}

export default Header;
