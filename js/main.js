const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
const counter = document.getElementById("affairs__counter");
const checkboxEven = document.querySelector('.affairs__checkbox--even');
const checkboxOdd = document.querySelector('.affairs__checkbox--odd');
const deleteFirstElement = document.querySelector('.affairs__btn--del-first');
const deleteLastElement = document.querySelector('.affairs__btn--del-last');
const completedList = document.getElementById("completed_list");
const clearAllBtn = document.getElementById("clear-all-btn");

let affairs = [];
let completedAffairs = [];

function loadFromLocalStorage() {
  const storedAffairs = JSON.parse(localStorage.getItem('affairs')) || [];
  const storedCompletedAffairs = JSON.parse(localStorage.getItem('completedAffairs')) || [];

  list.innerHTML = "";
  completedList.innerHTML = "";

  affairs = storedAffairs;
  completedAffairs = storedCompletedAffairs;

  renderAffairs();
  renderCompletedAffairs();
}

function saveToLocalStorage() {
  localStorage.setItem('affairs', JSON.stringify(affairs));
  localStorage.setItem('completedAffairs', JSON.stringify(completedAffairs));
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function setCounter() {
  const totalizer = affairs.length;
  counter.innerText = totalizer;
  counter.classList.toggle("disable", totalizer === 0);
  counter.classList.toggle("affairs__counter--big", totalizer > 9);
}

function renderAffairs() {
  affairs.forEach(affair => {
    addAffairToDOM(affair);
  });
}

function renderCompletedAffairs() {
  completedAffairs.forEach(affair => {
    addCompletedAffairToDOM(affair);
  });
}

function addAffair(text, time = getCurrentTime()) {
  const affair = {
    text: text,
    time: time
  };
  affairs.push(affair);
  addAffairToDOM(affair);
  input.value = "";
  setCounter();
  saveToLocalStorage();
}

function addCompletedAffair(affair) {
  completedAffairs.push(affair);
  addCompletedAffairToDOM(affair);
  saveToLocalStorage();
}

function addAffairToDOM(affair) {
  const item = document.createElement("li");
  item.classList.add("affairs__item");
  item.classList.add("item");

  const affairText = document.createElement("p");
  const affairTime = document.createElement("span");

  affairText.innerText = `${affair.text}`;
  affairTime.innerText = `${affair.time}`;
  affairText.classList.add("item__text");
  affairTime.classList.add("item__time");
  item.appendChild(affairText);
  item.appendChild(affairTime);

  const container = document.createElement("div");
  container.classList.add("item__button");
  container.classList.add("button");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("item__button--delete","item__button");

  deleteBtn.addEventListener("click", () => {
    const index = affairs.indexOf(affair);
    if (index !== -1) {
      affairs.splice(index, 1);
      item.remove();
      setCounter();
      saveToLocalStorage();
    }
  });

  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Complete";
  doneBtn.classList.add("button__completed");

  doneBtn.addEventListener("click", () => {
    addCompletedAffair(affair);
    const index = affairs.indexOf(affair);
    if (index !== -1) {
      affairs.splice(index, 1);
      item.remove();
      setCounter();
      saveToLocalStorage();
    }
  });

  container.appendChild(doneBtn);
  container.appendChild(deleteBtn);
  item.appendChild(container);
  list.appendChild(item);
  setCounter();
  saveToLocalStorage();
}

function addCompletedAffairToDOM(affair) {
  const item = document.createElement("li");
  item.classList.add("affairs__item");
  item.classList.add("item");

  const affairText = document.createElement("p");
  const affairTime = document.createElement("span");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("item__button--delete","item__button");

  affairText.innerText = `${affair.text}`;
  affairTime.innerText = `${affair.time}`;
  affairText.classList.add("item__text");
  affairTime.classList.add("item__time");

  item.appendChild(affairText);
  item.appendChild(affairTime);
  item.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    const index = completedAffairs.indexOf(affair);
    if (index !== -1) {
      completedAffairs.splice(index, 1);
      item.remove();
      setCounter();
      saveToLocalStorage();
    }
  });
  completedList.appendChild(item);
  setCounter();
  saveToLocalStorage();
}

addBtn.addEventListener("click", () => {
  if (input.value !== "") {
    const text = input.value;
    addAffair(text);
  }
});

function handleCheckboxEvenChange() {
  if (checkboxEven.checked) {
    list.classList.add("affairs__list--even");
  } else {
    list.classList.remove("affairs__list--even");
  }
}

function handleCheckboxOddChange() {
  if (checkboxOdd.checked) {
    list.classList.add("affairs__list--odd");
  } else {
    list.classList.remove("affairs__list--odd");
  }
}

deleteFirstElement.addEventListener("click", () => {
  if (affairs.length > 0) {
    const removedAffair = affairs.shift();
    const firstItem = list.querySelector('.affairs__item');
    if (firstItem) {
      firstItem.remove();
      setCounter();
      saveToLocalStorage();
    }
  } else {
    alert('No notes');
  }
});

deleteLastElement.addEventListener("click", () => {
  if (affairs.length > 0) {
    const removedAffair = affairs.pop();
    const lastItem = list.querySelector('.affairs__item:last-child');
    if (lastItem) {
      lastItem.remove();
      setCounter();
      saveToLocalStorage();
    }
  } else {
    alert('No notes');
  }
});

checkboxEven.addEventListener('change', handleCheckboxEvenChange);
checkboxOdd.addEventListener('change', handleCheckboxOddChange);

clearAllBtn.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to clear all comments?");
  if (confirmation) {
    clearLocalStorage();
  }
});

function clearLocalStorage() {
  localStorage.removeItem('affairs');
  localStorage.removeItem('completedAffairs');
  affairs = [];
  completedAffairs = [];
  list.innerHTML = "";
  completedList.innerHTML = "";
  setCounter();
}

loadFromLocalStorage();
setCounter();
handleCheckboxEvenChange();
handleCheckboxOddChange();
