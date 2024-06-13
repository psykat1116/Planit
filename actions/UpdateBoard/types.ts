import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/CreateSafeAction";
import { UpdateBoard } from "./schema";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>;
