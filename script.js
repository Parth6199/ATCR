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
    ConnectionType: form.ConnectionType ? form.ConnectionType.value : "",
    ComplaintDetails: form.ComplaintDetails ? form.ComplaintDetails.value : "",
    Status: "Pending"
  };

  const scriptURL = "https://script.google.com/macros/s/AKfycbyLiEyem26egy4Fm3p36oVJ3MMaK49qsQuD9V6UufdBkiO7C6Ez7OEq-1hvQkAk9SV2cA/exec"; // Replace with your URL

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(formData)
  })
    .then(res => res.text())
    .then(text => {
      try {
        const data = JSON.parse(text);

        if (data.result === "success") {
          const complaintID = data.complaintID;

          if (form.RequestType.value === "New Connection") {
            const popup = document.getElementById("connectionPopup");
            popup.classList.remove("opacity-0", "pointer-events-none");
            setTimeout(() => {
              popup.classList.add("opacity-0", "pointer-events-none");
            }, 4000);
          }

          if (form.RequestType.value === "Complaint") {
            const complaintPopup = document.getElementById("complaintPopup");
            document.getElementById("complaintIDText").textContent = complaintID;
            complaintPopup.classList.remove("opacity-0", "pointer-events-none");
            setTimeout(() => {
              complaintPopup.classList.add("opacity-0", "pointer-events-none");
            }, 4000);
          }

          document.getElementById("responseMsg").textContent = "✅ Submitted successfully!";
          form.reset();
          toggleComplaintFields();

        } else {
          document.getElementById("responseMsg").textContent = "❌ Error: Could not submit.";
        }
      } catch (err) {
        console.error("JSON Parse Error:", err.message);
        document.getElementById("responseMsg").textContent = "❌ Server error. Try again.";
      }
    })
    .catch(err => {
      console.error("Fetch Error:", err.message);
      document.getElementById("responseMsg").textContent = "❌ Something went wrong.";
    });
});