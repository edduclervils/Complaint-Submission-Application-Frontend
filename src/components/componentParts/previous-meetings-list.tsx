import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { getMeetingsBeforeDate } from "../../api/meeting-request";
import { revertAndFormatTime } from "./revert-and-format-time";


export function PreviousMeetingsList(){
    const queryClient = useQueryClient();
    let now = +new Date()/1000;
    now = Math.round(now);


    const{isLoading,isError,data=[]}= useQuery(["MeetingListBefore",now],()=>getMeetingsBeforeDate(now),{
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
            <h2>Past Meetings</h2>
            {data.map(m => 
            <li key={m.meetingId}><Link to={`/meetings/${m.meetingId}`}>Meeting #{m.meetingId}: {revertAndFormatTime(m.time)}</Link></li> )}
        </div>
    </>
}
