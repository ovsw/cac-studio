import React from 'react'
import DefaultLayoutRoot from '@sanity/default-layout/lib/Root'

const CONNECTION_WARNING_DELAY_MS = 15000
const LOADING_MESSAGES = ['Loading…', 'Still loading…']

function getIsOnline() {
  if (typeof navigator === 'undefined') {
    return true
  }

  return navigator.onLine
}

function normalizeText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function isDeskRoute() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.location.pathname.includes('/desk')
}

function countLoadingTextMatches(rootElement) {
  if (!rootElement || typeof document === 'undefined') {
    return 0
  }

  const walker = document.createTreeWalker(rootElement, window.NodeFilter.SHOW_TEXT, null, false)
  let count = 0
  let node = walker.nextNode()

  while (node) {
    if (LOADING_MESSAGES.includes(normalizeText(node.textContent))) {
      count += 1
    }

    node = walker.nextNode()
  }

  return count
}

function hasDeskLoadingMarkers(rootElement) {
  if (!rootElement || !isDeskRoute()) {
    return false
  }

  const loadingTextCount = countLoadingTextMatches(rootElement)

  if (loadingTextCount === 0) {
    return false
  }

  if (rootElement.querySelector('[data-testid="desk-tool-list-pane"]') && loadingTextCount >= 1) {
    return true
  }

  if (rootElement.querySelector('[data-ui="PaneItem"]') && loadingTextCount >= 2) {
    return true
  }

  return LOADING_MESSAGES.some((message) => rootElement.textContent.includes(message))
}

function StudioConnectionBanner({ title, message, tone }) {
  const isOffline = tone === 'offline'
  const isRecovery = tone === 'recovery'

  return (
    <div
      style={{
        left: '1rem',
        position: 'fixed',
        right: '1rem',
        top: '1rem',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: isOffline ? '#fffbeb' : '#eff6ff',
          border: `1px solid ${isOffline ? '#f59e0b' : isRecovery ? '#60a5fa' : '#93c5fd'}`,
          borderRadius: '0.75rem',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
          margin: '0 auto',
          maxWidth: '56rem',
          pointerEvents: 'auto',
          padding: '0.875rem 1rem',
        }}
      >
        <strong style={{ color: isOffline ? '#92400e' : '#1d4ed8', display: 'block' }}>{title}</strong>
        <span style={{ color: '#1f2937', display: 'block', marginTop: '0.25rem' }}>{message}</span>
      </div>
    </div>
  )
}

export default function StudioRoot() {
  const rootRef = React.useRef(null)
  const shouldShowReconnectPromptRef = React.useRef(false)
  const timeoutRef = React.useRef(null)
  const [isOnline, setIsOnline] = React.useState(getIsOnline)
  const [showRecoveryPrompt, setShowRecoveryPrompt] = React.useState(false)
  const [showSlowWarning, setShowSlowWarning] = React.useState(false)

  const clearSlowWarning = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setShowSlowWarning(false)
  }, [])

  const evaluateLoadingState = React.useCallback(() => {
    const rootElement = rootRef.current

    if (!rootElement || !isDeskRoute()) {
      shouldShowReconnectPromptRef.current = false
      setShowRecoveryPrompt(false)
      clearSlowWarning()
      return
    }

    if (!isOnline) {
      clearSlowWarning()
      return
    }

    const hasLoadingMarkers = hasDeskLoadingMarkers(rootElement)

    if (!hasLoadingMarkers) {
      if (!shouldShowReconnectPromptRef.current) {
        setShowRecoveryPrompt(false)
      }
      clearSlowWarning()
      return
    }

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setShowSlowWarning(true)
      }, CONNECTION_WARNING_DELAY_MS)
    }
  }, [clearSlowWarning, isOnline])

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleOnline = () => {
      setIsOnline(true)

      if (shouldShowReconnectPromptRef.current && isDeskRoute()) {
        clearSlowWarning()
        setShowRecoveryPrompt(true)
        return
      }

      evaluateLoadingState()
    }

    const handleOffline = () => {
      shouldShowReconnectPromptRef.current = isDeskRoute()
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [evaluateLoadingState])

  React.useEffect(() => {
    if (!isOnline && isDeskRoute()) {
      setShowRecoveryPrompt(false)
    }
  }, [isOnline])

  React.useEffect(() => {
    evaluateLoadingState()
  }, [evaluateLoadingState])

  React.useEffect(() => {
    const rootElement = rootRef.current

    if (!rootElement || typeof MutationObserver === 'undefined') {
      return undefined
    }

    const observer = new MutationObserver(() => {
      evaluateLoadingState()
    })

    observer.observe(rootElement, {
      characterData: true,
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [evaluateLoadingState])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div ref={rootRef} style={{ height: '100%', minHeight: '100vh' }}>
      {!isOnline && (
        <StudioConnectionBanner
          title='Studio is offline'
          message='Content may not load until your internet connection returns.'
          tone='offline'
        />
      )}
      {isOnline && showRecoveryPrompt && (
        <div
          style={{
            left: '1rem',
            position: 'fixed',
            right: '1rem',
            top: '1rem',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #60a5fa',
              borderRadius: '0.75rem',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'space-between',
              margin: '0 auto',
              maxWidth: '56rem',
              padding: '0.875rem 1rem',
            }}
          >
            <div>
              <strong style={{ color: '#1d4ed8', display: 'block' }}>Connection was restored</strong>
              <span style={{ color: '#1f2937', display: 'block', marginTop: '0.25rem' }}>
                This view may still be stuck from the outage. Reload the Studio to retry loading.
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#2563eb',
                  border: '1px solid #2563eb',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  cursor: 'pointer',
                  font: 'inherit',
                  padding: '0.5rem 0.875rem',
                }}
                type='button'
              >
                Reload Studio
              </button>
              <button
                onClick={() => {
                  shouldShowReconnectPromptRef.current = false
                  setShowRecoveryPrompt(false)
                }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #93c5fd',
                  borderRadius: '0.5rem',
                  color: '#1d4ed8',
                  cursor: 'pointer',
                  font: 'inherit',
                  padding: '0.5rem 0.875rem',
                }}
                type='button'
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
      {isOnline && showSlowWarning && (
        <StudioConnectionBanner
          title='Studio content is taking longer than expected'
          message='Check your internet connection or reload the Studio if this view stays stuck loading.'
          tone='slow'
        />
      )}
      <DefaultLayoutRoot />
    </div>
  )
}
