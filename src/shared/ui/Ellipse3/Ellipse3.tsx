import styles from "./Ellipse3.module.scss";

export function Ellipse3() {
	return (
		<svg
			className={styles.ellipse3}
			width="454"
			height="976"
			viewBox="0 0 454 976"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				opacity="0.43"
				filter="url(#filter0_f_1_104)"
			>
				<ellipse
					cx="145"
					cy="585"
					rx="234"
					ry="510"
					fill="url(#paint0_linear_1_104)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_f_1_104"
					x="-164"
					y="0"
					width="618"
					height="1170"
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
						stdDeviation="37.5"
						result="effect1_foregroundBlur_1_104"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_1_104"
					x1="145"
					y1="75"
					x2="145"
					y2="1095"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FACDCB" />
					<stop
						offset="0.390625"
						stopColor="#FD8AFF"
					/>
					<stop
						offset="0.630208"
						stopColor="#5E5CE6"
						stopOpacity="0.71"
					/>
					<stop
						offset="1"
						stopColor="#4CDEFE"
						stopOpacity="0.74"
					/>
				</linearGradient>
			</defs>
		</svg>
	);
}
