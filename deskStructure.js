import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdFolder, MdMap, MdHome, MdEdit, MdVisibility } from 'react-icons/md'

const hiddenDocTypes = (listItem) =>
  !['category', 'author', 'post', 'page', 'siteSettings', 'mapMarker'].includes(listItem.getId())

const url = 'https://cac-web3.netlify.app/'

const WebPreview = ({ document }) => {
  const { displayed } = document
  const slug = displayed.content.slug?.current

  if (!slug) {
    return <h1>Please set a slug to see a preview</h1>
  }

  const targetURL = url + slug + `/?preview=true`
  return <iframe src={targetURL} frameBorder={0} width="100%" height="100%" />
}

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Only show the iframe for documents for which a preview makes sense.
  if (schemaType === 'page') {
    return S.document().views([
      S.view.form().icon(MdEdit),
      S.view.component(WebPreview).title('Web Preview').icon(MdVisibility),
    ])
  }
}

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .icon(MdHome)
        .child(S.editor().id('siteHome').schemaType('siteHome').documentId('siteHome')),
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.documentListItem()
                .id('prospectiveFamilies')
                .title('Prospective Families')
                .schemaType('page'),
              S.listItem()
                .title('Prospective Families Section Pages')
                .child(
                  S.list()
                    .title('Prospective Families Section Pages')
                    .items([
                      S.documentListItem()
                        .id('theCacExperience')
                        .title('The CAC Experience')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('generalProgram')
                        .title('General Program')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('specialtyPrograms')
                        .title('Specialty Programs')
                        .schemaType('page'),
                      S.listItem()
                        .title('Specialty Programs Pages')
                        .id('programsPages')
                        .child(
                          S.list()
                            .title('Specialty Programs Pages')
                            .items([
                              S.documentListItem()
                                .id('gymnasticsProgram')
                                .title('Gymnastics')
                                .schemaType('page'),
                              S.documentListItem()
                                .id('trampolineProgram')
                                .title('Trampoline')
                                .schemaType('page'),
                              S.documentListItem()
                                .id('aerialsProgram')
                                .title('Aerials')
                                .schemaType('page'),
                              S.documentListItem()
                                .id('waterskyWakeboardProgram')
                                .title('Waterski & Wakeboard')
                                .schemaType('page'),
                            ])
                        )
                        .icon(MdFolder),
                      S.documentListItem()
                        .id('accomodationFacilities')
                        .title('Accomodation & Facilities')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('healthSafety')
                        .title('Health & Safety')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('internationalCampers')
                        .title('International Campers')
                        .schemaType('page'),
                      S.documentListItem().id('faqs').title('FAQs').schemaType('page'),
                      S.documentListItem()
                        .id('datesAndRates')
                        .title('Dates & Rates')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('testimoanials')
                        .title('Testimonials')
                        .schemaType('page'),
                    ])
                )
                .icon(MdFolder),
              S.documentListItem().id('about').title('About').schemaType('page'),
              S.listItem()
                .title('About Section Pages')
                .id('aboutSection')
                .child(
                  S.list()
                    .title('About Section Pages')
                    .items([
                      S.documentListItem()
                        .id('historyAndGoal')
                        .title('History and Goal')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('greatLeadership')
                        .title('Great Leadership')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('uniqueLocation')
                        .title('Unique Location')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('foodSampleMenu')
                        .title('Food & Sample Menu')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('membershipsPartnerships')
                        .title('Memberships & Partnerships')
                        .schemaType('page'),
                      S.documentListItem().id('alumni').title('Alumni').schemaType('page'),
                      S.documentListItem()
                        .id('photoGallery')
                        .title('Photo Gallery')
                        .schemaType('page'),
                      S.documentListItem().id('videos').title('Videos').schemaType('page'),
                    ])
                )
                .icon(MdFolder),
              S.documentListItem()
                .id('currentFamilies')
                .title('Current Families')
                .schemaType('page'),
              S.listItem()
                .title('Current Families Section Pages')
                .icon(MdFolder)
                .child(
                  S.list()
                    .title('Current Families Section Pages')
                    .items([
                      S.documentListItem()
                        .id('whatToBringToCamp')
                        .title('What to bring to camp')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('parentsGuide')
                        .title("Parent's Guide")
                        .schemaType('page'),
                      S.documentListItem()
                        .id('gettingToCamp')
                        .title('Getting to Camp')
                        .schemaType('page'),
                      S.listItem()
                        .title('Getting to Camp pages')
                        .id('gettingToCampPages')
                        .child(
                          S.list()
                            .title('Getting to Camp Pages')
                            .items([
                              S.documentListItem()
                                .id('travelByBus')
                                .title('Travel by Bus')
                                .schemaType('page'),
                              S.documentListItem()
                                .id('travelByCar')
                                .title('Travel by Car')
                                .schemaType('page'),
                              S.documentListItem()
                                .id('internationalCampersTravel')
                                .title('International Campers')
                                .schemaType('page'),
                            ])
                        )
                        .icon(MdFolder),
                      S.documentListItem()
                        .id('stayInTouchWithYourCamper')
                        .title('Stay in touch with your camper')
                        .schemaType('page'),
                      S.listItem()
                        .title('Stay in Touch pages')
                        .id('stayInTouchWithYourCamperPages')
                        .child(
                          S.list()
                            .title('Stay in touch Pages')
                            .items([
                              S.documentListItem()
                                .id('visitorDays')
                                .title("Visitor's Days")
                                .schemaType('page'),
                              S.documentListItem()
                                .id('placesToStay')
                                .title('Places to Stay')
                                .schemaType('page'),
                            ])
                        )
                        .icon(MdFolder),
                      S.documentListItem()
                        .id('campPictures')
                        .title('Camp Pictures')
                        .schemaType('page'),
                      S.documentListItem().id('campVideo').title('Camp Video').schemaType('page'),
                      S.documentListItem()
                        .id('parentLogin')
                        .title('Parent Log-in')
                        .schemaType('page'),
                    ])
                ),
              S.documentListItem()
                .id('nccpAdultCamp')
                .title('NCCP & Adult Camp')
                .schemaType('page'),
              S.listItem()
                .title('NCCP & Adult Camp Pages')
                .id('nccpAdultCampPages')
                .icon(MdFolder)
                .child(
                  S.list()
                    .title('NCCP & Adult Camp Pages')
                    .items([
                      S.documentListItem().id('adultCamp').title('Adult Camp').schemaType('page'),
                      S.documentListItem()
                        .id('nccpCourses')
                        .title('NCCP Courses')
                        .schemaType('page'),
                    ])
                ),
              S.documentListItem().id('staff').title('Staff').schemaType('page'),
              S.listItem()
                .title('Staff Pages')
                .icon(MdFolder)
                .child(
                  S.list()
                    .title('Staff Pages')
                    .items([
                      S.documentListItem()
                        .id('availablePositions')
                        .title('Available Positions')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('staffApplication')
                        .title('Staff Application')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('communityInitiatives')
                        .title('Community Initiatives')
                        .schemaType('page'),
                    ])
                ),
              S.documentListItem()
                .id('youthLeadershipProgram')
                .title('Youth Leadership Program')
                .schemaType('page'),

              S.listItem()
                .title('Youth Leadership Program Pages')
                .icon(MdFolder)
                .child(
                  S.list()
                    .title('YLP Pages')
                    .items([
                      S.documentListItem()
                        .id('leadershipProgramOne')
                        .title('Leadership One')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('leadershipProgramTwo')
                        .title('Leadership Two')
                        .schemaType('page'),
                      S.documentListItem()
                        .id('juniorStaff')
                        .title('Junior Staff')
                        .schemaType('page'),
                    ])
                ),
              S.documentListItem().id('joinOurTeam').title('Join Our Team').schemaType('page'),
              S.documentListItem()
                .id('blogHome')
                .title('News / Blog Home Page')
                .schemaType('pageSpecial'),
            ])
        ),
      S.listItem()
        .title('Reusable Sections')
        .schemaType('reusableSection')
        .child(S.documentTypeList('reusableSection').title('Reusable Sections')),
      S.divider(),
      S.listItem()
        .title('Blog Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog Posts')),
      S.listItem()
        .title('Blog Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Blog Authors')),
      S.divider(),
      S.listItem()
        .title('FAQ Items')
        .schemaType('faqItem')
        .child(S.documentTypeList('faqItem').title('FAQ Items')),
      S.listItem()
        .title('Support Pages')
        .schemaType('pageSupport')
        .child(S.documentTypeList('pageSupport').title('Support Pages')),
      S.listItem()
        .title('Simple Pages')
        .schemaType('pageSimple')
        .child(S.documentTypeList('pageSimple').title('Simple Pages')),
      // S.listItem()
      //   .title('Interactive Map')
      //   .icon(MdMap)
      //   .schemaType('mapMarker')
      //   .child(S.documentTypeList('mapMarker').title('Map Markers')),
      // S.listItem()
      //   .title('Authors')
      //   .icon(MdPerson)
      //   .schemaType('author')
      //   .child(S.documentTypeList('author').title('Authors')),
      // S.listItem()
      //   .title('Categories')
      //   .schemaType('category')
      //   .child(S.documentTypeList('category').title('Categories')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      // ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
