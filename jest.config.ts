import type { Config } from "jest";

const config: Config = {
	verbose: true,
	maxWorkers: "50%",
	// * if no need in DOM - testEnvironment: "node"
	testEnvironment: "jsdom",
	preset: "ts-jest",
	transform: {
		"^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
	},
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		"\\.(css|less|scss)$": "identity-obj-proxy",
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	moduleDirectories: ["node_modules", "./src"],
	modulePathIgnorePatterns: ["<rootDir>/.vscode"],
	prettierPath: null,
	testEnvironmentOptions: {
		customExportConditions: [""]
	},
	setupFilesAfterEnv: ["./jest.polyfills.ts", "./jest.setup.ts"],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: -10
		}
	}
};

export default config;
