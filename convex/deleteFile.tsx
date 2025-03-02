import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel"; // Import Id type

export const deleteFile = mutation({
  args: { fileId: v.id("files") }, // Validate input
  handler: async ({ db }, { fileId }) => {
    await db.delete(fileId);
  },
});
