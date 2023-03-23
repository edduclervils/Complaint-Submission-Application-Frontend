import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Complaint, getComplaintById } from "../../api/complaint-request"
import { styleContext } from "../../App";
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

   // let complaintInfo: Complaint = await getComplaintById(Number(complaintId)); 

    return <>
        <h1>Review Specific Complaint</h1>
        {data!== undefined ? <ReviewComplaints complaintId={data.complaintId} description={data.description} status={data.status} priority={data.priority} meetingId={data.meetingId}/> : <p>Something Went Wrong</p>}
    </>
}