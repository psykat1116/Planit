import { z } from "zod";
import { ActionState } from "@/lib/CreateSafeAction";
import { UpdateCard } from "./schema";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, Card>;
