import styles from "./Ellipse4.module.scss";

export function Ellipse4() {
	return (
		<svg
			className={styles.ellipse4}
			width="117"
			height="117"
			viewBox="0 0 117 117"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_f_12_54)">
				<circle
					cx="58.5"
					cy="58.5"
					r="28.5"
					fill="linear-gradient(
						180deg,
						#fae5cb 0%,
						#fd8aff 46.35%,
						rgb(94 92 230 / 71%) 100%
					)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_f_12_54"
					x="0"
					y="0"
					width="117"
					height="117"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood
						floodOpacity="0"
						result="BackgroundImageFix"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feGaussianBlur
						stdDeviation="15"
						result="effect1_foregroundBlur_12_54"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_12_54"
					x1="58.5"
					y1="30"
					x2="58.5"
					y2="87"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FAE5CB" />
					<stop
						offset="0.463542"
						stopColor="#FD8AFF"
					/>
					<stop
						offset="1"
						stopColor="#5E5CE6"
						stopOpacity="0.71"
					/>
				</linearGradient>
			</defs>
		</svg>
	);
}
