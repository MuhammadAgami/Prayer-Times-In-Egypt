const date = new Date();

let days = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

let months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

let dayName = days[date.getDay()];
let dayNumber = date.getDate();
let monthName = months[date.getMonth()];
let yearNumber = date.getFullYear();
let hours = String(date.getHours()).padStart(2, "0");
let minutes = String(date.getMinutes()).padStart(2, "0");
let seconds = String(date.getSeconds()).padStart(2, "0");

let formattedDate = `${dayName}, ${dayNumber} ${monthName} ${yearNumber} الساعة ${hours}:${minutes}:${seconds}`;

document.getElementById("dataToday").innerHTML = formattedDate;

const governorates = [
  "القاهرة",
  "الإسكندرية",
  "الجيزة",
  "الشرقية",
  "الغربية",
  "الدقهلية",
  "المنوفية",
  "السويس",
  "أسيوط",
  "قنا",
  "الأقصر",
  "البحر الأحمر",
  "شمال سيناء",
  "شرم الشيخ",
  "الوادي الجديد",
  "مطروح",
  "البحيرة",
  "كفر الشيخ",
  "الفيوم",
  "بني سويف",
  "دمياط",
  "المنيا",
  "أسوان",
  "الإسماعيلية",
  "بورسعيد",
  "القليوبية",
  "حلوان",
  "سوهاج",
];

document.getElementById(
  "gov"
).innerHTML += `<option value="">اختر محافظة</option>`;

for (let governorate of governorates) {
  document.getElementById(
    "gov"
  ).innerHTML += `<option value="${governorate}">${governorate}</option>`;
}

document.getElementById("gov").onchange = function () {
  let selectedGovernorate = this.value;
  document.getElementById("goverHeader").innerHTML = selectedGovernorate;
  chooseGovernorate(selectedGovernorate);
};

chooseGovernorate("القاهرة");

function chooseGovernorate(governorate) {
  axios
    .get(
      `https://api.aladhan.com/v1/timingsByCity?city=${governorate}&country=مصر`
    )
    .then(function (response) {
      const data = response.data.data.timings;
      document.getElementById("choose").innerHTML = `
        <div class="col-10 col-md-2 col-sm-6 prayer-time bg-light p-0 mb-5" style="height:200px">
          <h3 class="bg-primary p-3 w-100">الفجر</h3>
          <p class="text-dark h-50 d-flex justify-content-center align-items-center display-1">${data.Fajr}</p>
        </div>
        <div class="col-10 col-md-2 col-sm-6 prayer-time bg-light p-0 mb-5" style="height:200px">
          <h3 class="bg-primary p-3 w-100">الضهر</h3>
          <p class="text-dark h-50 d-flex justify-content-center align-items-center display-1">${data.Dhuhr}</p>
        </div>
        <div class="col-10 col-md-2 col-sm-6 prayer-time bg-light p-0 mb-5" style="height:200px">
          <h3 class="bg-primary p-3 w-100">العصر</h3>
          <p class="text-dark h-50 d-flex justify-content-center align-items-center display-1">${data.Asr}</p>
        </div>
        <div class="col-10 col-md-2 col-sm-6 prayer-time bg-light p-0 mb-5" style="height:200px">
          <h3 class="bg-primary p-3 w-100">المغرب</h3>
          <p class="text-dark h-50 d-flex justify-content-center align-items-center display-1">${data.Maghrib}</p>
        </div>
        <div class="col-10 col-md-2 col-sm-6 prayer-time bg-light p-0 mb-5" style="height:200px">
          <h3 class="bg-primary p-3 w-100">العشاء</h3>
          <p class="text-dark h-50 d-flex justify-content-center align-items-center display-1">${data.Isha}</p>
        </div>
      `;
    })
    .catch(function (error) {
      console.error("حدث خطأ في جلب البيانات:", error);
    });
}
