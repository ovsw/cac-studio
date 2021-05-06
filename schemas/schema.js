// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import author from './documents/author'
import category from './documents/category'
import mapMarker from './documents/mapMarker'
import page from './documents/page'
import pageSimple from './documents/pageSimple'
import pageSpecial from './documents/pageSpecial'
import pageSupport from './documents/pageSupport' // support pages
import post from './documents/post'
import reusableSection from './documents/reusableSection'
import siteHome from './documents/siteHome'
import siteSettings from './documents/siteSettings'
import testimonial from './documents/testimonial'

// Object types
import avatarImage from './objects/avatarImage'
import authorReference from './objects/authorReference'
import barePortableText from './objects/barePortableText'
import basicPortableText from './objects/basicPortableText'
import bodyPortableText from './objects/bodyPortableText'
import bgImage from './objects/bgImage'
import bioPortableText from './objects/bioPortableText'
import button from './objects/button'
import excerptPortableText from './objects/excerptPortableText'
import iframeEmbed from './objects/iframeEmbed'
import faqItem from './objects/faqItem'
import hero from './objects/hero'
import localFile from './objects/localFile'
import mainImage from './objects/mainImage'
import mytable from './objects/myTable'
import slideshowImage from './objects/slideshowImage'
import seo from './objects/seo'
import youtube from './objects/youtube'

// sections
import bigHeading from './objects/sections/bigHeading'
import cardSection from './objects/sections/cardSection'
import ctaSection from './objects/sections/cta'
import faqSection from './objects/sections/faqSection'
import magSection from './objects/sections/magazine'
import reusedSection from './objects/sections/reusedSection'
import testimonialSection from './objects/sections/testimonialSection'
import testimonialsSection from './objects/sections/testimonialsSection'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'cac',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    mapMarker,
    post,
    page,
    pageSimple,
    pageSpecial,
    pageSupport,
    reusableSection,
    siteHome,
    siteSettings,
    testimonial,
    // objects
    author,
    authorReference,
    avatarImage,
    barePortableText,
    basicPortableText,
    bgImage,
    bioPortableText,
    button,
    bodyPortableText,
    category,
    excerptPortableText,
    faqItem,
    hero,
    iframeEmbed,
    localFile,
    mainImage,
    mytable,
    slideshowImage,
    seo,
    youtube,
    // sections
    // cardSection,
    bigHeading,
    ctaSection,
    faqSection,
    magSection,
    reusedSection,
    testimonialSection,
    testimonialsSection,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
})
