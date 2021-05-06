export default {
  name: 'button',
  type: 'object',
  title: 'Button',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      description: 'the text on the button',
      validation: (Rule) => Rule.error('missing button title').required(),
    },
    {
      name: 'url',
      title: 'Button Destination URL',
      type: 'string',
      description: 'where should this button lead to?',
      description: 'where should this button lead to?',
      validation: (Rule) => Rule.error('missing button destination').required(),
    },
  ],
  preview: {
    select: {
      title: 'text',
    },
  },
}
