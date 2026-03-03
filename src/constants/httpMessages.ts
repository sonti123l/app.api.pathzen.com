export const HTTP_MESSAGES = {
  OK: "Request successful",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",

  BAD_REQUEST: "Invalid request data",
  UNAUTHORIZED: "Authentication required",
  FORBIDDEN: "You do not have permission",
  NOT_FOUND: "Resource not found",
  CONFLICT: "Resource already exists",
  VALIDATION_ERROR: "Validation failed",

  INTERNAL_SERVER_ERROR: "Something went wrong",
  SERVICE_UNAVAILABLE: "Service temporarily unavailable",
} as const;
