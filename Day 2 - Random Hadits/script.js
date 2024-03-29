// Mengambil object html
const goBtn = document.querySelector(".btn");
const resultHasil = document.querySelector(".hasil");
// Function agar mendapatkan random number
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Nge fetch endpoint
async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // isi data
    const data = await response.json();
    const rawi = data.metadata.name;
    const dataHadits = data.hadiths[0];
    const nomorHadits = dataHadits.hadithnumber;
    const isiHadits = dataHadits.text;

    if (isiHadits == "") {
      document.querySelector(
        ".result"
      ).innerHTML = `<div class="error">COBA LAGI</div>`;
      document.querySelector(".wrapper").style.backgroundColor = "red";
    } else {
      document.querySelector(".wrapper").innerHTML = `

    
        <div class="container">
            <div class="kotakanIsi">
                <div class="result">
                      <div class="rawsil">
      <div class="rawi">${rawi}</div>
      <div class="nomor">${nomorHadits}</div>
  </div>
  
  <div class="hasil">
  
      <div class="kalimat">
      ${isiHadits}
      </div>
  
  </div>
                </div>
            </div>
        </div>
   


  
      `;
      document.querySelector(".wrapper").style.backgroundColor = "#f1f1f1";
    }

    // Menuliskan ke HTML
  } catch (error) {
    console.error(`Download error: ${error.message}`);
  }
}

// Agar bisa mengambil objImam
let objImam;
// Mengambil random imam
function randomImam() {
  const kumpulanImam = [
    {
      name: "abudawud",
      totalHadits: "5274",
    },
    {
      name: "bukhari",
      totalHadits: "7563",
    },
    {
      name: "ibnmajah",
      totalHadits: "4340",
    },
    {
      name: "malik",
      totalHadits: "1858",
    },
    {
      name: "muslim",
      totalHadits: "3033",
    },
    {
      name: "nasai",
      totalHadits: "5758",
    },
    {
      name: "tirmidhi",
      totalHadits: "3604",
    },
  ];
  const randomAngkaForImam = Math.floor(Math.random() * 7);
  objImam = kumpulanImam[randomAngkaForImam];

  const hasilRandomAngka = generateRandomNumber(0, objImam.totalHadits);

  const endpoint = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ind-${objImam.name}/${hasilRandomAngka}.min.json`;
  fetchData(endpoint);
}

goBtn.addEventListener("click", randomImam);
