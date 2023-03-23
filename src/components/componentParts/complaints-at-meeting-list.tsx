import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getComplaintsByMeetingId } from "../../api/complaint-request";

type MeetingIdProps ={
    meetingId: number
}

export function ComplaintsToBeAddressed(props: MeetingIdProps){
    const queryClient = useQueryClient();
    const [isVisible,setVisible] = useState<boolean>(false);
    const [councilVisible,setCouncilVisible] = useState<boolean>(false);
    const navigation = useNavigate();

    useEffect(()=>{
        const roleCheck = localStorage.getItem("role");
        if(roleCheck == "COUNCIL"){
            setCouncilVisible(true);
        }else{
            setCouncilVisible(false);
        }
    });
    const{isLoading,isError,data=[]}= useQuery(["ComplaintList", props],()=>getComplaintsByMeetingId(props.meetingId),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("ComplaintList");
            if(data.length != 0){
                setVisible(true);
            }
        }
    });
    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    function handleEdit(complaintId: number){
        navigation(`/complaints/${complaintId}`);
        
    }

    //console.log(data.length);

    return <>
    {isVisible ?
    <fieldset>
        <h3>Complaints To Be Addressed</h3>
        <table>
            <thead>
                <tr>
                    <th>Description</th><th>Status</th><th>Priority</th>{councilVisible ? <th>Edit</th>:<></>}
                </tr>
            </thead>
            <tbody>
                {data.map(c => <tr key={c.complaintId}><td>{c.description}</td><td>{c.status}</td><td>{c.priority}</td>{councilVisible ? <td><button onClick={()=>handleEdit(c.complaintId)}>Edit</button></td>:<></>}</tr> )}
            </tbody>
        </table>
    </fieldset>
        : <h3>No Complaints Assigned to this Meeting</h3> }
    </>
}
// <Link to={`/meetings/${c.meetingId}`}>Meeting {c.meetingId}</Link>