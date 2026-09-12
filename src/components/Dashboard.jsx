function Dashboard({ employees }) {

const departments = {};

employees.forEach((emp) => {

departments[emp.department] =

(departments[emp.department] || 0) + 1;

});



return (

<div className="card">

<h2>Dashboard</h2>


<div className="stats">


<div className="smallCard">

<h3>Total</h3>

<h1>{employees.length}</h1>

</div>



{

Object.keys(

departments

).map(

(dep)=>(

<div

className="smallCard"

key={dep}

>

<h3>

{dep}

</h3>



<h1>

{

departments[dep]

}

</h1>


</div>

)

)

}


</div>


</div>

);

}


export default Dashboard;