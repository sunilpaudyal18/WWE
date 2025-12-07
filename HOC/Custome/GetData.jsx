import React, {useState, useEffect } from 'react'
import axios from 'axios'


function GetData(url) {
    const [data,setData]=useState([])
    const getData =() => {
    try {
      const res = axios.get(`https://gastro-backend.e-aribt.com/api/${url}`).then(res=>{
      console.log(res.data)
      setData([...res.data.data])
    }) .catch (err=> {
      console.log(err)
    })
}
catch (error){
    console.log(error)
}

}

  useEffect(() => {
    getData()
  }, [])
  return data
   
}

export default GetData
