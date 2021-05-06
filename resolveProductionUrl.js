export default function resolveProductionUrl(document) {
  const slug = document.slug?.current
  if (!slug) {
    return undefined
  }

  // Only show the preview option for documents for which a preview makes sense.
  if (document._type === "page") {
    return `https://dap-web2.netlify.app/${document.slug.current}/?preview=true`
  }

  if (document._type === "siteHome") {
    return `https://dap-web2.netlify.app/?preview=true`
  }

  // return `https://dap-web2.netlify.app/${document.slug.current}/?preview=true`
  return undefined
}