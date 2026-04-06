import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Schema for post sections - each section is a topic within a post.
 * Sections can have text content and optional media.
 */
export default defineType({
  name: "postSection",
  title: "Post Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    type: "boolean",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        }),
        // Inline code blocks
        defineArrayMember({
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            {
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "Python", value: "python" },
                  { title: "JavaScript", value: "javascript" },
                  { title: "TypeScript", value: "typescript" },
                  { title: "JSX", value: "jsx" },
                  { title: "TSX", value: "tsx" },
                  { title: "Bash", value: "bash" },
                  { title: "JSON", value: "json" },
                  { title: "SQL", value: "sql" },
                  { title: "CSS", value: "css" },
                  { title: "HTML", value: "html" },
                  { title: "Markdown", value: "markdown" },
                ],
              },
            },
            {
              name: "code",
              title: "Code",
              type: "text",
            },
            {
              name: "filename",
              title: "Filename",
              type: "string",
            },
          ],
        }),
        // Math equations (LaTeX)
        defineArrayMember({
          type: "object",
          name: "mathBlock",
          title: "Math Equation",
          fields: [
            {
              name: "latex",
              title: "LaTeX",
              type: "text",
              description: "LaTeX math expression",
            },
            {
              name: "inline",
              title: "Inline",
              type: "boolean",
              description: "Display inline or as block",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              latex: "latex",
            },
            prepare({ latex }) {
              return {
                title: "Math: " + (latex?.substring(0, 50) || ""),
              };
            },
          },
        }),
        // Media marker — references a media asset from the library
        defineArrayMember({
          type: "object",
          name: "mediaMarker",
          title: "📍 Media Marker",
          fields: [
            {
              name: "media",
              title: "Media Asset",
              type: "reference",
              to: [{ type: "mediaAsset" }],
              description:
                "Select a media asset from the library to display at this point",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "label",
              title: "Label (optional)",
              type: "string",
              description:
                "A label to help identify this marker in the editor",
            },
          ],
          preview: {
            select: {
              mediaLabel: "media.label",
              mediaGroup: "media.group",
              label: "label",
              media: "media.image",
            },
            prepare({ mediaLabel, mediaGroup, label, media }) {
              const title = label || mediaLabel || "Media Marker";
              return {
                title: `📍 ${title}`,
                subtitle: mediaGroup
                  ? `Group: ${mediaGroup}`
                  : "Media marker",
                media,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "media",
      title: "Media",
      type: "sectionMedia",
      description: "Optional media to display alongside this section",
    }),
  ],

  preview: {
    select: {
      title: "title",
      mediaType: "media.mediaType",
      image: "media.image",
    },
    prepare({ title, mediaType, image }) {
      const hasMedia = !!mediaType;
      return {
        title: title || "Untitled Section",
        subtitle: hasMedia ? `With ${mediaType}` : "Text only",
        media: image,
      };
    },
  },
});
