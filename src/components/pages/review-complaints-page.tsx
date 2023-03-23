import { useQuery, useQueryClient } from "react-query";
import { getAllComplaints } from "../../api/complaint-request";
import { ReviewComplaints } from "../componentParts/complaint-review";


export function ReviewComplaintsPage(){
    const queryClient = useQueryClient();


    const{isLoading,isError,data=[]}= useQuery("Complaints",getAllComplaints,{
        onSuccess: ()=>{
            queryClient.invalidateQueries("Complaints");
        }
    });
    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }


    return <>
        <h1>Review Complaints Page</h1>
        {data.map(c => <ReviewComplaints key={c.complaintId} description={c.description} status={c.status} priority={c.priority} meetingId={c.meetingId} complaintId={c.complaintId}/>)}
    </>
}




