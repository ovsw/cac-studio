import React from 'react'
import {RiLayoutColumnLine} from 'react-icons/ri'

export default {
  name: 'magSection',
  type: 'object',
  liveEdit: true,
  title: 'Image/Video w/ Text',
  icon: RiLayoutColumnLine,
  fields: [
    {
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
      description: 'optional short colored text appearing just above the Section Title',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Section Title (required)',
      description: 'the main big text in the section',
      validation: Rule => Rule.error('Enter the title of the CTA section.').required(),
    },{
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle (optional)',
      description: 'secondary title under the main one',
    },{
      name: 'text',
      type: 'basicPortableText',
      title: 'Content (required)',
      description: 'text content for this section. If you don\'t have anything to say here, use a CTA section instead',
    },{
      name: 'button1',
      title: 'Buttons',
      description: 'optional buttons at the end of the section\'s content',
      type: 'array',
      of: [
        {type: 'button'}
      ]
    },{
      name: 'image',
      type: 'bgImage',
      title: 'Image',
      description: 'appears to the side of the text',
      validation: Rule => Rule.error('Add an image to the Image section.').required(),
    },{
      name: 'video',
      type: 'string',
      title: 'Video',
      description: '(optional) if you\'d like to show a video when clicking on this section\'s image, add a link to the video\'s page (YouTube or Vimeo)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image'
    },
    prepare ({ title, image }) {

      const subtitle = 'Image/Video w/ Text'

      return {
        title: title,
        subtitle: subtitle,
        media: image
      }
    }
  }
}
