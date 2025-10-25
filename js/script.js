"use strict";

// ^ ## HTML Elements
let doctorNameInput = document.getElementById("doctorName");
let doctorspecializationInput = document.getElementById("doctorSpecialization");
let doctorFeesInput = document.getElementById("doctorFees");
let doctorProfileDetailsInput = document.getElementById("doctorProfileDetails");
let doctorImageInput = document.getElementById("doctorImage");
let cardContainer = document.getElementById("card-container");
let searchDoctorsInput = document.getElementById("searchDoctorsinput");
let updateIndex = null;
let addDoctorBtn = document.querySelector('button[onclick="addDoctor()"]');

// ^ ## App Variables
let doctorNameRegex = /^[A-Z][A-Za-z _-]{2,15}$/;
let doctorFeesRegex = /^(?:[1-9][0-9]{2}|1[0-9]{3}|2000)$/;
let doctorProfileDetailsRegex = /^[A-z][A-Za-z0-9 ]{25,}$/;
let doctorSpecializationRegex =
  /^(cardiologist|dermatologist|neurologist|pediatrician|orthopedic|psychiatrist|gynecologist|radiologist|urologist|general_surgeon)$/;

let doctorList = JSON.parse(localStorage.getItem("doctorList")) || [];
displayAllDoctors();
clearForm();

// ^ ## Functions

function addDoctor() {
  let doctorStatusInput = document.querySelector(
    'input[name="doctorstatus"]:checked'
  );

  let isValid =
    validate(doctorNameRegex, doctorNameInput) &&
    validate(doctorProfileDetailsRegex, doctorProfileDetailsInput) &&
    validate(doctorFeesRegex, doctorFeesInput) &&
    validateSpecialization();

  if (!isValid) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please check all required fields and try again!",
      customClass: { confirmButton: "custom-swal-btn" },
      buttonsStyling: false,
    });
    return;
  }

  let doctor = {
    name: doctorNameInput.value,
    specialization: doctorspecializationInput.value,
    fees: doctorFeesInput.value,
    profileDetails: doctorProfileDetailsInput.value,
    status: doctorStatusInput ? doctorStatusInput.value : null,
    imageSrc: doctorImageInput.files[0]
      ? doctorImageInput.files[0].name
      : updateIndex !== null
      ? doctorList[updateIndex].imageSrc
      : "default-doctor.png",
  };

  let action = updateIndex !== null ? "updated" : "added";

  if (updateIndex !== null) {
    doctorList[updateIndex] = doctor; // update
    updateIndex = null;
  } else {
    doctorList.push(doctor); // add new
  }

  localStorage.setItem("doctorList", JSON.stringify(doctorList));
  cardContainer.innerHTML = "";
  displayAllDoctors();
  clearForm();

  Swal.fire({
    title: action === "added" ? "New Doctor Added" : "Doctor Updated",
    icon: "success",
    draggable: true,
    customClass: { confirmButton: "custom-swal-btn" },
    buttonsStyling: false,
  });

  // button reset
  addDoctorBtn.innerHTML =
    '<i class="fa-solid fa-circle-plus"></i> Add New Doctor';
}

function displayDoctors(index) {
  let statusColor =
    doctorList[index].status === "online"
      ? "text-success"
      : doctorList[index].status === "away"
      ? "text-warning"
      : "text-danger";

  let doctorCardMarkup = `
                      <div class="col-md-6 col-lg-4">
                      <div class="doctor-card rounded-1 overflow-hidden">
                        <img
                          class="w-100 object-fit-contain"
                          src="./images/${doctorList[index].imageSrc}"
                          alt="dc ali"
                        />
                        <div class="doctor-info p-2">
                          <div class="status pb-1 text-success ${statusColor}">
                            <i class="fa-solid fa-circle-notch me-1"></i>${doctorList[index].status}
                          </div>
                          <h5 class="mb-1">Dr/ ${doctorList[index].name}</h5>
                          <p class="mb-1 opacity-50">
                          ${doctorList[index].profileDetails}
                          </p>
                          <div
                            class="d-flex align-items-center justify-content-between"
                          >
                            <h6>${doctorList[index].specialization}</h6>
                            <h6>${doctorList[index].fees}<span> LE</span></h6>
                          </div>

                          <div
                            class="d-flex justify-content-between align-items-center column-gap-1"
                          >
                            <button
                              type="button"
                              class="btn btn-outline-primary btn-sm w-100"
                              onclick="setDoctorForUpdate(${index})"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-danger btn-sm w-100"
                              onclick="deleteDoctor(${index})"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;

  cardContainer.innerHTML += doctorCardMarkup;
}

function displayAllDoctors() {
  for (let i = 0; i <= doctorList.length - 1; i++) {
    displayDoctors(i);
  }
}

function deleteDoctor(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    customClass: {
      confirmButton: "custom-swal-btn",
      cancelButton: "custom-swal-btn-red",
    },
    buttonsStyling: false,
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      doctorList.splice(index, 1);
      localStorage.setItem("doctorList", JSON.stringify(doctorList));
      cardContainer.innerHTML = "";
      displayAllDoctors();
      clearForm();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        customClass: { confirmButton: "custom-swal-btn" },
        buttonsStyling: false,
      });
    }
  });
}

function deleteDoctorAll() {
  //localstorage,html,array
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    customClass: {
      confirmButton: "custom-swal-btn",
      cancelButton: "custom-swal-btn-red",
    },
    buttonsStyling: false,
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      doctorList = [];
      localStorage.setItem("doctorList", JSON.stringify(doctorList));
      cardContainer.innerHTML = "";
      displayAllDoctors();
      clearForm();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        customClass: { confirmButton: "custom-swal-btn" },
        buttonsStyling: false,
      });
    }
  });
}

function searchDoctors() {
  cardContainer.innerHTML = "";
  let searchKeyWord = searchDoctorsInput.value;

  if (searchKeyWord === "") {
    displayAllDoctors();
    return;
  }

  let found = false;
  for (let i = 0; i < doctorList.length; i++) {
    if (
      doctorList[i].name
        .toLowerCase()
        .includes(searchKeyWord.trim().toLowerCase())
    ) {
      displayDoctors(i);
      found = true;
    }
  }
  if (!found) {
    cardContainer.innerHTML = `
      <div class="text-center mt-5">
        <i class="fa-solid fa-user-xmark fa-2x mb-2 text-muted"></i>
        <p class="text-danger">🚫No Doctor With this name "<strong>${searchKeyWord}</strong>"</p>
      </div>
    `;
  }
}

function setDoctorForUpdate(index) {
  updateIndex = index; // save new index wich we updating

  let doctor = doctorList[index];

  // put his informations in form
  doctorNameInput.value = doctor.name;
  doctorspecializationInput.value = doctor.specialization;
  doctorFeesInput.value = doctor.fees;
  doctorProfileDetailsInput.value = doctor.profileDetails;

  // status (online / away / offline)
  document.querySelector(
    `input[name="doctorstatus"][value="${doctor.status}"]`
  ).checked = true;

  // ✏️change button name
  addDoctorBtn.innerHTML =
    '<i class="fa-solid fa-pen-to-square"></i> Update Doctor';
}

function validateSpecialization() {
  if (doctorspecializationInput.value !== "") {
    doctorspecializationInput.nextElementSibling.classList.add("invisible");
    doctorspecializationInput.classList.remove("is-invalid");
    doctorspecializationInput.classList.add("is-valid");
    return true;
  } else {
    doctorspecializationInput.nextElementSibling.classList.remove("invisible");
    doctorspecializationInput.classList.remove("is-valid");
    doctorspecializationInput.classList.add("is-invalid");
    return false;
  }
}

function validate(regex, input) {
  if (regex.test(input.value)) {
    input.nextElementSibling.classList.add("invisible");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.nextElementSibling.classList.remove("invisible");
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function clearForm() {
  doctorNameInput.value = "";
  doctorspecializationInput.value = "";
  doctorFeesInput.value = "";
  doctorProfileDetailsInput.value = "";
  doctorImageInput.value = "";

  // Reset radio buttons
  let statusRadios = document.querySelectorAll('input[name="doctorstatus"]');
  statusRadios.forEach((radio) => (radio.checked = false));

  // validiation styles default
  [
    doctorNameInput,
    doctorspecializationInput,
    doctorFeesInput,
    doctorProfileDetailsInput,
  ].forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
    if (input.nextElementSibling)
      input.nextElementSibling.classList.add("invisible");
  });

  // default button
  addDoctorBtn.innerHTML =
    '<i class="fa-solid fa-circle-plus"></i> Add New Doctor';
  updateIndex = null;
}
