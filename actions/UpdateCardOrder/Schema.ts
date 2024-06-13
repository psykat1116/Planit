import { z } from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      title: z.string(),
      listId: z.string(),
      updatedAt: z.date(),
      createdAt: z.date(),
    })
  ),
  boardId: z.string(),
});
