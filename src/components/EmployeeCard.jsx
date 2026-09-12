function EmployeeCard({
  employee,
  onEdit,
  onDelete
}) {

  return (

    <div className="card">

      <h3>
        Employee ID: {employee.id}
      </h3>

      <h2>
        {employee.name}
      </h2>

      <p>
        Email: {employee.email}
      </p>

      <p>
        Department: {employee.department}
      </p>

      <p>
        Designation: {employee.designation}
      </p>

      <p>
        Contact: {employee.contact}
      </p>

      <button
        onClick={() => onEdit(employee)}
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(employee.id)}
      >
        Delete
      </button>

    </div>

  );

}

export default EmployeeCard;