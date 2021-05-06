import Tabs from "sanity-plugin-tabs"

export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fieldsets: [
    {name: 'alert', title: 'Alert'},
    {name: 'seo', title: 'SEO'}
  ],
  fields: [
    {
      name: 'content',
      type: 'object',
      title: 'Content',
      inputComponent: Tabs,
      fieldsets: [
        {name: 'alert', title: 'Alert'},
        {name: 'seo', title: 'SEO'}
      ],
      fields: [
        {
          fieldset: 'alert',
          title: 'Activate Alert',
          name: 'alertIsActive',
          type: 'boolean',
          description: 'This controls whether the alert will be shown or not. If toggled enabled, a highlighted message will be displayed at the top of the website, on all pages.'
        },
        {
          fieldset: 'alert',
          name: 'alertMessage',
          title: 'Alert Message:',
          type: 'barePortableText',
          description: 'This is the text of the allert. It will only be shown if the allert is activated.'
        },
        {
          fieldset: 'seo',
          name: 'seo',
          title: 'SEO Defaults',
          type: 'seo',
        },
      ]
    }
  ],
  preview: {
    select: {},
    prepare ({title = 'General Site Settings'}) {
      return {
        title
      }
    }
  }
}
