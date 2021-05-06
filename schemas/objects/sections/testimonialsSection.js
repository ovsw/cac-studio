import { FaComment } from 'react-icons/fa'

export default {
  name: 'testimonialsSection',
  type: 'object',
  title: 'Testimonials Section',
  icon: FaComment,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: (Rule) => Rule.error('Missing testimonials section title').required(),
    },
    {
      name: 'testimonialsList',
      title: 'Testimonials',
      validation: (Rule) => [
        Rule.error('Must have at least one testimonial.').required(),
        Rule.error('Duplicate testimonial').unique(),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      let subtitle = 'Testimonials Section'

      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
}
