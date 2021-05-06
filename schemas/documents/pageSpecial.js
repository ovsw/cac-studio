// import {format} from 'date-fns'
import Tabs from 'sanity-plugin-tabs'
import { FiFile } from 'react-icons/fi'

export default {
  name: 'pageSpecial',
  title: 'Special Page',
  type: 'document',
  icon: FiFile,
  liveEdit: false,
  __experimental_actions: ['create', 'update', 'publish', 'delete'] /* 'create', 'delete' */,

  fields: [
    {
      name: 'content',
      type: 'object',
      title: 'Content',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'main', title: 'Main' },
        // { name: 'settings', title: 'Settings' },
        { name: 'seo', title: 'SEO' },
      ],
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          fieldset: 'main',
        },
        {
          name: 'headerImage',
          title: 'Header Image',
          type: 'mainImage',
          fieldset: 'main',
        },

        {
          fieldset: 'seo',
          name: 'seo',
          title: ' ',
          type: 'seo',
        },
      ],
    },
  ],
  orderings: [
    {
      name: 'createdAt',
      title: 'Created older->newer',
      by: [
        {
          field: '_createdAt',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'content.title',
      media: 'content.headerImage',
    },
    prepare({ title = 'No title', media }) {
      return {
        title,
        media,
      }
    },
  },
}
