import { useMediaQuery } from "@material-ui/core";

export const useCheckSmallScreen = () => {
  return useMediaQuery("(max-width:580px)");
};

export const debounce = <F extends (...params: any[]) => void>(
  func: F,
  waitTime: number
): F => {
  let timeout: NodeJS.Timeout;
  return function returnedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      return func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, waitTime);
  } as F;
};

export function isNumeric(str: string) {
  if (typeof str != "string") return false;
  return !isNaN(parseFloat(str));
}
