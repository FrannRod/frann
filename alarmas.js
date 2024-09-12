const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const totalDurationLabel = document.getElementById('total-duration');
const activityInputs = document.querySelectorAll('#activity-table input[type="number"]');
const activityStartTimes = document.querySelectorAll('#activity-table td[id^="start-"]');

function calculateTotalDuration() {
  let totalMinutes = 0;
  activityInputs.forEach(input => {
    totalMinutes += parseInt(input.value, 10);
  });
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  totalDurationLabel.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return totalMinutes;
}

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
  calculateTotalDuration();
}

function updateStartTimeFromEndTime() {
  let endTime = endTimeInput.value.split(':');
  let endHour = parseInt(endTime[0], 10);
  let endMinute = parseInt(endTime[1], 10);
  let endTimeDate = new Date(0, 0, 0, endHour, endMinute, 0);

  let totalDurationMinutes = calculateTotalDuration();
  endTimeDate.setMinutes(endTimeDate.getMinutes() - totalDurationMinutes);

  let newStartHour = endTimeDate.getHours().toString().padStart(2, '0');
  let newStartMinute = endTimeDate.getMinutes().toString().padStart(2, '0');
  startTimeInput.value = `${newStartHour}:${newStartMinute}`;
  calculateTimes();
}

activityInputs.forEach(input => {
  input.addEventListener('input', calculateTimes);
});

startTimeInput.addEventListener('input', calculateTimes);
endTimeInput.addEventListener('input', updateStartTimeFromEndTime);

// Inicialización
calculateTimes();
