const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const activityInputs = document.querySelectorAll('#activity-table input[type="number"]');
const activityStartTimes = document.querySelectorAll('#activity-table td[id^="start-"]');

function calculateTimes() {
  let startTime = startTimeInput.value.split(':');
  let startHour = parseInt(startTime[0], 10);
  let startMinute = parseInt(startTime[1], 10);
  let currentTime = new Date(0, 0, 0, startHour, startMinute, 0);

  activityInputs.forEach((input, index) => {
    const duration = parseInt(input.value, 10);
    activityStartTimes[index].textContent = currentTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    currentTime.setMinutes(currentTime.getMinutes() + duration);
  });

  endTimeInput.value = currentTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

activityInputs.forEach(input => {
  input.addEventListener('input', calculateTimes);
});

startTimeInput.addEventListener('input', calculateTimes);

// Inicialización
calculateTimes();
