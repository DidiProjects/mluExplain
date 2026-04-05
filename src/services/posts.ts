import { sanityClient } from "@lib/sanity";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author: {
    name: string;
    image?: SanityImage;
  };
  mainImage?: SanityImage;
  categories?: { title: string }[];
  publishedAt: string;
  body: SanityBlock[];
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityBlock = any;

const postFields = `
  _id,
  title,
  slug,
  author->{name, image},
  mainImage,
  categories[]->{title},
  publishedAt,
  body
`;

export async function getAllPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postFields} }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`,
    { slug }
  );
  return result || null;
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(
    `*[_type == "post"] { "slug": slug.current }`
  );
}
