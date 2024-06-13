import { z } from "zod";

const paymentSchemaZod = z.object({
  username: z.string().min(2).max(50),
});
