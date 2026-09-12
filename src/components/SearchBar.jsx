function SearchBar({

setEmployees

}){

return(

<div>

<h2>

Search Employee

</h2>


<input

placeholder="Search by name"

onChange={(e)=>{

const value=e.target.value;



const data=

JSON.parse(

localStorage.getItem(
"employees"
)

)||[];



const result=

data.filter(

(emp)=>

emp.name

.toLowerCase()

.includes(

value.toLowerCase()

)

);



setEmployees(result);

}}

/>


</div>

)

}

export default SearchBar;