import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router';
import  { getStocks, saveStocks } from '../APIs/stocks';
import { Input } from 'antd';
import ReactPaginate from 'react-paginate';

import Base from './Base'
import 'antd/dist/antd.min.css'
import Pagination from './Pagination';


const Home = () => {
    const history = useHistory();
    const [data, setData] = useState();
    const [savedStocks, setSavedStocks] = useState();
    const [current, setCurrent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastIndex, setLastIndex] = useState();
    const [firstIndex, setFirstIndex] = useState();
    const csvfilepath = 'listing_status.csv';
    

    useEffect(()=>{
      const fetchParams = async ()=>{
        const lastPostIndex = currentPage * 5;
        const startingIndex = lastPostIndex - 5;
        setLastIndex(lastPostIndex);
        setFirstIndex(startingIndex); 
        const array = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNYS&token=c2191qqad3idupe6q9p0`);
        const response = await array.json();
        let mainData = 0;
        if(lastPostIndex !== undefined && startingIndex !== undefined){
          console.log("running")
           mainData = await response.slice(startingIndex,lastPostIndex);
        } 
       
         
        console.log(mainData);
         const urls = [];
         mainData.map(param => { urls.push(`https://finnhub.io/api/v1/stock/profile2?symbol=${param.symbol}&token=${process.env.REACT_APP_TOKEN}`)})

         console.log('urls',urls);

         const dataPromise = await Promise.all(urls.map(async function(url){
         const response = await fetch(url);

         return response.json();
       }))
       setData(dataPromise);
       
       console.log("this is promiseData",dataPromise);
      
      }
      console.log(fetchParams());
      fetchParams();
      const fetchStocks = async()=>{
        const data = await getStocks();
        return setSavedStocks(data);
      }
      fetchStocks(); 

      
    },[currentPage])


    const onClickSave = (Symbol)=>{
      const array = [];
      if(current !== undefined){
        console.log("running not undefined");
        current.map(item =>{ 
          array.push(item);
        })
      }
      
        const save = async()=>{
         try{ const data = await saveStocks(Symbol);
          console.log("onsave",data);
          if(data == "stocks data saved successfully"){
            array.push(Symbol);
            console.log("running")
            return setCurrent(array)
          }}
          catch(err){
            console.log("error in saving", err)
          }
        }
        return save();
      }

      const redirect = ()=>{
        return history.push('/view')
      }
    
      const increment= ()=>{
        
     
        setCurrentPage(currentPage+1);
      }
      const decrement= ()=>{
        if(currentPage > 0){
          setCurrentPage(currentPage-1);
        }
      }
      

    return (
        <div className='parent'>
            <Base />
            <div  className="table_container">
            <div className="search_container">
              <Input placeholder="Search by company name" />
            </div>
            
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
               data && data.map(data =>{
                 const {ticker} = data;
                 
                 return <tr key={ticker}>
                          <td>{data.name}</td>
                          <td>{ticker}</td>
                          <td>{data.marketCapitalization}</td>
                          <td>{
                            
                             savedStocks  &&  savedStocks.some(item => item.symbol === ticker) || current && current.some(item => item == ticker) ?
                            <button onClick={()=>redirect()}>View</button> : 

                            <button onClick={()=>onClickSave(ticker)}>Save</button>
                          }</td>
                          <td>{/* data.metric.marketCapitalization */}</td>
                        </tr>
               })
            }  
             </tbody>
           </table>

       
           
            <button onClick={()=>decrement()} disabled={currentPage == "1" ? true : false}>{`Previous`}  </button>
            <button onClick={()=>increment()} > {`Next`} </button>
            <p>{`showing ${firstIndex} - ${lastIndex}`}</p>
             </div>
        </div> 
    )
}

export default Home
 