const todoInp = document.querySelector("#todo-input");
const todoBtn = document.querySelector("#todo-button");
const todoUl = document.querySelector("#todo-ul");
const tot = document.querySelector("#total");

/* let total = 0; */
let completed = 0;
let list = JSON.parse(localStorage.getItem("LIST")) || [];

// Add-btn Events:
todoBtn.onclick = () => {
  if (!todoInp.value) {
    alert("Please write something");
  } else if (list.includes(todoInp.value)) {
    return; //* That means "do nothing".
  } else {
    list.push(todoInp.value);
    /* total++; */
    localStorage.setItem("LIST", JSON.stringify(list));
    showList();
    todoInp.value = "";
  }
};

const showList = () => {
  todoUl.textContent = "";
  list.forEach((a) => {
    todoUl.innerHTML += `<li class="todo-item">
        <i class="fa-solid fa-check fa-lg"></i>
        <p>${a}</p>
        <i class="fa-solid fa-trash-can fa-lg"></i>
        </li>`;
  });
  tot.textContent = list.length;

  todoInp.focus();

  // Check-btn Events:
  checkBtn();

  // Trash-btn Events:
  delBtn();
};

const checkBtn = () => {
  // 1.way:
  document.querySelectorAll(".fa-check").forEach((a) => {
    a.onclick = () => {
      /* a.parentElement.classList.toggle('checked'); */ // toggle: adds, if there is not; removes, if there is.
      if (a.parentElement.classList.contains("checked")) {
        // className.includes()
        a.parentElement.classList.remove("checked");
        completed--;
        document.querySelector("#completed").textContent = completed;
      } else {
        a.parentElement.classList.add("checked"); // className="checked" changes all. But classList.add('checked') adds.
        completed++;
        document.querySelector("#completed").textContent = completed;
      }
    };
  });

  // 2. way:
  /* document.querySelector("#todo-ul").onclick = (a) => {
    if (a.target.classList.contains("fa-check")) {   // target: means the click-point.
      if (a.target.parentElement.classList.contains("checked")) {
        a.target.parentElement.classList.remove("checked");
        completed -= 1;
        document.querySelector("#completed").textContent = completed;
      } else {
        a.target.parentElement.classList.add("checked");
        completed += 1;
        document.querySelector("#completed").textContent = completed;
      }
    }
  }; */
};

const delBtn = () => {
  document.querySelectorAll(".fa-trash-can").forEach((a) => {
    a.onclick = () => {
      // delete from the screen:
      a.parentElement.remove(); // a.closest("[class name]").remove(): the closest element with the class name .remove()

      // delete from the list:
      list = list.filter(
        (b) => b != a.closest(".todo-item").querySelector("p").textContent
      ); // a.closest(".todo-item").querySelector("p")   SAME   a.previousElementSibling
      localStorage.setItem("LIST", JSON.stringify(list));

      /* total--; */
      tot.textContent = list.length;

      if (completed > 0 && a.parentElement.classList.contains("checked")) {
        completed--;
        document.querySelector("#completed").textContent = completed;
      }
    };
  });
};

todoInp.onkeyup = (a) => {
  if (a.keyCode === 13) todoBtn.click();
};

showList();
