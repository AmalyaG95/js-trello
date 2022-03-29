const addTaskModalBtn = document.querySelector("#addTaskModalBtn");
const addSectionModalBtn = document.querySelector("#addSectionModalBtn");

const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close");
const addSectionForm = document.querySelector("#addSectionForm");
const addTaskForm = document.querySelector("#addTaskForm");
const firstAddTaskForm = document.querySelector("#firstAddTaskForm");
const addSectionBtn = document.querySelector("#addSectionBtn");
const addTaskBtn = document.querySelector("#addTaskBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const okBtn = document.querySelector("#okBtn");
const sectionName = document.querySelector("#sectionName");
const sectionColor = document.querySelector("#sectionColor");
const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#desc");

const board = document.querySelector("#board");
const sectionBodies = [...document.querySelectorAll(".body")];

const sections =
    localStorage.getItem("sections") !== null
        ? JSON.parse(localStorage.getItem("sections"))
        : [
              //   {
              //       name: "TO DO",
              //       color: "#ffffff",
              //   },
          ];
let section = {
    name: "",
    color: "#ffffff",
};
const tasks =
    localStorage.getItem("tasks") != null
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
let task = {
    section: undefined,
    title: "",
    desc: "",
};

const displaySection = (section) => {
    const sectionContainer = document.createElement("div");
    const sectionName = document.createElement("h2");
    const sectionBody = document.createElement("div");

    sectionContainer.className = "section";
    sectionBody.className = "body";
    sectionName.className = "sectionName";

    board.appendChild(sectionContainer);
    sectionContainer.appendChild(sectionName);
    sectionContainer.appendChild(sectionBody);

    sectionName.innerText = `${section.name}`;
    sectionBody.style.background = section.color;
};

const displayTask = (task) => {
    const taskEl = document.createElement("div");
    const title = document.createElement("h3");
    const desc = document.createElement("p");

    taskEl.className = "task";
    taskEl.id = `task-${Math.floor(Math.random() * 26464531564)}`;
    taskEl.draggable = true;
    const sec = [...document.querySelectorAll(".body")].find((section) => {
        return section.parentElement.firstChild.innerText === task.section;
    });

    if (sec) {
        sec.appendChild(taskEl);
    }

    taskEl.appendChild(title);
    taskEl.appendChild(desc);
    title.innerText = `${task.title}`;
    desc.innerText = `${task.desc}`;

    [...document.querySelectorAll(".body")].forEach((section) => {
        section.addEventListener("dragenter", (e) => {
            e.preventDefault();

            if (e.target.className === "body") {
                e.target.classList.add("dragOver");
            }
        });

        section.addEventListener("dragover", (e) => {
            e.preventDefault();
            // e.target.classList.add("dragOver");
            if (e.target.className === "body") {
                e.target.classList.add("dragOver");
            }
        });

        section.addEventListener("dragleave", (e) => {
            e.target.classList.remove("dragOver");
        });

        section.addEventListener("drop", (e) => {
            if (e.target.className === "body") {
                const data = e.dataTransfer.getData("text");
                e.target.appendChild(document.getElementById(data));
            }
            e.target.classList.remove("dragOver");
        });
    });

    taskEl.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);

        setTimeout(() => {
            e.target.style.opacity = 0.5;
        }, 0);
    });

    taskEl.addEventListener("dragend", (e) => {
        e.target.style.opacity = 1;

        task.section =
            e.target.parentElement?.parentElement?.firstChild.innerText;

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
};

const openModal = (e) => {
    modal.style.display = "block";
    // debugger;
    if (e.target.id === "addSectionModalBtn") {
        sectionName.focus();
        addTaskForm.style.display = "none";
        firstAddSectionForm.style.display = "none";
        addSectionForm.style.display = "flex";
    } else if (e.target.id === "addTaskModalBtn" && sections.length !== 0) {
        taskTitle.focus();
        addSectionForm.style.display = "none";
        firstAddSectionForm.style.display = "none";
        addTaskForm.style.display = "flex";
    } else if (e.target.id === "addTaskModalBtn" && sections.length === 0) {
        addSectionForm.style.display = "none";
        addTaskForm.style.display = "none";
        firstAddSectionForm.style.display = "flex";
    }
};

const closeModal = () => {
    modal.style.display = "none";
    addSectionForm.style.display = "flex";
    addTaskForm.style.display = "flex";
    firstAddSectionForm.style.display = "flex";
};

const preventSubmitOnEnter = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
};

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

addSectionModalBtn.addEventListener("click", openModal);
addTaskModalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
sectionName.addEventListener("change", (e) => {
    section = {
        ...section,
        name: e.target.value.trim().toUpperCase(),
    };
});
sectionName.addEventListener("keypress", preventSubmitOnEnter);
sectionColor.addEventListener("change", (e) => {
    section = {
        ...section,
        color: e.target.value,
    };
});
sectionColor.addEventListener("keypress", preventSubmitOnEnter);
taskTitle.addEventListener("change", (e) => {
    task = {
        ...task,
        title: e.target.value.trim(),
    };
});
taskTitle.addEventListener("keypress", preventSubmitOnEnter);
taskDescription.addEventListener("change", (e) => {
    task = {
        ...task,
        desc: e.target.value.trim(),
    };
});
taskDescription.addEventListener("keypress", preventSubmitOnEnter);
addSectionBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (section.name === "" || section.color === "#000000") return;
    displaySection(section);
    if (!sections.includes(section)) {
        sections.push(section);
        localStorage.setItem("sections", JSON.stringify(sections));
    }
    // debugger;
    [...document.querySelectorAll(".body")].forEach((section) => {
        section.addEventListener("dragenter", (e) => {
            e.preventDefault();
            if (e.target.className === "body") {
                e.target.classList.add("dragOver");
            }
        });

        section.addEventListener("dragover", (e) => {
            e.preventDefault();
            if (e.target.className === "body") {
                e.target.classList.add("dragOver");
            }
        });

        section.addEventListener("dragleave", (e) => {
            e.target.classList.remove("dragOver");
        });

        section.addEventListener("drop", (e) => {
            const data = e.dataTransfer.getData("text");
            e.target.appendChild(document.getElementById(data));
            e.target.classList.remove("dragOver");
        });
    });
    sectionName.value = "";
    sectionColor.value = "#ffffff";
    section = {
        name: "",
        color: "#ffffff",
    };
    modal.style.display = "none";
});

addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (task.title === "" || task.desc === "") return;

    task.section = sections[0].name;

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask(task);
    taskTitle.value = "";
    taskDescription.value = "";
    task = {
        section: undefined,
        title: "",
        desc: "",
    };
    modal.style.display = "none";
});

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
});

okBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
});

//..................................

sections.forEach((section) => {
    displaySection(section);
});

tasks.forEach((task) => {
    displayTask(task);
});
