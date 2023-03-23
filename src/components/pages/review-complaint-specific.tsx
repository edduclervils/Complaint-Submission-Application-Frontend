
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getComplaintById } from "../../api/complaint-request"
import { ReviewComplaints } from "../componentParts/complaint-review";


export function ReviewComplaintSpecific(){

    const {complaintId} = useParams();

    const queryClient = useQueryClient();


    const{isLoading,isError,data}= useQuery(["Complaint", complaintId],()=>getComplaintById(Number(complaintId)),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("Complaint");
        }
    });
    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    return <>
        <h1>Review Specific Complaint</h1>
        {data!== undefined ? <ReviewComplaints complaintId={data.complaintId} description={data.description} status={data.status} priority={data.priority} meetingId={data.meetingId}/> : <p>Something Went Wrong</p>}
    </>
}