export type Meeting = {
    meetingId: number
    address: string
    time: number
    summary: string
}

export type MeetingInput = {
    address: string
    time: number
    summary: string
}

const url = "http://127.0.0.1:8080/";

export async function getAllMeetings():Promise<Meeting[]>{

    const httpResponse = await fetch(url+"meetings");
    const allMeetings: Meeting[] = await httpResponse.json();
    return allMeetings;
}

export async function getMeetingsBeforeDate(date:number):Promise<Meeting[]>{

    const httpResponse = await fetch(url+"meetings/before/"+date);
    const allMeetings: Meeting[] = await httpResponse.json();
    return allMeetings;
}

export async function getMeetingsAfterDate(date:number):Promise<Meeting[]>{

    const httpResponse = await fetch(url+"meetings/after/"+date);
    const allMeetings: Meeting[] = await httpResponse.json();
    return allMeetings;
}

export async function getMeetingById(meetingId:number):Promise<Meeting>{
    const httpResponse = await fetch(url+"meetings/"+meetingId);
    const returnedMeeting: Meeting = await httpResponse.json();
    return returnedMeeting;
}

export async function createMeeting(meeting:MeetingInput):Promise<Meeting>{

    const httpResponse = await fetch(url+"meetings", {
        method: "POST",
        body:JSON.stringify(meeting),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const newMeeting:Meeting = await httpResponse.json();
    return newMeeting;
}