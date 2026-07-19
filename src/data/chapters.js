// Central list of chapters — single source of truth for nav + home page.
// `ready: false` chapters render as disabled "Soon" entries everywhere.

export const chapters = [
  {
    id: 'file-handling',
    path: '/file-handling',
    label: 'File Handling',
    shortLabel: 'File Handling',
    color: 'blue',
    icon: '📄',
    ready: true,
    num: '01',
    desc: 'Text, binary and CSV files — opening modes, reading/writing functions, pointer navigation, pickling and the temp-file update/delete pattern.',
    topics: ['Text Files', 'Binary & pickle', 'CSV', 'seek / tell'],
  },
  {
    id: 'exceptions',
    path: '/exceptions',
    label: 'Exception Handling',
    shortLabel: 'Exceptions',
    color: 'red',
    icon: '🐞',
    ready: true,
    num: '02',
    desc: 'Managing runtime errors gracefully with try, except, else and finally — block order rules, flow of execution, and common built-in exceptions.',
    topics: ['try / except', 'else / finally', 'Built-in exceptions'],
  },
  {
    id: 'functions',
    path: '/functions',
    label: 'Functions',
    shortLabel: 'Functions',
    color: 'purple',
    icon: '🧩',
    ready: true,
    num: '03',
    desc: 'Built-in, module and user-defined functions — argument types, flow of execution, variable scope, and building your own modules.',
    topics: ['Arguments', 'Scope', 'Modules'],
  },
  {
    id: 'data-structures',
    path: '/data-structures',
    label: 'Data Structures',
    shortLabel: 'Data Structures',
    color: 'teal',
    icon: '🥞',
    ready: true,
    num: '04',
    desc: 'Stacks in Python — LIFO, push/pop/display operations, underflow handling, and filtering records into a stack.',
    topics: ['Stack (LIFO)', 'Push / Pop', 'Exam logic'],
  },
  {
    id: 'sql',
    path: '/sql',
    label: 'SQL',
    shortLabel: 'SQL',
    color: 'green',
    icon: '🗄️',
    ready: true,
    num: '05',
    desc: 'Relational model, keys, DDL/DML commands, joins, and Python-MySQL connectivity — explained line by line with worked examples.',
    topics: ['DDL / DML', 'Joins', 'Python-MySQL'],
  },
  {
    id: 'computer-networks',
    path: null,
    label: 'Computer Networks',
    shortLabel: 'Networks',
    color: 'pink',
    icon: '🌐',
    ready: false,
    num: '06',
    desc: 'Notes will appear here once the source material for this chapter is added.',
    topics: [],
  },
]

export const getChapter = (id) => chapters.find((c) => c.id === id)
export const getNeighbors = (id) => {
  const ready = chapters.filter((c) => c.ready)
  const i = ready.findIndex((c) => c.id === id)
  return { prev: ready[i - 1] || null, next: ready[i + 1] || null }
}
