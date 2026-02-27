export const TRANSFORMS = {
  string: [
    { key: 'uppercase', label: 'Uppercase', needsValue: false },
    { key: 'append', label: 'Append', needsValue: true },
  ],
  number: [
    { key: 'add', label: 'Add', needsValue: true },
    { key: 'multiply', label: 'Multiply', needsValue: true },
  ],
}

export const STRING_OPS = ['uppercase', 'lowercase', 'append', 'prepend']
export const NUMBER_OPS = ['add', 'multiply']
