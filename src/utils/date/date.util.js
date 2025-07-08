import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

const formatRelativeTime = (date) => {
  return dayjs(date).fromNow();
};

const formatDate = (selectedDate) => {
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // formato: YYYY-MM-DD
};

const formatTime = (dateObj) => {
  const hour = dateObj.getHours().toString().padStart(2, "0");
  const minute = dateObj.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
};
const formatDateFromDB = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default {
  formatRelativeTime,
  formatDate,
  formatTime,
  formatDateFromDB,
};
