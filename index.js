const express = require('express');
const { fork } = require('child_process');
const app = express();
const port = 5555;
const workerPID = process.pid;


// Inicie o Express na thread principal
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}, PID: ${workerPID}`);
});

// Crie um processo filho para o cron
const worker = fork('./cronWorker.js');

// Envie uma mensagem para iniciar o cronjob
worker.send('startCronJob');
