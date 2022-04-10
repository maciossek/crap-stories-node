import ApiError from "../exception/ApiError";
import config from "../config/env";
import consola from "consola";

export default (err, req, res, next) => {
  const apiError = new ApiError(err.message, err.status, err.stack);

  consola.error(apiError);

  if (res.headersSent) {
    return next(apiError);
  }

  res
    .status(apiError.status)
    .json({
      status: apiError.status,
      message: apiError.message,
      ...(config.env === "development" && { stack: apiError.stack }),
    })
    .end();
};
