import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export function HomePage(){
    const [councilVisible,setCouncilVisible] = useState<boolean>(false);

    useEffect(()=>{
        const roleCheck = localStorage.getItem("role");
        if(roleCheck == "COUNCIL"){
            setCouncilVisible(true);
        }else{
            setCouncilVisible(false);
        }
    });

    return <>
        <h1>Home Page</h1>
        <ul>
            <li><Link to="/meetings">Click here to see upcoming meetings</Link></li>
            <li><Link to="/complaints/submit">Click here to Report a Complaint</Link></li>
            <li><Link to="/login">Click here to Sign In</Link></li>
            <li><Link to="/about">Meet the Council</Link></li>
            {councilVisible ? <li><Link to="/meetings/create">Click here to create a meeting</Link></li> :<></>}
            {councilVisible ? <li><Link to="/complaints/all">Click here to review complaints</Link></li> :<></>}            
        </ul>
    </>
}

//<li><Link to="/register">Click here to Sign Up</Link></li>