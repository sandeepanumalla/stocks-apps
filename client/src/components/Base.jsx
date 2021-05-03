
import React, { useEffect, useState } from 'react'
import './Base.css'

import { useHistory } from 'react-router';


const Base = (props) => {
     
   const history = useHistory();

    const [fangData,setFangData] = useState();

    

    useEffect(()=>{
      const fetchParams = async ()=>{
        
       const fangSymbol=["googl","fb","amzn"];
       const Url = [];
           fangSymbol.forEach(item =>{ 
              Url.push(`https://finnhub.io/api/v1/stock/profile2?symbol=${item}&token=${process.env.REACT_APP_TOKEN}`);
           })
           const dataPromise = await Promise.all(Url.map(async (item)=>{
             const request = await fetch(item);
             return request.json();
           }))
           setFangData(dataPromise);
           
      }

      fetchParams();
      
       
       
       
    },[])

    const onClickHome =()=>{
      return history.push("/home")
    }
 

     return (
        <div>
        <div className='nav_container'>
            <div onClick={()=>onClickHome()} className='big_title'>
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
                        <div className="lower_half">{
                          fangData && fangData[0].marketCapitalization
                        }</div>
                        </div>
                        <div className="box">
                        <div className="upper_half">
                                 <p>FB</p>
                                 <div  className="fb_image_container"></div>
                        </div>
                        <div className="lower_half">{
                          fangData && fangData[1].marketCapitalization
                        }</div>
                        </div>
                        <div className="box">
                        <div style={{background:'url(../Assets/AMZN.svg)'}} className="upper_half">
                                 <p>AMZN</p>
                                 <div className="amzn_image_container"></div>
                        </div>
                        <div className="lower_half">{
                          fangData && fangData[2].marketCapitalization
                        }</div>
                        </div>
            </div>
        </div>
        
        
        
        </div>
 
        
    )
}

export default Base


