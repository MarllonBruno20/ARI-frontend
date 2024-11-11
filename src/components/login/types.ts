import type { z } from "zod";
import { loginSchema } from "./schema";

export type LoginFormSchema = z.infer<typeof loginSchema>;
