const chart = document.getElementById("chart");

/*
  PLATFORM MARKUP DIFFERENCE
  Example:
  Wise live rate = 93.80

  PandaMoney gives better rate:
  +1.08

  Other platforms slightly lower
*/

const platforms = [

  {
    name: "PANDAMONEY",
    adjustment: 1.08,
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


// WISE API KEY
const API_KEY = "e861da91-0e07-4364-8f77-403c7db89dd8";


// FETCH LIVE USD → INR RATE

async function fetchWiseRate(){

  try{

    const response = await fetch(
      "https://api.transferwise.com/v1/rates?source=USD&target=INR",
      {
        headers:{
          Authorization:`Bearer ${API_KEY}`
        }
      }
    );

    const data = await response.json();

    /*
      Wise returns array
    */

    const liveRate = data[0].rate;

    createChart(liveRate);

  }catch(error){

    console.log(error);

    // fallback demo rate
    createChart(93.80);

  }

}


// CREATE PROFESSIONAL CHART

function createChart(baseRate){

  chart.innerHTML = "";

  const updatedPlatforms = platforms.map(item=>{

    return{
      ...item,
      value: +(baseRate + item.adjustment).toFixed(2)
    };

  });

  // SORT HIGH → LOW

  updatedPlatforms.sort((a,b)=>b.value-a.value);

  const maxValue = updatedPlatforms[0].value;

  updatedPlatforms.forEach((item,index)=>{

    // dynamic height
   const minHeight = 90;
const maxHeight = 240;
const minValue = updatedPlatforms[updatedPlatforms.length - 1].value;

const normalized =
(item.value - minValue) /
(maxValue - minValue);

const height =
minHeight +
(normalized * (maxHeight - minHeight));

    const wrapper = document.createElement("div");

    wrapper.classList.add("bar-wrapper");

    wrapper.innerHTML = `

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
    inset 0 0 20px rgba(255,255,255,0.08);
">

    <div class="top-face"></div>

    <img
      src="${item.logo}"
      class="platform-logo"
      alt="${item.name}"
    >

</div>

</div>

      </div>

      <div class="base">

        <div
    class="rank"
    style="color:${item.color1};"
>
    ${index + 1}
</div>

<div class="divider"></div>

<div
    class="name"
    style="color:${item.color1};"
>
    ${item.name}
</div>

      </div>

    `;

    chart.appendChild(wrapper);

  });

}


// INITIAL LOAD

fetchWiseRate();


// AUTO REFRESH EVERY 60 SECONDS

setInterval(fetchWiseRate,60000);