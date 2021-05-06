import {AiOutlineCreditCard} from 'react-icons/ai'

export default {
  name: 'cardSection',
  type: 'object',
  liveEdit: true,
  title: 'Card Section',
  icon: AiOutlineCreditCard,
  fields: [
    {
      name: 'title',
      title: 'Section title',
      type: 'string',
      validation: Rule => Rule.error('Missing section title.').required()
    },
    {
      name: 'cards',
      title: 'Cards:',
      validation: Rule => Rule.error('Must have at least two cards.').required(),
      type: 'array',
          of: [
            {type: 'card'}
          ]
    },
    {
      name: 'image',
      type: 'bgImage',
      title: 'Optional image background'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare ({title}) {

      let description = 'Cards Section'

      return {
        title: title,
        description: description
      }
    }
  }
}
