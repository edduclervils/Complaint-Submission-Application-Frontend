

export function revertAndFormatTime(time:number | undefined):string{
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let returnString: string = "";

    function formatAMPM(date:Date):string {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let strTime = minutes<10 ? hours + ':0' + minutes + ' ' + ampm : hours + ':' + minutes + ' ' + ampm ;
        return strTime;
    }


    if(time!== undefined){
        let revertedTime = new Date(time *1000);
        returnString = days[revertedTime.getDay()]+', '+months[revertedTime.getMonth()]+' '+revertedTime.getDate()+', '+revertedTime.getFullYear()+'  '+formatAMPM(revertedTime);
        return returnString;
    } else {
        return "";
    }
}
