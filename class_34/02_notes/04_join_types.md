Joins are used in SQL to combine rows from two or more tables based on a related column. Here's an explanation of the major types of joins:

---

### **1. Inner Join**

An **INNER JOIN** returns only the rows where there is a match in both tables based on the join condition.

#### Syntax:
```sql
SELECT columns
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

#### Example:

**Table 1: Employees**

| emp_id | emp_name  | dept_id |
|--------|-----------|---------|
| 1      | Alice     | 10      |
| 2      | Bob       | 20      |
| 3      | Charlie   | 30      |

**Table 2: Departments**

| dept_id | dept_name     |
|---------|---------------|
| 10      | HR            |
| 20      | IT            |

**Query**:
```sql
SELECT emp_name, dept_name
FROM Employees
INNER JOIN Departments ON Employees.dept_id = Departments.dept_id;
```

**Result**:
| emp_name | dept_name |
|----------|-----------|
| Alice    | HR        |
| Bob      | IT        |

- Only records with matching `dept_id` in both tables are returned.

---

### **2. Left Join (Left Outer Join)**

A **LEFT JOIN** returns all rows from the left table and matching rows from the right table. If there’s no match, the result contains `NULL` for the columns from the right table.

#### Syntax:
```sql
SELECT columns
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

#### Example:

**Query**:
```sql
SELECT emp_name, dept_name
FROM Employees
LEFT JOIN Departments ON Employees.dept_id = Departments.dept_id;
```

**Result**:
| emp_name | dept_name |
|----------|-----------|
| Alice    | HR        |
| Bob      | IT        |
| Charlie  | NULL      |

- `Charlie` has no match in the `Departments` table, so `dept_name` is `NULL`.

---

### **3. Right Join (Right Outer Join)**

A **RIGHT JOIN** is the opposite of a left join: it returns all rows from the right table and matching rows from the left table. If there’s no match, the result contains `NULL` for the columns from the left table.

#### Syntax:
```sql
SELECT columns
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

#### Example:

**Query**:
```sql
SELECT emp_name, dept_name
FROM Employees
RIGHT JOIN Departments ON Employees.dept_id = Departments.dept_id;
```

**Result**:
| emp_name | dept_name |
|----------|-----------|
| Alice    | HR        |
| Bob      | IT        |
| NULL     | Finance   |

- Finance exists in the `Departments` table but has no matching record in `Employees`, so `emp_name` is `NULL`.

---

### **4. Full Join (Full Outer Join)**

A **FULL JOIN** returns all rows from both tables. If there’s no match, `NULL` is returned for the missing columns in each table.

#### Syntax:
```sql
SELECT columns
FROM table1
FULL JOIN table2
ON table1.column_name = table2.column_name;
```

#### Example:

**Table 2: Departments (Updated)**

| dept_id | dept_name     |
|---------|---------------|
| 10      | HR            |
| 20      | IT            |
| 40      | Finance       |

**Query**:
```sql
SELECT emp_name, dept_name
FROM Employees
FULL JOIN Departments ON Employees.dept_id = Departments.dept_id;
```

**Result**:
| emp_name | dept_name |
|----------|-----------|
| Alice    | HR        |
| Bob      | IT        |
| Charlie  | NULL      |
| NULL     | Finance   |

- Includes rows with no match in either table (`Charlie` from `Employees`, `Finance` from `Departments`).

---

### Summary of Join Differences

| **Type**        | **Includes Rows**                                    |
|------------------|-----------------------------------------------------|
| **Inner Join**   | Matches from both tables only.                      |
| **Left Join**    | All rows from the left table, with matches from the right. |
| **Right Join**   | All rows from the right table, with matches from the left. |
| **Full Join**    | All rows from both tables, including unmatched rows. |