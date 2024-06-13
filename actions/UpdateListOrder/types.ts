import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/CreateSafeAction";
import { UpdateListOrder } from "./Schema";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType, List[]>;
