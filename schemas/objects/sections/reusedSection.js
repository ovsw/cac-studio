import {ImSection} from 'react-icons/im'

export default {
  name: 'reusedSection',
  type: 'object',
  liveEdit: false,
  title: 'Reused Section',
  icon: ImSection,
  fields: [
    {
      name: 'reusableSection',
      type: 'reference',
      title: 'Select Reusable Section',
      description: 'select a reusable section that will appear here. Reminder: you can edit reusable section in the left main menu, under "Reusable Sections"',
      validation: Rule => Rule.error('Must select a reusable section.').required(),
      to: [{type: 'reusableSection'}]
    }
  ],
  preview: {
    select: {
      title: 'reusableSection.title'
    },
    prepare ({title = 'No title'}) {
      return {
        title,
        subtitle: `Reusable Section`
      }
    }
  },
  
}
