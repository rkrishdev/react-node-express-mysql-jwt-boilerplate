export const convertToRoleData = (
  value: string | number,
  returnType?: string
) => {
  if (!value) {
    return null;
  }

  let roleData;

  if (typeof value == "number") {
    switch (value) {
      case 1:
        roleData = "admin";
        break;
      case 2:
        roleData = "hr";
        break;
      case 3:
        roleData = "accounts";
        break;
      case 4:
        roleData = "dma";
        break;
      case 5:
        roleData = "employee";
        break;

      default:
        break;
    }
  } else if (typeof value == "string") {
    switch (value) {
      case "admin":
        roleData = 1;
        if (returnType && returnType === "string") {
          roleData = "admin";
        }
        break;
      case "hr":
        roleData = 2;
        if (returnType && returnType === "string") {
          roleData = "hr";
        }
        break;
      case "accounts":
        roleData = 3;
        if (returnType && returnType === "string") {
          roleData = "accounts";
        }
        break;
      case "dma":
        roleData = 4;
        if (returnType && returnType === "string") {
          roleData = "dma";
        }
        break;
      case "employee":
        roleData = 5;
        if (returnType && returnType === "string") {
          roleData = "employee";
        }
        break;

      default:
        break;
    }
  }

  return roleData;
};
