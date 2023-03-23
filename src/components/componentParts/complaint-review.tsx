import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Complaint, ComplaintInput, Priority, Status, updateComplaint } from "../../api/complaint-request";
import { getAllMeetings } from "../../api/meeting-request";
import { revertAndFormatTime } from "./revert-and-format-time";
import radar from './../../DBRadar.png'

type ComplaintProps ={
    complaintId: number
    description: string
    status: Status
    priority: Priority
    meetingId: number
}

export function ReviewComplaints(props: ComplaintProps){
    const queryClient = useQueryClient();
    const[form,setForm] = useState<Complaint>({complaintId: props.complaintId, description:props.description, status:props.status, priority:props.priority, meetingId:props.meetingId});

    const{isLoading,isError,data=[]}= useQuery("MeetingList",getAllMeetings,{
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

    function handleSetPriority(event:React.ChangeEvent<HTMLInputElement>){
        setForm({...form, priority:event.target.value as Priority})
    }

    function handleSetStatus(event:React.ChangeEvent<HTMLInputElement>){
        setForm({...form, status:event.target.value as Status})
    }

    function handleSetMeeting(event:React.ChangeEvent<HTMLSelectElement>){
        setForm({...form, meetingId:Number(event.target.value)})
    }

    async function handleUpdateComplaint(){
        let complaintChanges: ComplaintInput = {
            description:form.description,
            status:form.status,
            priority: form.priority,
            meetingId:form.meetingId
        }
        let updatedComplaint: Complaint = await updateComplaint(form.complaintId,complaintChanges);
        console.log(updatedComplaint);
    }

    



    return <>
        <div style={{margin:"8px", padding: "10px",borderRadius:"10px",position:"relative", display: "flex", justifyContent: "center"}}>
            <img src={radar} alt="DB Radar" style={{margin: '0px'}} />
            <div style={{position: "absolute", top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>
                <div>
                    <label htmlFor="complaintDescription">Complaint Description: </label><br />
                    <textarea name="complaintDescription" id="complaintDescription" cols={30} rows={6} value={form.description} onChange={e => setForm({...form, description:e.target.value})}/>
                    
                </div>
                <div>
                    <label htmlFor="text">High Priority</label>
                    <input type="radio" name={`checkPriority${props.complaintId}`} value={Priority.HIGH_PRIORITY} checked={Priority.HIGH_PRIORITY==form.priority} onChange={handleSetPriority}/><br/>
                    <label htmlFor="text">Low Priority</label>
                    <input type="radio" name={`checkPriority${props.complaintId}`} value={Priority.LOW_PRIORITY} checked={Priority.LOW_PRIORITY==form.priority} onChange={handleSetPriority}/><br/>
                    <label htmlFor="text">Ignore</label>
                    <input type="radio" name={`checkPriority${props.complaintId}`} value={Priority.IGNORED} checked={Priority.IGNORED==form.priority} onChange={handleSetPriority}/><br/>
                </div>
                <div>
                    <label htmlFor="text">Unreviewed</label>
                    <input type="radio" name={`checkStatus${props.complaintId}`} value={Status.UNREVIEWED} checked={Status.UNREVIEWED==form.status} onChange={handleSetStatus}/><br/>
                    <label htmlFor="text">Addressed</label>
                    <input type="radio" name={`checkStatus${props.complaintId}`} value={Status.ADDRESSED} checked={Status.ADDRESSED==form.status} onChange={handleSetStatus}/><br/>
                </div>
                <div>
                    <select name="meetingList" id="meetingList" onChange={handleSetMeeting} >
                        <option value={0}>Select A Meeting</option>
                        {data.map(m =><option key={m.meetingId} value={m.meetingId} selected={m.meetingId == form.meetingId ? true : false}>Meeting #{m.meetingId}: {revertAndFormatTime(m.time)}</option>)}
                    </select>
                </div>
                <div><button onClick={handleUpdateComplaint}>Complete Changes</button></div>
            </div>
        </div>
    </>
}
