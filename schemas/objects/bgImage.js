export default {
  name: 'bgImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Pretend you are describing the image to a blind person. Essential for SEO and accessiblity.',
      validation: Rule => Rule.error('You have to fill out the alternative text for the image.').required(),
      options: {
        isHighlighted: true
      }
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
