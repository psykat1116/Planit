import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/CreateSafeAction";
import { UpdateCardOrder } from "./Schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;
