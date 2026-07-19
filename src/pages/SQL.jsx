import useScrollSpy from '../hooks/useScrollSpy'
import ChapterHero from '../components/ChapterHero'
import ChapterFooterNav from '../components/ChapterFooterNav'
import CodeBlock from '../components/CodeBlock'
import { ERD, JoinVenn, OutputTable } from '../components/SqlViz'
import JoinPlayground from '../components/JoinPlayground'
import { Section, Subsection, Callout, CardGrid, Card, Compare, CompareCard, TableWrap, SummaryStrip } from '../components/Content'

const PILLS = [
  { id: 'database-concepts', icon: '🗄️', label: 'Database & DBMS' },
  { id: 'relational-model', icon: '🔗', label: 'Relational Model' },
  { id: 'sql-mysql', icon: '📘', label: 'SQL & MySQL' },
  { id: 'ddl', icon: '🏗️', label: 'DDL' },
  { id: 'dml', icon: '✏️', label: 'DML' },
  { id: 'joins', icon: '🧩', label: 'Joins' },
  { id: 'python-mysql', icon: '🐍', label: 'Python-MySQL' },
]

export default function SQL() {
  const active = useScrollSpy(PILLS.map((p) => p.id))

  return (
    <>
      <ChapterHero
        eyebrow="Class 12 · Computer Science · Database Concepts"
        titlePre="Database Concepts &"
        titleEm="SQL"
        subtitle="Relational databases, MySQL, DDL/DML commands, joins, and Python-MySQL connectivity — explained step by step."
        pills={PILLS}
        activeId={active}
        color="green"
      />

      <div className="content">

        {/* SECTION 1 */}
        <Section id="database-concepts" color="green" icon="🗄️" num="01" title="Database Concepts & Need"
          desc="Why databases and DBMS software exist, and what they replace." first>

          <Subsection color="green">
            <Callout type="tip" title="The Big Picture, in One Line">
              A <strong>database</strong> stores the data → a <strong>DBMS</strong> is the software that manages that data → <strong>SQL</strong> is the language you type to talk to that software. Everything below is really just unpacking that one sentence.
            </Callout>
            <CardGrid>
              <Card icon="🗃️" title="Database">An organised collection of structured information, typically stored electronically in a computer system. Think of it as a very well-organised digital filing cabinet.</Card>
              <Card icon="⚙️" title="DBMS">Software that manages a database at one centralised place — lets a user create, modify and control it, acting as the interface between user and data. It's the "clerk" who actually opens the cabinet for you.</Card>
            </CardGrid>
            <p style={{ marginTop: 14 }}>Examples: <code>MySQL</code>, <code>Microsoft Access</code>, <code>Oracle</code>, <code>PostgreSQL</code>, <code>dBASE</code>, <code>FoxPro</code>, <code>SQLite</code>, <code>IBM DB2</code>, <code>LibreOffice Base</code>, <code>MariaDB</code>, <code>Microsoft SQL Server</code>.</p>
          </Subsection>

          <Subsection title="Why a DBMS is Needed" color="green">
            <CardGrid>
              <Card icon="🚫" title="No redundancy">Eliminates data duplication.</Card>
              <Card icon="👥" title="Multi-user access">Supports sharing across many users.</Card>
              <Card icon="🧑‍💻" title="Less programming effort">Reduces work needed to manage data.</Card>
              <Card icon="✅" title="Data integrity">Improves validity & consistency of data.</Card>
              <Card icon="🔒" title="Privacy & security">Controls who can see and change data.</Card>
              <Card icon="💰" title="Economical">Cost-effective in the long term.</Card>
              <Card icon="💾" title="Backup & recovery">Built-in facility to protect data.</Card>
              <Card icon="🔍" title="Querying support">Handles complicated transactions and queries.</Card>
            </CardGrid>
            <Compare>
              <CompareCard title="🗄️ DBMS" color="green">
                <ul><li>Multi-user sharing</li><li>Minimal redundancy</li><li>More secure</li><li>Maintains completeness, accuracy & consistency</li><li>Has backup / recovery</li><li>Supports querying</li></ul>
              </CompareCard>
              <CompareCard title="📁 File Management System">
                <ul><li>No multi-user sharing</li><li>Can contain redundancy</li><li>Less secure</li><li>Doesn't maintain completeness/accuracy/consistency</li><li>No backup / recovery facility</li><li>Doesn't support querying</li></ul>
              </CompareCard>
            </Compare>
          </Subsection>

          <Subsection title="Common Applications" color="green">
            <p>Banking (customers, accounts, payments, deposits, loans) · Airlines (reservations/schedules) · Universities (students/courses/grades) · Telecommunication (calls/bills/balances) · Finance · Sales · Manufacturing/inventory · HR management.</p>
          </Subsection>
        </Section>

        {/* SECTION 2 */}
        <Section id="relational-model" color="green" icon="🔗" num="02" title="Relational Data Model"
          desc={<>A data model shows how data is stored, connected, accessed and updated. The <strong>relational model</strong> stores data as two-dimensional tables (rows and columns), also called a <strong>relation</strong>. Its DBMS is called an <strong>RDBMS</strong>.</>}>

          <Subsection title="Relational Terms — Mapped to a Real Table" color="green">
            <p>These five words all describe the same table from different angles — here they are against one concrete example so they actually stick:</p>
            <ERD tables={[{ name: 'employee (a Relation)', fields: [
              { name: 'empnumber', pk: true },
              { name: 'empname', type: 'Attribute' },
              { name: 'gender', type: 'Attribute' },
              { name: 'department', type: 'Attribute' },
              { name: 'salary', type: 'Attribute' },
            ]}]} />
            <TableWrap
              head={['Term', 'Meaning', 'In the <code>employee</code> Table']}
              rows={[
                ['Relation', 'A table in the relational model.', 'The whole <code>employee</code> table.'],
                ['Attribute', 'A column / field of a relation.', "<code>empname</code>, <code>salary</code>, etc."],
                ['Tuple', 'A row / record of a relation.', "One employee's full record."],
                ['Domain', 'The set/type of permitted values for an attribute — the declared data type.', "For <code>gender</code>, the domain is effectively <code>'M'</code> or <code>'F'</code> (a single character)."],
                ['Degree', 'Number of attributes (columns) in a relation.', '5 (empnumber, empname, gender, department, salary)'],
                ['Cardinality', 'Number of tuples (rows/records) in a relation.', 'However many employee rows currently exist.'],
              ]}
            />
          </Subsection>

          <Subsection title="Keys" color="green">
            <p>A <strong>database key</strong> is one attribute or a group of attributes that uniquely identifies each record, and is used to relate tables to each other. In the diagram above, <code>empnumber</code> is tagged <span className="badge badge-amber">PK</span> — no two employees can share it, and it can never be <code>NULL</code>.</p>
            <TableWrap
              head={['Key', 'Meaning / Important Point']}
              rows={[
                ['Candidate key', 'All attributes in a relation capable of becoming the primary key.'],
                ['Primary key', 'Uniquely identifies every row. No duplicates, cannot be <code>NULL</code>, only one per table.'],
                ['Alternate key', 'A candidate key not chosen as primary. <code>Alternate = Candidate keys − Primary key</code>.'],
                ['Foreign key', 'A non-key attribute in one table referring to the primary key of another — links two tables.'],
              ]}
            />
            <Callout type="note" title="Why this matters for Joins">
              Foreign keys are exactly what make <strong>joins</strong> (Section 6) possible — a foreign key in one table points at the primary key of another, and a join is simply "follow that pointer and pull in the matching row."
            </Callout>
          </Subsection>
        </Section>

        {/* SECTION 3 */}
        <Section id="sql-mysql" color="green" icon="📘" num="03" title="SQL & MySQL"
          desc={<><strong>SQL</strong> accesses relational DBMSs — executes queries, defines/manipulates data, creates/drops databases and tables, and links with programming languages. <strong>MySQL</strong> is an open-source RDBMS that uses SQL; a database can hold several tables, each holding thousands of records.</>}>

          <Subsection title="DDL vs DML — the Two Halves of SQL" color="green">
            <p>Almost every SQL command you'll meet falls into one of two buckets:</p>
            <Compare>
              <CompareCard title="🏗️ DDL — Data Definition Language" color="blue">
                <ul><li>Shapes the <strong>structure</strong>: create, select/use, display, alter and drop databases/tables</li><li>Answers: "what does the table look like?"</li></ul>
              </CompareCard>
              <CompareCard title="✏️ DML — Data Manipulation Language" color="coral">
                <ul><li>Works with the <strong>records</strong> inside that structure: <code>INSERT</code>, <code>SELECT</code>, <code>UPDATE</code>, <code>DELETE</code></li><li>Answers: "what data is actually in there?"</li></ul>
              </CompareCard>
            </Compare>
          </Subsection>

          <Subsection title="Data Types" color="green">
            <TableWrap
              head={['Type', 'Notes / Example']}
              rows={[
                ['<code>CHAR(n)</code>', "Fixed-length character data — always reserves <code>n</code> characters. E.g. <code>gender CHAR(1)</code>."],
                ['<code>VARCHAR(n)</code>', "Variable-length character data — only uses as much space as the text needs, up to <code>n</code>. E.g. <code>empname VARCHAR(15)</code>."],
                ['<code>INT</code> / <code>INTEGER</code>', 'Integer data — up to 11 digits.'],
                ['<code>FLOAT</code>', 'Used for decimal values, e.g. salary via <code>float(input(...))</code> in Python.'],
                ['<code>DATE</code>', "Format <code>YYYY/MM/DD</code>. E.g. <code>'2000/10/10'</code>."],
              ]}
            />
          </Subsection>

          <Subsection title="SQL Operators" color="green">
            <TableWrap
              head={['Mathematical', 'Meaning', 'Example']}
              rows={[
                ['<code>+</code>', 'Add', '<code>salary + 10</code>'],
                ['<code>-</code>', 'Subtract', '<code>salary - 10</code>'],
                ['<code>*</code>', 'Multiply', '<code>l * b</code>'],
                ['<code>/</code>', 'Divide', '<code>total / count</code>'],
                ['<code>%</code>', 'Modulo (remainder)', '<code>10 % 3</code> → <code>1</code>'],
              ]}
            />
            <TableWrap
              head={['Relational', 'Meaning', 'Example']}
              rows={[
                ['<code>=</code>', 'Equal to', "<code>department = 'IT'</code>"],
                ['<code>&gt;</code> / <code>&lt;</code>', 'Greater / less than', '<code>salary &gt; 40000</code>'],
                ['<code>&gt;=</code> / <code>&lt;=</code>', 'Greater/less than or equal', '<code>salary &gt;= 40000</code>'],
                ['<code>&lt;&gt;</code>', 'Not equal to', "<code>department &lt;&gt; 'HR'</code>"],
              ]}
            />
            <TableWrap
              head={['Logical', 'Meaning']}
              rows={[
                ['<code>AND</code>', 'True when <strong>all</strong> conditions separated by <code>AND</code> are true.'],
                ['<code>OR</code>', 'True when <strong>any</strong> condition separated by <code>OR</code> is true.'],
                ['<code>NOT</code>', 'Displays a record if the condition(s) are not true.'],
                ['<code>BETWEEN</code>', 'True when the operand is within the comparison range (inclusive).'],
                ['<code>IN</code>', 'True when the operand equals one expression in a given list.'],
                ['<code>LIKE</code>', 'True when the operand matches a text pattern (see the deep-dive in Section 5).'],
              ]}
            />
          </Subsection>
        </Section>

        {/* SECTION 4: DDL */}
        <Section id="ddl" color="blue" icon="🏗️" num="04" title="Database & Table Commands (DDL)"
          desc="Creating, altering and dropping databases and tables — this section and the next both use the same running example table, employee.">

          <Subsection title="Database Commands" color="blue">
            <CodeBlock lang="sql" label="Create / select / show / drop a database" code={`CREATE DATABASE xyz;
USE xyz;
SHOW DATABASES;
DROP DATABASE xyz;`} />
            <TableWrap
              head={['Command', 'Purpose']}
              rows={[
                ['<code>CREATE DATABASE</code>', 'Creates a database.'],
                ['<code>USE</code>', 'Selects the database to work with — every command after this runs inside it.'],
                ['<code>SHOW DATABASES</code>', 'Lists databases on the server.'],
                ['<code>DROP DATABASE</code>', 'Permanently removes the named database, including every table inside it.'],
              ]}
            />
          </Subsection>

          <Subsection title="Create, Show & Describe Tables" color="blue">
            <p>This <code>employee</code> table is used throughout the rest of this page, so its shape is worth learning once, properly:</p>
            <CodeBlock lang="sql" label="Example" code={`CREATE TABLE employee (
  empnumber INTEGER,
  empname VARCHAR(15),
  gender CHAR(1),
  department VARCHAR(20),
  salary DECIMAL(10,2)
);

SHOW TABLES;
DESCRIBE employee;`}
              notes={[
                { match: 'CREATE TABLE employee', note: 'Start defining a new table named employee. Everything inside ( ) is its column list.' },
                { match: 'empnumber INTEGER', note: "A whole-number column — this will hold each employee's ID." },
                { match: 'empname VARCHAR(15)', note: 'Text up to 15 characters, only using as much storage as the actual name needs.' },
                { match: 'gender CHAR(1)', note: "Exactly one character wide — always reserves that one slot, e.g. 'F' or 'M'." },
                { match: 'salary DECIMAL(10,2)', note: 'A number with up to 10 total digits, 2 of them after the decimal point — ideal for money.' },
              ]}
            />
            <OutputTable
              caption="DESCRIBE employee"
              head={['Field', 'Type', 'Null']}
              rows={[
                ['empnumber', 'int(11)', 'YES'],
                ['empname', 'varchar(15)', 'YES'],
                ['gender', 'char(1)', 'YES'],
                ['department', 'varchar(20)', 'YES'],
                ['salary', 'decimal(10,2)', 'YES'],
              ]}
            />
            <p style={{ fontSize: 13 }}><code>SHOW TABLES</code> lists every table in the selected database · <code>DESCRIBE table_name</code> (or <code>DESC</code>) shows exactly this structure for one table.</p>
          </Subsection>

          <Subsection title="Alter a Table" color="blue">
            <CodeBlock lang="sql" label="Add / drop columns, add / drop primary key" code={`-- Add one attribute
ALTER TABLE employee ADD date_join DATE;

-- Add multiple attributes
ALTER TABLE customers ADD (phone_no INTEGER, remarks VARCHAR(250));

-- Remove an attribute
ALTER TABLE customers DROP remarks;

-- Add a primary key to an existing table
ALTER TABLE Persons ADD PRIMARY KEY (ID);

-- Remove a primary key
ALTER TABLE Persons DROP PRIMARY KEY;`} />
            <p style={{ fontSize: 13 }}><code>ALTER TABLE</code> always names the table first, then one instruction: <code>ADD</code> a column (or several, in parentheses), <code>DROP</code> a column, or add/drop constraints like <code>PRIMARY KEY</code>. Nothing about the existing data changes — new columns just start out <code>NULL</code> for every existing row.</p>
          </Subsection>

          <Subsection title="Drop Table" color="blue">
            <CodeBlock lang="sql" code={`DROP TABLE table_name;`} />
            <Callout type="danger" title="Irreversible">
              <code>DROP TABLE</code> deletes the table's structure <em>and</em> every row inside it. There's no undo — this is different from just deleting some rows.
            </Callout>
          </Subsection>

          <Subsection title="Constraints" color="blue">
            <p>Constraints specify rules for table data — set at <code>CREATE TABLE</code> time or later with <code>ALTER TABLE</code>. They can be <strong>column-level</strong> (one column) or <strong>table-level</strong> (whole table).</p>
            <TableWrap
              head={['Constraint', 'Meaning']}
              rows={[
                ['<code>NOT NULL</code>', 'The column cannot contain a <code>NULL</code> value — every row must supply one.'],
                ['<code>UNIQUE</code>', "Every value in the column must be different from every other row's."],
                ['<code>PRIMARY KEY</code>', 'Combination of <code>NOT NULL</code> + <code>UNIQUE</code>; uniquely identifies each row.'],
              ]}
            />
            <CodeBlock lang="sql" label="Example" code={`CREATE TABLE Persons (
  ID INT NOT NULL PRIMARY KEY,
  LastName VARCHAR(255) NOT NULL,
  FirstName VARCHAR(255),
  Age INT
);`}
              notes={[
                { match: 'ID INT NOT NULL PRIMARY KEY', note: "One column, three rules stacked: it's a number, it can never be empty, and it must be unique — that combination is exactly what \"primary key\" means." },
                { match: 'LastName VARCHAR(255) NOT NULL', note: 'Text column that must always have a value, but duplicates across rows are fine (two people can share a surname).' },
                { match: 'FirstName VARCHAR(255)', note: 'No constraint listed — this column is allowed to be NULL.' },
              ]}
            />
          </Subsection>
        </Section>

        {/* SECTION 5: DML */}
        <Section id="dml" color="coral" icon="✏️" num="05" title="Data Manipulation & Retrieval (DML)"
          desc="Inserting, selecting, updating and deleting table records.">

          <Subsection title="Insert Records" color="coral">
            <p>There are two accepted shapes for <code>INSERT</code> — pick based on whether you're supplying every column or only some of them.</p>
            <CodeBlock lang="sql" label="All columns, in table order" code={`INSERT INTO customers VALUES
(100, 'ABC', '2000/10/10', 15, 'WEST STREET', 'ABC@GMAIL.COM', 3444553);`}
              notes={[
                { match: 'INSERT INTO customers VALUES', note: 'Add a new row into the customers table — VALUES signals that the data list follows.' },
                { match: "(100, 'ABC', '2000/10/10', 15, 'WEST STREET', 'ABC@GMAIL.COM', 3444553)", note: 'One value per column, and — because no column names were given — they must appear in exactly the order the table was created with.' },
              ]}
            />
            <CodeBlock lang="sql" label="Named columns — values in the same order as named" code={`INSERT INTO customers
(name, date_of_birth, cust_id, age, phone_no, address, email)
VALUES ('XYZ', '1999/09/25', 201, 17, 123456, 'EAST STREET', 'XYZ@YAHOO.COM');`} />
            <Callout type="note" title="Note">
              Naming columns explicitly (second form) lets you list them in <strong>any</strong> order, as long as <code>VALUES</code> follows that same order. Columns left unnamed are simply not included in that statement (they'll be <code>NULL</code> or their default).
            </Callout>
          </Subsection>

          <Subsection title="Select, Aliasing & DISTINCT" color="coral">
            <CodeBlock lang="sql" code={`SELECT * FROM customers;`} />
            <p><code>SELECT</code> displays data — used for calculated totals/averages and selecting fields from one or more tables. Running it on our <code>employee</code> table looks like this:</p>
            <OutputTable
              caption="SELECT * FROM employee;"
              head={['empnumber', 'empname', 'gender', 'department', 'salary']}
              rows={[
                ['1', 'Aanya Rao', 'F', 'Sales', '45000.00'],
                ['2', 'Rohan Mehta', 'M', 'IT', '52000.00'],
                ['3', 'Kiran Shah', 'M', 'Sales', '39000.00'],
                ['4', 'Priya Nair', 'F', 'IT', '61000.00'],
              ]}
            />

            <div className="pre-label" style={{ marginTop: 22 }}>ORDER BY</div>
            <CodeBlock lang="sql" code={`SELECT column_name
FROM table_name
ORDER BY column_name;`} />
            <p style={{ fontSize: 13 }}>Sorts the returned rows by that column — ascending by default. (Not shown separately with sample data since it only changes row <em>order</em>, not which rows appear.)</p>

            <div className="pre-label" style={{ marginTop: 22 }}>Aliasing — a short nickname for a table</div>
            <CodeBlock lang="sql" label="Table alias used in an equi-join" code={`SELECT cust.customer_name, bal.balance
FROM customer cust, balance bal
WHERE cust.account = bal.account_num;`} />
            <p style={{ fontSize: 13 }}><code>cust</code> and <code>bal</code> are aliases — short stand-ins for <code>customer</code> and <code>balance</code> written right after the table name (no comma, no <code>AS</code> needed here). Once declared, you must use the alias, not the full table name, for the rest of the query. This exact query is explained fully in the Joins section below.</p>

            <div className="pre-label" style={{ marginTop: 22 }}>DISTINCT</div>
            <CodeBlock lang="sql" code={`SELECT DISTINCT country FROM Customers;
SELECT DISTINCT country, city FROM Customers;`} />
            <p style={{ fontSize: 13 }}><code>SELECT DISTINCT</code> returns only distinct values — duplicate rows are collapsed into one. With more than one column, distinctness applies to the <strong>combination</strong>: two rows are only merged if <em>both</em> country and city match.</p>
          </Subsection>

          <Subsection title="WHERE, IN, BETWEEN, LIKE, NULL" color="coral">
            <p><code>WHERE</code> restricts records by a condition — it's the difference between "every row" and "only the rows I actually want."</p>
            <CodeBlock lang="sql" code={`SELECT * FROM emp WHERE salary > %s;`} />
            <p style={{ fontSize: 13 }}>The <code>%s</code> is a Python placeholder (see Section 7) — at query time it's replaced with a real number, e.g. <code>50000</code>.</p>

            <div className="pre-label" style={{ marginTop: 20 }}>LIKE — pattern matching</div>
            <CodeBlock lang="sql" code={`SELECT DISTINCT country, city
FROM Customers
WHERE postalcode LIKE '_____';`} />
            <Callout type="tip" title="Reading the pattern">
              Each underscore <code>_</code> stands for <strong>exactly one</strong> unknown character. <code>'_____'</code> is five underscores in a row, so this matches any postal code that is <strong>exactly 5 characters long</strong> — the actual digits don't matter, only the length. (The syllabus's <code>LIKE</code> usage here is underscore-based single-character matching, as shown in the source example.)
            </Callout>

            <div className="pre-label" style={{ marginTop: 20 }}>NULL</div>
            <p><code>NULL</code> means "no value is present" — it is not the same as zero or an empty string. In a <code>DESCRIBE</code> result, the <code>Null</code> column shows whether a field is allowed to be <code>NULL</code>; a <code>NOT NULL</code> constraint forbids it. Use <code>IS NULL</code> / <code>IS NOT NULL</code> to test whether a column has no value or has a value — regular <code>=</code> cannot be used to compare against <code>NULL</code>.</p>
          </Subsection>

          <Subsection title="Update & Delete" color="coral">
            <CodeBlock lang="sql" code={`UPDATE emp
SET salary = salary + 10.0
WHERE empnn = %s;

DELETE FROM emp
WHERE empnn = %s;`}
              notes={[
                { match: 'UPDATE emp', note: 'Which table to change.' },
                { match: 'SET salary = salary + 10.0', note: 'The new value for each matched row — here, "take whatever salary already is, and add 10.0 to it."' },
                { match: 'WHERE empnn = %s', note: 'Restricts the change to rows matching this condition. The same idea applies to the WHERE below, for DELETE.' },
                { match: 'DELETE FROM emp', note: 'Which table to remove rows from.' },
              ]}
            />
            <Callout type="danger" title="The WHERE clause is not optional in practice">
              <code>UPDATE</code> and <code>DELETE</code> without a <code>WHERE</code> clause apply to <strong>every single row</strong> in the table — instantly setting every employee's salary, or deleting every record. Always double-check the <code>WHERE</code> condition before running either.
            </Callout>
          </Subsection>

          <Subsection title="Aggregate Functions, GROUP BY & HAVING" color="coral">
            <TableWrap
              head={['Function', 'Purpose']}
              rows={[
                ['<code>MAX</code>', 'Largest value in a column.'],
                ['<code>MIN</code>', 'Smallest value in a column.'],
                ['<code>AVG</code>', 'Average value.'],
                ['<code>SUM</code>', 'Total of values.'],
                ['<code>COUNT</code>', 'Number of rows.'],
              ]}
            />
            <CodeBlock lang="sql" code={`SELECT Town, COUNT(*)
FROM CLIENT
WHERE Title = 'Mr'
GROUP BY Town;

SELECT AVG(Numbers), AVG(DISTINCT Numbers)
FROM CLIENTS;`} />
            <p>On our <code>employee</code> table, the same pattern — group by department, count rows per group — looks like this:</p>
            <CodeBlock lang="sql" code={`SELECT department, COUNT(*), AVG(salary)
FROM employee
GROUP BY department;`} />
            <OutputTable
              caption="Result"
              head={['department', 'COUNT(*)', 'AVG(salary)']}
              rows={[['Sales', '2', '42000.00'], ['IT', '2', '56500.00']]}
            />
            <Callout type="note" title="WHERE vs HAVING — the order they run in">
              <code>WHERE</code> filters individual rows <strong>before</strong> grouping happens. <code>GROUP BY</code> then collapses what's left into groups. <code>HAVING</code> filters those <strong>groups</strong> afterward (e.g. "only show departments with more than 1 employee"). You can't use <code>WHERE</code> to filter on an aggregate like <code>COUNT(*)</code> — that's exactly what <code>HAVING</code> is for.
            </Callout>
          </Subsection>
        </Section>

        {/* SECTION 6: JOINS */}
        <Section id="joins" color="purple" icon="🧩" num="06" title="Joins"
          desc={<>A <code>JOIN</code> combines records from two or more tables using values common to them. Two small linked tables carry every example below.</>}>

          <Subsection title="The Two Tables Behind Every Example Here" color="purple">
            <ERD
              tables={[
                { name: 'foods', fields: [{ name: 'item_id', pk: true }, { name: 'item_name', type: 'VARCHAR' }, { name: 'item_unit', type: 'VARCHAR' }, { name: 'company_id', fk: true }] },
                { name: 'company', fields: [{ name: 'company_id', pk: true }, { name: 'company_name', type: 'VARCHAR' }, { name: 'company_city', type: 'VARCHAR' }] },
              ]}
              linkLabel="company_id"
            />
            <p>The <code>company_id</code> column appears in <strong>both</strong> tables with the <strong>same name</strong> — that's exactly the condition a <code>NATURAL JOIN</code> looks for, and it's what a manual <code>WHERE</code> equality check does for an equi-join.</p>
            <Compare>
              <CompareCard title="foods" color="blue">
                <TableWrap head={['item_id', 'item_name', 'company_id']} rows={[
                  ['F1', 'Wheat Flour', 'C1'], ['F2', 'Rice', 'C2'], ['F3', 'Sugar', 'C1'], ['F4', 'Olive Oil', "C4 <span style='color:var(--amber)'>(no match!)</span>"],
                ]} />
              </CompareCard>
              <CompareCard title="company" color="green">
                <TableWrap head={['company_id', 'company_name']} rows={[
                  ['C1', 'Sunrise Foods'], ['C2', 'Golden Harvest'], ['C3', 'Ocean Fresh'],
                ]} />
              </CompareCard>
            </Compare>
            <p style={{ fontSize: 13 }}><code>F4</code>'s company (<code>C4</code>) doesn't exist in the <code>company</code> table on purpose — watch what happens to it in each join type below.</p>
          </Subsection>

          <Subsection title="Cartesian Product / Cross Join" color="purple">
            <p>A <code>CROSS JOIN</code> pairs <strong>every</strong> row of the first table with <strong>every</strong> row of the second — it doesn't look at whether the values actually relate to each other at all.</p>
            <JoinVenn leftLabel="foods (4 rows)" rightLabel="company (3 rows)" mode="cross" leftColor="blue" rightColor="green"
              note="No overlap condition — every row pairs with every row, related or not." />
            <Callout type="note" title="Formula">
              Result size = <strong>rows in table 1 × rows in table 2</strong> = 4 × 3 = <strong>12 rows</strong> — the Cartesian product.
            </Callout>
            <CodeBlock lang="sql" code={`SELECT * FROM foods, company;
SELECT * FROM foods CROSS JOIN company;

SELECT F.item_name, F.item_unit, C.company_name, C.company_city
FROM foods F, company C;`} />
            <OutputTable
              caption="SELECT * FROM foods CROSS JOIN company;  (first 4 of 12 rows shown)"
              head={['item_name', 'foods.company_id', 'company_name']}
              rows={[
                ['Wheat Flour', 'C1', 'Sunrise Foods'],
                ['Wheat Flour', 'C1', 'Golden Harvest'],
                ['Wheat Flour', 'C1', 'Ocean Fresh'],
                ['Rice', 'C2', 'Sunrise Foods'],
              ]}
            />
            <p style={{ fontSize: 13 }}>… and so on for every food × every company = 12 rows total. Notice <code>Wheat Flour</code> gets paired with <em>all three</em> companies, even though it only really belongs to Sunrise Foods — cross join doesn't check that.</p>
          </Subsection>

          <Subsection title="Equi-Join" color="purple">
            <p>An equi-join adds an explicit equality condition in <code>WHERE</code> — so only rows where the values actually <strong>match</strong> survive. This works even when the linking columns have <strong>different names</strong> in each table (here: <code>account</code> vs <code>account_num</code>).</p>
            <ERD
              tables={[
                { name: 'customer', fields: [{ name: 'account', pk: true }, { name: 'customer_name', type: 'VARCHAR' }] },
                { name: 'balance', fields: [{ name: 'account_num', fk: true }, { name: 'balance', type: 'DECIMAL' }] },
              ]}
              linkLabel="account = account_num"
            />
            <CodeBlock lang="sql" code={`SELECT cust.customer_name, bal.balance
FROM customer cust, balance bal
WHERE cust.account = bal.account_num;`}
              notes={[
                { match: 'FROM customer cust, balance bal', note: 'List both tables, giving each a short alias (cust, bal) so later lines are shorter to write.' },
                { match: 'WHERE cust.account = bal.account_num', note: 'The join condition — keep a pairing only if the account numbers are equal. This single line is what turns a cross join into an equi-join.' },
                { match: 'SELECT cust.customer_name, bal.balance', note: 'Because both tables were involved, column names are prefixed with their alias to say exactly which table each one comes from.' },
              ]}
            />
            <JoinVenn leftLabel="customer" rightLabel="balance" mode="equi" leftColor="blue" rightColor="teal"
              note="Only rows where account = account_num survive — the overlap region." />
            <OutputTable
              caption="Result"
              head={['customer_name', 'balance']}
              rows={[['Meera Iyer', '25000'], ['Devansh Gupta', '8000']]}
            />
            <p style={{ fontSize: 13 }}>A hypothetical account with no matching row on the other side — like account <code>A103</code> in <code>balance</code> with no matching customer — is simply left out. That's the core difference from cross join: <strong>only matches appear</strong>, but it can still return duplicate/overlapping columns from both tables since you're naming them explicitly.</p>
          </Subsection>

          <Subsection title="Natural Join" color="purple">
            <p>A natural join does the same "only matching rows" filtering as an equi-join, but automatically — it compares <strong>every</strong> column that has the <strong>same name</strong> in both tables (here, that's <code>company_id</code>), and shows that shared column only once in the result.</p>
            <CodeBlock lang="sql" code={`SELECT *
FROM foods
NATURAL JOIN company;`} />
            <JoinVenn leftLabel="foods" rightLabel="company" mode="equi" leftColor="blue" rightColor="green"
              note="Matches automatically on the shared column name (company_id) — no WHERE needed." />
            <OutputTable
              caption="SELECT * FROM foods NATURAL JOIN company;"
              head={['company_id', 'item_name', 'company_name']}
              rows={[
                ['C1', 'Wheat Flour', 'Sunrise Foods'],
                ['C1', 'Sugar', 'Sunrise Foods'],
                ['C2', 'Rice', 'Golden Harvest'],
              ]}
            />
            <p style={{ fontSize: 13 }}><code>Olive Oil</code> (company_id <code>C4</code>) disappears entirely — there's no company row for it to match. <code>Ocean Fresh</code> (<code>C3</code>) also disappears from the result — no food belongs to it. Compare this 3-row result to cross join's 12 rows: natural join only kept the pairs that are actually related.</p>
          </Subsection>

          <Subsection title="Cross vs Equi vs Natural — Side by Side" color="purple">
            <TableWrap
              head={['', 'Cross Join', 'Equi-Join', 'Natural Join']}
              rows={[
                ['Needs a matching condition?', 'No', 'Yes — written manually in <code>WHERE</code>', 'No — found automatically by column name'],
                ['Rows in our example', '12', '2', '3'],
                ['Shared column shown', 'Once per table (duplicated)', 'Once per table (duplicated)', 'Only once, merged'],
                ['Works when column names differ', '—', '✅ Yes (e.g. account / account_num)', '❌ No — needs identical names'],
              ]}
            />
            <JoinPlayground />
          </Subsection>
        </Section>

        {/* SECTION 7: PYTHON-MYSQL */}
        <Section id="python-mysql" color="green" icon="🐍" num="07" title="Python-MySQL Connectivity"
          desc={<>Connecting to and querying MySQL from Python using <code>mysql.connector</code>.</>}>

          <Subsection title="Import & Connect" color="green">
            <CodeBlock code={`import mysql.connector as mys

db = mys.connect(
    host="localhost", user="root", passwd="arul", database="school"
)
mycur = db.cursor()`}
              notes={[
                { match: 'import mysql.connector as mys', note: 'Loads the connector library and nicknames it mys so later calls are shorter.' },
                { match: 'mys.connect', note: 'Opens a network connection to the MySQL server: which machine (host), which login (user/passwd), and which database to use once connected.' },
                { match: 'host="localhost", user="root", passwd="arul", database="school"', note: 'The actual login details, passed as keyword arguments — swap these for your own server/credentials.' },
                { match: 'db.cursor()', note: 'Creates a cursor — think of it as the "pointer" you send SQL commands through and read results back from.' },
              ]}
            />
            <TableWrap
              head={['Item', 'Use']}
              rows={[
                ['<code>mysql.connector</code>', 'Module used for MySQL connectivity.'],
                ['<code>connect()</code>', 'Establishes the connection — host, user, <code>passwd</code>, database.'],
                ['<code>cursor()</code>', 'Creates a cursor object used to execute SQL statements.'],
                ['<code>execute()</code>', 'Executes an SQL command — can take the command plus a tuple of values.'],
                ['<code>commit()</code>', 'Used after insert, update or delete operations.'],
                ['<code>close()</code>', 'Closes the cursor, then the database connection.'],
              ]}
            />
            <CodeBlock code={`mycur.close()
db.close()`} />
          </Subsection>

          <Subsection title="Insert, Update & Delete Using a Cursor" color="green">
            <p>Use <code>%s</code> placeholders in the SQL command and pass values as a tuple to <code>execute()</code> — this keeps values safely separate from the command text.</p>
            <CodeBlock label="Insert" code={`command = "insert into emp values(%s,%s,%s)"
val = (empno, name, sal)
mycur.execute(command, val)
db.commit()`}
              notes={[
                { match: 'command = "insert into emp values(%s,%s,%s)"', note: 'The SQL text, with one %s placeholder per column being filled in.' },
                { match: 'val = (empno, name, sal)', note: 'A tuple of the actual values, in the same order as the placeholders.' },
                { match: 'mycur.execute(command, val)', note: 'Sends the command, substituting each %s with the matching value from val.' },
                { match: 'db.commit()', note: 'Saves the change permanently — without this, the insert is not actually written to the database.' },
              ]}
            />
            <CodeBlock label="Update" code={`command = "update emp set salary=salary+10.0 where empnn=%s"
val = (empno,)       # comma: this is a one-item tuple
mycur.execute(command, val)
db.commit()`} />
            <Callout type="tip" title="Why the trailing comma in (empno,)">
              <code>(empno)</code> without a comma is just <code>empno</code> wrapped in parentheses — not a tuple. <code>execute()</code> requires a tuple even for one value, so the comma is what actually makes it one.
            </Callout>
            <CodeBlock label="Delete" code={`command = "delete from emp where empnn=%s"
val = (empno,)
mycur.execute(command, val)
db.commit()`} />
          </Subsection>

          <Subsection title="Displaying Query Results" color="green">
            <Compare>
              <CompareCard title={<code>fetchone()</code>} color="green">
                <ul><li>Returns one row at a time</li><li>Returns a tuple for a fetched row</li><li>Returns <code>None</code> when no more records</li></ul>
              </CompareCard>
              <CompareCard title={<code>fetchall()</code>} color="blue">
                <ul><li>Fetches all rows of a query result</li><li>Returns an empty list when there's nothing to fetch</li></ul>
              </CompareCard>
            </Compare>
            <CodeBlock label="Fetch all records" code={`mycur.execute("SELECT * FROM student")
records = mycur.fetchall()
for row in records:
    print(row)`} />
            <CodeBlock label="Fetch one record repeatedly" code={`record = mycur.fetchone()
while record is not None:
    print(record)
    record = mycur.fetchone()`}
              notes={[
                { match: 'record = mycur.fetchone()', note: 'Get the next row as a tuple — or None if there are no more rows.' },
                { match: 'while record is not None:', note: 'Keep looping until fetchone() eventually returns None, meaning the rows have run out.' },
              ]}
            />
            <CodeBlock label="Access individual columns by index" code={`print("Student id =", record[0])
print("Student Name =", record[1])`} />
            <p style={{ fontSize: 13 }}>Since a fetched row is a plain tuple, its fields are read by position — <code>record[0]</code> is whatever column was <em>first</em> in the <code>SELECT</code> list, not necessarily the table's first column.</p>
            <Callout type="note" title="ROWCOUNT">
              <code>rowcount</code> is a system variable that returns the number of rows affected by the last executed statement.
            </Callout>
          </Subsection>

          <Subsection title={<>Using <code>format()</code> in a Query</>} color="green">
            <CodeBlock code={`st = "insert into student values({}, '{}',{},'{}')".format(111, 'AAA', 67, 'F')
mycursor.execute(st)
mydb.commit()`}
              notes={[
                { match: "values({}, '{}',{},'{}')", note: "Each {} is a blank to fill in. Note the quotes already sitting around the text ones ('{}') — .format() only inserts the value, it doesn't add quotes for you." },
                { match: ".format(111, 'AAA', 67, 'F')", note: "Fills the blanks left to right, producing the final SQL text as one plain string before it's executed." },
              ]}
            />
            <Callout type="warning" title="Compare to the %s approach above">
              This builds the finished SQL text yourself with <code>.format()</code>, instead of letting <code>execute(command, val)</code> substitute values safely. Both appear in the syllabus material — know how to read either style.
            </Callout>
          </Subsection>

          <Subsection title="Pattern for a Database-Connectivity Application" color="green">
            <p>Every add/update/delete/display menu program in the syllabus follows the same seven-step skeleton:</p>
            <TableWrap
              head={['#', 'Step', 'Why']}
              rows={[
                ['1', '<code>mys.connect()</code>', 'Open the connection'],
                ['2', '<code>cursor()</code>', 'Get a way to send commands'],
                ['3', 'Read required input', 'Gather what the user typed'],
                ['4', 'Build and execute the SQL command', 'Actually run the operation'],
                ['5', '<code>commit()</code>', 'Only for insert/update/delete — makes it permanent'],
                ['6', '<code>fetchone()</code> / <code>fetchall()</code>', "Only for <code>SELECT</code> — read the result back"],
                ['7', 'Close cursor and connection', 'Free up resources'],
              ]}
            />
          </Subsection>
        </Section>

        <hr className="divider" />
        <SummaryStrip items={[
          ['Primary key', 'no duplicates, no <code>NULL</code>'],
          ['Foreign key', "links to another table's primary key"],
          ['DDL', 'structure (create/alter/drop)'],
          ['DML', 'data (insert/select/update/delete)'],
          ['Cross join', 'rows₁ × rows₂, no match needed'],
          ['Equi-join', 'manual <code>WHERE</code> match, any column names'],
          ['Natural join', 'auto match on identical column names'],
          ['<code>fetchone()</code>', 'tuple or <code>None</code>'],
          ['<code>fetchall()</code>', 'list, empty if nothing'],
          ['<code>commit()</code>', 'needed after insert/update/delete'],
        ]} />
      </div>

      <ChapterFooterNav id="sql" />
    </>
  )
}
