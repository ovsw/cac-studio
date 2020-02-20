// import {format} from 'date-fns'
import {FaMapMarkerAlt} from 'react-icons/fa'

export default {
  name: 'mapMarker',
  title: 'Map',
  type: 'document',
  icon: FaMapMarkerAlt,
  // liveEdit: true,
  // __experimental_actions: ['create', 'update', 'publish', 'delete'], /* 'create', 'delete' */
  fieldsets: [
    {
      title: 'Position',
      name: 'position',
      options: {collapsible: true, collapsed: true}
    }
  ],
  fields: [
    {
      name: 'x',
      title: 'X',
      type: 'number',
      fieldset: 'position',
      validation: Rule => Rule.error('Missing marker X position.').required()
    },
    {
      name: 'y',
      title: 'Y',
      type: 'number',
      fieldset: 'position',
      validation: Rule => Rule.error('Missing marker Y position.').required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.error('Missing Title.').required()
    },
    {
      title: 'Label Position',
      name: 'labelDirection',
      type: 'string',
      options: {
        list: [
          {title: 'Right', value: 'right'},
          {title: 'Left', value: 'left'},
          {title: 'Top', value: 'top'},
          {title: 'Bottom', value: 'bottom'}
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      validation: Rule => Rule.error('Missing label position.').required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'bioPortableText',
      validation: Rule => Rule.error('Missing description.').required()
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'slideshowImage'}],
      validation: Rule => Rule.error('Must add at least one image.').required()
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
      title: 'title'
    },
    prepare ({title = 'No title'}) {
      return {
        title
      }
    }
  }
}
