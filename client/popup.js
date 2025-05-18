import { fetchRate } from "./api/currencyApi.js";

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const rateEl = document.getElementById("rate");

console.log(fromSelect, toSelect, rateEl);

function updateRateDisplay(data) {
    rateEl.innerHTML = `<div>
    <p>Last Updated: ${new Date(data.time_last_update_unix * 1000).toLocaleString()}</p>
    <p>1 ${fromSelect.value} ≈ <span>${data.rate.toFixed(2)} ${toSelect.value}</span></p>
    </div>`;
}

// 初始查詢
fetchRate(fromSelect.value, toSelect.value).then(data => {
    console.log("data", data);
    updateRateDisplay(data);
}).catch(err => {
    console.error(err);
});

// 當選項變更時重新查詢
fromSelect.addEventListener("change", () => {
    fetchRate(fromSelect.value, toSelect.value).then(data => {
        console.log("data", data);
        updateRateDisplay(data);
    }).catch(err => {
        console.error(err);
    });
});
toSelect.addEventListener("change", () => {
    fetchRate(fromSelect.value, toSelect.value).then(data => {
        console.log("data", data);
        updateRateDisplay(data);
    }).catch(err => {
        console.error(err);
    });
});
