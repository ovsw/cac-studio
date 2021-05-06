import {FaHeading} from 'react-icons/fa'

export default {
  name: 'bigHeading',
  type: 'object',
  liveEdit: true,
  title: 'Heading Section',
  icon: FaHeading,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title (required)',
      description: 'the main big text in the section',
      validation: Rule => Rule.error('Enter the title of the CTA section.').required(),
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
