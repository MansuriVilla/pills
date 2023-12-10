document
  .getElementById("addMedicineBtn")
  .addEventListener("click", function () {
    const medicineName = document.getElementById("medicineName").value;
    if (medicineName.trim() !== "") {
      const ul = document.getElementById("medicineList");
      const li = document.createElement("li");
      li.className = "mdc-li";
      li.innerHTML = `
        <div class="li-ctt">
          <div class="sr">
            <p class="num">${ul.children.length + 1}.</p>
          </div>
          <div class="txt-scc-hld">
            <div class="txt">
              <h6 class="mdc-nm">${medicineName}</h6>
            </div>
          </div>
          <div class="action-buttons">
            <button class="deleteBtn de"><i class="del fa-regular fa-trash-can"></i></button>
            <button class="editBtn"><i class="fa-regular fa-pen-to-square"></i></button>
          </div>
        </div>
      `;

      li.addEventListener("click", function (event) {
        const actionButtons = li.querySelector(".action-buttons");
        actionButtons.style.display = "flex"; // Always set display to 'block' when clicking

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
      document.getElementById("medicineName").value = ""; // Clear the input field
    }
  });

// document
//   .getElementById("downloadPDFBtn")
//   .addEventListener("click", function () {
//     const selectedMedicines = document.querySelectorAll(
//       ".mdc-li.selected .mdc-nm"
//     );
//     const selectedMedicineNames = Array.from(selectedMedicines).map(
//       (item) => item.textContent
//     );

//     if (selectedMedicineNames.length === 0) {
//       alert("No selected medicines to download.");
//       return;
//     }

//     // Create a new PDF document
//     const doc = new jsPDF();

//     // Set font size and style
//     doc.setFontSize(12);
//     doc.setFont("helvetica");
//     doc.setFontType("normal");

//     // Set text color
//     doc.setTextColor(0, 0, 0); // Black color

//     // Add selected medicines to the PDF with styling
//     doc.text("Selected Medicines", 10, 10);
//     selectedMedicineNames.forEach((medicine, index) => {
//       const yPosition = 20 + index * 10;
//       doc.text(index + 1 + ". " + medicine, 10, yPosition);
//     });

//     // Save the PDF and allow the user to download it
//     doc.save("selected_medicines.pdf");
//   });

// Import the PDFDocument class from pdf-lib
const { PDFDocument, rgb } = PDFLib;
document
  .getElementById("downloadPDFBtn")
  .addEventListener("click", async function () {
    const selectedMedicines = document.querySelectorAll(
      ".mdc-li.selected .mdc-nm"
    );
    const selectedMedicineNames = Array.from(selectedMedicines).map(
      (item, index) => `${index + 1}. ${item.textContent}`
    );

    if (selectedMedicineNames.length === 0) {
      alert("No selected medicines to download.");
      return;
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const helveticaFont = await pdfDoc.embedFont(
      PDFLib.StandardFonts.Helvetica
    );
    const textSize = 12;

    const text = selectedMedicineNames.join("\n");

    page.drawText(text, {
      x: 50,
      y: page.getHeight() - 50,
      size: textSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

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

document
  .getElementById("addMedicineBtn")
  .addEventListener("click", function () {});

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("addMedicineBtn").click();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "/") {
    document.getElementById("medicineName").focus();
  }
});

let pdfBytes;

document
  .getElementById("downloadPDFBtn")
  .addEventListener("click", async function () {
    pdfBytes = await pdfDoc.save();

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    const lines = selectedMedicineNames.length + 1; // Add 1 for the "Selected Medicines" title
    const yPositionDate = 20 + lines * 10;

    doc.text(`Generated on: ${formattedDate}`, 10, yPositionDate);

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_medicines.pdf";
    link.click();
  });

function sharePDFOnWhatsApp() {
  if (pdfBytes) {
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfURL = URL.createObjectURL(pdfBlob);
    const shareMessage = "Check out this PDF: " + pdfURL;
    const whatsappURL =
      "whatsapp://send?text=" + encodeURIComponent(shareMessage);

    window.location.href = whatsappURL;
  } else {
    alert("No PDF to share. Please generate the PDF first.");
  }
}

// Event listener for the "Share on WhatsApp" button
// document.getElementById("sharePDFBtn").addEventListener("click", function () {
//   sharePDFOnWhatsApp();
// });
// const whatsappShareBtn = document.createElement("button");
// whatsappShareBtn.className = "dnlo";
// whatsappShareBtn.innerText = "Share on WhatsApp";
// whatsappShareBtn.addEventListener("click", function () {
//   shareMedicineOnWhatsApp(medicineName);
// });

// li.appendChild(whatsappShareBtn);

function shareSelectedMedicinesOnWhatsApp() {
  const selectedMedicineItems = document.querySelectorAll(
    ".mdc-li.selected .mdc-nm"
  );
  const selectedMedicineNames = Array.from(selectedMedicineItems).map(
    (item, index) => `${index + 1}. ${item.textContent}`
  );

  if (selectedMedicineNames.length === 0) {
    alert("No selected medicines to share.");
    return;
  }

  const shareMessage =
    "Selected Medicines:\n" + selectedMedicineNames.join("\n");
  const whatsappURL =
    "whatsapp://send?text=" + encodeURIComponent(shareMessage);

  window.location.href = whatsappURL;
}
document
  .getElementById("shareSelectedMedicinesBtn")
  .addEventListener("click", function () {
    shareSelectedMedicinesOnWhatsApp();
  });
