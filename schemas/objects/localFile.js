import {FaFileAlt} from 'react-icons/fa'

export default {
  name: 'localFile',
  type: 'file',
  title: 'File',
  icon: FaFileAlt,
  // options: {
  //   accept: '.pdf,.docx,.doc,.xls,.xlsx'
  // },
  fields: [
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      options: {
        isHighlighted: true
      },
      validation: Rule => Rule.error('You have to fill out the description of the file.').required()
    }
  ],
  preview: {
    select: {
      title: 'description'
    }
  }
}
