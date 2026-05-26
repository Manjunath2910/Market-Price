const chart = document.getElementById("chart");

const platforms = [
{
name:"PANDAMONEY",
adjustment:1.08,
color1:"#D8C46C",
color2:"#A38C3D",
logo:"./assets/logos/pandamoney.png"
},
{
name:"WISE",
adjustment:0,
color1:"#B6FF00",
color2:"#7EB800",
logo:"./assets/logos/wise.png"
},
{
name:"REVOLUT",
adjustment:-0.45,
color1:"#36A2FF",
color2:"#1567D1",
logo:"./assets/logos/revolut.png"
},
{
name:"REMITLY",
adjustment:-0.80,
color1:"#8E52FF",
color2:"#5E2AE0",
logo:"./assets/logos/remitly.png"
},
{
name:"XOOM",
adjustment:-1.05,
color1:"#25D8D8",
color2:"#109B9B",
logo:"./assets/logos/xoom.png"
},
{
name:"MONEYGRAM",
adjustment:-1.20,
color1:"#FF5B2E",
color2:"#D63810",
logo:"./assets/logos/moneygram.png"
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

chart.innerHTML="";

const updatedPlatforms=platforms.map(item=>({
...item,
value:+(baseRate+item.adjustment).toFixed(2)
}));

updatedPlatforms.sort((a,b)=>b.value-a.value);

const maxValue=updatedPlatforms[0].value;
const minValue=updatedPlatforms[updatedPlatforms.length-1].value;

updatedPlatforms.forEach((item,index)=>{

const minHeight=180;
const maxHeight=500;

const normalized=
(item.value-minValue)/(maxValue-minValue);

const height=
minHeight+(normalized*(maxHeight-minHeight));

const wrapper=document.createElement("div");
wrapper.classList.add("bar-wrapper");

wrapper.innerHTML=`

<div class="value">
₹${item.value}
<div class="pointer"></div>
</div>

<div class="bar"
style="
height:${height}px;
background:linear-gradient(
to right,
${item.color2},
${item.color1}
);
box-shadow:
0 0 20px ${item.color1},
inset 0 0 20px rgba(255,255,255,.08);
">

<div class="top-face"></div>

<img
src="${item.logo}"
class="platform-logo"
alt="${item.name}"
>

</div>

<div class="base">

<div class="rank"
style="color:${item.color1};">
${index+1}
</div>

<div class="name"
style="color:${item.color1};">
${item.name}
</div>

</div>
`;

chart.appendChild(wrapper);

});

}

fetchWiseRate();
setInterval(fetchWiseRate,60000);

function downloadAll(){

const target = document.querySelector(".container");
const btn = document.querySelector(".download-box");

/* hide button */
btn.style.visibility = "hidden";

setTimeout(()=>{

html2canvas(target,{
scale:4,
useCORS:true,
backgroundColor:"#001712"
}).then(canvas=>{

/* ---------- POST 1:1 ---------- */
const post=document.createElement("canvas");
post.width=1080;
post.height=1080;

const pctx=post.getContext("2d");

/* fill bg */
pctx.fillStyle="#001712";
pctx.fillRect(0,0,1080,1080);

/* keep exact screen ratio */
const postScale=Math.min(
1080/canvas.width,
1080/canvas.height
);

const pw=canvas.width*postScale;
const ph=canvas.height*postScale;

const px=(1080-pw)/2;
const py=(1080-ph)/2;

pctx.drawImage(canvas,px,py,pw,ph);

const link=document.createElement("a");
link.download="pandamoney-post.png";
link.href=post.toDataURL("image/png");
link.click();


/* ---------- STORY 9:16 ---------- */
const story=document.createElement("canvas");
story.width=1080;
story.height=1920;

const sctx=story.getContext("2d");

sctx.fillStyle="#001712";
sctx.fillRect(0,0,1080,1920);

const storyScale=Math.min(
1080/canvas.width,
1920/canvas.height
);

const sw=canvas.width*storyScale;
const sh=canvas.height*storyScale;

const sx=(1080-sw)/2;
const sy=(1920-sh)/2;

sctx.drawImage(canvas,sx,sy,sw,sh);

const link2=document.createElement("a");
link2.download="pandamoney-story.png";
link2.href=story.toDataURL("image/png");
link2.click();

/* show button again */
btn.style.visibility="visible";

});

},300);

}