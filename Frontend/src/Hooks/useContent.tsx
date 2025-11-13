
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export function useContent(refreshKey: number) { 
 const [contents, setContents] = useState([]);

 useEffect(() => {
    const token = localStorage.getItem("token"); 

    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((response) => {
        setContents(response.data);
      })
      .catch((err) => {
        console.log("Fetch failed:", err);
      });
  
  }, [refreshKey]); 

  return contents;
}