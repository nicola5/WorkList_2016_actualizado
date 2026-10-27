(() => {
  const storageKey = "worklist.tasks";
  const taskForm = document.querySelector("#task-form");
  const taskInput = document.querySelector("#task-input");
  const taskList = document.querySelector("#task-list");
  const taskCount = document.querySelector("#task-count");
  const taskSummary = document.querySelector("#task-summary");
  const notice = document.querySelector("#notice");
  const emptyState = document.querySelector("#empty-state");
  const clearCompletedButton = document.querySelector("#clear-completed");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  let filter = "all";
  let tasks = loadTasks();

  document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date());

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = taskInput.value.trim();
    if (!title) {
      taskInput.focus();
      return;
    }

    tasks.unshift({
      id: createId(),
      title,
      completed: false
    });
    taskInput.value = "";
    saveTasks();
    render();
    taskInput.focus();
    showNotice("Tarea agregada.");
  });

  taskList.addEventListener("change", (event) => {
    if (!event.target.matches(".task-checkbox")) return;
    const task = tasks.find(({ id }) => id === event.target.dataset.id);
    if (!task) return;
    task.completed = event.target.checked;
    saveTasks();
    render();
    showNotice(task.completed ? "Tarea completada." : "Tarea marcada como pendiente.");
  });

  taskList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete]");
    if (!button) return;
    const task = tasks.find(({ id }) => id === button.dataset.delete);
    tasks = tasks.filter(({ id }) => id !== button.dataset.delete);
    saveTasks();
    render();
    showNotice(task ? `Se eliminó «${task.title}».` : "Tarea eliminada.");
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      render();
    });
  });

  clearCompletedButton.addEventListener("click", () => {
    const completedCount = tasks.filter(({ completed }) => completed).length;
    tasks = tasks.filter(({ completed }) => !completed);
    saveTasks();
    render();
    showNotice(`Se limpiaron ${completedCount} ${completedCount === 1 ? "tarea completada" : "tareas completadas"}.`);
  });

  function loadTasks() {
    try {
      const savedTasks = localStorage.getItem(storageKey);
      if (!savedTasks) return [];
      const parsedTasks = JSON.parse(savedTasks);
      if (!Array.isArray(parsedTasks)) throw new Error("El formato guardado no es válido.");
      return parsedTasks.filter((task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        task.title.trim() &&
        typeof task.completed === "boolean"
      ).map((task) => ({ ...task, title: task.title.trim() }));
    } catch (error) {
      showNotice("No se pudieron leer las tareas guardadas. Si continúas, los cambios nuevos podrían reemplazarlas.", true);
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      return true;
    } catch (error) {
      showNotice("No se pudieron guardar los cambios en este dispositivo.", true);
      return false;
    }
  }

  function render() {
    const completedCount = tasks.filter(({ completed }) => completed).length;
    const activeCount = tasks.length - completedCount;
    const visibleTasks = tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

    taskCount.textContent = activeCount;
    taskCount.setAttribute("aria-label", `${activeCount} ${activeCount === 1 ? "tarea pendiente" : "tareas pendientes"}`);
    taskSummary.textContent = tasks.length === 0
      ? "Todo empieza con una tarea."
      : activeCount === 0
        ? "¡Terminaste todo lo que tenías pendiente!"
        : `${activeCount} ${activeCount === 1 ? "pendiente" : "pendientes"} para completar`;
    document.querySelector("#all-count").textContent = tasks.length;
    document.querySelector("#active-count").textContent = activeCount;
    document.querySelector("#completed-count").textContent = completedCount;
    clearCompletedButton.hidden = completedCount === 0;

    filterButtons.forEach((button) => {
      const isSelected = button.dataset.filter === filter;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });

    taskList.replaceChildren(...visibleTasks.map(createTaskElement));
    emptyState.hidden = visibleTasks.length > 0;
    if (tasks.length === 0) {
      document.querySelector("#empty-title").textContent = "Tu lista está despejada";
      document.querySelector("#empty-copy").textContent = "Agrega una tarea y empieza por algo pequeño.";
    } else if (visibleTasks.length === 0) {
      document.querySelector("#empty-title").textContent = filter === "active" ? "No tienes pendientes" : "Aún no hay tareas completadas";
      document.querySelector("#empty-copy").textContent = filter === "active" ? "¡Todo está al día!" : "Cuando completes una tarea, aparecerá aquí.";
    }
  }

  function createTaskElement(task) {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.className = "task-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.id = task.id;
    checkbox.id = `task-${task.id}`;

    const label = document.createElement("label");
    label.className = "task-title";
    label.htmlFor = checkbox.id;
    label.textContent = task.title;

    const removeButton = document.createElement("button");
    removeButton.className = "delete-button";
    removeButton.type = "button";
    removeButton.dataset.delete = task.id;
    removeButton.setAttribute("aria-label", `Eliminar: ${task.title}`);
    removeButton.innerHTML = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4.5 6h11m-9.5 0 .6 10h5.8l.6-10M8 6V4.5h4V6m-3 3v4m2-4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    item.append(checkbox, label, removeButton);
    return item;
  }

  function createId() {
    return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function showNotice(message, isError = false) {
    notice.textContent = message;
    notice.classList.toggle("is-error", isError);
  }

  render();
})();
