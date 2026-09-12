import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Dashboard from "./components/Dashboard";

const API_URL = "http://localhost:8080/api/employees";

function App() {

  const [dark, setDark] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  // GET - Load employees from Java backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      alert("Java backend is not running!");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD
  const addEmployee = async (employee) => {
    try {
      await axios.post(API_URL, employee);
      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Employee could not be added");
    }
  };

  // UPDATE
  const updateEmployee = async (employee) => {
    try {
      await axios.put(
        `${API_URL}/${employee.id}`,
        employee
      );

      setEditingEmployee(null);
      fetchEmployees();

    } catch (error) {
      console.error(error);
      alert("Employee could not be updated");
    }
  };

  // DELETE
  const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
      "Delete employee?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmployees();

    } catch (error) {
      console.error(error);
      alert("Employee could not be deleted");
    }
  };

  // SEARCH + FILTER
  const filteredEmployees = employees.filter((employee) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.id.toLowerCase().includes(searchText);

    const matchesDepartment =
      department === "All" ||
      employee.department.toLowerCase() ===
      department.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  // SORT A-Z
  const sortAZ = () => {

    const sorted = [...employees].sort(
      (a, b) => a.name.localeCompare(b.name)
    );

    setEmployees(sorted);
  };

  // SORT Z-A
  const sortZA = () => {

    const sorted = [...employees].sort(
      (a, b) => b.name.localeCompare(a.name)
    );

    setEmployees(sorted);
  };

  return (

    <div
      className={`${dark ? "dark" : "light"} container`}
    >

      <h1>
        Employee Directory Management System
      </h1>

      <button
        onClick={() => setDark(!dark)}
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <EmployeeForm
        onAdd={addEmployee}
        onUpdate={updateEmployee}
        editingEmployee={editingEmployee}
      />

      <Dashboard employees={employees} />

      <h2>Search Employee</h2>

      <input
        placeholder="Search by ID or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Filter Department</h2>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >

        <option value="All">All</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>

      </select>

      <br />
      <br />

      <button onClick={sortAZ}>
        Sort A-Z
      </button>

      <button onClick={sortZA}>
        Sort Z-A
      </button>

      <EmployeeList
        employees={filteredEmployees}
        onEdit={setEditingEmployee}
        onDelete={deleteEmployee}
      />

      <div className="footer">

        <h2>
          Employee Directory Management System
        </h2>

        <p>
          Made by Eshitaa
        </p>

        <p>
          © 2026
        </p>

      </div>

    </div>
  );
}

export default App;