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


export async function getAllMeetings():Promise<Meeting[]>{

    const httpResponse = await fetch("http://127.0.0.1:8080/meetings");
    const allMeetings: Meeting[] = await httpResponse.json();
    return allMeetings;
}

export async function getMeetingsBeforeDate(date:number):Promise<Meeting[]>{

    const httpResponse = await fetch("http://127.0.0.1:8080/meetings/before/"+date);
    const allMeetings: Meeting[] = await httpResponse.json();
    return allMeetings;
}

export async function getMeetingsAfterDate(date:number):Promise<Meeting[]>{

    const httpResponse = await fetch("http://127.0.0.1:8080/meetings/after/"+date);
    const allMeetings: Meeting[] = await httpResponse.json();
    return allMeetings;
}

export async function getMeetingById(meetingId:number):Promise<Meeting>{
    const httpResponse = await fetch("http://127.0.0.1:8080/meetings/"+meetingId);
    const returnedMeeting: Meeting = await httpResponse.json();
    return returnedMeeting;
}

export async function createMeeting(meeting:MeetingInput):Promise<Meeting>{

    const httpResponse = await fetch("http://127.0.0.1:8080/meetings", {
        method: "POST",
        body:JSON.stringify(meeting),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const newMeeting:Meeting = await httpResponse.json();
    return newMeeting;
}