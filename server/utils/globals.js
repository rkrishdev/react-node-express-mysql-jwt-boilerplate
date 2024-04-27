import { add, endOfDay, getUnixTime } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const convertToRoleData = (value) => {
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
        break;
      case "hr":
        roleData = 2;
        break;
      case "accounts":
        roleData = 3;
        break;
      case "dma":
        roleData = 4;
        break;
      case "employee":
        roleData = 5;
        break;

      default:
        break;
    }
  }

  return roleData;
};

export function dateTimeHandler(value, type, action) {
  if (!value || !type || !action) {
    return null;
  }

  const timeZone = "Asia/Kolkata";

  try {
    if (type === "seconds") {
      if (action === "inc") {
        const currentDate = toZonedTime(new Date(), timeZone);
        const finalDate = add(currentDate, { seconds: value });
        return getUnixTime(finalDate) - getUnixTime(currentDate);
      }
    }

    if (type === "daysEnd") {
      if (action === "inc") {
        const currentDate = toZonedTime(new Date(), timeZone);
        const incrementedDate = add(currentDate, { days: value });
        const finalDate = endOfDay(incrementedDate);
        return getUnixTime(finalDate) - getUnixTime(currentDate);
      }
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

export function sendSuccessResponse(req, res, message, data) {
  const auth = {};
  const { authenticated, accessToken, refreshToken, userData } = req;
  if (authenticated) {
    auth.authenticated = authenticated;
  }
  if (accessToken) {
    auth.accessToken = accessToken;
  }
  if (refreshToken) {
    auth.refreshToken = refreshToken;
  }
  if (userData) {
    auth.user = userData;
  }
  return res.json({
    success: true,
    auth: auth,
    message: message ? message : "",
    data: data ? data : null,
    error: null,
  });
}

export function sendErrorResponse(req, res, code, errorMsg, data) {
  const statusCode = code ? code : 500;
  const errorMessage = errorMsg ? errorMsg : "Error in server!";
  return res.status(statusCode).json({
    success: false,
    message: "",
    auth: null,
    data: data ? data : null,
    error: {
      code: statusCode,
      message: errorMessage,
    },
  });
}
