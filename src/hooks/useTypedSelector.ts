import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "reducer";

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
