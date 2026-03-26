const fs = require('fs')
const path = require('path')

const structurePath = path.join(__dirname, '..', 'deskStructure.config.json')
const structure = JSON.parse(fs.readFileSync(structurePath, 'utf8'))

const seenIds = new Set()

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function validateItem(item, ancestors = []) {
  const pathLabel = ancestors.concat(item.id || item.title || '<unknown>').join(' > ')

  invariant(item && typeof item === 'object', `Invalid item at ${pathLabel}`)
  invariant(typeof item.id === 'string' && item.id.length > 0, `Missing id at ${pathLabel}`)
  invariant(typeof item.title === 'string' && item.title.length > 0, `Missing title at ${pathLabel}`)
  invariant(item.kind === 'folder' || item.kind === 'document', `Unsupported kind at ${pathLabel}`)
  invariant(!seenIds.has(item.id), `Duplicate structure id "${item.id}" at ${pathLabel}`)

  seenIds.add(item.id)

  if (item.kind === 'document') {
    invariant(
      typeof item.schemaType === 'string' && item.schemaType.length > 0,
      `Missing schemaType for document item ${pathLabel}`
    )
    return
  }

  invariant(Array.isArray(item.items), `Folder ${pathLabel} must have an items array`)
  item.items.forEach((child) => validateItem(child, ancestors.concat(item.id)))
}

invariant(Array.isArray(structure), 'deskStructure.config.json must export an array')
structure.forEach((item) => validateItem(item, ['pages']))

console.log(`Validated desk structure config (${seenIds.size} explicit ids)`)
