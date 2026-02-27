function applyTransform(node, payload) {
  const { field, operation, value } = node.data
  const current = payload[field]

  switch (operation) {
    case 'uppercase':
      return { ...payload, [field]: String(current).toUpperCase() }

    case 'append':
      return { ...payload, [field]: String(current) + value }

    case 'add':
      return { ...payload, [field]: Number(current) + Number(value) }
  }
}
