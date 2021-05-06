import { FaComment } from 'react-icons/fa'

export default {
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  icon: FaComment,
  fields: [
    {
      name: 'author',
      type: 'string',
      title: 'Author Name',
      validation: (Rule) => Rule.required().error('missing author name'),
    },
    {
      name: 'text',
      type: 'text',
      title: 'Testimonial Text',
      validation: (Rule) => Rule.required().error('missing text'),
    },
  ],
  preview: {
    select: {
      title: 'author',
    },
  },
}
