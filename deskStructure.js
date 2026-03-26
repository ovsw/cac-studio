import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import {
  MdSettings,
  MdFolder,
  MdHome,
  MdEdit,
  MdVisibility,
  MdWarning,
  MdDescription,
} from 'react-icons/md'
import { FaComment } from 'react-icons/fa'
import pagesStructure from './deskStructure.config.json'

const PREVIEW_BASE_URL = 'https://cac-web3.netlify.app/'
const DESK_DIAGNOSTIC_PREFIX = '[sanity-desk]'
const CONNECTION_WARNING_DELAY_MS = 15000

function getIsOnline() {
  if (typeof navigator === 'undefined') {
    return true
  }

  return navigator.onLine
}

function getRouteContext() {
  if (typeof window === 'undefined') {
    return {}
  }

  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

function toErrorPayload(error) {
  if (!error) {
    return null
  }

  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
  }
}

function logDeskError(meta, error, extra = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    ...meta,
    ...extra,
    route: getRouteContext(),
    error: toErrorPayload(error),
  }

  // Keep diagnostics in the console so editors can report exact context.
  console.error(DESK_DIAGNOSTIC_PREFIX, payload)
  return payload
}

function DeskErrorState({ title, message, payload }) {
  return (
    <div style={{ padding: '1.5rem', lineHeight: 1.5 }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <p>{message}</p>
      {payload && (
        <details>
          <summary>Diagnostic context</summary>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(payload, null, 2)}
          </pre>
        </details>
      )}
    </div>
  )
}

function DeskLoadingState({ title, message, tone = 'default' }) {
  const accentColor = tone === 'offline' ? '#92400e' : '#1d4ed8'
  const backgroundColor = tone === 'offline' ? '#fffbeb' : '#eff6ff'
  const borderColor = tone === 'offline' ? '#f59e0b' : '#93c5fd'

  return (
    <div style={{ padding: '1.5rem', lineHeight: 1.5 }}>
      <div
        style={{
          backgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '0.75rem',
          color: accentColor,
          padding: '1rem 1.25rem',
        }}
      >
        <h2 style={{ color: accentColor, margin: 0 }}>{title}</h2>
        <p style={{ color: '#1f2937', marginBottom: 0, marginTop: '0.5rem' }}>{message}</p>
      </div>
    </div>
  )
}

class DeskPaneErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      payload: null,
    }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    const payload = logDeskError(
      {
        scope: 'pane',
        paneId: this.props.paneId,
        paneTitle: this.props.paneTitle,
      },
      error,
      {
        componentStack: info.componentStack,
        ...this.props.context,
      }
    )

    this.setState({ payload })
  }

  render() {
    const { children, paneTitle } = this.props
    const { error, payload } = this.state

    if (error) {
      return (
        <DeskErrorState
          title={`${paneTitle} failed to render`}
          message='This desk pane hit a runtime error. Reload the Studio and include the console output if the problem persists.'
          payload={payload}
        />
      )
    }

    return children
  }
}

function useOnlineStatus() {
  const [isOnline, setIsOnline] = React.useState(getIsOnline)

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

function PaneLoadingWatchdog({ isLoading, paneTitle, children }) {
  const isOnline = useOnlineStatus()
  const [showDelayedWarning, setShowDelayedWarning] = React.useState(false)

  React.useEffect(() => {
    if (!isLoading || !isOnline) {
      setShowDelayedWarning(false)
      return undefined
    }

    const timeoutId = setTimeout(() => {
      setShowDelayedWarning(true)
    }, CONNECTION_WARNING_DELAY_MS)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isLoading, isOnline])

  return (
    <React.Fragment>
      {isLoading && !isOnline && (
        <DeskLoadingState
          title={`${paneTitle} is offline`}
          message='The Studio is offline. Content may not load until the connection returns.'
          tone='offline'
        />
      )}
      {isLoading && isOnline && showDelayedWarning && (
        <DeskLoadingState
          title={`${paneTitle} is taking longer than expected`}
          message='This pane is still loading. Check your internet connection or reload the Studio if it does not recover.'
        />
      )}
      {children}
    </React.Fragment>
  )
}

function wrapPaneComponent(paneId, paneTitle, Component, options = {}) {
  const getIsLoading = options.getIsLoading || (() => false)

  return function WrappedPane(props) {
    const displayed = props.document && props.document.displayed ? props.document.displayed : {}
    const isLoading = Boolean(getIsLoading(props))

    return (
      <DeskPaneErrorBoundary
        paneId={paneId}
        paneTitle={paneTitle}
        context={{
          documentId: displayed._id,
          schemaType: displayed._type,
        }}
      >
        <PaneLoadingWatchdog isLoading={isLoading} paneTitle={paneTitle}>
          <Component {...props} />
        </PaneLoadingWatchdog>
      </DeskPaneErrorBoundary>
    )
  }
}

const WebPreview = ({ document }) => {
  const displayed = document && document.displayed ? document.displayed : {}
  const slug = displayed.content && displayed.content.slug ? displayed.content.slug.current : null

  if (!displayed._type) {
    return (
      <DeskLoadingState
        title='Loading preview'
        message='Waiting for the document payload before the preview can be rendered.'
      />
    )
  }

  if (!slug) {
    if (displayed._type === 'siteHome') {
      return (
        <iframe
          src={`${PREVIEW_BASE_URL}?preview=true`}
          frameBorder={0}
          width='100%'
          height='100%'
        />
      )
    }

    return <h1>Please set a slug to see a preview</h1>
  }

  const pathPrefixes = {
    page: '',
    post: 'blog/',
    pageSupport: '',
    pageSimple: '',
  }

  const pathPrefix = pathPrefixes[displayed._type] || ''
  const targetURL = `${PREVIEW_BASE_URL}${pathPrefix}${slug}/?preview=true`
  return <iframe src={targetURL} frameBorder={0} width='100%' height='100%' />
}

const SafeWebPreview = wrapPaneComponent('webPreview', 'Web Preview', WebPreview, {
  getIsLoading: (props) => {
    const displayed = props.document && props.document.displayed ? props.document.displayed : {}
    return !displayed._type
  },
})

function createDocumentListItem(definition) {
  return S.documentListItem()
    .id(definition.id)
    .title(definition.title)
    .schemaType(definition.schemaType)
    .icon(MdDescription)
}

function createErrorPane({ id, title, payload }) {
  return S.component()
    .id(`${id}__errorPane`)
    .title(title)
    .component(() => (
      <DeskErrorState
        title={`${title} failed to load`}
        message='This desk section could not be resolved. Reload the Studio and include the console output if the problem persists.'
        payload={payload}
      />
    ))
}

function createErrorListItem({ id, title, error, path }) {
  const payload = logDeskError(
    {
      scope: 'structure',
      sectionId: id,
      sectionTitle: title,
    },
    error,
    {
      path,
    }
  )

  return S.listItem()
    .id(`${id}__error`)
    .title(`${title} (Error)`)
    .icon(MdWarning)
    .child(createErrorPane({ id, title, payload }))
}

function buildStructureItem(definition, ancestors = []) {
  if (definition.kind === 'document') {
    return createDocumentListItem(definition)
  }

  if (definition.kind !== 'folder') {
    throw new Error(`Unsupported structure item kind "${definition.kind}"`)
  }

  const path = ancestors.concat(definition.id).join(' > ')

  try {
    if (!Array.isArray(definition.items)) {
      throw new Error(`Folder "${definition.id}" is missing an items array`)
    }

    const childList = S.list()
      .id(`${definition.id}__list`)
      .title(definition.title)
      .items(definition.items.map((item) => buildStructureItem(item, ancestors.concat(definition.id))))

    return S.listItem()
      .id(definition.id)
      .title(definition.title)
      .icon(MdFolder)
      .child(childList)
  } catch (error) {
    return createErrorListItem({
      id: definition.id,
      title: definition.title,
      error,
      path,
    })
  }
}

function buildPagesBranch() {
  return S.listItem()
    .id('pages')
    .title('Pages')
    .icon(MdFolder)
    .child(
      S.list()
        .id('pages__list')
        .title('Pages')
        .items(pagesStructure.map((item) => buildStructureItem(item, ['pages'])))
    )
}

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (
    schemaType === 'page' ||
    schemaType === 'siteHome' ||
    schemaType === 'post' ||
    schemaType === 'pageSupport' ||
    schemaType === 'pageSimple'
  ) {
    return S.document().views([
      S.view.form().icon(MdEdit),
      S.view.component(SafeWebPreview).title('Web Preview').icon(MdVisibility),
    ])
  }
}

export default () =>
  S.list()
    .id('content')
    .title('Content')
    .items([
      S.documentListItem().id('siteHome').title('Site Home').schemaType('siteHome').icon(MdHome),
      S.listItem()
        .id('settings')
        .title('Settings')
        .icon(MdSettings)
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      buildPagesBranch(),
      S.listItem()
        .id('reusableSections')
        .title('Reusable Sections')
        .schemaType('reusableSection')
        .child(S.documentTypeList('reusableSection').id('reusableSections__list').title('Reusable Sections')),
      S.divider(),
      S.listItem()
        .id('blogPosts')
        .title('Blog Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').id('blogPosts__list').title('Blog Posts')),
      S.listItem()
        .id('blogAuthors')
        .title('Blog Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').id('blogAuthors__list').title('Blog Authors')),
      S.divider(),
      S.listItem()
        .id('testimonials')
        .title('Testimonials')
        .icon(FaComment)
        .child(S.documentTypeList('testimonial').id('testimonials__list').title('Testimonials')),
      S.divider(),
      S.listItem()
        .id('faqItems')
        .title('FAQ Items')
        .schemaType('faqItem')
        .child(S.documentTypeList('faqItem').id('faqItems__list').title('FAQ Items')),
      S.listItem()
        .id('supportPages')
        .title('Support Pages')
        .schemaType('pageSupport')
        .child(S.documentTypeList('pageSupport').id('supportPages__list').title('Support Pages')),
      S.listItem()
        .id('simplePages')
        .title('Simple Pages')
        .schemaType('pageSimple')
        .child(S.documentTypeList('pageSimple').id('simplePages__list').title('Simple Pages')),
    ])
