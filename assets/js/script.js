// Typewriter effect when the block becomes visible
function runTypedAnimation(block) {
  const fullText = block.getAttribute("data-fulltext");
  block.textContent = "";
  let i = 0;

  const typeChar = () => {
    if (i < fullText.length) {
      block.textContent += fullText[i];
      i++;
      setTimeout(typeChar, 25);
    }
  };

  typeChar();
}

// -- On page load --
document.addEventListener("DOMContentLoaded", () => {
  const typedBlocks = document.querySelectorAll(".typed-code");

  // Store original text in a custom attribute and clear the content
  typedBlocks.forEach((block) => {
    block.setAttribute("data-fulltext", block.textContent.trim());
    block.textContent = "";
  });

  // Observer triggers typewriter effect when block enters viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("typed-done")) {
          entry.target.classList.add("typed-done");
          runTypedAnimation(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  typedBlocks.forEach((block) => observer.observe(block));
});

// --- Contact form validation and feedback modal ---
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const modalBody = document.getElementById("feedbackModalBody");
  const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));

  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    message.value.trim() === ""
  ) {
    modalBody.innerHTML = `<p class="text-danger fw-bold">Please complete all fields.</p>`;
    modal.show();
    return;
  }

  modalBody.innerHTML = `
    <p><strong>Name:</strong> ${name.value}</p>
    <p><strong>Email:</strong> ${email.value}</p>
    <p><strong>Message:</strong> ${message.value}</p>
    <p class="text-success fw-bold mt-3">Message sent successfully!</p>
  `;
  modal.show();
  this.reset();
});
// Desde aquí voy a escribir en español para una mejor visualizacion de los comentarios
(() => {
  // Referencias a los elementos
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskCounter = document.getElementById("taskCounter");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const currentDate = document.getElementById("currentDate");

  // Mostrar fecha actual
  currentDate.textContent = new Date().toLocaleDateString();

  // Cargar tareas desde localStorage o usar las del HTML inicial
  let tasks = JSON.parse(localStorage.getItem("bootcampTasks")) || [];

  if (tasks.length === 0) {
    document.querySelectorAll("#taskList li").forEach((li, i) => {
      const checkbox = li.querySelector("input[type='checkbox']");
      const label = li.querySelector("label");
      tasks.push({
        id: Date.now() + i,
        text: label.textContent.trim(),
        completed: checkbox.checked
      });
    });
    localStorage.setItem("bootcampTasks", JSON.stringify(tasks));
  }

  // Renderizar lista de tareas
  const updateList = () => {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = `<li class="list-group-item text-center text-muted">No tasks yet</li>`;
    } else {
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="task-${task.id}" ${task.completed ? "checked" : ""}>
            <label class="form-check-label ${task.completed ? "text-decoration-line-through text-muted" : ""}" for="task-${task.id}">
              ${task.text}
            </label>
          </div>
          <button class="btn btn-sm btn-outline-danger" data-id="${task.id}">
            <i class="bi bi-trash"></i>
          </button>
        `;
        taskList.appendChild(li);
      });
    }

    // Actualizar contador y guardar
    taskCounter.textContent = `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`;
    attachEvents();
    localStorage.setItem("bootcampTasks", JSON.stringify(tasks));
  };

  // Agregar nueva tarea
  const addTask = () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.unshift({ id: Date.now(), text, completed: false });
    taskInput.value = "";
    updateList();
  };

  // Eventos de eliminar y marcar tarea
  const attachEvents = () => {
    taskList.querySelectorAll(".form-check-input").forEach((box) => {
      box.addEventListener("change", (e) => {
        const id = +e.target.id.split("-")[1];
        tasks = tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t);
        updateList();
      });
    });

    taskList.querySelectorAll(".btn-outline-danger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = +e.currentTarget.dataset.id;
        tasks = tasks.filter((t) => t.id !== id);
        updateList();
      });
    });
  };

  // Eventos para agregar tarea con botón o Enter
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Render inicial
  updateList();
})();

// --- Roadmap Progress ---
(() => {
  // Elementos del DOM necesarios
  const list = document.getElementById("roadmapList");
  const input = document.getElementById("newRoadmapTask");
  const btn = document.getElementById("addRoadmapBtn");
  const bar = document.getElementById("roadmapProgress");

  // Función para actualizar el progreso según milestones completados
  const updateProgress = () => {
    const total = list.children.length;
    const done = [...list.children].filter((li) => li.querySelector(".bg-success")).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    bar.style.width = `${percent}%`;
  };

  // Alterna el estado del badge entre pendiente y completado
  const toggleStatus = (badge) => {
    badge.classList.toggle("bg-success");
    badge.classList.toggle("bg-secondary");
    const icon = badge.querySelector("i");
    icon.className = badge.classList.contains("bg-success") ? "bi bi-check" : "bi bi-clock";
    updateProgress();
  };

  // Agrega un nuevo item a la lista de roadmap
  const addItem = () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${text}</span>
      <span class="badge bg-secondary rounded-pill status-toggle" role="button"><i class="bi bi-clock"></i></span>
    `;
    list.appendChild(li);
    input.value = "";

    // Activar toggle para el nuevo ítem
    li.querySelector(".status-toggle").addEventListener("click", function () {
      toggleStatus(this);
    });

    updateProgress();
  };

  // Eventos para agregar milestone con botón o Enter
  btn.addEventListener("click", addItem);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addItem();
  });

  // Habilitar el toggle en ítems existentes
  list.querySelectorAll(".status-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      toggleStatus(this);
    });
  });

  // Inicializar progreso
  updateProgress();
})();
