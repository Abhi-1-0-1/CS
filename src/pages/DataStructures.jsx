import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useScrollSpy from '../hooks/useScrollSpy'
import ChapterHero from '../components/ChapterHero'
import ChapterFooterNav from '../components/ChapterFooterNav'
import CodeBlock from '../components/CodeBlock'
import { Section, Subsection, Callout, CardGrid, Card, Compare, CompareCard, TableWrap, SummaryStrip } from '../components/Content'

const PILLS = [
  { id: 'core-concepts', icon: '🧭', label: 'Core Concepts' },
  { id: 'stack-operations', icon: '🥞', label: 'Stack Operations' },
  { id: 'exam-logic', icon: '🎯', label: 'Exam Logic' },
  { id: 'summary', icon: '📋', label: 'Summary' },
]

function StackPlayground() {
  const idRef = useRef(0)
  const seed = () => ['10', '20', '30'].map((v) => ({ id: idRef.current++, value: v }))
  const [stack, setStack] = useState(seed)
  const [value, setValue] = useState('')
  const [msg, setMsg] = useState('')

  const push = () => {
    const v = value.trim()
    if (!v) return
    setStack((s) => [...s, { id: idRef.current++, value: v }])
    setValue('')
    setMsg(`PUSH(${v}) → Element pushed`)
  }
  const pop = () => {
    if (stack.length === 0) {
      setMsg('POP() → Stack underflow — "Stack Empty"')
      return
    }
    const top = stack[stack.length - 1]
    setStack((s) => s.slice(0, -1))
    setMsg(`POP() → ${top.value}`)
  }
  const onKeyDown = (e) => { if (e.key === 'Enter') push() }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 22, margin: '18px auto', maxWidth: 280 }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 12, textAlign: 'center' }}>🎮 Try it — L = []</div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="value"
          style={{
            flex: 1, minWidth: 0, background: 'var(--surface2)', border: '1px solid var(--border2)',
            borderRadius: 8, padding: '8px 10px', color: 'var(--text)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
          }}
        />
        <button onClick={push} className="copy-btn" style={{ color: 'var(--teal)', borderColor: 'var(--teal)' }}>PUSH</button>
        <button onClick={pop} className="copy-btn" style={{ color: 'var(--red)', borderColor: 'var(--red)' }}>POP</button>
      </div>

      <div style={{ minHeight: 16, fontSize: 11.5, color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", marginBottom: 12, textAlign: 'center' }}>{msg}</div>

      <div style={{ color: 'var(--teal)', fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>← Top (LIFO)</div>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, minHeight: 40 }}>
        <AnimatePresence initial={false}>
          {stack.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--dim)', fontSize: 12, padding: '10px 0' }}>Stack Empty</div>
          )}
          {stack.map((item, i) => {
            const isTop = i === stack.length - 1
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.25 }}
                style={{
                  padding: 10, textAlign: 'center',
                  background: isTop ? 'var(--teal-dim)' : 'var(--surface2)',
                  border: `1px solid ${isTop ? 'var(--teal)' : 'var(--border)'}`,
                  borderTop: i < stack.length - 1 ? 'none' : undefined,
                  color: isTop ? 'var(--text)' : 'var(--muted)',
                }}
              >
                {item.value}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <div style={{ color: 'var(--dim)', fontSize: 10, marginTop: 8, textAlign: 'center' }}>Bottom</div>
    </motion.div>
  )
}

export default function DataStructures() {
  const active = useScrollSpy(PILLS.map((p) => p.id))

  return (
    <>
      <ChapterHero
        eyebrow="Class 12 · Computer Science · Python"
        titlePre="Data"
        titleEm="Structures"
        subtitle="Organising, storing and retrieving data — with a focus on the Stack (LIFO)."
        pills={PILLS}
        activeId={active}
        color="teal"
      />

      <div className="content">

        <Section id="core-concepts" color="teal" icon="🧭" num="01" title="Core Concepts"
          desc="A data structure is a specialised format for organising, processing, retrieving and storing data in computer memory." first>

          <Subsection title="Primary Policies" color="teal">
            <Compare>
              <CompareCard title="🥞 Stack — LIFO" color="teal">
                <ul><li><strong>L</strong>ast <strong>I</strong>n <strong>F</strong>irst <strong>O</strong>ut</li><li>The last element added is the first to be removed</li></ul>
              </CompareCard>
              <CompareCard title="🚶 Queue — FIFO" color="blue">
                <ul><li><strong>F</strong>irst <strong>I</strong>n <strong>F</strong>irst <strong>O</strong>ut</li><li>The first element added is the first to be removed</li></ul>
              </CompareCard>
            </Compare>
          </Subsection>

          <Subsection title="Applications of Stack" color="teal">
            <CardGrid>
              <Card icon="🧮" title="Expression Evaluation">Evaluating and converting expressions — e.g. Infix to Postfix.</Card>
              <Card icon="🔣" title="Syntax & Delimiter Checking">Checking matched brackets/delimiters in code and expressions.</Card>
              <Card icon="🌐" title="Browser History">Tracking previously visited pages so "Back" can pop the most recent one.</Card>
            </CardGrid>
          </Subsection>
        </Section>

        <Section id="stack-operations" color="teal" icon="🥞" num="02" title="Stack Operations & Implementation"
          desc={<>In Python, a stack is implemented using a <strong>List</strong> — the end of the list is the <strong>Top</strong> of the stack.</>}>

          <Subsection title="Initialization" color="teal">
            <p>Create an empty list to act as the stack.</p>
            <CodeBlock label="Stack object" code={`L = []  # Stack object`} />
            <StackPlayground />
          </Subsection>

          <Subsection title="The PUSH Operation (Insertion)" color="teal">
            <p>Adds an element to the top of the stack, using <code>.append()</code> to add data to the end of the list.</p>
            <CodeBlock label="Example" code={`def PUSH(E):
    L.append(E)  # E is the element to be pushed
    print("Element pushed")`}
              notes={[
                { match: 'def PUSH(E):', note: 'E is the parameter — whatever value the caller wants pushed onto the stack.' },
                { match: 'L.append(E)', note: 'Adds E to the end of the list — since the end of the list is defined as the "top" of the stack, this is exactly what a push means.' },
              ]}
            />
          </Subsection>

          <Subsection title="The POP Operation (Deletion)" color="teal">
            <p>Removes an element from the top of the stack using <code>.pop()</code>.</p>
            <Callout type="warning" title="Underflow">
              Always check if the stack is empty (<code>L == []</code>) before deleting. Attempting to delete from an empty stack is called <strong>Stack Underflow</strong>.
            </Callout>
            <Callout type="note" title="Exam Variation">
              Exam questions often specifically ask you to display <strong>"Stack Empty"</strong> (rather than "Stack Underflow") when POP is called on an empty stack — check what the question asks for.
            </Callout>
            <CodeBlock label="Example" code={`def POP():
    if L == []:  # Empty check
        print("Stack underflow")  # Or "Stack Empty" based on question
    else:
        print(L.pop())  # Removes and returns the top element`}
              notes={[
                { match: 'if L == []:', note: 'Always check this before popping — trying to pop nothing is the Underflow error.' },
                { match: 'L.pop()', note: "Python's own list method — removes AND returns the last element, which is the stack's top." },
              ]}
            />
          </Subsection>

          <Subsection title="The Display Operation (Traversal)" color="teal">
            <Callout type="danger" title="Reverse Order">
              Because a stack is LIFO, elements must be displayed <strong>Top to Bottom</strong> — the last element pushed is shown first.
            </Callout>
            <Callout type="note" title="The Range Function">
              To iterate backward through a list of length <code>n</code>, use: <code>range(-1, -1 * len(L) - 1, -1)</code>.
            </Callout>
            <CodeBlock label="Example" code={`def Display():
    if L == []:
        print("Stack Empty")
    else:
        # Iterates from the last index (-1) to the first
        for I in range(-1, -1 * len(L) - 1, -1):
            print(L[I], end=" ")`} />
          </Subsection>
        </Section>

        <Section id="exam-logic" color="teal" icon="🎯" num="03" title="Data Manipulation Nuances (Exam Logic)"
          desc={'Exam questions typically involve "filtering" data from a source — a list of records or a dictionary — into a stack.'}>

          <Subsection title="Filtering from Nested Lists" color="teal">
            <p>When pushing records from a nested list (e.g. <code>[City, Country, Distance]</code>), iterate through the source and apply the given conditions. The question may ask you to push only <strong>specific fields</strong> (e.g. only "City") rather than the whole record.</p>
            <CodeBlock label="Example condition" code={`if record[2] < 3500 and record[1] != "India":`} />
          </Subsection>

          <Subsection title="Filtering from Dictionaries" color="teal">
            <p>When the source is a dictionary (e.g. <code>{'{Item: Price}'}</code>), iterate through the keys. Questions often ask you to calculate and <strong>display the count</strong> of elements successfully pushed.</p>
            <CodeBlock label="Example — push with a count" code={`def PUSH(Ditem):
    count = 0
    for key in Ditem:
        if Ditem[key] > 75:  # Condition (e.g., price > 75)
            L.append(key)
            count += 1
    print("The count of elements in the stack is", count)`} />
          </Subsection>

          <Subsection title="Calculated Fields" color="teal">
            <p>Sometimes you must perform a calculation (e.g. <code>Total Sales = Jan_Sales + Feb_Sales</code>) before deciding whether to push the record.</p>
          </Subsection>
        </Section>

        <Section id="summary" color="teal" icon="📋" num="04" title="Summary of Differences & Definitions" desc="">
          <Subsection>
            <TableWrap
              head={['Concept', 'Policy / Method', 'Key Exam Nuance']}
              rows={[
                ['Stack', 'LIFO', 'Last element added is the first removed.'],
                ['Queue', 'FIFO', 'First element added is the first removed.'],
                ['Push', '<code>.append()</code>', 'Check filtering conditions before pushing.'],
                ['Pop', '<code>.pop()</code>', '<strong>Must</strong> check for empty stack (Underflow).'],
                ['Display', 'Backward loop', 'Use negative indexing in <code>range()</code>.'],
              ]}
            />
          </Subsection>
        </Section>

        <hr className="divider" />
        <SummaryStrip items={[
          ['Stack', 'LIFO'],
          ['Queue', 'FIFO'],
          ['Push', '<code>.append()</code>'],
          ['Pop', '<code>.pop()</code>, check empty first'],
          ['Empty check', '<code>L == []</code>'],
          ['Display order', 'Top to Bottom'],
          ['Backward loop', '<code>range(-1, -len(L)-1, -1)</code>'],
        ]} />
      </div>

      <ChapterFooterNav id="data-structures" />
    </>
  )
}
