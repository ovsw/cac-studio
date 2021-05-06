import Tabs from 'sanity-plugin-tabs'
import { FiFile } from 'react-icons/fi'
import { format } from 'date-fns'

export default {
  name: 'post',
  title: 'Blog Post',
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
        { name: 'settings', title: 'Settings' },
        { name: 'seo', title: 'SEO' },
      ],
      fields: [
        {
          fieldset: 'main',
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          fieldset: 'main',
          name: 'publishedAt',
          type: 'datetime',
          title: 'Published at',
          description: 'This can be used to schedule post for publishing',
        },
        {
          fieldset: 'main',
          name: 'excerpt',
          type: 'text',
          title: 'Excerpt',
          description:
            'This ends up on summary pages, on Google, when people share your post in social media.',
        },
        {
          fieldset: 'settings',
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          validation: (Rule) => Rule.error('You have to fill out the slug of the page.').required(),
          description: 'Some frontends will require a slug to be set to be able to show the post',
          options: {
            source: 'content.title',
            maxLength: 96,
          },
        },
        {
          fieldset: 'main',
          name: 'body',
          title: 'Body',
          type: 'bodyPortableText',
        },
        {
          fieldset: 'settings',
          name: 'image',
          title: 'Header Image',
          type: 'mainImage',
          validation: (Rule) => Rule.required().error('page header image missing'),
        },
        {
          fieldset: 'seo',
          name: 'seo',
          title: 'SEO Title',
          type: 'seo',
        },
      ],
    },
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'content.publishedAt',
          direction: 'asc',
        },
        {
          field: 'content.title',
          direction: 'asc',
        },
      ],
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'content.publishedAt',
          direction: 'desc',
        },
        {
          field: 'content.title',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'content.title',
      publishedAt: 'content.publishedAt',
      slug: 'content.slug',
      media: 'content.image',
    },
    prepare({ title = 'No title', publishedAt, slug = {}, media }) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const subtitle = format(publishedAt, 'DD/MM/YYYY')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? subtitle : 'Missing publishing date',
        description: publishedAt ? path : 'Missing publishing date',
      }
    },
  },
}
