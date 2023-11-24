
let contentDiv=document.querySelector(".contentDIv");
let AskIpt=document.querySelector(".AskIpt");
// let AskBtn=document.querySelector(".AskBtn");
let loadingBox=document.querySelector(".loadingBox");

let arr=[];
let AskStatus=true;

// AskBtn.onclick=()=>{

//   if(AskStatus){
//     let Askcontent=AskIpt.value;
//     AskIpt.value="";
//     if(Askcontent!=""){
//       // 创建用户提问元素
//       let UserAsk=document.createElement("div");
//       UserAsk.classList.add("contentUser");
//       UserAsk.innerText=Askcontent;
//       contentDiv.insertBefore(UserAsk,loadingBox)
      
//       fetchData(Askcontent);
//     }else{
//       alert("提问的内容不能为空");
//     }
//   }
// }
AskIpt.addEventListener("keydown",()=>{
  if (event.keyCode === 13) {
    if(AskStatus){
      let Askcontent=AskIpt.value;
      AskIpt.value="";
      if(Askcontent!=""){
        // 创建用户提问元素
        let UserAsk=document.createElement("div");
        UserAsk.classList.add("contentUser");
        UserAsk.innerText=Askcontent;
        contentDiv.insertBefore(UserAsk,loadingBox)
        
        fetchData(Askcontent);
      }else{
        alert("提问的内容不能为空");
      }
    }
  }
})

// 会话id
let conversationId=localStorage.getItem("conversationId");

async function fetchData(UserContent) {
    AskStatus=false;
    loadingBox.style.display="block";

    const response = await fetch("https://wetabchatpro.haohuola.com/api/chat/conversation-v2", {
      // 请求配置...
      method:"POST",
    body:JSON.stringify({
        "prompt":UserContent,
        "assistantId":"",
        "model":"650e52e9c4bcb4a52791b599",
        "conversationId":conversationId
    }),
    headers:{
        "Content-Type":"application/json;charset=UTF-8",
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVpZCI6IjY0Yzc3ZTAwMzA1YmM5OGQ2OTY0YjY4OCIsInZlcnNpb24iOjAsImJyYW5jaCI6InpoIn0sImlhdCI6MTcwMDY1NzIwNywiZXhwIjoxNzAwODMwMDA3fQ.U0GupabsjSgMY9HS5TnoRVR30OIREsSI65I24rTdOn0",
        "I-App":"hitab",
        "I-Branch":"zh",
        "I-Lang":"zh-CN",
        "I-Platform":"edge",
        "I-Version":"1.4.4"
    }
    });
    const res = await response.text();
    const responses = res.split("_e79218965e_");

    conversationId=JSON.parse(responses[responses.length-2]).data.conversationId;
	localStorage.setItem("conversationId",conversationId);

    for (let i = 0; i < responses.length; i++) {
      const responseStr = responses[i].trim();
      if (responseStr !== "") {
        const response = JSON.parse(responseStr);
        const content = response.data.content;
        
        arr.push(content);
      }
    }
    
    printContent();
    // arr=[];
  }
  
  // fetchData("你是谁?");
contentDiv.scrollTop = 600;

function printContent(){
    let index=0;
    let newMessage=document.createElement("div");
    newMessage.classList.add("contentAI");

    
      let contentDivTimer=setInterval(()=>{
        if(arr!=""){
            if(index<arr.length-1){
              newMessage.innerHTML+=arr[index];
                index++;
				// if(contentDiv.offsetHeight>document.body.offsetHeight){
				// 	contentDiv.style.top=-1*contentDiv.offsetHeight+newMessage.offsetHeight+"px";
				// }
				// contentDiv.scrollTop=0;
				if(contentDiv.offsetHeight>document.body.offsetHeight){
					console.log(newMessage.offsetHeight);
				}
				
        }else{
            arr=[];
            AskStatus=true;
                clearInterval(contentDivTimer)
            }
        }
    },50)
    contentDiv.insertBefore(newMessage,loadingBox);
    loadingBox.style.display="none";
  }
  

  