import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { notification } from "antd";

export const rtkQueryErrorHandler: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errors = action?.meta?.baseQueryMeta?.response?.errors;
    notification.error({
      message: (
        <ul className="m-0">
          {errors.map((error: any, i: number) => (
            <li key={i}>{error.message as string}</li>
          ))}
        </ul>
      ),
    });
  }

  return next(action);
};
