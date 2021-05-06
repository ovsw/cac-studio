// import {format} from 'date-fns'
import Tabs from 'sanity-plugin-tabs'
import { FiFile } from 'react-icons/fi'

export default {
  name: 'page',
  title: 'Page',
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
          name: 'title',
          title: 'Title',
          type: 'string',
          fieldset: 'main',
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          validation: (Rule) => Rule.error('You have to fill out the slug of the page.').required(),
          description:
            'part of the URL of the page in the fron-end. The page URL will be: https://www.canadianadventurecamp.com/[whatever-you-type-here]/',
          options: {
            source: 'content.title',
            maxLength: 96,
          },
          fieldset: 'settings',
        },
        {
          name: 'headerImage',
          title: 'Header Image',
          type: 'mainImage',
          fieldset: 'settings',
        },
        {
          fieldset: 'main',
          name: 'sections',
          title: 'Page Content Sections',
          description: 'the modular content sections for this page',
          type: 'array',
          of: [
            { type: 'magSection' },
            { type: 'ctaSection' },
            { type: 'faqSection' },
            { type: 'bigHeading' },
            { type: 'testimonialSection' },
            { type: 'testimonialsSection' },
            { type: 'reusedSection' },
            // {type: 'bigHeading'},
            // {type: 'tableSection'},
            // {type: 'cardSection'},
          ],
        },
        {
          fieldset: 'seo',
          name: 'seo',
          title: ' ',
          type: 'seo',
        },
      ],
    },
    {
      title: 'Section',
      name: 'section',
      type: 'string',
      hidden: true,
      options: {
        list: [
          { title: 'Prospective Families', value: 'Prospective Families' },
          { title: 'About CAC', value: 'About CAC' },
          { title: 'Current Families', value: 'Current Families' },
          { title: 'NCCP & Adult Camp', value: 'NCCP & Adult Camp' },
          { title: 'Staff', value: 'Staff' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) =>
        Rule.error('You have to select which side menu to show for this page.').required(),
    },
    // {
    //   name: 'body',
    //   title: 'Body',
    //   type: 'bodyPortableText',
    // },
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
      slug: 'content.slug',
      media: 'content.headerImage',
    },
    prepare({ title = 'No title', slug = {}, media }) {
      const path = `/${slug.current}/`
      return {
        title,
        media,
        subtitle: path,
      }
    },
  },
}
