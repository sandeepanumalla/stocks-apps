export const getStocks = async () =>{
  const fetchData = await fetch(`http://localhost:5000/getStocks`);
  return fetchData.json()
}

export const saveStocks = async (Symbol) =>{
  const obj = {symbol:Symbol}
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