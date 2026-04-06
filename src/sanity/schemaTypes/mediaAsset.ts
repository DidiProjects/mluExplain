import { defineType, defineField } from "sanity";

export default defineType({
  name: "mediaAsset",
  title: "Media Asset",
  type: "document",
  icon: () => "🖼️",
  fields: [
    defineField({
      name: "identifier",
      title: "Identifier",
      type: "slug",
      description: "Unique identifier for this media (e.g. 'neural-network-state-0')",
      options: { source: "label", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Descriptive label shown in the editor",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      description:
        "Group name to organize related states (e.g. 'neural-network')",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Descriptive text for accessibility",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "group",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled",
        subtitle: subtitle ? `Group: ${subtitle}` : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Group, then Label",
      name: "groupLabel",
      by: [
        { field: "group", direction: "asc" },
        { field: "label", direction: "asc" },
      ],
    },
  ],
});
