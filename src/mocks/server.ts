import { setupServer } from "msw/node";
import { questionsHandlers } from "./handlers/questions";

export const server = setupServer(...questionsHandlers);
