const express = require('express');
const app = express();
const port = 5000;

// Traiter le JSON
app.use(express.json());

// Route principale
app.get('/', (req, res) => {
    res.send({ "message": "Bienvenue sur mon API!" });
});

let tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true }
];

// Création de tâche
app.post("/tasks", (req, res) => {
    const { title, completed } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTask = { id: tasks.length + 1, title, completed: completed || false };
    tasks.push(newTask);

    res.status(201).json(newTask);
});

// Récupération des tâches
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Récupérer une tâche par ID
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
});

// Mettre à jour une tâche
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { title, completed } = req.body;

    if (title) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});

// Supprimer une tâche
app.delete("/tasks/:id", (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});