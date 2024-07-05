import { useContextSelector } from "use-context-selector";
import { TogglersContext } from "./togglersProvider";
import { Dispatch, SetStateAction } from "react";

export const useTogglersValue = (selector: (v: any) => boolean) =>
	useContextSelector(TogglersContext, selector);

export const useTogglersHandler = (
	selector: (v: any) => Dispatch<SetStateAction<boolean>>
) => useContextSelector(TogglersContext, selector);
