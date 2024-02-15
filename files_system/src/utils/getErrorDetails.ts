const getErrorDetails = (error: any): string => {
  return error?.response?.data?.detail || "Unexpected error occurred";
};
export default getErrorDetails;
