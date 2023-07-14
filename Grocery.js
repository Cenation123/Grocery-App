let toDoList = document.getElementById("toDoList");
let inputEl = document.getElementById("User-1");
let sendBtn = document.getElementById("send-btn");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

let appSetting = {
  databaseURL:
    "https://playground-a8fb8-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const toDoListinDb = ref(database, "toDoLists");

sendBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(toDoListinDb, inputValue);

  clearInputFiled();
});

onValue(toDoListinDb, function (snapshot) {
  if (snapshot.exists()) {
    let newMessage = Object.entries(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < newMessage.length; i++) {
      let currentItem = newMessage[i];

      appendNewMessagesInPara(currentItem);
    }
  } else {
    toDoList.innerHTML = " NO Grocery left";
  }
});

function clearInputFiled() {
  inputEl.value = "";
}
function clearShoppingListEl() {
  toDoList.innerHTML = "";
}
function appendNewMessagesInPara(NewValue) {
  let list = document.createElement("li");
  let values = NewValue[1];
  let ids = NewValue[0];
  list.textContent = values;
  list.addEventListener("click", function () {
    let removeList = ref(database, `toDoLists/${ids}`);
    remove(removeList);
  });
  toDoList.append(list);
}
