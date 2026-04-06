import { sanityClient } from "@lib/sanity";
import type { Post, PostCard } from "@/types";

// Fields for post cards (list views)
const postCardFields = `
  _id,
  title,
  slug,
  excerpt,
  author->{name, image},
  mainImage,
  categories[]->{title},
  publishedAt
`;

// Full post fields including sections
const fullPostFields = `
  _id,
  title,
  slug,
  excerpt,
  author->{
    _id,
    name,
    slug,
    image,
    bio
  },
  mainImage,
  categories[]->{
    _id,
    title,
    slug,
    description
  },
  publishedAt,
  sections[]{
    _key,
    title,
    content[]{
      ...,
      _type == "mediaMarker" => {
        ...,
        media->{
          _id,
          identifier,
          label,
          group,
          image{
            ...,
            asset->{
              _id,
              url
            }
          }
        }
      }
    },
    media{
      mediaType,
      image{
        ...,
        asset->{
          _id,
          url,
          metadata{
            dimensions
          }
        }
      },
      video{
        asset->{
          _id,
          url
        }
      },
      videoUrl,
      gif{
        ...,
        asset->{
          _id,
          url
        }
      },
      embedUrl,
      embedType,
      lottieUrl,
      lottieFile{
        asset->{
          _id,
          url
        }
      },
      caption,
      aspectRatio
    }
  },
  body
`;

/**
 * Get all posts for list views (cards)
 */
export async function getAllPosts(): Promise<PostCard[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postCardFields} }`
  );
}

/**
 * Get a single post by slug with full content
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${fullPostFields} }`,
    { slug }
  );
  return result || null;
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(`*[_type == "post"] { "slug": slug.current }`);
}

/**
 * Get related posts by category
 */
export async function getRelatedPosts(
  postId: string,
  categoryIds: string[],
  limit = 3
): Promise<PostCard[]> {
  return sanityClient.fetch(
    `*[_type == "post" && _id != $postId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...$limit] { ${postCardFields} }`,
    { postId, categoryIds, limit }
  );
}
