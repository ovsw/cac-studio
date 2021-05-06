
export default {
  name: 'hero',
  type: 'object',
  title: 'Hero',
  fieldsets: [
    {name: 'hero', title: 'hero'}
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'the card\'s title',
      validation: Rule => Rule.error('missing card title').required(),
    },
    {
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string',
      description: 'optional subtitle',
    },
    {
      name: 'text',
      title: 'Card Body Content',
      type: 'basicPortableText',
      description: 'card contents',
      validation: Rule => Rule.error('missing card content').required(),
    },
    {
      name: 'button',
      title: 'Card Button',
      type: 'button',
      description: 'optional card button'
    },
    {
      name: 'image',
      title: 'Hero background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      theme: 'theme'
    },
    prepare ({ title, theme }) {

      let subtitle = 'no theme selected'
      if (theme) {
        const themeArray = theme.split("-") 

        const themeColor = themeArray[0].replace("Theme", "");
        const capitalizedThemeColor = themeColor.charAt(0).toUpperCase() + themeColor.slice(1)

        subtitle = `Card: ${capitalizedThemeColor}`
      }
      return {
        title: `${title}`,
        subtitle: subtitle
      }
    }
  }
}
