document
  .getElementById("medicineName")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.getElementById("mpdInput1").focus();
    }
  });

document
  .getElementById("mpdInput1")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.getElementById("mpdInput2").focus();
    }
  });

document
  .getElementById("mpdInput2")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.getElementById("mpdInput3").focus();
    }
  });

document
  .getElementById("mpdInput3")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.getElementById("addMedicineBtn").click();
    }
  });

document
  .getElementById("addMedicineBtn")
  .addEventListener("click", function () {
    const medicineName = document.getElementById("medicineName").value;
    const mpdInput1 = document.getElementById("mpdInput1").value;
    const mpdInput2 = document.getElementById("mpdInput2").value;
    const mpdInput3 = document.getElementById("mpdInput3").value;

    if (
      medicineName.trim() !== "" &&
      mpdInput1.trim() !== "" &&
      mpdInput2.trim() !== "" &&
      mpdInput3.trim() !== ""
    ) {
      const ul = document.getElementById("medicineList");
      const li = document.createElement("li");
      li.className = "mdc-li";

      li.innerHTML = `
        <div class="li-ctt">
          <div class="li-inr">
            <div class="sr">
                <p class="num">${ul.children.length + 1}.</p>
            </div>
            <div class="txt-scc-hld">
                <div class="txt">
                    <h6 class="mdc-nm">${medicineName}</h6>
                </div>
            </div>
            <div class="mdp-values">
                <p>${mpdInput1}</p>
                <span>-</span>
                <p>${mpdInput2}</p>
                <span>-</span>
                <p>${mpdInput3}</p>
            </div>
            <div class="action-buttons">
                <button class="deleteBtn de" ><i class="del fa-regular fa-trash-can"></i></button>
                <button class="editBtn"><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
          </div>
        </div>
    `;

      li.addEventListener("click", function (event) {
        const actionButtons = li.querySelector(".action-buttons");
        actionButtons.style.display = "flex";
        event.stopPropagation();
      });

      li.querySelector(".deleteBtn").addEventListener("click", function () {
        ul.removeChild(li);
      });

      li.querySelector(".editBtn").addEventListener("click", function () {
        const newName = prompt("Enter the new name:");
        if (newName !== null && newName.trim() !== "") {
          li.querySelector(".mdc-nm").textContent = newName;
        }
      });

      ul.appendChild(li);

      document.getElementById("medicineName").value = "";
      document.getElementById("mpdInput1").value = "";
      document.getElementById("mpdInput2").value = "";
      document.getElementById("mpdInput3").value = "";
    }
  });

// Import the PDFDocument class from pdf-lib
const { PDFDocument, rgb } = PDFLib;

document
  .getElementById("downloadPDFBtn")
  .addEventListener("click", async function () {
    const selectedMedicines = document.querySelectorAll(".mdc-li.selected");
    const selectedMedicineNames = Array.from(selectedMedicines).map(
      (item, index) =>
        `${index + 1}. ${item.querySelector(".mdc-nm").textContent}`
    );

    if (selectedMedicineNames.length === 0) {
      alert("No selected medicines to download.");
      return;
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Set font size and add text to the page
    const helveticaFont = await pdfDoc.embedFont(
      PDFLib.StandardFonts.Helvetica
    );
    const textSize = 12;

    // Include the new input values in the PDF content
    const combinedMedicineValues = [];
    selectedMedicineNames.forEach((name, index) => {
      const li = selectedMedicines[index];
      const mpdInput1 = li.querySelector(
        ".mdp-values p:nth-child(1)"
      ).textContent;
      const mpdInput2 = li.querySelector(
        ".mdp-values p:nth-child(3)"
      ).textContent;
      const mpdInput3 = li.querySelector(
        ".mdp-values p:nth-child(5)"
      ).textContent;

      combinedMedicineValues.push(
        `${name} | ${mpdInput1} - ${mpdInput2} - ${mpdInput3}`
      );
    });

    const text = combinedMedicineValues.join("\n");

    page.drawText(text, {
      x: 50,
      y: page.getHeight() - 50, // Adjust the starting y-coordinate based on the page height
      size: textSize,
      font: helveticaFont,
      color: rgb(0, 0, 0), // Black color
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a Blob and download the PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_medicines.pdf";
    link.click();
  });

document.getElementById("selectAllBtn").addEventListener("click", function () {
  const medicineListItems = document.querySelectorAll(".mdc-li");
  medicineListItems.forEach((item) => {
    item.classList.add("selected");
  });
});

// Event listener for the Enter key (key code 13) as a shortcut for adding a medicine
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("addMedicineBtn").click();
  }
});

// Event listener for the forward slash key ("/") as a shortcut for focusing on the input field
document.addEventListener("keydown", function (event) {
  if (event.key === "/") {
    document.getElementById("medicineName").focus();
  }
});
