// import {format} from 'date-fns'
import {FiFile} from 'react-icons/fi'

export default {
  name: 'donateNowPage',
  title: 'Donate Now Page',
  type: 'document',
  icon: FiFile,
  liveEdit: false,
  __experimental_actions: [ 'update', 'publish' ], /* 'create', 'delete' */
  fieldsets: [
    {title: 'SEO Info',
      name: 'seo',
      options: {collapsible: true, collapsed: true}
    }
  ],
  fields: [
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      fieldset: 'seo'
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      fieldset: 'seo'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'headerImage',
      title: 'Header Image',
      type: 'mainImage'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'bodyPortableText'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare ({title = 'No title'}) {
      return {
        title
      }
    }
  }
}
