import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Event, EventFrontmatterSchema } from "./types";

const eventsDirectory = path.join(process.cwd(), "content/events");

export async function getEvents(): Promise<Event[]> {
  // Check if directory exists
  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(eventsDirectory);
  const allEvents = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Validate frontmatter
      const validatedData = EventFrontmatterSchema.parse(data);

      return {
        ...validatedData,
        content,
      };
    });

  // Sort by date
  return allEvents.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getEvents();
  return events.find((event) => event.slug === slug) || null;
}
