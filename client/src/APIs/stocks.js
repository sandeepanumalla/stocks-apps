export const getStocks = async () =>{
  const fetchData = await fetch(`http://localhost:5000/getStocks`);
  return fetchData.json()
}

export const saveStocks = async (Symbol) =>{
  const {ticker,name,marketCapitalization} = Symbol;
 
  const obj = {symbol:ticker,companyName:name,marketCapitalization:marketCapitalization}
  console.log(Symbol);
  const fetchData = await fetch(`http://localhost:5000/saveStocks`,{
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(obj) 
  })
  return fetchData.json()
}


export const searchByName = async(name)=>{
  console.log(name);
  const data = await fetch(`https://finnhub.io/api/v1/search?q=${name}&token=c2191qqad3idupe6q9p0`)
  return data.json();

}
export const fetchStocks = async(param)=>{
  const data = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${param.symbol}&token=${process.env.REACT_APP_TOKEN}`)
  return data.json();
}

