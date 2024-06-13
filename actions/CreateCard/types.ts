import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/CreateSafeAction";
import { CreateCard } from "./Schema";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
