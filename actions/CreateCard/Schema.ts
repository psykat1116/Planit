import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is invalid type",
    })
    .min(3, {
      message: "Title is too short",
    })
    .max(50, {
      message: "Title is too long",
    }),
  listId: z.string(),
  boardId: z.string(),
});
