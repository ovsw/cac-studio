import { FaComment } from 'react-icons/fa'

export default {
  name: 'testimonialSection',
  type: 'object',
  title: 'Single Testimonial',
  icon: FaComment,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: (Rule) => Rule.error('Missing testimonial section title').required(),
    },
    {
      name: 'testimonial',
      title: 'Featured Testimonial',
      validation: (Rule) => Rule.error('Missing testimonial').required(),
      type: 'reference',
      to: [{ type: 'testimonial' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      let subtitle = 'Featured Testimonial'

      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
}
