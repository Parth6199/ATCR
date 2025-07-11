const scriptURL = 'https://script.google.com/macros/s/AKfycbxSMQxzGvBsJZUeem5YffSzrm8Z9U-aZTnqyzrtoBV9rMpOckv0VcFEHX2j5QIeWYZb6Q/exec';

document.getElementById("subscriberForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  const formData = {
    Name: form.Name.value,
    Designation: form.Designation.value,
    Department: form.Department.value,
    AutoTel: form.AutoTel.value,
    Phone: form.Phone.value,
    RequestType: form.RequestType.value,
    ComplaintType: form.ComplaintType ? form.ComplaintType.value : '',
    ComplaintDetails: form.ComplaintDetails ? form.ComplaintDetails.value : ''
  };

  fetch(scriptURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.text())
    .then(data => {
      document.getElementById("responseMsg").textContent = "✅ Submitted successfully!";
      form.reset();
    })
    .catch(err => {
      console.error("Error!", err);
      document.getElementById("responseMsg").textContent = "❌ Something went wrong!";
    });
});