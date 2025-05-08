// Constants
import { MESSAGECOOLDOWN } from "../constants/Constants";

export const checkDateDifference = serverTimestamp => {
  const todayDate = new Date();
  const serverTimestampDate = new Date(serverTimestamp.toDate())
  // Get difference in days
  const diffTime = Math.abs(todayDate - serverTimestampDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  // console.log(diffDays);
  // If difference in days is more than the message cooldown, return true
  if (diffDays < MESSAGECOOLDOWN) return false;
  return true;
};
