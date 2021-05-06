import { FaUser } from 'react-icons/fa'

export default {
  name: 'author',
  type: 'document',
  title: 'Author',
  icon: FaUser,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    // {
    //   name: 'slug',
    //   type: 'slug',
    //   title: 'Slug',
    //   description: 'Some frontends will require a slug to be set to be able to show the person',
    //   options: {
    //     source: 'name',
    //     maxLength: 96
    //   }
    // },
    // {
    //   name: 'Avatar Image',
    //   type: 'mainImage',
    //   title: 'Image',
    // },
    // {
    //   name: 'bio',
    //   type: 'bioPortableText',
    //   title: 'Biography',
    // },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
}
