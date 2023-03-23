import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { getMeetingsAfterDate } from "../../api/meeting-request";
import { revertAndFormatTime } from "./revert-and-format-time";


export function UpcomingMeetingsList(){
    const queryClient = useQueryClient();
    let now = +new Date()/1000;
    now = Math.round(now);


    const{isLoading,isError,data=[]}= useQuery(["MeetingListAfter",now],()=>getMeetingsAfterDate(now),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("SetMeetingList");
        }
    });
    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }


    return <>
        
        <div style={{backgroundColor: 'powderblue',  width:"33%"  }}>
            <h2>Upcoming Meetings</h2>
            {data.map(m => 
            <li key={m.meetingId}><Link to={`/meetings/${m.meetingId}`}>Meeting #{m.meetingId}: {revertAndFormatTime(m.time)}</Link></li> )}
        </div>
    </>
}

// Code from potluck that filtered by username to populate. code can be formatted to filter by date for finding previous/upcoming meetings
/*{data.filter(meet => potlukk.host.username.includes(props.username)).map(p => 
            <li key={Math.random()}><Link to={`/potluckinfohost/${p.potlukkId}`}>{p.details.title}</Link></li> )} */