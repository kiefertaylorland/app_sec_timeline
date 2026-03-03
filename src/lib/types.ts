import { z } from "zod";

export const MediaSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.string(),
  alt: z.string().optional(),
});

export const ReferenceSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

export const EventFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(), // ISO date string
  tags: z.array(z.string()).optional(),
  summary: z.string(),
  media: MediaSchema.optional(),
  references: z.array(ReferenceSchema).optional(),
});

export type EventFrontmatter = z.infer<typeof EventFrontmatterSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;

export interface Event extends EventFrontmatter {
  content?: string;
}
