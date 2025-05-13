document.getElementById("billForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const previous = parseInt(document.getElementById("previous").value);
  const current = parseInt(document.getElementById("current").value);
  const units = current - previous;

  if (units < 0) {
    document.getElementById("result").innerText = "Invalid readings.";
    return;
  }

  const response = await fetch("/api/bill", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ previous, current }),
  });

  const data = await response.json();
  document.getElementById("result").innerText = `Units: ${data.units} | Bill Amount: ₹${data.price.toFixed(2)}`;

  loadHistory();
});

async function loadHistory() {
  const response = await fetch("/api/bill");
  const data = await response.json();
  const table = document.getElementById("historyTable");
  table.innerHTML = `<tr><th>Previous</th><th>Current</th><th>Units</th><th>Price</th><th>Date</th></tr>`;
  data.forEach(bill => {
    const row = `<tr>
      <td>${bill.previous}</td>
      <td>${bill.current}</td>
      <td>${bill.units}</td>
      <td>₹${bill.price.toFixed(2)}</td>
      <td>${new Date(bill.date).toLocaleString()}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

loadHistory();
