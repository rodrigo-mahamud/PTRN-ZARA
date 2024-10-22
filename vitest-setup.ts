import { expect, afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";

expect.extend(matchers);

beforeEach(() => {
   cleanup();
   vi.clearAllMocks();
});

afterEach(() => {
   cleanup();
   vi.clearAllMocks();
});

// Mock de ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
   observe: vi.fn(),
   unobserve: vi.fn(),
   disconnect: vi.fn(),
}));

// Suprimir warnings específicos
const originalError = console.error;
console.error = (...args) => {
   if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
   }
   originalError.call(console, ...args);
};
