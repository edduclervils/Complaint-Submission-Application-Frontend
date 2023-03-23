import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createMeeting, MeetingInput } from "../../api/meeting-request"


export function CreateMeeting(){
    const [form, setForm] = useState<MeetingInput>({address:"",time:0,summary:""});
    const [isVisible,setVisible] = useState<boolean>(false);
    const navigation = useNavigate();
    
    useEffect(()=>{
        const userIDCheck = localStorage.getItem("userid");
          if(!userIDCheck){
            alert("You have to sign in to access this page.");
            navigation("/")
          }
    });

    function handleDateTimeAction(event:React.ChangeEvent<HTMLInputElement>){
        let unixEpochDate = +new Date(event.target.value)/1000;
        setForm({...form,time:Number(unixEpochDate)});
    }

    async function handleMeetingCreation(){
        await createMeeting(form);
        setVisible(true);
        setTimeout(()=>{
            navigation("/")
        }, 3000);

    }

    return <>
        <h1>Create A Meeting</h1>
        <fieldset style={{textAlign:"center"}}>
        <div style = {{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <div style={{width:"100%"}}>
                <input type="datetime-local" onChange={handleDateTimeAction} /><br/><br/><br/>
                <input type="text" placeholder="Address" maxLength={255} onChange={e => setForm({...form, address:e.target.value})}/><br/>
                <input type="text" placeholder="Description" maxLength={255} onChange={e => setForm({...form, summary:e.target.value})}/><br/><br/>
                <button onClick={handleMeetingCreation}>Create</button>
                <br />
                {isVisible ? <h5>Meeting Created</h5> : <> </> }
                {isVisible ? <h5>Returning to HomePage...</h5> : <> </> }
            </div>
        </div>
    
    </fieldset>

    </>
}