import {BsExclamationOctagon} from 'react-icons/bs'

export default {
  name: 'ctaSection',
  type: 'object',
  liveEdit: true,
  title: 'CTA Section',
  icon: BsExclamationOctagon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title (required)',
      description: 'the main big text in the section',
      validation: Rule => Rule.error('Enter the title of the CTA section.').required(),
    },{
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle (optional)',
      description: 'secondary text under the main one',
    },{
      name: 'text',
      type: 'barePortableText',
      title: 'Paragraph (optional)',
      description: 'longer text',
    },{
      name: 'button1',
      type: 'button',
      title: 'Primary Button',
      description: 'primary action we\'d like the user to perform from here'
    },{
      name: 'image',
      type: 'bgImage',
      title: 'Image',
      description: 'appears to the side of the text'
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare ({ title }) {

      const subtitle = 'CTA Section'

      return {
        title: title,
        subtitle: subtitle,
      }
    }
  }
}
