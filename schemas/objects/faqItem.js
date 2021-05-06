
import {FaQuestionCircle} from 'react-icons/fa'

export default {
  name: 'faqItem',
  type: 'document',
  title: 'Question and Answer',
  icon: FaQuestionCircle,
  liveEdit: false,
  __experimental_actions: [ 'create', 'update', 'publish', 'delete' ], /* 'create', 'delete' */
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: Rule => Rule.error('Empty FAQ question.').required()
    },{
      name: 'answer',
      type: 'basicPortableText',
      title: 'Answer',
      validation: Rule => Rule.error('Empty FAQ answer.').required()
    },
    // {
    //   name: 'category',
    //   title: 'Category',
    //   description: 'for grouping in the back-end',
    //   type: 'string',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [
    //         {type: 'faqCategory'}
    //       ]
    //     }
    //   ]
    // }
  ],
  preview: {
    select: {
      title: 'question'
    }
  }
}
