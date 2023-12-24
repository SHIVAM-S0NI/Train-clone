document.getElementById("interchange-btn").addEventListener("click", function() {
  const input1Value = document.getElementById("from").value;
  const input2Value = document.getElementById("to").value;

  document.getElementById("from").value = input2Value;
  document.getElementById("to").value = input1Value;
});

const search_train_form = document.querySelector(".search_trains");
const trains_grid = document.querySelector(".trains_grid");

search_train_form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(search_train_form);
  const formDataObject = {};

  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  console.log(formDataObject);

  const res = await fetch(`http://localhost:3000/search/${formDataObject.from + " " + formDataObject.to}`);
  const data = await res.json(); // Use await to get the JSON data
  mapTrainsData(data);

  console.log(data);
});

const mapTrainsData = (data) => {
  if (data.length === 0) {
    trains_grid.innerHTML = "<div>No Trains Found.</div>"
    return;
  };

  let train_html = data.map((train) => (
    `<div style="border: 1px solid black; border-radius: 1rem; font-size: 0.5rem; padding: 0.5rem;">
      <div>Name : <span>${train.name}</span></div>
      <div>Train no. : <span>${train.train_num}</span></div>
      <div>From : <span>${train.train_from}</span></div>
      <div>To : <span>${train.train_to}</span></div>
      <div>Class : <span>${train.data.classes}</span></div>
      <div>Arrival Time : <span>${train.data.arriveTime}</span></div>
      <div>Departure Time : <span>${train.data.departTime}</span></div>
    </div>`
  ))

  trains_grid.innerHTML = train_html.join("");
}
