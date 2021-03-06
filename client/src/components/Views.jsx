import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Base from './Base'


const Views = () => {
  const [saved,setSaved] = useState();
  const [data,setData] = useState();
  

  useEffect(() => {
    axios.get(`/getStocks`)
      .then(response => {
        setSaved(response.data);
      })
  },[])

  useEffect(()=>{
    if(saved !== undefined){
      
      const fetchMe = async ()=>{
        const url = [];
        saved.map(item =>{ 
          console.log("symbol",item)
          url.push(`https://finnhub.io/api/v1/stock/profile2?symbol=${item.symbol}&token=${process.env.REACT_APP_TOKEN}`)
        })
        console.log("running",url);
        const dataPromise = await Promise.all(url.map(async (item)=>{
          const response = await fetch(item);
          return response.json();
        }))
        console.log("dataPromse",dataPromise);
        setData(dataPromise);
      }
      fetchMe();
 
    }
  },[saved])


  const onClickDelete = (id)=>{
    console.log("clicked",id);
    return fetch(`/delete/${id}`,{
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
                        <td><div className="symbol">
                        <ul >
                         <li >{item.symbol}</li>
                        </ul>
                        </div></td>
                        <td>{item.marketCapitalization}</td>
                        <td><button className="btn btn-primary view" onClick={()=>onClickDelete(_id)}>Delete</button></td>
                        <td>{item.marketCapitalization}</td>
                  </tr>
                })
               
               
              }
               
             </tbody>
           </table>
       
             </div>
             <div className="bottom"></div>
        </div>
    )
}

export default Views
