import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { EventFrontmatterSchema } from "../src/lib/types";

const eventsDirectory = path.join(process.cwd(), "content/events");
const outputPath = path.join(process.cwd(), "public/timeline.json");

interface TimelineEvent {
  start_date: {
    year: string;
    month?: string;
    day?: string;
  };
  text: {
    headline: string;
    text: string;
  };
  media?: {
    url: string;
    alt?: string;
  };
  unique_id: string;
}

interface TimelineData {
  title: {
    text: {
      headline: string;
      text: string;
    };
  };
  events: TimelineEvent[];
}

function parseDate(dateString: string) {
  const date = new Date(dateString);
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
    day: date.getDate().toString(),
  };
}

async function buildTimeline() {
  console.log("Building timeline...");

  // Check if events directory exists
  if (!fs.existsSync(eventsDirectory)) {
    console.log("No events directory found. Creating empty timeline.");
    fs.mkdirSync(eventsDirectory, { recursive: true });
  }

  const fileNames = fs.readdirSync(eventsDirectory);
  const events: TimelineEvent[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) {
      continue;
    }

    const fullPath = path.join(eventsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    try {
      // Validate frontmatter
      const validatedData = EventFrontmatterSchema.parse(data);

      const event: TimelineEvent = {
        start_date: parseDate(validatedData.date),
        text: {
          headline: validatedData.title,
          text: validatedData.summary,
        },
        unique_id: validatedData.slug,
      };

      if (validatedData.media) {
        event.media = {
          url: validatedData.media.url,
          alt: validatedData.media.alt,
        };
      }

      events.push(event);
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
      process.exit(1);
    }
  }

  // Sort events by date
  events.sort((a, b) => {
    const dateA = new Date(
      parseInt(a.start_date.year),
      parseInt(a.start_date.month || "1") - 1,
      parseInt(a.start_date.day || "1")
    );
    const dateB = new Date(
      parseInt(b.start_date.year),
      parseInt(b.start_date.month || "1") - 1,
      parseInt(b.start_date.day || "1")
    );
    return dateA.getTime() - dateB.getTime();
  });

  const timelineData: TimelineData = {
    title: {
      text: {
        headline: "Application Security: A Guided History",
        text: "Explore the evolution of application security through key historical events",
      },
    },
    events,
  };

  // Write to public directory
  fs.writeFileSync(outputPath, JSON.stringify(timelineData, null, 2));
  console.log(`✅ Timeline built successfully with ${events.length} events`);
  console.log(`📄 Output: ${outputPath}`);
}

buildTimeline().catch((error) => {
  console.error("Error building timeline:", error);
  process.exit(1);
});
