import {IoMdGrid} from 'react-icons/io'

export default {
  name: 'mytable',
  type: 'object',
  title: 'Table',
  icon: IoMdGrid,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'generictable',
      title: 'Table',
      type: 'table' // Specify table type
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
