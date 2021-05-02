import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Base from './Base'


const Views = () => {
  const [saved,setSaved] = useState();
  

  useEffect(() => {
    axios.get(`http://localhost:5000/getStocks`)
      .then(response => {
        setSaved(response.data);
      })
  },[])

/* useEffect(() =>{
  if( saved !== undefined){
    const filter = saved.data.filter(item=> item._id != id);
    return setSaved(filter);
  }
  
},[id]) */

  const onClickDelete = (id)=>{
    console.log("clicked",id);
    return fetch(`http://localhost:5000/delete/${id}`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      }
    })
    .then(data => {
      const filter = saved.filter(data => data._id != id);
      console.log("filter",filter,)
       setSaved(filter);
      })

  }

    return (
        <div>
            <Base />
            <div className="table_container">
             <table className="table">
             <thead>
               <tr>
                 <th scope="col">COMPANY NAME</th>
                 <th scope="col">SYMBOL</th> 
                 <th scope="col">MARKET CAP</th>
                 <th scope="col">Action </th>
                 <th scope="col">CURRENT PRICE</th>
               </tr>
             </thead>
             <tbody>
             
              { 
                
                /* saved !=undefined && saved!=null && typeof saved ==="object" && saved.data != undefined && saved.data != null && */
               saved && saved.map(item=>{
                  const {_id} = item;
                  return  <tr key={item._id}>
                        <td>{item.companyName}</td>
                        <td>{item.symbol}</td>
                        <td></td>
                        <td><button onClick={()=>onClickDelete(_id)}>Delete</button></td>
                  </tr>
                })
               
               
              }
               
             </tbody>
           </table>
        <p>{JSON.stringify(saved)}</p>
        <p>{JSON.stringify(typeof saved)}</p>
             </div>
        </div>
    )
}

export default Views
