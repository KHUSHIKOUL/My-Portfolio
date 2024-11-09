document.getElementById('disorderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const symptoms = document.getElementById('symptoms').value;
    const familyHistory = document.getElementById('family_history').value;

    let disorderRisk = "low";
    if (age >= 60 || familyHistory !== "none" || symptoms.includes("memory loss")) {
        disorderRisk = "high";
    } else if (symptoms.includes("headaches") || symptoms.includes("confusion")) {
        disorderRisk = "moderate";
    }

    document.getElementById('result').innerHTML = `
      <h3>Risk Analysis Result:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Symptoms:</strong> ${symptoms}</p>
      <p><strong>Family History:</strong> ${familyHistory}</p>
      <p><strong>Predicted Risk of Brain Disorder:</strong> ${disorderRisk.charAt(0).toUpperCase() + disorderRisk.slice(1)}</p>`;
});