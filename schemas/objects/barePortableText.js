
export default {
  name: 'barePortableText',
  type: 'array',
  title: 'Rich Text',
  of: [
    {
      type: 'block',
      title: 'Block',
      // lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule =>
                  Rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true})
              }
            ]
          }
        ]
      }
    }
  ]
}
