import React from 'react'

const buttonRender = props => (

  <button style={{backgroundColor: 'lightgray', display: 'inline-block', padding: '1rem', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>{props.children}</button>

)

export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        // {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
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
            title: 'Link',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule =>
                  Rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true})
              },
              {
                title: 'Open in new window',
                name: 'blank',
                type: 'boolean'
              }
            ]
          },
          {
            name: 'button',
            type: 'object',
            title: 'Button',
            blockEditor: {
              icon: () => 'Btn',
              render: buttonRender
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule =>
                  Rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true})
              },
              {
                title: 'Open in new window',
                name: 'blank',
                type: 'boolean'
              }
            ]
          }
        ]
      }
      // of: [{type: 'authorReference'}]
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'mainImage',
      options: {hotspot: true}
    },
    {
      type: 'avatarImage',
      options: {hotspot: true}
    },
    {
      type: 'localFile'
    },
    {
      type: 'youtube'
    },
    {
      type: 'mytable'
    },
    {
      type: 'iframeEmbed'
    }
  ]
}
