// Add this file at root or change path in vitest.config.ts file
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";
expect.extend(matchers);

afterEach(() => {
	cleanup();
});
