import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PreviousMeetingsList } from "../componentParts/previous-meetings-list";
import { UpcomingMeetingsList } from "../componentParts/upcoming-meetings-list";


export function MeetingsListPage(){
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
        <h1>Upcoming Meetings</h1>
        {councilVisible ? <Link to="/meetings/create">Click here to Create a meeting</Link> :<></>}
        <br /><br />
        <UpcomingMeetingsList/>
        <PreviousMeetingsList/>
    </>
}