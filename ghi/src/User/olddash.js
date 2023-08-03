//   return (
//     <>
//       <div>
//         <h1>Your garden</h1>
//         {plants.length > 0 ? (
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Log</th>
//               </tr>
//             </thead>
//             <tbody>
//               {plants.map((personal_plant) => {
//                 return (
//                   <tr key={personal_plant.id}>
//                     <td>{personal_plant.nickname}</td>
//                     <td>{personal_plant.log}</td>
//                     <td>
//                       <button
//                         className="btn btn-warning"
//                         onClick={() => handleEdit(personal_plant.id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => handleDelete(personal_plant.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         ) : (
//           <p>You have no plants!</p>
//         )}
//       </div>
//     </>
//   );
// }
