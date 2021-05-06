import React from 'react'
import Tabs from 'sanity-plugin-tabs'
import { ImSection } from 'react-icons/im'

export default {
  name: 'reusableSection',
  title: 'Reusable Section',
  type: 'document',
  icon: ImSection,
  liveEdit: false,
  __experimental_actions: ['create', 'update', 'publish', 'delete'] /* 'create', 'delete' */,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'eg: halloween',
      validation: (Rule) => Rule.error('Missing Title.').required(),
    },
    {
      name: 'sections',
      title: 'Content Sections',
      description:
        'a reusable section can be made up of one or more content sections, the same ones used on pages',
      validation: (Rule) => Rule.error('Add at least one content section.').required(),
      type: 'array',
      of: [
        { type: 'magSection' },
        { type: 'ctaSection' },
        { type: 'faqSection' },
        { type: 'bigHeading' },
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
      title: 'title',
      media: 'icon',
    },
  },
}
