import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { getMeetingById } from "../../api/meeting-request";
import { revertAndFormatTime } from "./revert-and-format-time";

type MeetingIdProps ={
    meetingId: number
}

export function MeetingInfo(props: MeetingIdProps){
    const queryClient = useQueryClient();

    const [councilVisible,setCouncilVisible] = useState<boolean>(false);

    useEffect(()=>{
        const roleCheck = localStorage.getItem("role");
        if(roleCheck == "COUNCIL"){
            setCouncilVisible(true);
        }else{
            setCouncilVisible(false);
        }
    });
    const{isLoading,isError,data}= useQuery(["MeetingDetails", props],()=>getMeetingById(props.meetingId),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("MeetingDetails");
        }
    });
    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

//    console.log(data);

    return <>
        {councilVisible ? <li><Link to="/meetings/create">Click here to create a new meeting</Link></li> :<></>}
        <fieldset>
            <h2>Meeting #{data?.meetingId}</h2>
            <p>{data?.summary}</p>
            <p>Time: {revertAndFormatTime(data?.time)}</p>
            <p>Address: {data?.address}</p>
        </fieldset>
    </>

}