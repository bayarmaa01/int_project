async function addTodo() {
    const input = document.getElementById('todoInput');
    const task = input.value;
    await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    });
    input.value = "";
    loadTodos();
}

async function loadTodos() {
    const res = await fetch("http://localhost:3000/todos");
    const todos = await res.json();
    const list = document.getElementById('todoList');
    list.innerHTML = "";
    todos.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t.task;
        list.appendChild(li);
    });
}

loadTodos();
