import Tabs from "sanity-plugin-tabs"
import {FiFile} from 'react-icons/fi'

export default {
  name: 'pageSimple',
  title: 'Page',
  type: 'document',
  icon: FiFile,
  liveEdit: false,
  __experimental_actions: [ 'create', 'update', 'publish', 'delete' ], /* 'create', 'delete' */
  fields: [
    {
      name: 'content',
      type: 'object',
      title: 'Content',
      inputComponent: Tabs,
      fieldsets: [
        {name: 'main', title: 'Main'},
        {name: 'settings', title: 'Settings'},
        {name: 'seo', title: 'SEO'}
      ],
      fields: [
        {
          fieldset: 'main',
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          fieldset: 'settings',
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          validation: Rule => Rule.error('You have to fill out the slug of the page.').required(),
          description: 'Some frontends will require a slug to be set to be able to show the post',
          options: {
            source: 'content.title',
            maxLength: 96
          }
        },
        {
          fieldset: 'main',
          name: 'body',
          title: 'Body',
          type: 'bodyPortableText'
        },
        {
          fieldset: 'settings',
          name: 'image',
          title: 'Header Image',
          type: 'image',
          options: {
            hotspot: true
          },
          validation: Rule => Rule.required().error('page header image missing')
        },
        {
          fieldset: 'seo',
          name: 'seo',
          title: 'SEO Title',
          type: 'seo',
        },
      ]
    }

  ],
  orderings: [
    {
      name: 'createdAt',
      title: 'Created older->newer',
      by: [
        {
          field: '_createdAt',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'content.title',
      slug: 'content.slug'
    },
    prepare ({title = 'No title', slug = {}}) {
      const path = `/${slug.current}/`
      return {
        title,
        subtitle: path
      }
    }
  }
}
