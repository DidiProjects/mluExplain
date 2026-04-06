import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import postSection from './postSection'
import sectionMedia from './sectionMedia'
import visualizationConfig from './visualizationConfig'

export const schemaTypes = [
  // Document types
  post,
  author,
  category,
  // Object types
  blockContent,
  postSection,
  sectionMedia,
  visualizationConfig,
]
