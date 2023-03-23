import {useParams} from "react-router-dom";
import { ComplaintsToBeAddressed } from "../componentParts/complaints-at-meeting-list";
import { MeetingInfo } from "../componentParts/meeting-details-info";



export function MeetingsDetails(){
    const {meetingId} = useParams();

    return <>
        <h1>Meetings Details Page</h1>
        <MeetingInfo meetingId={Number(meetingId)}/> 
        <ComplaintsToBeAddressed meetingId={Number(meetingId)}/>
    </>
}