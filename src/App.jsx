
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const emptyForm = {
  name: "",
  email: "",
  department: "IT",
  position: "",
};

function readEmployees() {
  try {
    const saved = JSON.parse(localStorage.getItem("employees") || "[]");

    return saved.map((employee, index) => ({
      ...employee,
      id: employee.id ?? employee._id ?? `employee-${index}`,
      name: employee.name ?? employee.fullName ?? employee.employeeName ?? "",
      email: employee.email ?? "",
      department:
        employee.department ?? employee.deptName ?? employee.dept ?? "Other",
      position:
        employee.position ?? employee.designation ?? employee.role ?? "",
    }));
  } catch {
    return [];
  }
}

export default function App() {
  const [employees, setEmployees] = useState(readEmployees);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const departments = useMemo(
    () => [...new Set(employees.map((e) => e.department).filter(Boolean))],
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const term = search.trim().toLowerCase();
      const matchesSearch = [
        employee.name,
        employee.email,
        employee.department,
        employee.position,
      ].some((value) => String(value || "").toLowerCase().includes(term));

      const matchesDepartment =
        department === "All" || employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, department]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleAdd = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setMessage("Please enter the employee name and email.");
      return;
    }

    const newEmployee = {
      ...form,
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      name: form.name.trim(),
      email: form.email.trim(),
      createdAt: new Date().toISOString(),
    };

    setEmployees((previous) => [newEmployee, ...previous]);
    setForm(emptyForm);
    setShowForm(false);
    setMessage("Employee added successfully!");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Do you want to remove this employee?")) return;

    setEmployees((previous) => previous.filter((e) => e.id !== id));
    setMessage("Employee removed.");
  };

  const activeDepartments = new Set(
    employees.map((e) => e.department).filter(Boolean)
  ).size;

  const recentCount = employees.filter((e) => {
    if (!e.createdAt) return false;
    const date = new Date(e.createdAt);
    return (
      !Number.isNaN(date.getTime()) &&
      Date.now() - date.getTime() <= 30 * 24 * 60 * 60 * 1000
    );
  }).length;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">E</div>
          <div>
            <h2>EmployEase</h2>
            <span>MANAGEMENT PORTAL</span>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>
        <a className="nav-link active" href="#dashboard">
          <span>▦</span> Dashboard
        </a>
        <a className="nav-link" href="#employees">
          <span>♙</span> Employees
        </a>
        <button
          className="nav-link nav-button"
          onClick={() => {
            setShowForm(true);
            document.getElementById("registration")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <span>＋</span> Add employee
        </button>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✦</div>
            <strong>People first.</strong>
            <p>One place to manage your team.</p>
          </div>
          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>HR Management</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">WORKSPACE / OVERVIEW</p>
            <h1>Dashboard</h1>
          </div>
          <div className="topbar-right">
            <span className="status-dot" />
            <span className="system-status">Workspace active</span>
            <div className="avatar top-avatar">A</div>
          </div>
        </header>

        <section id="dashboard" className="welcome-row">
          <div>
            <h2>Welcome back, Admin! <span>✦</span></h2>
            <p>Here’s what’s happening with your team today.</p>
          </div>
          <button
            className="primary-button"
            onClick={() => setShowForm(!showForm)}
          >
            <span>＋</span> Add employee
          </button>
        </section>

        {message && (
          <div className="notice" role="status">
            {message}
            <button onClick={() => setMessage("")} aria-label="Dismiss">
              ×
            </button>
          </div>
        )}

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total employees</span>
              <div className="stat-icon blue">♙</div>
            </div>
            <h3>{employees.length}</h3>
            <p className="stat-caption">Registered team members</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Departments</span>
              <div className="stat-icon teal">▦</div>
            </div>
            <h3>{activeDepartments}</h3>
            <p className="stat-caption">Departments represented</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Recently added</span>
              <div className="stat-icon purple">↗</div>
            </div>
            <h3>{recentCount}</h3>
            <p className="stat-caption">Added in the last 30 days</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Filtered results</span>
              <div className="stat-icon orange">⌕</div>
            </div>
            <h3>{filteredEmployees.length}</h3>
            <p className="stat-caption">Matching your current filters</p>
          </article>
        </section>

        {showForm && (
          <section id="registration" className="panel registration-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">TEAM MANAGEMENT</p>
                <h2>Register an employee</h2>
                <p className="panel-description">
                  Enter the details below to add a team member.
                </p>
              </div>
              <button
                className="close-button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAdd} className="employee-form">
              <label>
                Full name *
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  required
                />
              </label>

              <label>
                Email address *
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                />
              </label>

              <label>
                Department
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                >
                  <option>IT</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Operations</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Job title
                <input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                />
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setShowForm(false);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Save employee
                </button>
              </div>
            </form>
          </section>
        )}

        <section id="employees" className="panel employees-panel">
          <div className="panel-heading employee-heading">
            <div>
              <p className="eyebrow">YOUR PEOPLE</p>
              <h2>Employee directory</h2>
              <p className="panel-description">
                View and manage your registered employees.
              </p>
            </div>
            <span className="count-pill">
              {filteredEmployees.length} records
            </span>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email or job title..."
                aria-label="Search employees"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search">
                  ×
                </button>
              )}
            </div>

            <select
              className="filter-select"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              aria-label="Filter by department"
            >
              <option value="All">All departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>EMPLOYEE</th>
                  <th>DEPARTMENT</th>
                  <th>JOB TITLE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar">
                          {(employee.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <div className="employee-details">
                          <strong>{employee.name || "Unnamed employee"}</strong>
                          <span>{employee.email || "No email provided"}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="department-tag">
                        {employee.department || "Other"}
                      </span>
                    </td>
                    <td>{employee.position || "—"}</td>
                    <td>
                      <span className="active-badge">
                        <span /> Registered
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(employee.id)}
                        aria-label={`Remove ${employee.name}`}
                        title="Remove employee"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEmployees.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">♙</div>
                <h3>No employees found</h3>
                <p>
                  Try another search or add a new employee to your directory.
                </p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setSearch("");
                    setDepartment("All");
                    setShowForm(true);
                  }}
                >
                  Add an employee
                </button>
              </div>
            )}
          </div>

          <div className="table-footer">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </section>

        <footer className="page-footer">
          EmployEase <span>·</span> Employee Management Portal
        </footer>
      </main>
    </div>
  );
}
