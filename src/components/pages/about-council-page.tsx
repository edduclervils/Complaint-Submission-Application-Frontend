import { useQuery, useQueryClient } from "react-query";
import { getAllUsers } from "../../api/appUser-request";
import ball from './../../FourStarBall.png'

export function AboutCouncil(){
    const queryClient = useQueryClient();
    const{isLoading,isError,data=[]}= useQuery("Council",getAllUsers,{
        onSuccess: () =>{
            queryClient.invalidateQueries("CouncilList");
            console.log(data);
        }});
    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    return <>
    <h1>Meet The Council</h1>
    {data.map(u =>
    <div style={{margin:"4px", padding: "10px",borderRadius:"10px",position:"relative", display: "flex", justifyContent: "center"}}>
        <img src={ball} alt="DB Radar" style={{margin: '0px', width:"600px", position:"relative"}} />
        <div style={{position: "absolute", top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>
            <br />
            <h2 style={{fontFamily:"DBZ", fontSize:"40px"}}>{u.fullName}</h2>
            <img src={u.imgLink} alt={u.username} style={{display:"block", position:"relative", width:"200px", marginLeft: "auto", marginRight: "auto"}} />
            <p style={{width: "50%", position:"relative", marginLeft: "auto", marginRight: "auto"}}>{u.aboutMe}</p>
        </div>
    </div>).reverse()}

    </>
}