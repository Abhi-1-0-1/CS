import useScrollSpy from '../hooks/useScrollSpy'
import ChapterHero from '../components/ChapterHero'
import ChapterFooterNav from '../components/ChapterFooterNav'
import CodeBlock from '../components/CodeBlock'
import { FlowCol, FlowBox, FlowArrow, FlowBranch } from '../components/Flow'
import { Section, Subsection, Callout, CardGrid, Card, Compare, CompareCard, Steps, TableWrap, SummaryStrip } from '../components/Content'

const PILLS = [
  { id: 'types-of-functions', icon: '🧩', label: 'Types' },
  { id: 'udf', icon: '✍️', label: 'Defining a UDF' },
  { id: 'arguments', icon: '📥', label: 'Arguments' },
  { id: 'flow-of-execution', icon: '🔀', label: 'Flow' },
  { id: 'scope', icon: '🌐', label: 'Scope' },
  { id: 'modules', icon: '📦', label: 'Modules' },
  { id: 'exam-nuances', icon: '🎯', label: 'Exam Nuances' },
]

export default function Functions() {
  const active = useScrollSpy(PILLS.map((p) => p.id))

  return (
    <>
      <ChapterHero
        eyebrow="Class 12 · Computer Science · Python"
        titlePre="Python"
        titleEm="Functions"
        subtitle="Reusable blocks of logic — from built-ins to your own modules."
        pills={PILLS}
        activeId={active}
        color="purple"
      />

      <div className="content">

        <Section id="types-of-functions" color="purple" icon="🧩" num="01" title="Types of Functions"
          desc="Python functions are categorised based on their origin and availability." first>
          <Subsection>
            <CardGrid>
              <Card icon="⚙️" title="Built-in Functions">Pre-defined, always available.<div style={{ marginTop: 10 }}><code>print()</code> <code>type()</code> <code>int()</code> <code>len()</code></div></Card>
              <Card icon="📦" title="Module Functions">Available only after importing a module.<div style={{ marginTop: 10 }}><code>random.randint()</code></div></Card>
              <Card icon="✍️" title="User-Defined Functions">Created by the programmer for a specific task.<div style={{ marginTop: 10 }}><code>def</code> keyword → custom logic</div></Card>
            </CardGrid>
          </Subsection>
        </Section>

        <Section id="udf" color="purple" icon="✍️" num="02" title="User-Defined Functions (UDF)"
          desc={<>Use the <code>def</code> keyword, followed by the function name and parentheses. The body is indented below.</>}>
          <Subsection title="Defining a Function" color="purple">
            <CodeBlock label="Syntax" code={`def function_name(parameters):
    # function body
    return result`} />
          </Subsection>
          <Subsection title={<>The <code>return</code> Statement</>} color="purple">
            <Callout type="note" title="Key Rule">
              If a <code>return</code> statement is not specified, the function returns <code>None</code> by default. A function can also return different types based on conditions.
            </Callout>
            <CodeBlock label="Example — conditional return type" code={`def factorial(n):
    if n < 0:
        return "Invalid argument"   # Returns a string
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result                    # Returns an integer`}
              notes={[
                { match: 'return "Invalid argument"', note: 'This return ends the function immediately — the loop below never runs for negative n.' },
                { match: 'return result', note: 'A second, completely different return type (int) further down the same function — Python allows this freely.' },
              ]}
            />
          </Subsection>
        </Section>

        <Section id="arguments" color="purple" icon="📥" num="03" title="Arguments & Parameters"
          desc={<><strong>Parameters</strong> are variables listed in the function definition. <strong>Arguments</strong> are values passed during the function call.</>}>
          <Subsection>
            <FlowCol style={{ maxWidth: 560 }}>
              <FlowBox variant="start-end">Function Call (Arguments)</FlowBox>
              <FlowArrow>↓ passed to</FlowArrow>
              <FlowBox>Function Definition (Parameters)</FlowBox>
              <FlowArrow />
              <FlowBox variant="accent">Function Body executes</FlowBox>
              <FlowArrow />
              <FlowBox variant="start-end">return value back to caller</FlowBox>
            </FlowCol>
          </Subsection>

          <Subsection title="3.1 Positional Arguments" color="purple">
            <p>Must be passed in the correct order/position — swapping positions gives logically incorrect output even if the code runs.</p>
            <CodeBlock label="Order matters" code={`def minus(a, b):
    return a - b

minus(10, 20)  # Returns -10 ✅ (intended)
minus(20, 10)  # Returns 10 ❌ (wrong order — wrong result)`} />
          </Subsection>

          <Subsection title="3.2 Keyword (Named) Arguments" color="purple">
            <p>Parameter names are used explicitly during the call — order can be changed, since Python matches by name, not position.</p>
            <CodeBlock label="Order doesn't matter" code={`def student(firstname, grade):
    print(firstname, grade)

student(grade='Seventh', firstname='John')  # ✅ Order changed — still works`} />
          </Subsection>

          <Subsection title="3.3 Default Parameters" color="purple">
            <p>Values assigned during the function definition using <code>=</code>. Optional during the call — if provided, they override the default.</p>
            <CodeBlock label="Default values" code={`def greet(name, msg="Hello"):
    print(msg, name)

greet("Alice")         # Uses default → "Hello Alice"
greet("Alice", "Hi")    # Overrides default → "Hi Alice"`}
              notes={[
                { match: 'msg="Hello"', note: 'The = sets a fallback — this parameter becomes optional at call time.' },
                { match: 'greet("Alice")', note: 'Only one argument given — msg quietly falls back to "Hello".' },
                { match: 'greet("Alice", "Hi")', note: 'A second argument is supplied, so it overrides the default and "Hi" is used instead.' },
              ]}
            />
            <Callout type="danger" title="Critical Order Rule">Non-keyword arguments cannot follow keyword arguments in a function call.</Callout>
            <CodeBlock label="Wrong vs correct" code={`student(firstname='John', 'Seventh')  # ❌ SyntaxError
student('John', grade='Seventh')          # ✅ Correct`}
              notes={[
                { match: "firstname='John', 'Seventh'", note: "'Seventh' has no name attached, but it comes after a named argument — Python can't tell which parameter it belongs to, so it refuses to run at all." },
              ]}
            />
          </Subsection>

          <Subsection title="3.4 Arbitrary Arguments (Variable-Length)" color="purple">
            <CodeBlock label="Example" code={`def show_args(*args, **kwargs):
    print(args)     # ('a', 'b', 'c') → Tuple
    print(kwargs)   # {'x': 1, 'y': 2} → Dictionary`}
              notes={[
                { match: '*args', note: 'Collects any number of extra positional (non-keyword) arguments into a tuple.' },
                { match: '**kwargs', note: 'Collects any number of extra keyword arguments into a dictionary.' },
              ]}
            />
          </Subsection>

          <Subsection title="3.5 Summary — Argument Types" color="purple">
            <CardGrid>
              <Card icon="📍" title="Positional">Order matters<div><code>minus(10, 20)</code></div></Card>
              <Card icon="🏷️" title="Keyword / Named">Name matters, not order<div><code>name='Alice'</code></div></Card>
              <Card icon="🎛️" title="Default">Optional during call — uses preset value if skipped</Card>
              <Card icon="➕" title="Arbitrary"><code>*args</code> → Tuple &nbsp;·&nbsp; <code>**kwargs</code> → Dictionary</Card>
            </CardGrid>
          </Subsection>
        </Section>

        <Section id="flow-of-execution" color="purple" icon="🔀" num="04" title="Flow of Execution"
          desc="The flow of execution is the order in which Python runs statements.">
          <Subsection title="Key Points" color="purple">
            <Steps items={[
              'Execution always begins at the <strong>first statement of the main program</strong> (global level).',
              '<code>def</code> blocks are <strong>noted but not executed</strong> until called.',
              'On a function call → execution <strong>jumps to the function body</strong>.',
              'Statements inside run <strong>top-to-bottom</strong>.',
              'On <code>return</code> or end of function → execution <strong>jumps back to the caller</strong>.',
            ]} />

            <div className="pre-label" style={{ marginTop: 24 }}>Decision flow</div>
            <FlowCol>
              <FlowBox variant="start-end">Program Starts (global level)</FlowBox>
              <FlowArrow />
              <FlowBox>Is it a <code>def</code> statement?</FlowBox>
              <FlowBranch>
                <div><div className="flow-branch-label yes">Yes</div><FlowBox style={{ fontSize: 12 }}>Note it, skip body — do NOT execute yet</FlowBox></div>
                <div><div className="flow-branch-label no">No</div><FlowBox style={{ fontSize: 12 }}>Is it a function call?</FlowBox></div>
              </FlowBranch>
              <FlowArrow>↓ (if function call)</FlowArrow>
              <FlowBox variant="accent">Jump to function body — execute top to bottom</FlowBox>
              <FlowArrow />
              <FlowBox>return or end of function?</FlowBox>
              <FlowArrow />
              <FlowBox>Jump back to exact point of call</FlowBox>
              <FlowArrow />
              <FlowBox>More statements? — continue to next line</FlowBox>
              <FlowArrow />
              <FlowBox variant="start-end">Program Ends</FlowBox>
            </FlowCol>
          </Subsection>
        </Section>

        <Section id="scope" color="purple" icon="🌐" num="05" title="Scope of Variables"
          desc="Where a variable is created decides who can access it.">
          <Subsection title="Global vs. Local Scope" color="purple">
            <Compare>
              <CompareCard title="🌍 Global Scope" color="blue">
                <ul><li>Created <strong>outside</strong> a function</li><li>Accessible everywhere — inside and outside functions</li></ul>
              </CompareCard>
              <CompareCard title="📍 Local Scope" color="purple">
                <ul><li>Created <strong>inside</strong> a function</li><li><strong>Not</strong> accessible outside the function</li></ul>
              </CompareCard>
            </Compare>
            <TableWrap
              head={['Scope', 'Where Created', 'Who Can Access It']}
              rows={[
                ['Global', 'Outside any function', 'Everyone — inside & outside functions'],
                ['Local', 'Inside a function', 'Only within that function'],
              ]}
            />
          </Subsection>

          <Subsection title={<>The <code>global</code> Keyword</>} color="purple">
            <p>To modify a global variable from inside a function, you must declare it with <code>global</code>.</p>
            <CodeBlock label="Example" code={`G = 10

def modify():
    global G       # Declare intent to modify global G
    G = G + 10     # ✅ Works fine

modify()
print(G)  # 20`}
              notes={[
                { match: 'global G', note: 'Without this line, the G = G + 10 below would create a brand-new local G instead of touching the outer one.' },
              ]}
            />
          </Subsection>

          <Subsection title={<><code>UnboundLocalError</code> — A Common Exam Trap</>} color="purple">
            <p>Happens when a function reads a variable that is also <strong>assigned</strong> later in that same function, without declaring <code>global</code>. Python treats the variable as local for the <strong>entire function</strong> — even lines before the assignment.</p>
            <CodeBlock label="The trap" code={`G = 10

def myfun():
    print(G)     # ❌ UnboundLocalError here!
    G = G + 10   # Python treats G as local for the whole function`}
              notes={[
                { match: 'print(G)', note: 'This line alone looks totally fine — but Python already decided G is local for this whole function, because of the line below.' },
                { match: 'G = G + 10', note: 'This assignment is what makes Python treat G as local everywhere in this function — including the print() line above it, which now crashes.' },
              ]}
            />
            <CodeBlock label="The fix" code={`G = 10

def myfun():
    global G    # ✅ Declare global first
    print(G)
    G = G + 10`} />
            <Callout type="danger" title="Must Know">
              Any assignment to a name inside a function makes Python treat that name as local for the whole function body, unless declared <code>global</code> first.
            </Callout>
          </Subsection>
        </Section>

        <Section id="modules" color="purple" icon="📦" num="06" title="User-Defined Modules"
          desc={<>Save your code in a <code>.py</code> file to reuse it elsewhere. Modules should generally contain only functions and variables — no main program.</>}>
          <Subsection title="Creating a Module" color="purple">
            <CodeBlock label="File: CALC.py" code={`def add(a, b):
    return a + b

def subtract(a, b):
    return a - b`} />
          </Subsection>
          <Subsection title="Import Methods" color="purple">
            <CodeBlock label="All three methods" code={`# Method 1 — Standard
import CALC
CALC.add(5, 3)

# Method 2 — Alias
import CALC as CA
CA.add(5, 3)

# Method 3 — Selective
from CALC import add
add(5, 3)        # ✅ Works
subtract(5, 3)   # ❌ "Function not found" — not imported!`}
              notes={[
                { match: 'import CALC\nCALC.add(5, 3)', note: 'Standard import — every function must be reached through CALC. prefix.' },
                { match: 'import CALC as CA', note: 'Alias import — CALC is nicknamed CA, so CA.add() works instead of the longer CALC.add().' },
                { match: 'from CALC import add', note: 'Selective import — only add itself is pulled in, callable directly with no prefix at all.' },
                { match: 'subtract(5, 3)   # ❌ "Function not found" — not imported!', note: 'subtract was never imported by name in Method 3, so Python has no idea what this word refers to.' },
              ]}
            />
            <Callout type="warning" title="Watch Out">
              If you use <code>from CALC import add</code> and then try to call <code>subtract()</code>, it results in a <strong>"Function not found"</strong> error — selective import only brings in what you named.
            </Callout>
          </Subsection>
        </Section>

        <Section id="exam-nuances" color="purple" icon="🎯" num="07" title="Logical Nuances for Exam Coding"
          desc="Common pitfalls and techniques frequently tested in Class 12 exams.">
          <Subsection title="Input Validation" color="purple">
            <p>For physical dimensions (e.g. prism volume), check that inputs are numbers greater than zero. If invalid, show an error and skip processing.</p>
            <CodeBlock label="Example" code={`def prism_volume(l, b, h):
    if l > 0 and b > 0 and h > 0:
        return round(l * b * h, 2)
    else:
        print("Error: All dimensions must be greater than zero.")`} />
          </Subsection>
          <Subsection title="Rounding" color="purple">
            <p>Use <code>round(value, 2)</code> whenever the problem specifies a result rounded to two decimal places.</p>
            <CodeBlock label="Example" code={`area = 3.14159 * r * r
print(round(area, 2))  # e.g., 78.54`} />
          </Subsection>
          <Subsection title="Useful String & List Checks" color="purple">
            <TableWrap
              head={['Task', 'Technique']}
              rows={[
                ['Ends with digit 3', "Modulo on last digit — <code>if num % 10 == 3:</code>"],
                ['Pangram check', 'String contains every letter — check all 26 letters'],
                ['Distinct elements', "Append only if not already present — <code>if elem not in new_list:</code>"],
              ]}
            />
            <CodeBlock label="Pangram example" code={`def is_pangram(sentence):
    sentence = sentence.lower()
    for char in 'abcdefghijklmnopqrstuvwxyz':
        if char not in sentence:
            return False
    return True`}
              notes={[
                { match: 'sentence = sentence.lower()', note: "Normalises case first, so 'A' and 'a' count as the same letter when checking." },
                { match: "for char in 'abcdefghijklmnopqrstuvwxyz':", note: 'Loops through the alphabet itself, not the sentence — checking "is this letter present?" 26 times.' },
                { match: 'return False', note: 'Exits immediately the moment a single missing letter is found — no need to check the rest.' },
              ]}
            />
            <CodeBlock label="Distinct elements example" code={`def get_distinct(lst):
    new_list = []
    for elem in lst:
        if elem not in new_list:
            new_list.append(elem)
    return new_list`}
              notes={[
                { match: 'if elem not in new_list:', note: 'The whole trick — before adding, check whether it\'s already there. This is what keeps duplicates out.' },
              ]}
            />
          </Subsection>
        </Section>

        <hr className="divider" />
        <SummaryStrip items={[
          ['No <code>return</code>', 'returns <code>None</code>'],
          ['Positional', 'order matters'],
          ['Keyword', 'name matters, not order'],
          ['Non-keyword after keyword', '❌ SyntaxError'],
          ['<code>*args</code>', 'Tuple'],
          ['<code>**kwargs</code>', 'Dictionary'],
          ['Assign inside func', 'makes it local (UnboundLocalError trap)'],
          ['<code>from X import y</code>', 'only <code>y</code> is available'],
        ]} />
      </div>

      <ChapterFooterNav id="functions" />
    </>
  )
}
