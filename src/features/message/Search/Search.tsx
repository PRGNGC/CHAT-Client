import styles from "./Search.module.scss";
import { SearchGlassSvg } from "@/shared/ui/SearchGlassSvg";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

export function Search() {
	const [searchParams, setSearchParams] = useSearchParams();
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.value === "") {
			searchParams.delete("search");
			setSearchParams(searchParams);
			return;
		}
		setSearchParams({ search: e.target.value });
	}

	return (
		<div className={styles.searchBlock}>
			<SearchGlassSvg />
			<input
				className={styles.inputSearch}
				type="search"
				placeholder="Search"
				onChange={handleChange}
			/>
		</div>
	);
}
