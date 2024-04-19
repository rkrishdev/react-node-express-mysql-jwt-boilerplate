import { add, endOfDay, getUnixTime } from "date-fns";
import { toZonedTime } from "date-fns-tz";

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
