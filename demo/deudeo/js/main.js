// initialize video.js
var video = videojs('my-video');

//load the marker plugin
video.markers({
  markerStyle: {
     'width':'10px',
     'background-color': 'lightcyan',
     'height': '50%',
     'bottom': '8px'
  },
  markers: [
     {time: 18, text: "Ich bekomme heute Besuch."},
     {time: 25,  text: "Sind sie frisch?"},
     {time: 42, text: "Ich glaube, ich nehme ein Kilo Fleischtomaten."},
     {time: 69, text: "Was kosten die Kirschen?"},
     {time: 86, text: "Nein, das wäre alles."},
     {time: 96, text: "Vielen Dank. Auf Wiedersehen"}
  ]
});

video.on('timeupdate', function (e) {
  var current = video.currentTime();

  if (current < 18.8 ||
    (current > 19.2 && current < 25.8) ||
    (current > 26.2 && current < 42.3) ||
    (current > 42.8 && current < 69) ||
    (current > 69.4 && current < 87) ||
    (current > 87 && current < 96.3) ||
    current >  96.3
    ) flags = [0, 0, 0, 0, 0, 0];

  if (current >= 18.8 && current <= 19.2 && !flags[0]) {
    video.pause();
    quiz2(0, current, 'Ich bekomme heute Besuch');
    flags[0] = 1;
  }

  if (current >= 25.8 && current <= 26.2 && !flags[1]) {
    video.pause();
    quiz(1, current, 'Sind sie frisch');
    flags[1] = 1;
  }

  if (current >= 42.3 && current <= 42.8 && !flags[2]) {
    video.pause();
    quiz(2, current, 'Ich glaube, ich nehme ein Kilo Fleischtomaten');
    flags[2] = 1;
  }

  if (current >= 69 && current <= 69.4 && !flags[3]) {
    video.pause();
    quiz(3, current, 'Was kosten die Kirschen');
    flags[3] = 1;
  }

  if (current >= 87 && current <= 87.4 && !flags[4]) {
    video.pause();
    quiz(4, current, 'Nein, das wäre alles');
    flags[4] = 1;
  }

  if (current >= 96.3 && current <= 96.6 && !flags[5]) {
    video.pause();
    quiz(5, current, 'Vielen Dank. Auf Wiedersehen');
    flags[5] = 1;
  }

});

var try_times = 0;
var flags = [0, 0, 0, 0, 0, 0];
var answers = [0, 0, 0, 0, 0, 0];
var quizModal = $('#quizModal'), quizModal2 = $('#quizModal2');

function quiz(index, current, text) {
  video.pause();
  quizModal.modal('show');

  $('#quizListenAgain').click(function () {
    quizModal.modal('hide');
    flags[index] = 0;
    video.currentTime(current - 3);
    video.play();
  });

  $('#quizSubmit').click(function () {
    $('.quiz-tip').hide();
    if ($(this).text() === 'Weiter') {
      quizModal.modal('hide');
      video.play();
    } else if ($(this).text() === 'Antworten') {
      if ($.trim($('#quizAnswer').val()) === text) {
        answers[index] = 1;
        $('#quizAnswer').prop('disabled', true);
        $('#quizCorrect').show();
        $('#quizSubmit').text('Weiter');
      } else {
        try_times = try_times + 1;
        if (try_times < 3) {
          var chances = try_times === 2 ? '1 Chance' : (3 - try_times) + ' Chancen';
          $('#chances').text(chances);
          $('#quizTryAgian').show();
        } else {
          $('#quizAnswer').prop('disabled', true);
          $('#quizSubmit').prop('disabled', true);
          $('#correctAnswer').text(text);
          $('#quizFail').show();
        }
      }
    }
  });

  $('#quizAnswer').keyup(function (e) {
    $('.quiz-tip').hide();

    if ($.trim($(this).val()) !== '') {
      $('#quizSubmit').prop('disabled', false);

      var key = e.keyCode || e.which;

      if (key === 13) {
        $('#quizSubmit').click();
      }
    }
  });
}

function quiz2(index, current, text) {
  video.pause();
  quizModal2.modal('show');

  $('#quizListenAgain2').click(function () {
    quizModal2.modal('hide');
    flags[index] = 0;
    video.currentTime(current - 3);
    video.play();
  });

  $('#quizSubmit2').click(function () {
    $('.quiz-tip').hide();

    if ($(this).text() === 'Weiter') {
      quizModal2.modal('hide');
      video.play();
    } else if ($(this).text() === 'Antworten') {
      if ($('#quizModal2 input:radio:checked').val() === 'richtig') {
        answers[index] = 1;
        $('input[type=radio]').prop('disabled', true);
        $('#quizCorrect2').show();
        $('#quizSubmit2').text('Weiter');
      } else {
        try_times = try_times + 1;
        if (try_times < 3) {
          var chances = try_times === 2 ? '1 Chance' : (3 - try_times) + ' Chancen';
          $('#chances2').text(chances);
          $('#quizTryAgian2').show();
        } else {
          $('input[type=radio]').prop('disabled', true);
          $('#quizSubmit2').prop('disabled', true);
          $('#quizFail2').show();
        }
      }
    }
  });

  $('input[type=radio]').click(function (e) {
    $('.quiz-tip').hide();

    if ($('#quizModal2 input:radio:checked').val() !== '') {
      $('#quizSubmit2').prop('disabled', false);

      var key = e.keyCode || e.which;

      if (key === 13) {
        $('#quizSubmit2').click();
      }
    }
  });
}

quizModal.on('show.bs.modal', function (e) {
  try_times = 0;


  $('#quizSubmit').off('click');
  $('#quizListenAgain').off('click');
  $('#quizAnswer').off('keyup');

  $('#quizSubmit').text('Antworten');
  $('#quizSubmit').prop('disabled', true);
  $('.quiz-tip').hide();
  $('#quizAnswer').prop('disabled', false);
  $('#quizAnswer').val('');
  setTimeout(function () {
    $('#quizAnswer').focus();
  });
})

quizModal2.on('show.bs.modal', function (e) {
  try_times = 0;


  $('#quizSubmit2').off('click');
  $('#quizListenAgain2').off('click');
  $('#quizAnswer2').off('keyup');

  $('#quizSubmit2').text('Antworten');
  $('#quizSubmit2').prop('disabled', true);
  $('.quiz-tip').hide();

  $('input[type=radio]').prop('disabled', false);
  $('input[type=radio]').prop('checked', false);
})

$('#quizAnswer').focus(function () {
  $('.quiz-tip').hide();
});

$('input[type=radio]').focus(function () {
  $('.quiz-tip').hide();
});

video.on('ended', function (e) {
  $('#endModal').modal('show');

  var score = 0;
  for (var i=0; i<answers.length; i++) {
    if (answers[i] == 1) score++;
  }

  $('.end-answered-number').text(score);
  $('.end-points').text(score * 4);
});
