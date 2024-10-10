import { z } from "zod";

export const PostSchema = z.object({
  user: z.string().min(1, { message: "User is required!" }),
  content: z.string().default(""),
  code: z.string().nullable().default(null),
  images: z
    .array(
      z.object({
        public_id: z.string().optional(),
        url: z.string().optional(),
        resource_type: z.string().optional(),
        access_mode: z.string().optional(),
        folder: z.string().optional(),
        version: z.string().optional(),
        signature: z.string().optional(),
      })
    )
    .default([]),
  videoUrl: z
    .object({
      public_id: z.string().optional(),
      url: z.string().optional(),
      resource_type: z.string().optional(),
      access_mode: z.string().optional(),
      folder: z.string().optional(),
      version: z.string().optional(),
      signature: z.string().optional(),
    })
    .nullable()
    .default(null),
  active: z.boolean().default(true),
  tags: z.string().array().default([]),
  status: z.string().default("approved"),
  postStatus: z.string().default("public"),
  comments: z
    .object({
      user: z.string(),
      message: z.string(),
      images: z.string(),
      status: z.string(),
      createdAt: z.date(),
    })
    .array()
    .default([]),
  likes: z
    .object({
      user: z.string(),
      active: z.boolean().default(true),
    })
    .array()
    .default([]),
  friendRequests: z
    .object({
      user: z.string(),
      active: z.boolean().default(true),
      createdAt: z.date(),
    })
    .array()
    .default([]),
});
