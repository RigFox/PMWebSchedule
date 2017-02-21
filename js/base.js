var selectDate;

function timeToDays(time) {
    return time / 1000 / 60 / 60 / 24;
}

function getWeekNumber(date) {
    var weekNumber;
    var yearStart;
    var ts;

    ts = new Date(date);

    ts.setHours(0, 0, 0);
    ts.setDate(ts.getDate() + 4 - (ts.getDay() || 7));

    yearStart = new Date(ts.getFullYear(), 8, 1);

    weekNumber = Math.floor((timeToDays(ts - yearStart) + 1) / 7);

    return weekNumber + 1;
}

function show(date) {
    var weekOfYear = getWeekNumber(date) + 52; // Адский костыль
    var dayOfWeek = date.getDay() - 1;

    var prepSchedule = [];

    var el = schedule.schedule[dayOfWeek];

    el.forEach(function (lesson) {
        if ((lesson.startWeek <= weekOfYear) && (lesson.endWeek >= weekOfYear)) {
            prepSchedule[lesson.num - 1] = lesson;
        }
    });

    $('#content').find('>.lesson').each(function (index, el) {
        var time = $(el).find('td')[0];
        var title = $(el).find('td')[1];
        var week = $(el).find('td')[2];

        var titleText;
        var weekText;

        var scheduleObj = prepSchedule[index];

        if (scheduleObj != undefined) {
            var subject = schedule.subjects[scheduleObj.subject_id];

            titleText = subject.name;
            titleText += "<br/>" + subject.teacher;

            weekText = "("+scheduleObj.startWeek+"-"+scheduleObj.endWeek+")";
            weekText += "<br/>"+subject.classroom;
        } else {
            titleText = '';
            weekText = '';
        }

        var timeText;

        switch (index) {
            case 0:
                timeText = "8:00-<br/>9:35";
                break;
            case 1:
                timeText = "9:45-<br/>11:20";
                break;
            case 2:
                timeText = "11:30-<br/>13:05";
                break;
            case 3:
                timeText = "13:30-<br/>15:05";
                break;
            case 4:
                timeText = "15:15-<br/>16:50";
                break;
        }

        time.innerHTML = timeText;
        title.innerHTML = titleText;
        week.innerHTML = weekText;
    });

    var dayOfWeekText;

    switch (dayOfWeek) {
        case 0:
            dayOfWeekText = "Понедельник"; break;
        case 1:
            dayOfWeekText = "Вторник"; break;
        case 2:
            dayOfWeekText = "Среда"; break;
        case 3:
            dayOfWeekText = "Четверг"; break;
        case 4:
            dayOfWeekText = "Пятница"; break;
        case 5:
            dayOfWeekText = "Суббота"; break;
    }

    $('#dayOfWeek').text(dayOfWeekText);
    $('#weekOfYear').text(weekOfYear+" неделя");
}

function today() {
    selectDate = new Date();
    if (selectDate.getHours() >= 16) {
        nextDay()
    } else {
       if (selectDate.getDay() == 0) { //Sunday
            selectDate = new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate()+1);
        }
        show(selectDate); 
    }
}

function backDay() {
    selectDate = new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate()-1);
    if (selectDate.getDay() == 0) { //Sunday
        selectDate = new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate()-1);
    }
    show(selectDate);
}

function nextDay() {
    selectDate = new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate()+1);
    if (selectDate.getDay() == 0) { //Sunday
        selectDate = new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate()+1);
    }
    show(selectDate);
}

today();
