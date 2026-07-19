import useScrollSpy from '../hooks/useScrollSpy'
import ChapterHero from '../components/ChapterHero'
import ChapterFooterNav from '../components/ChapterFooterNav'
import CodeBlock from '../components/CodeBlock'
import { FlowCol, FlowBox, FlowArrow, FlowBranch } from '../components/Flow'
import { Section, Subsection, Callout, CardGrid, Card, Compare, CompareCard, TableWrap, SummaryStrip } from '../components/Content'

const PILLS = [
  { id: 'core-concepts', icon: '🧭', label: 'Core Concepts' },
  { id: 'handling-blocks', icon: '🧱', label: 'The Blocks' },
  { id: 'flow-of-execution', icon: '🔀', label: 'Flow of Execution' },
  { id: 'built-in-exceptions', icon: '📋', label: 'Built-in Exceptions' },
  { id: 'comprehensive-example', icon: '🧪', label: 'Full Example' },
]

export default function Exceptions() {
  const active = useScrollSpy(PILLS.map((p) => p.id))

  return (
    <>
      <ChapterHero
        eyebrow="Class 12 · Computer Science · Python"
        titlePre="Exception"
        titleEm="Handling"
        subtitle="Managing runtime errors gracefully with try, except, else and finally."
        pills={PILLS}
        activeId={active}
        color="red"
      />

      <div className="content">

        <Section id="core-concepts" color="red" icon="🧭" num="01" title="Core Concepts"
          desc="Exception handling manages errors that occur during program execution, without crashing it." first>

          <Subsection title="What is an Exception?" color="red">
            <p>An exception is an error that occurs <strong>at run time</strong> — one that can't be handled by the normal flow of control.</p>
            <Callout type="warning" title="Critical Distinction">
              Compile-time / syntax errors (a missing colon, wrong indentation) are <strong>NOT</strong> exceptions. Exception handling only deals with runtime errors.
            </Callout>

            <FlowCol style={{ maxWidth: 520 }}>
              <FlowBox variant="start-end">Errors in Python</FlowBox>
              <FlowArrow />
              <FlowBranch>
                <div>
                  <FlowBox>Syntax / Compile-time Errors<br /><span style={{ color: 'var(--dim)', fontWeight: 400, fontSize: 11 }}>missing colon, wrong indentation</span></FlowBox>
                  <div className="flow-outcome" style={{ color: 'var(--dim)' }}>Not handled by exception handling</div>
                </div>
                <div>
                  <FlowBox variant="accent">Runtime Errors (Exceptions)<br /><span style={{ color: 'var(--dim)', fontWeight: 400, fontSize: 11 }}>ZeroDivisionError, ValueError, NameError…</span></FlowBox>
                  <div className="flow-outcome ok">Handled by try / except</div>
                </div>
              </FlowBranch>
            </FlowCol>
          </Subsection>

          <Subsection title="Examples of Common Exceptions" color="red">
            <CardGrid>
              <Card icon="➗" title="ZeroDivisionError">Dividing a number by zero.</Card>
              <Card icon="🔤" title="ValueError">Passing a value of the wrong type or format.</Card>
              <Card icon="❓" title="NameError">Using a variable that hasn't been defined.</Card>
            </CardGrid>
          </Subsection>
        </Section>

        <Section id="handling-blocks" color="red" icon="🧱" num="02" title="The Exception Handling Blocks"
          desc={<>Python uses four blocks to test, catch, and resolve errors: <code>try</code>, <code>except</code>, <code>else</code>, <code>finally</code>.</>}>

          <Subsection title={<>The <code>try</code> Block</>} color="red">
            <p>Lets you test a block of code for errors. Python runs the <code>try</code> block first — the moment an error occurs, it stops and jumps to the matching <code>except</code> block.</p>
            <CodeBlock label="Example" code={`try:
    y = int(input("Enter a number: "))
    # If this fails, the lines below won't run
    print(y * 2)`} />
          </Subsection>

          <Subsection title={<>The <code>except</code> Block</>} color="red">
            <p>Handles the error. You can have multiple <code>except</code> blocks to catch specific error types, plus one generic catch-all.</p>
            <CodeBlock label="Example" code={`try:
    y = int(input("Enter a number: "))
    print(x)
except NameError:
    print("Variable x is not defined")  # Specific handler first
except:
    print("Something else went wrong")  # Generic catch-all last`} />
            <Callout type="danger" title="Order Rule">
              Always put specific <code>except</code> blocks (like <code>NameError</code>) before the generic <code>except:</code>. Python checks them top-to-bottom and stops at the first match.
            </Callout>
          </Subsection>

          <Subsection title={<>The <code>else</code> Block</>} color="red">
            <p>Executes only when the <code>try</code> block finishes with <strong>no error</strong> — it runs after <code>try</code> succeeds, but before <code>finally</code>.</p>
            <CodeBlock label="Example" code={`try:
    result = 10 / 2
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print("Success! Result is", result)  # Only runs if no exception`} />
          </Subsection>

          <Subsection title={<>The <code>finally</code> Block</>} color="red">
            <p>Executes <strong>regardless</strong> of whether an exception occurred or was handled. Always the last block to run — typically used for clean-up (closing files, printing goodbye messages).</p>
            <CodeBlock label="Example" code={`try:
    f = open("data.txt")
except FileNotFoundError:
    print("File not found")
finally:
    print("Good bye")  # Runs no matter what`} />
          </Subsection>

          <Subsection title="Block Summary" color="red">
            <TableWrap
              head={['Block', 'When It Runs', 'Typical Use']}
              rows={[
                ['<code>try</code>', 'Always — first', 'Code that might raise an exception'],
                ['<code>except</code>', 'Only if an exception occurs', 'Handle / report the error'],
                ['<code>else</code>', 'Only if no exception occurred', 'Code that should run on success'],
                ['<code>finally</code>', 'Always — last', 'Clean-up (close files, print goodbye)'],
              ]}
            />
          </Subsection>
        </Section>

        <Section id="flow-of-execution" color="red" icon="🔀" num="03" title="Flow of Execution"
          desc={<>The execution path depends entirely on whether an exception is raised inside <code>try</code>.</>}>

          <Subsection title="Two Scenarios" color="red">
            <Compare>
              <CompareCard title="✅ Scenario A — No Exception" color="green">
                <FlowCol style={{ maxWidth: '100%', margin: '12px auto 0' }}>
                  <FlowBox>try</FlowBox><FlowArrow /><FlowBox>else</FlowBox><FlowArrow /><FlowBox>finally</FlowBox>
                </FlowCol>
                <p style={{ marginTop: 10, fontSize: 13 }}>Path: <code>try → else → finally</code></p>
              </CompareCard>
              <CompareCard title="⚠ Scenario B — Exception Occurs" color="red">
                <FlowCol style={{ maxWidth: '100%', margin: '12px auto 0' }}>
                  <FlowBox>try <span style={{ color: 'var(--amber)' }}>⚠ stops at error</span></FlowBox><FlowArrow /><FlowBox>matching except</FlowBox><FlowArrow /><FlowBox>finally</FlowBox>
                </FlowCol>
                <p style={{ marginTop: 10, fontSize: 13 }}>Path: <code>try → except → finally</code> — <span style={{ color: 'var(--dim)', textDecoration: 'line-through' }}>else is skipped</span></p>
              </CompareCard>
            </Compare>

            <div className="pre-label" style={{ marginTop: 24 }}>Full decision flow</div>
            <FlowCol>
              <FlowBox variant="start-end">Start</FlowBox>
              <FlowArrow />
              <FlowBox variant="accent">try block — execute code</FlowBox>
              <FlowArrow />
              <FlowBox>Exception occurred?</FlowBox>
              <FlowBranch>
                <div><div className="flow-branch-label no">No</div><FlowBox>else block runs on success</FlowBox></div>
                <div><div className="flow-branch-label yes">Yes</div><FlowBox>Matching except block?</FlowBox></div>
              </FlowBranch>
              <FlowBranch>
                <div />
                <div><div className="flow-branch-label yes">Yes → No</div><FlowBox style={{ fontSize: 12 }}>Matching except runs / Generic except runs</FlowBox></div>
              </FlowBranch>
              <FlowArrow />
              <FlowBox variant="accent">finally block — always runs</FlowBox>
              <FlowArrow />
              <FlowBox variant="start-end">End</FlowBox>
            </FlowCol>
          </Subsection>
        </Section>

        <Section id="built-in-exceptions" color="red" icon="📋" num="04" title="Common Built-in Exceptions"
          desc="The three exceptions you'll meet most often in Class 12 programs.">
          <Subsection>
            <TableWrap
              head={['Exception', 'When It Occurs', 'Example']}
              rows={[
                ['<code>ZeroDivisionError</code>', 'Dividing a number by zero', '<code>c = 5 / 0</code>'],
                ['<code>ValueError</code>', 'Input value is the wrong type or format', '<code>int("hello")</code>'],
                ['<code>NameError</code>', 'A variable is used before being declared', "<code>print(x)</code> — if <code>x</code> was never assigned"],
              ]}
            />
          </Subsection>
        </Section>

        <Section id="comprehensive-example" color="red" icon="🧪" num="05" title="Comprehensive Example"
          desc={<>All four blocks and multiple <code>except</code> handlers, combined.</>}>
          <Subsection>
            <CodeBlock label="Full example" code={`try:
    a = int(input("Enter a number: "))
    b = int(input("Enter a number: "))
    c = a / b                              # Could raise ZeroDivisionError or ValueError
except ZeroDivisionError:
    print("Divide by zero error")          # Specifically catches division by 0
except ValueError:
    print("Input value is not correct")    # Specifically catches bad input type
except:
    print("Some other error occurred")     # Catch-all for anything else
else:
    print("No error - calculation successful")  # Only runs if no except ran
finally:
    print("Good bye")                      # Always runs, no matter what`}
              notes={[
                { match: 'c = a / b', note: 'The risky line — division can raise ZeroDivisionError (b is 0) or the int() conversions above it can raise ValueError.' },
                { match: 'except ZeroDivisionError:', note: 'Checked first, and only fires for exactly this error type.' },
                { match: 'except ValueError:', note: 'Checked second — Python tries each except top-to-bottom until one matches.' },
                { match: 'except:\n    print("Some other error occurred")', note: 'Generic catch-all — must come last, since Python stops at the first matching except.' },
                { match: 'else:\n    print("No error - calculation successful")', note: 'Only runs if the try block completed with zero exceptions raised.' },
                { match: 'finally:\n    print("Good bye")', note: 'Runs in every single case — success, any exception, doesn\'t matter.' },
              ]}
            />

            <h3 className="subsection-title" style={{ marginTop: 28 }}><span className="dot dot-red" />Execution Trace</h3>
            <TableWrap
              head={['Input a', 'Input b', 'Path Taken']}
              rows={[
                ['10', '2', 'try ✅ → else ✅ → finally ✅'],
                ['10', '0', 'try ⚠ → ZeroDivisionError → finally ✅'],
                ['"hi"', '—', 'try ⚠ → ValueError → finally ✅'],
              ]}
            />
          </Subsection>
        </Section>

        <hr className="divider" />
        <SummaryStrip items={[
          ['Syntax errors', 'NOT exceptions'],
          ['Specific except', 'before generic <code>except:</code>'],
          ['<code>else</code>', 'runs only if NO error'],
          ['<code>finally</code>', 'ALWAYS runs, last'],
          ['Error occurs', '<code>else</code> is skipped'],
          ['No error', '<code>try → else → finally</code>'],
          ['Error', '<code>try → except → finally</code>'],
        ]} />
      </div>

      <ChapterFooterNav id="exceptions" />
    </>
  )
}
