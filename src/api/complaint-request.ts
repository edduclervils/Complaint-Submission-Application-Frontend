export type Complaint = {
    complaintId: number
    description: string
    status: Status
    priority: Priority
    meetingId: number
}

export type ComplaintInput = {
    description: string
    status: Status
    priority: Priority
    meetingId: number
}

export enum Priority {
    HIGH_PRIORITY = "HIGH_PRIORITY",
    LOW_PRIORITY = "LOW_PRIORITY",
    IGNORED = "IGNORED"
}

export enum Status {
    UNREVIEWED = "UNREVIEWED",
    ADDRESSED = "ADDRESSED"
}

const url = "http://127.0.0.1:8080/";

export async function getAllComplaints():Promise<Complaint[]>{

    const httpResponse = await fetch(url+"complaints");
    const allComplaints: Complaint[] = await httpResponse.json();
    return allComplaints;
}

export async function getComplaintById(complaintId: number):Promise<Complaint>{

    const httpResponse = await fetch(url+"complaints/"+complaintId);
    const allComplaints: Complaint = await httpResponse.json();
    return allComplaints;
}

export async function getComplaintsByMeetingId(meetingId: number):Promise<Complaint[]>{

    const httpResponse = await fetch(url+"complaints/meeting/"+meetingId);
    const allComplaints: Complaint[] = await httpResponse.json();
    return allComplaints;
}

export async function addAComplaint(newComplaint:ComplaintInput):Promise<Complaint>{
    const httpResponse = await fetch(url+"complaints", {
        method: "POST",
        body:JSON.stringify(newComplaint),
        headers:{
            "Content-Type":"application/json"
        }
    });

    const returnComplaint:Complaint = await httpResponse.json();
    return returnComplaint;
}

export async function updateComplaint(complaintId:number,changedComplaint:ComplaintInput):Promise<Complaint>{
    const httpResponse = await fetch(url+"complaints/"+complaintId, {
        method: "PUT",
        body:JSON.stringify(changedComplaint),
        headers:{
            "Content-Type":"application/json"
        }
    });

    const updatedComplaint:Complaint = await httpResponse.json();
    return updatedComplaint;
}