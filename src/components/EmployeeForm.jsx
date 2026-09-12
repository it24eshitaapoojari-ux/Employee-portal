import { useEffect, useState } from "react";

function EmployeeForm({
  onAdd,
  onUpdate,
  editingEmployee
}) {

  const emptyEmployee = {
    id: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    contact: ""
  };

  const [employee, setEmployee] =
    useState(emptyEmployee);

  // If Edit is clicked
  useEffect(() => {

    if (editingEmployee) {
      setEmployee(editingEmployee);
    } else {
      setEmployee(emptyEmployee);
    }

  }, [editingEmployee]);

  // Input change
  function handleChange(e) {

    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });

  }

  // Submit
  function handleSubmit(e) {

    e.preventDefault();

    if (
      employee.id === "" ||
      employee.name === "" ||
      employee.email === "" ||
      employee.department === "" ||
      employee.designation === "" ||
      employee.contact === ""
    ) {

      alert("Fill all fields");
      return;

    }

    if (employee.name.trim().length < 3) {

      alert("Name must contain minimum 3 characters");
      return;

    }

    if (!employee.email.includes("@")) {

      alert("Enter valid email");
      return;

    }

    if (
      employee.contact.length !== 10 ||
      isNaN(employee.contact)
    ) {

      alert("Enter valid contact number");
      return;

    }

    // Update
    if (editingEmployee) {

      onUpdate(employee);

    }

    // Add
    else {

      onAdd(employee);

    }

    setEmployee(emptyEmployee);

  }

  return (

    <div>

      <h2>
        {editingEmployee
          ? "Update Employee"
          : "Add Employee"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          name="id"
          placeholder="Employee ID"
          value={employee.id}
          onChange={handleChange}
          disabled={editingEmployee}
        />

        <input
          name="name"
          placeholder="Full Name"
          value={employee.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          value={employee.email}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
        />

        <input
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
        />

        <input
          name="contact"
          placeholder="Contact Number"
          value={employee.contact}
          onChange={handleChange}
        />

        <button type="submit">

          {editingEmployee
            ? "Update Employee"
            : "Add Employee"}

        </button>

      </form>

    </div>

  );
}

export default EmployeeForm;