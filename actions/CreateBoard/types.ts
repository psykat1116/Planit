import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/CreateSafeAction";
import { CreateBoard } from "./Schema";

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;