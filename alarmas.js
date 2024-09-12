$(document).ready(function () {
  const $startTimeInput = $('#start-time');
  const $endTimeInput = $('#end-time');
  const $totalDurationLabel = $('#total-duration');
  const $activityInputs = $('#activity-table input[type="number"]');
  const $activityStartTimes = $('#activity-table td[id^="start-"]');

  // Función para asignar valores iniciales programáticamente
  function setInitialTimes() {
    $startTimeInput.val("07:00");  // Hora de inicio por defecto
    $endTimeInput.val("09:30");    // Hora de fin por defecto
    calculateStartTimeFromEnd();   // Calcular el inicio basado en la hora de fin
    calculateTimesFromStart();     // Recalcular inicio al iniciar
  }

  // Función para calcular la duración total de las actividades
  function calculateTotalDuration() {
    let totalMinutes = 0;
    $activityInputs.each(function () {
      const value = parseInt($(this).val(), 10);
      if (!isNaN(value)) {
        totalMinutes += value;
      }
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    $totalDurationLabel.text(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    return totalMinutes;
  }

  // Función para calcular los tiempos de inicio de cada actividad desde la hora de inicio
  function calculateTimesFromStart() {
    const startTime = $startTimeInput.val().split(':');
    let startHour = parseInt(startTime[0], 10);
    let startMinute = parseInt(startTime[1], 10);
    let currentTime = new Date(0, 0, 0, startHour, startMinute, 0);

    $activityInputs.each(function (index) {
      const duration = parseInt($(this).val(), 10);
      const $activityStart = $activityStartTimes.eq(index);
      if (!isNaN(duration)) {
        $activityStart.text(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        currentTime.setMinutes(currentTime.getMinutes() + duration);
      } else {
        $activityStart.text('NaN');
      }
    });

    $endTimeInput.val(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    calculateTotalDuration();
  }

  // Función para calcular la hora de inicio en base a la hora de fin y la duración total
  function calculateStartTimeFromEnd() {
    const endTime = $endTimeInput.val().split(':');
    let endHour = parseInt(endTime[0], 10);
    let endMinute = parseInt(endTime[1], 10);
    let endTimeDate = new Date(0, 0, 0, endHour, endMinute, 0);

    const totalDurationMinutes = calculateTotalDuration();
    endTimeDate.setMinutes(endTimeDate.getMinutes() - totalDurationMinutes);

    const newStartHour = endTimeDate.getHours().toString().padStart(2, '0');
    const newStartMinute = endTimeDate.getMinutes().toString().padStart(2, '0');
    $startTimeInput.val(`${newStartHour}:${newStartMinute}`);

    calculateTimesFromStart();
  }

  // Asignar eventos a los inputs de actividad con jQuery
  $activityInputs.on('input change', function () {
    calculateStartTimeFromEnd();
  });

  // Manejo específico para dispositivos móviles para asegurarnos de capturar el cambio de hora correctamente
  $startTimeInput.on('input change blur focusout', function () {
    calculateTimesFromStart();
  });

  $endTimeInput.on('input change blur focusout', function () {
    calculateStartTimeFromEnd();
  });

  // Asignar eventos a los botones de eliminación (tachitos) con jQuery
  $('.delete-btn').on('click', function () {
    const targetId = $(this).data('target');
    const $input = $(`#${targetId}`);
    if ($input.length) {
      $input.val(0);  // Poner la duración en 0
      calculateStartTimeFromEnd();  // Recalcular los tiempos
    }
  });

  // Inicialización
  setInitialTimes();  // Asignar los valores iniciales a los inputs
});
