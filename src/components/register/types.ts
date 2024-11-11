import type { z } from "zod";
import { registerSchema } from "./schema";

export type RegisterFormSchema = z.infer<typeof registerSchema>;
