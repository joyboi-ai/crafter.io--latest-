import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
// import { q } from 'convex/schema';

// Create a new file
export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('files', { ...args, _creationTime: Date.now() });
  },
});

// Get all files for a team
export const getFiles = query({
  args: { teamId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query('files')
      .filter(q => q.eq(q.field('teamId'), args.teamId))
      .order('desc')
      .collect();
  },
});

// Get a file by ID
export const getFileById = query({
  args: { _id: v.id('files') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args._id);
  },
});

// Update document content
export const updateDocument = mutation({
  args: { _id: v.id('files'), document: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      document: args.document,
      _lastEditedTime: Date.now(),
    });
  },
});

// Update whiteboard content
export const updateWhiteboard = mutation({
  args: { _id: v.id('files'), whiteboard: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
      _lastEditedTime: Date.now(),
    });
  },
});

// Rename a file
export const renameFile = mutation({
  args: { _id: v.id('files'), newFileName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      fileName: args.newFileName,
      _lastEditedTime: Date.now(),
    });
  },
});

// Delete a file
export const deleteFile = mutation({
  args: { _id: v.id('files') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args._id);
  },
});
