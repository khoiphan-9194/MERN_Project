// import { createContext, useContext, useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// // Initialize new context for students
// const StudentContext = createContext();

// // We create a custom hook to provide immediate usage of the student context in other components
// export const useStudentContext = () => useContext(StudentContext);

// // StudentProvider component that holds initial state, returns provider component
// // export const StudentProvider = ( {children} ) => {

// function StudentProvider({children})
// {
//   const [formState, setFormState] = useState({ nameOfdonator: '', donateAmount:'' ,message:'' });
//   const[submit,setSubmit] = useState({ name: '', donate:'' ,mess:'' });


//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,  
//       [name]: value,
//     });
//   };

//   const handlePayment = async  (event) =>
//     {
//       event.preventDefault();
//       console.log("clicked")

//       setSubmit({
//         submit:
//         {
//           name: formState.nameOfdonator,
//           donate:formState.donateAmount,
//           mess:formState.message

//         }  
       
//       });

//       //Set back to initial values
//       setFormState({
//         nameOfdonator: "",
//         donateAmount:"",
//         message:""}
//       )

  
//     };


  
// console.log(submit)

//   // Provider components expect a value prop to be passed
//   return (
//     <StudentContext.Provider value={{submit:submit}} >
//       {/* Render children passed from props */}

//     <form onSubmit={handlePayment}>
//       <InputGroup className="mb-3">
//         <Form.Control
//           placeholder="Donator Name"
//           aria-label="nameOfdonator"
//           aria-describedby="basic-addon2"
//           type="text"
//           name="nameOfdonator"
//           value={formState.nameOfdonator}
//           onChange={handleChange}
//         />
//       </InputGroup>
//       <InputGroup className="mb-3">
//         <Form.Control
//           placeholder="Amount"
//           aria-label="donateAmount"
//           aria-describedby="basic-addon2"
//           type="number"
//           step="text"
//           name="donateAmount"
//           value={formState.donateAmount}
//           onChange={handleChange}
//         />
//       </InputGroup>
//       <InputGroup>
//         <InputGroup.Text>Message for coffee owner</InputGroup.Text>
//         <Form.Control as="textarea" aria-label="Message"
//          placeholder="Message"
//          name="message"
//          aria-describedby="basic-addon2"
//          type="text"
//          value={formState.message}
//          onChange={handleChange} />
//       </InputGroup>
//       <br />
//       <button
//         className="btn btn-block btn-primary"
//         style={{ cursor: 'pointer' }}
//         type="submit"
//       >
//         Submit
//       </button>
//       </form> 
//     {children}
//     </StudentContext.Provider>
//   );
// };

// export default StudentProvider;