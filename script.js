document.getElementById("subscriberForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = document.getElementById("subscriberForm");

  const formData = {
    Name: form.Name.value,
    Designation: form.Designation.value,
    Department: form.Department.value,
    AutoTel: form.AutoTel.value,
    Phone: form.Phone.value,
    RequestType: form.RequestType.value,
    ComplaintType: form.ComplaintType ? form.ComplaintType.value : '',
    ComplaintDetails: form.ComplaintDetails ? form.ComplaintDetails.value : '',
    Status: "Pending"
  };

  const scriptURL = "https://script.google.com/macros/s/AKfycbw-i-g23uVt6qOrd7fTQhTPoxK1dfxlQYwngL0FeZXQI6Ejt_0QrQEN6ABPnkd9bLGW_g/exec";

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(formData)
  })
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("responseMsg").textContent = "✅ Submitted successfully!";
      form.reset();
      toggleComplaintFields();
    })
    .catch((err) => {
      console.error("Error!", err.message);
      document.getElementById("responseMsg").textContent = "❌ Something went wrong.";
    });
});