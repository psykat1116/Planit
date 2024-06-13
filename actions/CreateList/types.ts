import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/CreateSafeAction";
import { CreateList } from "./Schema";

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;
