import { format } from "date-fns";
export const formatDate = (date: Date) => {
    // Return "23 January 2021"
  return format(date, "dd MMMM, yyyy");
};
