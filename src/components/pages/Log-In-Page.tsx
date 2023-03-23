import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getAllUsernames, verifyUser } from "../../api/appUser-request";
import { styleContext } from "../../App";

export type LogInForm ={
    username: string
    password: string
}

export function LogInPage(){
    const {style} = useContext(styleContext);
    const navigation = useNavigate();
    const[form,setForm] = useState<LogInForm>({username:"", password:""});

    useEffect(()=>{
        const userIDCheck = localStorage.getItem("userid");
          if(userIDCheck){
            alert("You're already signed in.");
            navigation("/")
          }
    }); 


    async function handleUsernameVerification(){
        let results = await verifyUser(form); 
        if( "error" in results){
            let existingUsernameBool = false;
            let usernameChecker = await getAllUsernames();
            for (const users of usernameChecker){
                if (users.username === form.username){
                    existingUsernameBool = true;
                    break;
                }
            }
            if(existingUsernameBool){
                window.alert("Incorrect Sign-In.\nPassword is Incorrect");
            }
            else{
                window.alert("Incorrect Sign-In.\nUsername does not exist.");
            }
        }
        else{
            localStorage.setItem("userid",String(results.userId));
            localStorage.setItem("role",String(results.role)); 
            navigation("/");
        }
      }
    
    return <>
        <fieldset>
            <h1>Log-In Page</h1>
            <label htmlFor="username">USERNAME: </label>
            <input type="text" placeholder="username" onChange={e => setForm({...form, username:e.target.value})} />
            <br />

            <label htmlFor="password">PASSWORD: </label>
            <input type="password" placeholder="password" onChange={e => setForm({...form, password:e.target.value})} />
            <br /><br />
            
            <button onClick={handleUsernameVerification} >SIGN IN</button>
            <br /><br />
            
        </fieldset>
        <br /><br /><br />
        <fieldset>
            <p>For Test Purposes. Here is a Council Username and Password to try login functionality</p>
            <p> Username: KingKai</p>
            <p> Password: iwantmyplanetback!</p>
        </fieldset>
    </>
}