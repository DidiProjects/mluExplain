import { defineType, defineField } from "sanity";

/**
 * Schema for section media - supports multiple media types.
 * Can be an image, video, animated SVG, embed, or code visualization.
 */
export default defineType({
  name: "sectionMedia",
  title: "Section Media",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
          { title: "GIF/Animation", value: "gif" },
          { title: "Embed (YouTube, CodePen, etc.)", value: "embed" },
          { title: "Lottie Animation", value: "lottie" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),

    // Image
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Descriptive text for accessibility",
        },
      ],
    }),

    // Video (file upload)
    defineField({
      name: "video",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),

    // Video URL (for external videos)
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "URL for externally hosted video (MP4, WebM)",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),

    // GIF/Animation
    defineField({
      name: "gif",
      title: "GIF/Animation",
      type: "image",
      description: "Animated GIF or APNG",
      hidden: ({ parent }) => parent?.mediaType !== "gif",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),

    // Embed (iframes - YouTube, CodePen, etc.)
    defineField({
      name: "embedUrl",
      title: "Embed URL",
      type: "url",
      description: "YouTube, Vimeo, CodePen, CodeSandbox URL",
      hidden: ({ parent }) => parent?.mediaType !== "embed",
    }),

    defineField({
      name: "embedType",
      title: "Embed Type",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
          { title: "CodePen", value: "codepen" },
          { title: "CodeSandbox", value: "codesandbox" },
          { title: "Other", value: "other" },
        ],
      },
      hidden: ({ parent }) => parent?.mediaType !== "embed",
    }),

    // Lottie animation
    defineField({
      name: "lottieUrl",
      title: "Lottie Animation URL",
      type: "url",
      description: "URL to a Lottie JSON file",
      hidden: ({ parent }) => parent?.mediaType !== "lottie",
    }),

    defineField({
      name: "lottieFile",
      title: "Lottie Animation File",
      type: "file",
      options: {
        accept: ".json",
      },
      description: "Or upload a Lottie JSON file directly",
      hidden: ({ parent }) => parent?.mediaType !== "lottie",
    }),

    // Common fields
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption to display below the media",
    }),

    defineField({
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "string",
      options: {
        list: [
          { title: "Auto", value: "auto" },
          { title: "16:9", value: "16/9" },
          { title: "4:3", value: "4/3" },
          { title: "1:1 (Square)", value: "1/1" },
          { title: "9:16 (Portrait)", value: "9/16" },
        ],
      },
      initialValue: "auto",
    }),
  ],

  preview: {
    select: {
      mediaType: "mediaType",
      caption: "caption",
      image: "image",
    },
    prepare({ mediaType, caption, image }) {
      const typeLabels: Record<string, string> = {
        image: "🖼️ Image",
        video: "🎬 Video",
        gif: "🎞️ GIF",
        embed: "📺 Embed",
        lottie: "✨ Lottie",

      };

      return {
        title: typeLabels[mediaType] || "Media",
        subtitle: caption || "",
        media: image,
      };
    },
  },
});
