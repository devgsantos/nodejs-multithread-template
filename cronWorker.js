const cron = require('node-cron');

// Semáforo para controlar a execução exclusiva do cronjob
let isCronJobRunning = false;
const workerPID = process.pid;


// Função para executar o cronjob
const runCronJob = (taskName) => {
  console.log(`Função ${taskName} executada no processo filho!, PID: ${workerPID}`);
};

// Comunique-se com a thread principal
process.on('message', (message) => {
  if (message === 'startCronJob' && !isCronJobRunning) {
    isCronJobRunning = true;

    // Cron Job no processo filho
    cron.schedule('*/10 * * * * *', () => runCronJob('1'));
    cron.schedule('*/20 * * * * *', () => runCronJob('2'));
    cron.schedule('*/30 * * * * *', () => runCronJob('3'));
    cron.schedule('*/40 * * * * *', () => runCronJob('4'));
    cron.schedule('*/50 * * * * *', () => {
      runCronJob('5');
      isCronJobRunning = false; // Sinalize o término do cronjob
    });
  }
});
