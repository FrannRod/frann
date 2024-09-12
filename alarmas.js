const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const totalDurationLabel = document.getElementById('total-duration');
const activityInputs = document.querySelectorAll('#activity-table input[type="number"]');
const activityStartTimes = document.querySelectorAll('#activity-table td[id^="start-"]');

// Asigna valores iniciales programáticamente
function setInitialTimes() {
  startTimeInput.value = "07:00";  // Hora de inicio por defecto
  endTimeInput.value = "09:30";    // Hora de fin por defecto
  calculateStartTimeFromEnd();     // Recalcular hora de inicio basado en la hora de fin
}

// Función para calcular la duración total de las actividades
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

// Función para calcular los tiempos de inicio de cada actividad desde la hora de inicio
function calculateTimesFromStart() {
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

// Función para calcular la hora de inicio en base a la hora de fin y la duración total
function calculateStartTimeFromEnd() {
  let endTime = endTimeInput.value.split(':');
  let endHour = parseInt(endTime[0], 10);
  let endMinute = parseInt(endTime[1], 10);
  let endTimeDate = new Date(0, 0, 0, endHour, endMinute, 0);

  let totalDurationMinutes = calculateTotalDuration();
  endTimeDate.setMinutes(endTimeDate.getMinutes() - totalDurationMinutes);

  let newStartHour = endTimeDate.getHours().toString().padStart(2, '0');
  let newStartMinute = endTimeDate.getMinutes().toString().padStart(2, '0');
  startTimeInput.value = `${newStartHour}:${newStartMinute}`;

  calculateTimesFromStart();
}

// Asignar eventos a los inputs
activityInputs.forEach(input => {
  input.addEventListener('input', calculateStartTimeFromEnd);
});

startTimeInput.addEventListener('input', calculateTimesFromStart);
endTimeInput.addEventListener('input', calculateStartTimeFromEnd);

// Inicialización
setInitialTimes();  // Asignar los valores iniciales a los inputs
