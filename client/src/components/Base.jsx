
import React, { useEffect, useState } from 'react'
import './Base.css'
import csvtojson from 'csvtojson';
import axios from 'axios';
import {fs} from 'fs'


const Base = (props) => {
     
   /*  const [stocks,setStocks] = useState({
      params:[], 
      data:[],
    }); */
    const [data, setData] = useState();
    const csvfilepath = 'listing_status.csv';
    

    useEffect(()=>{
      const fetchParams = async ()=>{
        const array = await fetch(`https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_json/data/e8ad01974d4110e790b227dc1541b193/nyse-listed_json.json`);
        const response = await array.json();
        const mainData = await response.slice(1750,1755);
        
        const urls = [];
        mainData.map(param =>{ urls.push(`https://finnhub.io/api/v1/stock/metric?symbol=${param['ACT Symbol']}fb&metric=all&token=${process.env.REACT_APP_TOKEN}`)})

        console.log('urls',urls);

         const dataPromise = await Promise.all(urls.map(async function(url){
         const response = await fetch(url);

         return response.json();
       }))
       setData(dataPromise);
       console.log("this is promiseData",dataPromise);

       /* function csvJSON(csvfilepath){

        var lines=csvfilepath.split("\n");
      
        var result = [];
      
        var headers=lines[0].split(",");
      
        for(var i=1;i<lines.length;i++){
      
          var obj = {};
          var currentline=lines[i].split(",");
      
          for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
          }
      
          result.push(obj);
      
        }
        
       
        console.log("result",result);
        return JSON.stringify(result); 
      }
      csvJSON(); */
      }

      fetchParams();
      
       
       /*  axios.get(`https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_json/data/e8ad01974d4110e790b227dc1541b193/nyse-listed_json.json`)
        .then(response => {console.log(response.data.slice(0,25));
          
          response.data.slice(0,20).map(item =>{

            console.log('react api',item["ACT Symbol"]);
           return axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=fb&metric=all&token=${process.env.REACT_APP_TOKEN}`)
                .then((response) =>array.push(response))
          })    
        }) 
        .catch(err => console.error(err))
        array.map(item =>{
          return setStocks([array])
        }) 

        */
       
    },[])
 /* useEffect(()=>{
 
    const array =[];
    if(stocks !== undefined && stocks.length > 0){
      const fetchStocks = async() =>{
      const arrayOfRequest = await stocks.map(param =>  axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${param['ACT Symbol']}fb&metric=all&token=${process.env.REACT_APP_TOKEN}`)
      .then(response =>  array.push(response.data)))
      return setStocks({data:array});
    }
      
   console.log("dfdf",array); 
   fetchStocks();
    }
    
  
 
 },[stocks]) */

 

     return (
        <div>
        <div className='nav_container'>
            <div className='big_title'>
                <p className='title'>Quikie</p>
                <p className='small_title'>Apps</p>
            </div>
            
        </div> 
        <div>
            <div className='card_container'>
                         <div className="box">
                        <div className="upper_half">
                                 <p>GOOGL</p>
                                 <div  className="google_image_container"></div>
                        </div>
                        </div>
                        <div className="box">
                        <div className="upper_half">
                                 <p>FB</p>
                                 <div  className="fb_image_container"></div>
                        </div>
                        </div>
                        <div className="box">
                        <div style={{background:'url(../Assets/AMZN.svg)'}} className="upper_half">
                                 <p>AMZN</p>
                                 <div className="amzn_image_container"></div>
                        </div>
                        </div>
            </div>
        </div>
        
        
        
        </div>
 
        
    )
}

export default Base


/* 
 const dataPromise = await Promise.all(urls.map(url => fetch(url)
          .then(response => response.json())
          .catch(err =>console.error(err))
        )).then(data => {
          setData(data)
          console.log('this is data',data)})
*/