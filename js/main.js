const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
const counter = document.getElementById("affairs__counter");
const checkboxEven = document.querySelector('.affairs__checkbox--even');
const checkboxOdd = document.querySelector('.affairs__checkbox--odd');
const deleteFirstElement = document.querySelector('.affairs__btn--del-first');
const deleteLastElement = document.querySelector('.affairs__btn--del-last');
const completedList = document.getElementById("completed_list");

let affairs = [];
let completedAffairs = [];

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); 
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function setCounter() {
  const totalizer = affairs.length;
  counter.innerText = totalizer;
  if (totalizer > 0) {
    counter.classList.remove("disable");
  } else {
    counter.classList.add("disable");
  }
  if (totalizer > 9) {
    counter.classList.add("affairs__counter--big");
  } else {
    counter.classList.remove("affairs__counter--big");
  }
}

function addAffair(text) {
  const currentTime = getCurrentTime(); 
  const affair = {
    text: text,
    time: currentTime 
  };
  affairs.push(affair); 

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
  deleteBtn.classList.add("button__delet");

  deleteBtn.addEventListener("click", () => {
    const index = affairs.indexOf(affair);
    if (index !== -1) {
      affairs.splice(index, 1);
      item.remove();
      setCounter();
    }
  });

  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Did";
  doneBtn.classList.add("button__completed");

  doneBtn.addEventListener("click", () => {
    completedAffairs.push(affair);
    const index = affairs.indexOf(affair);
    if (index !== -1) {
      affairs.splice(index, 1);
      item.remove();
      setCounter();
      addCompletedAffair(affair);
    }
  });

  container.appendChild(doneBtn);
  container.appendChild(deleteBtn);
  item.appendChild(container);
  list.appendChild(item);

  input.value = "";
  setCounter();
}

function addCompletedAffair(affair) {
  const item = document.createElement("li");
  item.classList.add("affairs__item");
  item.classList.add("item");

  const affairText = document.createElement("p");
  const affairTime = document.createElement("span");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("button__delet");
  
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
    }
  });
  completedList.appendChild(item);
}

addBtn.addEventListener("click", () => {
  if (input.value !== "") {
    const text = input.value;
    addAffair(text);
  }
});

function handlecheckboxEvenChange() {
  if (checkboxEven.checked) {
    list.classList.add("affairs__list--even");
  } else {
    list.classList.remove("affairs__list--even");
  }
}

function handlecheckboxOddChange() {
  if (checkboxOdd.checked) {
    list.classList.add("affairs__list--odd");
  } else {
    list.classList.remove("affairs__list--odd");
  }
}

deleteFirstElement.addEventListener("click", () => {
  if (affairs.length > 0) {
    affairs.shift();
    const firstItem = list.querySelector('.affairs__item'); 
    if (firstItem) {
      firstItem.remove(); 
      setCounter(); 
    }
  } else {
    alert('No notes'); 
  }
});

deleteLastElement.addEventListener("click", () => {
  if (affairs.length > 0) {
    affairs.pop(); 
    const lastItem = list.querySelector('.affairs__item:last-child'); 
    if (lastItem) {
      lastItem.remove(); 
      setCounter(); 
    }
  } else {
    alert('No notes'); 
  }
});

checkboxEven.addEventListener('change', handlecheckboxEvenChange);
checkboxOdd.addEventListener('change', handlecheckboxOddChange);

handlecheckboxEvenChange();
handlecheckboxOddChange();
