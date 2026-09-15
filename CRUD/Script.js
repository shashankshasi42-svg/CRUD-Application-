// ==========================================
// CRUD APPLICATION
// ==========================================

// Get HTML elements
const form = document.getElementById("crudForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const recordsTable = document.getElementById("recordsTable");
const emptyMessage = document.getElementById("emptyMessage");

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const searchInput = document.getElementById("searchInput");


// ==========================================
// Store Records
// ==========================================

let records = JSON.parse(localStorage.getItem("crudRecords")) || [];

let editIndex = -1;


// ==========================================
// READ - Display Records
// ==========================================

function displayRecords(data = records) {

    recordsTable.innerHTML = "";

    if (data.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }

    emptyMessage.style.display = "none";


    data.forEach((record, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${escapeHTML(record.name)}</td>

            <td>${escapeHTML(record.email)}</td>

            <td>${escapeHTML(record.phone)}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editRecord(${index})"
                >
                    ✏️ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteRecord(${index})"
                >
                    🗑️ Delete
                </button>

            </td>

        `;

        recordsTable.appendChild(row);

    });

}


// ==========================================
// CREATE - Add New Record
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();


    if (name === "" || email === "" || phone === "") {

        alert("Please fill all fields.");

        return;

    }


    // Update existing record
    if (editIndex !== -1) {

        records[editIndex] = {
            name: name,
            email: email,
            phone: phone
        };

        alert("Record updated successfully!");

        editIndex = -1;

    }

    // Create new record
    else {

        const newRecord = {
            name: name,
            email: email,
            phone: phone
        };

        records.push(newRecord);

        alert("Record added successfully!");

    }


    saveRecords();

    displayRecords();

    resetForm();

});


// ==========================================
// UPDATE - Edit Record
// ==========================================

function editRecord(index) {

    const record = records[index];


    nameInput.value = record.name;

    emailInput.value = record.email;

    phoneInput.value = record.phone;


    editIndex = index;


    formTitle.textContent = "✏️ Update Record";

    submitBtn.textContent = "💾 Update Record";

    cancelBtn.style.display = "block";


    // Scroll to form
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// DELETE - Delete Record
// ==========================================

function deleteRecord(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this record?"
    );


    if (!confirmDelete) {
        return;
    }


    records.splice(index, 1);


    saveRecords();

    displayRecords();


    alert("Record deleted successfully!");

}


// ==========================================
// SEARCH - Search Records
// ==========================================

function searchRecords() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredRecords = records.filter(record =>

        record.name.toLowerCase().includes(searchText) ||

        record.email.toLowerCase().includes(searchText) ||

        record.phone.toLowerCase().includes(searchText)

    );


    displayRecords(filteredRecords);

}


// ==========================================
// CANCEL EDIT
// ==========================================

function cancelEdit() {

    editIndex = -1;

    resetForm();

}


// ==========================================
// RESET FORM
// ==========================================

function resetForm() {

    form.reset();

    formTitle.textContent = "Add New Record";

    submitBtn.textContent = "➕ Add Record";

    cancelBtn.style.display = "none";

}


// ==========================================
// SAVE TO LOCAL STORAGE
// ==========================================

function saveRecords() {

    localStorage.setItem(
        "crudRecords",
        JSON.stringify(records)
    );

}


// ==========================================
// SECURITY HELPER
// Prevent HTML injection
// ==========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayRecords();