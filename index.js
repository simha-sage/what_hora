

const list=document.getElementById("list")
const date= new Date()
const day=date.getDay()
const week=[0,3,6,2,5,1,4]
const order=["sun","venus","mercury","moon","saturn","jupiter","mars"]
function click(){
    fetch("https://api.sunrisesunset.io/json?lat=16.3691490&lng=81.6138599").then(res=>res.json())
.then(data=>{
    let [dayTime,horaTime,sunrise]=calcDayTime(data.results.sunrise,data.results.sunset)
    for(let i=0;i<12;i++){
        let li=document.createElement("li")
        li.innerText=(order[(i+week[day])%order.length ]+"     "+secToTime(sunrise)+" to"+secToTime(sunrise+horaTime))
        list.appendChild(li)
        console.log(order[(i+week[day])%order.length ],"     ",secToTime(sunrise),"to",secToTime(sunrise+horaTime))
        sunrise+=horaTime
    }
}).catch(err => {
    alert("Failed to fetch sunrise/sunset data. Please check your internet.");
    console.error(err);
  });
}
function calcDayTime(sunrise,sunset){
    let [riseHr,riseMin,rise_lastpart]=sunrise.split(":")
    const [riseSec,rise_post_meridian]=rise_lastpart.split(" ")
    riseHr=Number(riseHr)+((rise_post_meridian==="PM")?12:0)
    const total_rise_sec=riseHr*3600+Number(riseMin)*60+Number(riseSec)

    let [setHr,setMin,set_lastpart]=sunset.split(":")
    const [setSec,set_post_meridian]=set_lastpart.split(" ")
    setHr=Number(setHr)+((set_post_meridian==="PM")?12:0)
    const total_set_sec=setHr*3600+Number(setMin)*60+Number(setSec)
    const dayTime= (setHr*3600+Number(setMin)*60+Number(setSec))-(riseHr*3600+Number(riseMin)*60+Number(riseSec))
    const horaTime=dayTime/12

    return [dayTime,horaTime,total_rise_sec]
}
function secToTime(seconds){
    const sec=seconds%60
    seconds-=sec
    const min=((seconds%3600)/60).toString().padStart(2, '0')
    seconds-=min*60
    let hrs=seconds/3600
    let meridian="AM"
    if(hrs>12){
        hrs-=12
        meridian="PM"
    }
    const time=hrs+":"+min+" "+meridian
    return time
}
const button=document.getElementById("button")
button.addEventListener("click",click)
