import useScrollSpy from '../hooks/useScrollSpy'
import ChapterHero from '../components/ChapterHero'
import ChapterFooterNav from '../components/ChapterFooterNav'
import CodeBlock from '../components/CodeBlock'
import { Section, Subsection, Callout, CardGrid, Card, Compare, CompareCard, Steps, SummaryStrip, TableWrap } from '../components/Content'

const PILLS = [
  { id: 'text-files', icon: '📄', label: 'Text Files' },
  { id: 'binary-files', icon: '🗂', label: 'Binary Files' },
  { id: 'csv-files', icon: '📊', label: 'CSV Files' },
]

export default function FileHandling() {
  const active = useScrollSpy(PILLS.map((p) => p.id))

  return (
    <>
      <ChapterHero
        eyebrow="Class 12 · Computer Science · Python"
        titlePre="File"
        titleEm="Handling"
        subtitle="Text Files · Binary Files · CSV Files"
        pills={PILLS}
        activeId={active}
        color="blue"
      />

      <div className="content">

        <Section id="text-files" color="blue" icon="📄" num="01" title="Text Files"
          desc={<>Human-readable files where data is stored as a sequence of characters, with each line ending in a newline character <code>\n</code>.</>}
          first>

          <Subsection title="Key Characteristics" color="blue">
            <CardGrid>
              <Card icon="👁" title="Human Readable">Can be opened and edited in any plain text editor like Notepad or VS Code.</Card>
              <Card icon="🔁" title="EOL Translation">Internal translation happens during read/write — the EOL character <code>\n</code> is handled automatically.</Card>
              <Card icon="🔓" title="Less Secure">Generally considered less safe than binary files because they can be easily read and edited.</Card>
            </CardGrid>
          </Subsection>

          <Subsection title="Opening & Closing Files" color="blue">
            <p>The <code>open()</code> function creates a <strong>file object</strong> that links Python to a physical file on disk.</p>
            <CodeBlock label="Syntax" code={`file_obj = open("filename.txt", "mode")
file_obj.close()   # Always close to free memory`} />
            <Callout type="tip" title="Best Practice — use with">
              The <code>with</code> statement automatically closes the file when the block ends, even if an exception occurs. Always prefer it over manual <code>close()</code>.
            </Callout>
            <CodeBlock label="Using the with clause" code={`with open("data.txt", "r") as f:
    content = f.read()
# File is automatically closed here — no need for f.close()`} />
          </Subsection>

          <Subsection title="File Access Modes" color="blue">
            <TableWrap
              head={['Mode', 'Name', 'Pointer Position', 'If File Missing', 'Key Behaviour']}
              rows={[
                ["<span class='badge badge-blue'>'r'</span>", 'Read', 'Beginning', "<span class='badge badge-red'>Raises IOError</span>", 'Default mode. Read-only.'],
                ["<span class='badge badge-coral'>'w'</span>", 'Write', 'Beginning', "<span class='badge badge-green'>Creates file</span>", '<strong>Truncates</strong> (erases) all existing data immediately.'],
                ["<span class='badge badge-teal'>'a'</span>", 'Append', 'End of file', "<span class='badge badge-green'>Creates file</span>", 'New data added after existing content — never overwrites.'],
                ["<span class='badge badge-purple'>'r+'</span>", 'Read & Write', 'Beginning', "<span class='badge badge-red'>Raises IOError</span>", 'Both operations allowed; file must already exist.'],
                ["<span class='badge badge-coral'>'w+'</span>", 'Write & Read', 'Beginning', "<span class='badge badge-green'>Creates file</span>", '<strong>Truncates</strong> existing data; useful to overwrite then read back.'],
                ["<span class='badge badge-teal'>'a+'</span>", 'Append & Read', 'End of file', "<span class='badge badge-green'>Creates file</span>", "Pointer at end for writing; use <code>seek(0)</code> to read from start."],
              ]}
            />
            <Callout type="warning" title="Watch Out">
              <code>'w'</code> and <code>'w+'</code> truncate the file the moment they open it — all existing data is lost instantly, even before you write anything new.
            </Callout>
          </Subsection>

          <Subsection title="Reading Functions" color="blue">
            <TableWrap
              head={['Function', 'Reads', 'Returns', 'Critical Nuance']}
              rows={[
                ['<code>read()</code>', 'Entire file', 'String', "Includes <strong>every</strong> character — spaces, tabs, <code>\\n</code>"],
                ['<code>read(n)</code>', '<code>n</code> characters from current pointer', 'String', "<code>n</code> counts spaces and <code>\\n</code> as characters too"],
                ['<code>readline()</code>', 'One line', 'String', "Includes the trailing <code>\\n</code>"],
                ['<code>readline(n)</code>', '<code>n</code> characters from current line', 'String', 'Stops at line boundary even if <code>n</code> is larger'],
                ['<code>readlines()</code>', 'All lines', '<strong>List of strings</strong>', "Each element retains its <code>\\n</code> — strip before printing"],
              ]}
            />
          </Subsection>

          <Subsection title="Writing Functions" color="blue">
            <Compare>
              <CompareCard title={<span className="badge badge-blue">write(string)</span>}>
                <ul>
                  <li>Writes a <strong>single string</strong> to the file</li>
                  <li>Does <strong>not</strong> add <code>\n</code> automatically</li>
                  <li>You must include <code>\n</code> manually if needed</li>
                </ul>
              </CompareCard>
              <CompareCard title={<span className="badge badge-teal">writelines(list)</span>}>
                <ul>
                  <li>Writes a <strong>list of strings</strong></li>
                  <li>Does <strong>not</strong> add newlines between elements</li>
                  <li>Faster for bulk writes</li>
                </ul>
              </CompareCard>
            </Compare>
            <CodeBlock label="Example — write vs writelines" code={`with open("out.txt", "w") as f:
    f.write("Hello\\n")              # Must add \\n manually
    f.writelines(["Line1\\n", "Line2\\n"])  # \\n must be in the list items`} />
          </Subsection>

          <Subsection title={<>File Pointer Navigation — <code>seek()</code> &amp; <code>tell()</code></>} color="blue">
            <p>The <strong>file pointer</strong> marks where the next read or write will happen. You can move it manually.</p>
            <TableWrap
              head={['Function', 'Purpose', 'Returns']}
              rows={[
                ['<code>tell()</code>', 'Returns current pointer position in bytes from start', 'Integer (byte offset)'],
                ['<code>seek(offset, 0)</code>', "Move pointer <code>offset</code> bytes from <strong>beginning</strong>", '—'],
                ['<code>seek(offset, 1)</code>', "Move pointer <code>offset</code> bytes from <strong>current position</strong>", '—'],
                ['<code>seek(offset, 2)</code>', "Move pointer <code>offset</code> bytes from <strong>end of file</strong>", '—'],
              ]}
            />
            <Callout type="note" title="Key Point">
              In <code>'a+'</code> mode the pointer starts at the <strong>end</strong> of the file. Call <code>seek(0)</code> first before trying to read from the beginning.
            </Callout>
          </Subsection>
        </Section>

        <Section id="binary-files" color="amber" icon="🗂" num="02" title="Binary Files"
          desc={<>Stores data in the same format as memory — no character translation. Used to save Python objects like lists and dictionaries using the <code>pickle</code> module.</>}>

          <Subsection title="Binary vs Text — At a Glance" color="amber">
            <TableWrap
              head={['Property', 'Text File', 'Binary File']}
              rows={[
                ['Storage format', 'Characters (ASCII/UTF-8)', 'Raw bytes (same as memory)'],
                ['EOL translation', "Yes — <code>\\n</code> translated", 'No translation at all'],
                ['Human readable', 'Yes', 'No'],
                ['Python objects', 'Need manual conversion', 'Direct via <code>pickle</code>'],
                ['File modes', '<code>r w a r+ w+ a+</code>', '<code>rb wb ab rb+ wb+ ab+</code>'],
              ]}
            />
          </Subsection>

          <Subsection title={<>The <code>pickle</code> Module</>} color="amber">
            <p>To store or retrieve Python objects (lists, dicts, tuples, etc.) from a binary file, you use <code>pickle</code>.</p>
            <Compare>
              <CompareCard title="🔽 Pickling (Serialization)" color="amber">
                <ul>
                  <li>Converts a Python object → byte stream</li>
                  <li>Function: <code>pickle.dump(data, file)</code></li>
                  <li>File must be opened in <strong>write binary</strong> mode: <code>'wb'</code></li>
                </ul>
              </CompareCard>
              <CompareCard title="🔼 Unpickling (Deserialization)" color="teal">
                <ul>
                  <li>Converts byte stream → Python object</li>
                  <li>Function: <code>pickle.load(file)</code></li>
                  <li>File must be opened in <strong>read binary</strong> mode: <code>'rb'</code></li>
                </ul>
              </CompareCard>
            </Compare>
            <CodeBlock label="Writing a binary file" code={`import pickle

student = {"name": "Aanya", "roll": 42, "grade": "A"}

with open("student.dat", "wb") as f:
    pickle.dump(student, f)    # Serialise and save`} />
            <CodeBlock label="Reading a binary file (handling EOF)" code={`import pickle

def DisplayAll():
    with open("student.dat", "rb") as f:
        try:
            while True:
                R = pickle.load(f)   # Reads ONE object at a time
                print(R)
        except EOFError:            # Raised when file ends
            pass`}
              notes={[
                { match: 'while True:', note: 'An intentional infinite loop — the only way out is the EOFError below.' },
                { match: 'R = pickle.load(f)', note: 'Reads and reconstructs exactly one pickled object per call — you don\'t know in advance how many objects are in the file.' },
                { match: 'except EOFError:', note: 'This is the normal, expected way the loop ends — not really an "error" in the everyday sense, just Python\'s signal that there\'s nothing left to read.' },
              ]}
            />
            <Callout type="danger" title="Must Know — EOFError">
              Binary files with multiple pickled objects require a <code>try…except EOFError</code> loop. When <code>pickle.load()</code> reaches the end of the file, it raises <code>EOFError</code> — without catching it, your program will crash.
            </Callout>
          </Subsection>

          <Subsection title="CRUD Operations on Binary Files" color="amber">
            <p><span className="badge badge-blue" style={{ marginRight: 8 }}>Search</span> Iterate through all records and compare the target field against each record.</p>
            <CodeBlock label="Search by roll number" code={`def Search(target):
    found = False
    with open("student.dat", "rb") as f:
        try:
            while True:
                R = pickle.load(f)
                if R["roll"] == target:
                    print("Found:", R)
                    found = True
        except EOFError:
            pass
    if not found:
        print("Record not found")`} />

            <p style={{ marginTop: 20 }}>
              <span className="badge badge-amber" style={{ marginRight: 6 }}>Update</span>
              <span className="badge badge-red">Delete</span>
            </p>
            <p>Since you can't edit a binary file in-place, you use the <strong>Temporary File Method</strong>:</p>
            <Steps items={[
              "Open original in <strong>rb</strong> and a new <code>temp.dat</code> in <strong>wb</strong>",
              "Loop through all records using <code>pickle.load()</code>",
              "<strong>Update:</strong> modify the matching record, then <code>pickle.dump()</code> to temp &nbsp;|&nbsp; <strong>Delete:</strong> simply skip the target record",
              'Close both files',
              'Use <code>os.remove("original.dat")</code> then <code>os.rename("temp.dat", "original.dat")</code>',
            ]} />
            <CodeBlock label="Delete template" code={`import pickle, os

def Delete(target_roll):
    records = []
    # Step 1: Load all records
    with open("student.dat", "rb") as f:
        try:
            while True:
                records.append(pickle.load(f))
        except EOFError:
            pass

    # Step 2: Write back — skipping the target
    with open("temp.dat", "wb") as f:
        for R in records:
            if R["roll"] != target_roll:
                pickle.dump(R, f)

    # Step 3: Replace original
    os.remove("student.dat")
    os.rename("temp.dat", "student.dat")`} />
          </Subsection>
        </Section>

        <Section id="csv-files" color="green" icon="📊" num="03" title="CSV Files"
          desc={<>Comma Separated Values — a plain-text format for tabular data, handled in Python via the built-in <code>csv</code> module.</>}>

          <Subsection title="Key Characteristics" color="green">
            <CardGrid>
              <Card icon="📋" title="Tabular Format">Stores data in rows and columns — exactly like a spreadsheet — using plain ASCII text.</Card>
              <Card icon="⚡" title="Lightweight">Smaller in size and faster to process compared to full spreadsheet formats.</Card>
              <Card icon="🔁" title="Character Translation">Like text files, EOL translation occurs during read/write operations.</Card>
              <Card icon="🔓" title="Less Secure">Plain text — easily opened and modified without special software.</Card>
            </CardGrid>
          </Subsection>

          <Subsection title="Opening CSV Files — The Crucial Nuance" color="green">
            <Callout type="danger" title="Critical — newline='' when Writing">
              When opening a CSV file for <strong>writing</strong>, always pass <code>newline=''</code>. Without it, Python inserts an extra blank line between every row because of how Windows handles line endings.
            </Callout>
            <Compare>
              <CompareCard title="Writing" color="green"><CodeBlock code={`F = open("data.csv", 'w', newline='')`} /></CompareCard>
              <CompareCard title="Reading" color="blue"><CodeBlock code={`F = open("data.csv", 'r')`} /></CompareCard>
            </Compare>
          </Subsection>

          <Subsection title="Writing to a CSV File" color="green">
            <p>Create a <strong>writer object</strong> first, then use it to write rows.</p>
            <TableWrap
              head={['Function', 'Input', 'Writes', 'Nuance']}
              rows={[
                ['<code>csv.writer(file, delimiter)</code>', 'File object', 'Writer object', "Default delimiter is comma <code>','</code>"],
                ['<code>writerow(list)</code>', 'A single List', 'One row', 'Each list element becomes one field'],
                ['<code>writerows(nested_list)</code>', 'List of lists', 'Multiple rows at once', 'Best for bulk/batch writing'],
              ]}
            />
            <CodeBlock label="Write example" code={`import csv

data = [
    ["Name", "Roll", "Grade"],
    ["Aanya", 1, "A"],
    ["Rohan", 2, "B+"],
]

with open("students.csv", 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(data[0])       # Write header row
    writer.writerows(data[1:])     # Write all data rows at once`} />
          </Subsection>

          <Subsection title="Reading from a CSV File" color="green">
            <p>Create a <strong>reader object</strong>, then iterate over it with a <code>for</code> loop. Each row is returned as a <strong>List of strings</strong>.</p>
            <Callout type="warning" title="Data Type Warning">
              CSV always returns data as <strong>strings</strong>. If you need to do arithmetic, convert first: <code>int(row[1])</code>, <code>float(row[2])</code>. Forgetting this is a very common exam mistake.
            </Callout>
            <CodeBlock label="Read example with calculation" code={`import csv

with open("marks.csv", 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)                          # Each row is a List
        total = int(row[1]) + int(row[2])   # Must convert to int
        print("Total:", total)`} />
          </Subsection>

          <Subsection title="Common Logic Patterns" color="green">
            <TableWrap
              head={['Task', 'Pattern']}
              rows={[
                ['Count records', "Init counter = 0; increment inside the <code>for</code> loop"],
                ['Search', "Check <code>if row[i] == target</code> inside the loop"],
                ['Sum / Average', "Convert field: <code>int(row[i])</code> or <code>float(row[i])</code> before adding"],
                ['Skip header', "Call <code>next(reader)</code> once before the loop, or use index slicing"],
              ]}
            />
          </Subsection>
        </Section>

        <hr className="divider" />
        <Subsection title="Master Comparison Table">
          <p>Quick reference for the <em>three file types</em> — most likely to appear in exam theory questions.</p>
          <TableWrap
            head={['Feature', 'Text File', 'Binary File', 'CSV File']}
            rows={[
              ['Extension', '<code>.txt</code>', '<code>.dat</code>', '<code>.csv</code>'],
              ['Human readable', '✅ Yes', '❌ No', '✅ Yes'],
              ['EOL translation', 'Yes', 'No', 'Yes'],
              ['Module needed', 'None (built-in)', '<code>pickle</code>', '<code>csv</code>'],
              ['Store Python objects', 'Manual conversion needed', 'Yes, directly', 'Strings only (manual conversion)'],
              ['Write function', '<code>write()</code>, <code>writelines()</code>', '<code>pickle.dump()</code>', '<code>writerow()</code>, <code>writerows()</code>'],
              ['Read function', '<code>read()</code>, <code>readlines()</code>', '<code>pickle.load()</code>', '<code>for row in reader</code>'],
              ['EOF handling', "Empty string / <code>for</code> loop", '<strong>try…except EOFError</strong>', 'Loop ends naturally'],
              ['Mode suffix', '<code>r</code>, <code>w</code>, <code>a</code> …', '<code>rb</code>, <code>wb</code>, <code>ab</code> …', "<code>r</code>, <code>w</code> (+ <code>newline=''</code>)"],
              ['Use case', 'Logs, configs, plain text', 'Complex objects, dicts, lists', 'Tabular / spreadsheet data'],
            ]}
          />
        </Subsection>

        <SummaryStrip items={[
          ['<code>write()</code>', 'does NOT add <code>\\n</code>'],
          ['<code>writelines()</code>', 'does NOT add <code>\\n</code>'],
          ['<code>readlines()</code>', 'returns a <strong>List</strong>'],
          ["<code>'w'</code> mode", 'truncates immediately'],
          ["<code>'a+'</code>", 'use <code>seek(0)</code> to read'],
          ['<code>EOFError</code>', 'only in binary files'],
          ['CSV data', 'always strings, convert for math'],
          ["<code>newline=''</code>", 'only when writing CSV'],
          ['Update/Delete', 'temp file method'],
        ]} />
      </div>

      <ChapterFooterNav id="file-handling" />
    </>
  )
}
