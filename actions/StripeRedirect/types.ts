import { z } from "zod";
import { ActionState } from "@/lib/CreateSafeAction";
import { StripeRediect } from "./schema";

export type InputType = z.infer<typeof StripeRediect>;
export type ReturnType = ActionState<InputType, string>;
