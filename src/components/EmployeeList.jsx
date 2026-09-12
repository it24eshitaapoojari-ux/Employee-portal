import EmployeeCard from "./EmployeeCard";

function EmployeeList({
  employees,
  onEdit,
  onDelete
}) {

  if (employees.length === 0) {

    return (

      <div className="empty">

        <h2>
          No Employees Found 😔
        </h2>

        <p>
          Add Employee Above
        </p>

      </div>

    );

  }

  return (

    <div>

      <h2>
        Employee List
      </h2>

      {employees.map((employee) => (

        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>

  );

}

export default EmployeeList;