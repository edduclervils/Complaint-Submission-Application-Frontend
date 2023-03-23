import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function NavBar(){


    const [isVisible,setVisible] = useState<boolean>(false);
    useEffect(()=>{
        const userCheck = localStorage.getItem("userid");
        if(!userCheck){
            setVisible(false);
        }else{
            setVisible(true);
        }
    });


    return <>
        <table style={{borderSpacing: '40px'}}>
            <tbody>
                <tr style={{fontFamily:'DBZ', fontSize:40}}>
                    <td><Link to="/">Home Page</Link></td><td><Link to="/meetings">Meetings</Link></td><td><Link to="/login">Log-In</Link></td><td><Link to="/complaints/submit">Submit Complaint</Link></td><td><Link to="/about">About Council</Link></td>
                    {isVisible ?<td><Link to="/complaints/all">Review Complaints</Link></td> : <></> }
                    {isVisible ?<td><Link to="/logout">Log Out</Link></td> : <></> }

                </tr>
            </tbody>
        </table>
    </>
}
//