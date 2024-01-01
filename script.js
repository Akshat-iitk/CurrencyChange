const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#submit_button");
const FromCurr = document.querySelector("#from");
const ToCurr = document.querySelector("#to");
const mess = document.querySelector("#mess");
const exbtn = document.querySelector("#exchange_button")
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (currCode === "INR" && select.name === "to")
      newOption.selected = "selected";
    if (currCode === "USD" && select.name === "from")
      newOption.selected = "selected";
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};
const updateExchangeRate = async () => {
  let amount = document.querySelector("#amount");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }
  const URL = `${BASE_URL}/${FromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  let to_curr = ToCurr.value.toLowerCase() ;
  let rate = data[to_curr] ;
  let final_amount = amtVal * rate ;
  mess.innerText = `${amtVal} ${FromCurr.value} = ${final_amount.toFixed(4)} ${ToCurr.value}`
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
exbtn.addEventListener("click",()=>{
  const a = FromCurr.value ;
  FromCurr.value = ToCurr.value ;
  ToCurr.value = a ;
  updateFlag(ToCurr) ;
  updateFlag(FromCurr) ;
})