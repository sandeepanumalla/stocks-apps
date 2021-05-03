import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router';
import  { getStocks, saveStocks, searchByName, fetchStocks } from '../APIs/stocks';
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
    const [searchTerm, setSearchTerm] = useState();
    const [searchResult, setSearchResult] = useState();
    const csvfilepath = 'listing_status.csv';
    
    const fetchData =async (param) =>{
      const data = await fetchStocks(param);
      setData(data);
    }

    useEffect(()=>{

      const fetchParams = async ()=>{
        const searchSymbol=[];

        const lastPostIndex = currentPage * 5;
        const startingIndex = lastPostIndex - 5;
        setLastIndex(lastPostIndex);
        setFirstIndex(startingIndex); 
        if(searchTerm !== undefined && searchResult !== undefined){
          
          if(searchResult.count > 0){
            
            searchResult.result.map(item => searchSymbol.push(item.symbol));
            console.log(searchSymbol);
            const url = [];
            searchSymbol.map(item => url.push(`https://finnhub.io/api/v1/stock/profile2?symbol=${item}&token=${process.env.REACT_APP_TOKEN}`));
            console.log("url",url);
            
            const dataPromise = await Promise.all(url.map(async function(item){
              const response  = await fetch(item);
              return response.json();
            }))
            console.log('dataPromise',dataPromise);
            setData(dataPromise.slice(0,3));
          }
        }
        else{
          
          const array = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNYS&token=c2191qqad3idupe6q9p0`);
          const response = await array.json();
          let mainData = 0;
          if(lastPostIndex !== undefined && startingIndex !== undefined && response !== undefined) {
            console.log("running",mainData)
            if(response !== undefined && response.length >0){
              mainData = await response.slice(startingIndex,lastPostIndex);
            }
             
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
        
      }
      console.log(fetchParams());

      fetchParams();

      const fetchStocks = async()=>{
        const data = await getStocks();
        return setSavedStocks(data);
      }
      fetchStocks(); 

    },[currentPage,searchResult])


    useEffect(()=>{
      const fetchTheData = async()=>{
       const data = await searchByName(searchTerm);
       console.log("fetchTheData",data);
       setSearchResult(data);
       return data
      }
      const timer = setTimeout(()=>{
        if(searchTerm !== undefined && searchTerm !== ""){
          fetchTheData();
        }
       
      },500)
      return ()=>{
        clearTimeout(timer);
      }
    },[searchTerm])


    const onClickSave = (Symbol)=>{
      const array = [];
      if(current !== undefined){
        console.log("running not undefined");
        current.map(item =>{ 
          array.push(item);
        })
      }
      
        const save = async()=>{
          console.log("running save")
         try{ const data = await saveStocks(Symbol);
          if(data == "stocks data saved successfully"){
            array.push(Symbol.ticker);
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

      const onChangeHandler = (e)=>{
        const values = e.target.value
        setSearchTerm(values.trim());
      }
      

    return (
        <div className='parent'>
            <Base />
            <div  className="table_container">
            <div className="header">
            <div className="title_header">
            <p>Stocks Details Table</p>
            </div>
            <div className="search_container">
              <Input onChange={(e)=>onChangeHandler(e)} placeholder="Search by company name" />
            </div>
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
                 const {ticker,name,marketCapitalization} = data;
                 
                 return <tr key={ticker}>
                          <td>{data.name}</td>
                          <td >
                          <div className="symbol">
                          <ul >
                           <li >{ticker}</li>
                          </ul>
                          </div>
                          
                         </td>
                          <td>{data.marketCapitalization}</td>
                          <td>{
                            
                             savedStocks  &&  savedStocks.some(item => item.symbol === ticker) || current && current.some(item => item == ticker) ?
                            <button className="btn btn-primary view" onClick={()=>redirect()}>View</button> : 
                            <button className="btn btn-primary save" onClick={()=>onClickSave({ticker,name,marketCapitalization})}>Save</button>
                          }</td>
                          <td>{data.marketCapitalization}</td>
                        </tr>
               })
            }  
             </tbody>
           </table>

           <div className="pagination">
           <p>{`${firstIndex+1} - ${lastIndex}`}</p>
           <div className="paginate_btn">
           <button onClick={()=>decrement()} disabled={currentPage == "1" ? true : false}>{`<`}  </button>
           <button onClick={()=>increment()} > {`>`} </button>
           </div>
          
           </div>
            
             </div>
             <div className="bottom"></div>
        </div> 
    )
}

export default Home
 