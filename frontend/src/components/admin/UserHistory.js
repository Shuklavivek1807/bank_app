import React, { useEffect, useState } from "react";

export const UserHistory=(props)=>{
    const [list,setList]= useState();

    let data= props.data;

    useEffect(()=>{
        transHistory();
    },[])
    const transHistory = async (event) => {
        console.log(data.contact);
        let key = data.contact;
        if (key) {
          let result = await fetch(`http://localhost:3004/trans/${key}`);
          result = await result.json();
          if (result) {
            setList(result);
          }
        } else {
          setList();
        }
      };
      console.log(list)
return(
    <></>
)
}