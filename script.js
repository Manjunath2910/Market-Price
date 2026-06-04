const chart = document.getElementById("chart");

const platforms = [
{
name:"PANDAMONEY",
adjustment:1.08,
color1:"#D8C46C",
logo:"./assets/logos/pandamoney.png",
pillar:"./asset/pillars/gold.png"
},
{
name:"WISE",
adjustment:0,
color1:"#B6FF00",
logo:"./assets/logos/wise.png",
pillar:"./asset/pillars/green.png"
},
{
name:"REVOLUT",
adjustment:-0.45,
color1:"#36A2FF",
logo:"./assets/logos/revolut.png",
pillar:"./asset/pillars/blue.png"
},
{
name:"REMITLY",
adjustment:-0.80,
color1:"#8E52FF",
logo:"./assets/logos/remitly.png",
pillar:"./asset/pillars/purple.png"
},
{
name:"XOOM",
adjustment:-1.05,
color1:"#25D8D8",
logo:"./assets/logos/xoom.png",
pillar:"./asset/pillars/cyan.png"
},
{
name:"MONEYGRAM",
adjustment:-1.20,
color1:"#FF5B2E",
logo:"./assets/logos/moneygram.png",
pillar:"./asset/pillars/red.png"
}
];

const API_KEY="2a6f8163-eed6-49eb-9c0f-fb28e20d871f";

async function fetchWiseRate(){

try{

const response=await fetch(
"https://api.transferwise.com/v1/rates?source=USD&target=INR",
{
headers:{
Authorization:`Bearer ${API_KEY}`
}
}
);

const data=await response.json();
createChart(data[0].rate);

}catch(error){

console.log(error);
createChart(93.80);

}

}

function createChart(baseRate){

const rates = [

(baseRate + 1.08).toFixed(2),
(baseRate + 0).toFixed(2),
(baseRate - 0.45).toFixed(2),
(baseRate - 0.80).toFixed(2),
(baseRate - 1.05).toFixed(2),
(baseRate - 1.20).toFixed(2)

];

const priceElements = [
".p1",
".p2",
".p3",
".p4",
".p5",
".p6"
];

rates.forEach((rate,index)=>{

const el = document.querySelector(priceElements[index]);

if(el){
el.innerHTML = `
₹${rate}
<div class="pointer"></div>
`;
}

});

}
function downloadAll(){

const target = document.querySelector(".container");
const btn = document.querySelector(".download-box");

btn.style.visibility = "hidden";

setTimeout(()=>{

html2canvas(target,{
    scale:4,
    useCORS:true,
    backgroundColor:null
}).then(canvas=>{

    /* ---------- POST ---------- */

    const post=document.createElement("canvas");
    post.width=1080;
    post.height=1080;

    const pctx=post.getContext("2d");

    pctx.drawImage(
        canvas,
        0,
        0,
        1080,
        1080
    );

    const postLink=document.createElement("a");
    postLink.download="pandamoney-post.png";
    postLink.href=post.toDataURL("image/png");
    postLink.click();

    /* ---------- STORY ---------- */

const story = document.createElement("canvas");
story.width = 1080;
story.height = 1920;

const sctx = story.getContext("2d");

/* Full black background */
sctx.fillStyle = "#000000";
sctx.fillRect(0, 0, 1080, 1920);

/* Main content in center */
sctx.drawImage(
    canvas,
    0,
    420,   // center position
    1080,
    1080
);

const storyLink = document.createElement("a");
storyLink.download = "pandamoney-story.png";
storyLink.href = story.toDataURL("image/png");
storyLink.click();
        
    bg.src="./asset/background.png";

});

},300);


}

fetchWiseRate();
setInterval(fetchWiseRate,60000);