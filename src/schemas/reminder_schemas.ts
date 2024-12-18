import { z } from "zod";
import crypto from "crypto";

const reminderSchema = z.object({
  userId: z.string().default("1"),
  id: z
    .string()
    .uuid()
    .default(() => crypto.randomUUID()),
  deviceToken: z.string(),
  startDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .transform((date) => {
      const [day, month, year] = date.split("/");
      // Convert to UTC date
      return new Date(`${year}-${month}-${day}`);
    }),
  endDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .transform((date) => {
      const [day, month, year] = date.split("/");
      return new Date(`${year}-${month}-${day}`);
    }),
  frequency: z.string().regex(/^\d{1,2}:\d{2} (AM|PM)$/i),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export { reminderSchema };
export type Reminder = z.infer<typeof reminderSchema>;
