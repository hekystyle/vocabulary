import { useSelector } from "react-redux";
import { AppState } from "reducer";

export function useTypedSelector<T = unknown>(
  selector: (state: AppState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  return useSelector(selector, equalityFn);
}
