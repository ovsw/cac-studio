import {FaCode} from 'react-icons/fa'

export default {
  name: 'iframeEmbed',
  type: 'object',
  title: 'Iframe Embed (forms, etc)',
  icon: FaCode,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Embed Code',
      name: 'code',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      title: 'This is a Cognito Form (required for responsive form code)',
      name: 'cognitoForm',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
