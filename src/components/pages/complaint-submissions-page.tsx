import { useState } from "react";
import { ComplaintInput, Priority, Status, addAComplaint } from "../../api/complaint-request";


export function ComplaintSubmissions(){
    const[form,setForm] = useState<ComplaintInput>({description:"", status:Status.UNREVIEWED, priority:Priority.LOW_PRIORITY, meetingId:-1});
    const [isVisible,setVisible] = useState<boolean>(false);


    async function handleSubmitComplaint(){
        await addAComplaint(form);
        setVisible(true);
        setTimeout(()=>{
            setVisible(false);
        }, 3000);
    }
    return <>
        <h1>Complaint Submissions Page</h1>
        <fieldset>
            <label htmlFor="complaintDescription">Enter your complaint here and we will address it as soon as possible: </label> <br />
            <textarea id="complaintDescription" name="complaintDescription" placeholder="Start your whining" maxLength={255} cols={30} rows={6} onChange={e => setForm({...form, description:e.target.value})}/> <br />

            <button onClick={handleSubmitComplaint}>Submit Complaint</button>

         </fieldset>
         {isVisible ? <h4>Thank You for Submitting Your complaint!</h4> : <> </> }
    </>
}