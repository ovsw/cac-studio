import {FaPortrait} from 'react-icons/fa'

export default {
  name: 'avatarImage',
  type: 'image',
  title: 'Avatar Image',
  icon: FaPortrait,
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      validation: Rule => Rule.error('You have to fill out the alternative text.').required(),
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      alt: 'alt'
    },
    prepare ({alt, imageUrl = {}}) {
      const description = `Avatar Image: ${alt}`
      return {
        title: description,
        imageUrl
      }
    }
  }
}
