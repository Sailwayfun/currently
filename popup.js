console.log("popup.js loaded");

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const rateEl = document.getElementById("rate");
const pinServerBtn = document.getElementById("pinServer");

console.log(fromSelect, toSelect, rateEl, pinServerBtn);

function fetchRate(from, to) {
    rateEl.textContent = "Loading...";
    fetch(`http://localhost:3000/convert?from=${from}&to=${to}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("fetched", data);
            rateEl.innerHTML = `<div>
            <p>Last Updated: ${new Date(data.time_last_update_unix * 1000).toLocaleString()}</p>
            <p>1 ${from} ≈ <span>${data.rate.toFixed(2)} ${to}</span></p>
            </div>`;
        })
        .catch(err => {
            console.error(err);
            rateEl.textContent = "匯率查詢失敗";
        });
}

// 初始查詢
fetchRate(fromSelect.value, toSelect.value);

// 當選項變更時重新查詢
fromSelect.addEventListener("change", () => {
    fetchRate(fromSelect.value, toSelect.value);
});
toSelect.addEventListener("change", () => {
    fetchRate(fromSelect.value, toSelect.value);
});

pinServerBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/pin").then(res => {
        console.log("res", res);
        return res.json();
    }).then(data => {
        console.log("data", data);
    });
});
