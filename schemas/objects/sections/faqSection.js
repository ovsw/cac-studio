import {FaQuestionCircle} from 'react-icons/fa'
import {FaHeading} from 'react-icons/fa'

export default {
  name: 'faqSection',
  type: 'object',
  liveEdit: true,
  title: 'FAQs Section',
  icon: FaQuestionCircle,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: Rule => Rule.error('Missing FAQs section title').required(),
    },
    {
      name: 'faqItems',
      title: 'Questions and Answers:',
      description: 'Note: you can also create headings and drag-and drop them where needed to break up a big list of FAQs.',
      validation: Rule => [
        Rule.error('Must have at least one FAQ.').required(),
        Rule.error('Duplicate FAQ Item').unique()
      ],
      type: 'array',
          of: [
            // {type: 'faqItem'},
            {
              type: 'reference',
              to: [
                {type: 'faqItem'}
              ]
            },
            {
              title: 'FAQ Category Heading',
              icon: FaHeading,
              type: 'object',
              validation: Rule => Rule.error('Missing FAQ Category Title.').required(),
              fields: [
                {
                  title: 'Category Title',
                  name: 'value',
                  type: 'string'
                } 
              ]
            }
          ]
    },
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare ({title}) {

      let subtitle = 'FAQs Section'

      return {
        title: title,
        subtitle: subtitle
      }
    }
  }
}
