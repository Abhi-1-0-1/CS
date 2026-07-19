const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const PY_KEYWORDS = [
  'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
  'import', 'as', 'from', 'try', 'except', 'finally', 'class', 'with', 'global',
  'break', 'continue', 'pass', 'is', 'None', 'True', 'False', 'lambda', 'del',
  'raise', 'yield', 'assert',
]

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
  'CREATE', 'TABLE', 'DATABASE', 'DATABASES', 'TABLES', 'USE', 'SHOW', 'DESCRIBE', 'DESC',
  'ALTER', 'ADD', 'DROP', 'PRIMARY', 'KEY', 'NOT', 'NULL', 'UNIQUE', 'DISTINCT',
  'ORDER', 'BY', 'GROUP', 'HAVING', 'JOIN', 'NATURAL', 'CROSS', 'ON', 'AND', 'OR',
  'IN', 'BETWEEN', 'LIKE', 'AS', 'INT', 'INTEGER', 'VARCHAR', 'CHAR', 'DATE', 'DECIMAL', 'FLOAT',
]

function buildMaster({ commentRe, stringRe, keywords, flags }) {
  const kwPattern = keywords.join('|')
  return new RegExp(
    `(?<comment>${commentRe})|(?<string>${stringRe})|(?<number>\\b\\d+\\.?\\d*\\b)|(?<keyword>\\b(?:${kwPattern})\\b)|(?<fn>\\b[A-Za-z_][A-Za-z0-9_]*(?=\\s*\\())`,
    flags
  )
}

function run(code, master) {
  const escaped = escapeHtml(code)
  return escaped.replace(master, (match, ...rest) => {
    const groups = rest[rest.length - 1]
    if (groups.comment) return `<span class="cm">${groups.comment}</span>`
    if (groups.string) return `<span class="st">${groups.string}</span>`
    if (groups.number) return `<span class="num">${groups.number}</span>`
    if (groups.keyword) return `<span class="kw">${groups.keyword}</span>`
    if (groups.fn) return `<span class="fn">${groups.fn}</span>`
    return match
  })
}

const pyMaster = buildMaster({
  commentRe: '#.*$',
  stringRe: `'(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*"`,
  keywords: PY_KEYWORDS,
  flags: 'gm',
})

const sqlMaster = buildMaster({
  commentRe: '--.*$',
  stringRe: `'(?:[^'\\\\]|\\\\.)*'`,
  keywords: SQL_KEYWORDS,
  flags: 'gim',
})

export const highlightPy = (code) => run(code, pyMaster)
export const highlightSql = (code) => run(code, sqlMaster)
