import { Dispatch, SetStateAction } from "react";

interface IBellSvg {
	onClose: Dispatch<SetStateAction<boolean>>;
}

export function BellSvg({ onClose }: IBellSvg) {
	return (
		<svg
			onClick={() => onClose((prev) => !prev)}
			width="24"
			height="32"
			viewBox="0 0 24 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ cursor: "pointer" }}
		>
			<path
				d="M11.3511 5.49255C22.8654 5.49257 19.7654 22.0997 19.7654 22.0997L23.7511 26.5283V27.6354H0.279663V26.5283L4.04395 22.0997C4.04395 22.0997 -0.163195 5.49254 11.3511 5.49255Z"
				fill="black"
			/>
			<path
				d="M13.1225 29.859C13.1225 30.5979 12.5277 31.1783 11.7939 31.1783C11.0602 31.1783 10.4653 30.5979 10.4653 29.859C10.4653 29.1201 11.0602 28.5211 11.7939 28.5211C12.5277 28.5211 13.1225 29.1201 13.1225 29.859Z"
				fill="black"
			/>
			<path
				d="M10.4654 1.72827C10.4654 0.994518 11.0602 0.178268 11.7939 0.178268C12.5277 0.178268 13.1225 0.994518 13.1225 1.72827C13.1225 2.46202 12.5277 5.49255 11.7939 5.49255C11.0602 5.49255 10.4654 2.46202 10.4654 1.72827Z"
				fill="black"
			/>
		</svg>
	);
}
