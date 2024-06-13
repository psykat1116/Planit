import { z } from "zod";

export const UpdateListOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      title: z.string(),
      updatedAt: z.date(),
      createdAt: z.date(),
    })
  ),
  boardId: z.string(),
});
