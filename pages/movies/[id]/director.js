import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function DirectorDetail() {
    const r=useRouter()
    const{director,setdirector}=useState();
    const {movies, setmovie}=useState();

    console.log(r.query.id)

 /* if (!director) {
    return <div>Director not found</div>; // Handle case where director is not found
  }*/

  // Display director details
  return (
    <div>
      <h1>Director</h1>
      
    </div>
  );
}


