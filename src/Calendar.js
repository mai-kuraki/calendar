/**
 * Created by zhengliuyang on 2018/7/16.
 */
import $ from 'jquery';
class Calendar {
    constructor() {
        this.curDate = new Date();
        this.mode = 'month';
        this.curWeekDay = this.curDate.getDate();
        this.curWeek = this.curDate.getDay();
        this.initCalendar(this.curDate);
    }

    setMode(mode) {
        this.mode = mode;
        this.initCalendar();
    }

    todayPosition() {
        this.curDate = new Date();
        this.initCalendar();
    }

    runNian(year) {
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
            return true;
        }
        else {
            return false;
        }
    }

    formatNumber(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    }

    getFirstDay(year, month) {
        let allDay = 0, y = year - 1, i = 1;
        allDay = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
        for (; i < month; i++) {
            switch (i) {
                case 1:
                    allDay += 31;
                    break;
                case 2:
                    if (this.runNian(year)) {
                        allDay += 29;
                    }
                    else {
                        allDay += 28;
                    }
                    break;
                case 3:
                    allDay += 31;
                    break;
                case 4:
                    allDay += 30;
                    break;
                case 5:
                    allDay += 31;
                    break;
                case 6:
                    allDay += 30;
                    break;
                case 7:
                    allDay += 31;
                    break;
                case 8:
                    allDay += 31;
                    break;
                case 9:
                    allDay += 30;
                    break;
                case 10:
                    allDay += 31;
                    break;
                case 11:
                    allDay += 30;
                    break;
                case 12:
                    allDay += 31;
                    break;
            }
        }
        return allDay % 7;
    }

    getMonthDay(fullYear, month) {
        let monthDay = 30;
        switch (month) {
            case 1:
                monthDay = 31;
                break;
            case 2:
                if (this.runNian(fullYear)) {
                    monthDay = 29;
                }
                else {
                    monthDay = 28;
                }
                break;
            case 3:
                monthDay = 31;
                break;
            case 4:
                monthDay = 30;
                break;
            case 5:
                monthDay = 31;
                break;
            case 6:
                monthDay = 30;
                break;
            case 7:
                monthDay = 31;
                break;
            case 8:
                monthDay = 31;
                break;
            case 9:
                monthDay = 30;
                break;
            case 10:
                monthDay = 31;
                break;
            case 11:
                monthDay = 30;
                break;
            case 12:
                monthDay = 31;
                break;
        }
        return monthDay;
    }

    initCalendar() {
        let _date = this.curDate;
        let fullYear = _date.getFullYear();
        let month = _date.getMonth() + 1;
        let today = new Date().getDate();
        let todayFullYear = new Date().getFullYear();
        let todayMonth = new Date().getMonth() + 1;
        let firstDay = this.getFirstDay(fullYear, month);
        let nextMonthFirstDay = this.getFirstDay(fullYear, month + 1);
        let monthDay = this.getMonthDay(fullYear, month);
        let lastFullYear = fullYear;
        let lastMonth = month - 1;
        if (lastMonth < 1) {
            lastMonth = 12;
            lastFullYear -= 1;
        }
        let lastMonthDay = this.getMonthDay(lastFullYear, lastMonth);
        let lastMonthData = [];
        for (let i = 0; i < firstDay; i++) {
            lastMonthData.unshift(lastMonthDay - i);
        }
        let nextMonthData = [];
        if (nextMonthFirstDay > 0) {
            for (let i = 0; i < (7 - nextMonthFirstDay); i++) {
                nextMonthData.push(i + 1);
            }
        }
        let monthData = [];
        for (let i = 0; i < monthDay; i++) {
            monthData.push(i + 1);
        }

        if(this.mode == 'month') {
            let tpl = ``;
            lastMonthData.map((data, k) => {
                tpl += `<div class="day-wrap">
                <div class="day day-disable">${data}</div>
            </div>`;
            });
            monthData.map((data, k) => {
                tpl += `<div class="day-wrap">
                    <div class="day ${(data == today && fullYear == todayFullYear && month == todayMonth) ? 'day-today' : ''}">${data}</div>
                </div>`;
            });
            nextMonthData.map((data, k) => {
                tpl += `<div class="day-wrap">
                <div class="day day-disable">${data}</div>
            </div>`;
            });
            $('.days').html(tpl);
            $('.curMonth').text(`${fullYear}年${this.formatNumber(month)}月`);
        }else {
            let weekData = [];
            let startDay = this.curWeekDay - this.curWeek;
            let hasLastMonth = false;
            let hasNextMonth = false;
            for(let i = 0; i < 7; i++)  {
                let day = startDay + i;
                if(day < 1) {
                    hasLastMonth = true;
                    day = lastMonthDay + day;
                }else if(day > monthDay) {
                    hasNextMonth = true;
                    day = day - monthDay;
                }
                weekData.push(day);
            }
            let tpl = ``;
            weekData.map((data, k) => {
                tpl += `<div class="day-wrap">
                    <div class="day ${(data == today && fullYear == todayFullYear && month == todayMonth) ? 'day-today' : ''}">${data}</div>
                </div>`;
            });
            $('.days').html(tpl);
            $('.curMonth').text(`${fullYear}年${hasLastMonth?this.formatNumber(month - 1) + '-':''}${this.formatNumber(month)}${hasNextMonth?'-'+this.formatNumber(month + 1):''}月`);
        }

    }

    // initWeekCalendar() {
    //     let _date = new Date();
    //     let fullYear = _date.getFullYear();
    //     let month = _date.getMonth() + 1;
    //     let curDay = _date.getDay();
    //     let curDate = _date.getDate();
    //     let today = new Date().getDate();
    //     let todayFullYear = new Date().getFullYear();
    //     let todayMonth = new Date().getMonth() + 1;
    //     let weekItem = [];
    //     for(let i = curDay; i > 0; i--) {
    //         weekItem.push(curDate - i);
    //     }
    //     for(let i = 0; i < (7 - curDay); i++) {
    //         weekItem.push(i + curDate)
    //     }
    //     this.setWeek(weekItem);
    //     let tpl = ``;
    //     weekItem.map((data, k) => {
    //         tpl += `<div class="day-wrap">
    //                 <div class="day ${(data == today && fullYear == todayFullYear && month == todayMonth) ? 'day-today' : ''}">${data}</div>
    //             </div>`;
    //     });
    //     $('.days').html(tpl);
    //     $('.curMonth').text(`${fullYear}年${this.formatNumber(month)}月`);
    // }

    nextMonth() {
        let curFullYear = this.curDate.getFullYear();
        let curMonth = this.curDate.getMonth();
        if (curMonth < 11) {
            curMonth += 2;
        } else {
            curMonth = 1;
            curFullYear += 1;
        }
        this.curDate = new Date(`${curFullYear}-${curMonth}`);
        this.initCalendar();
    }

    preMonth() {
        let curFullYear = this.curDate.getFullYear();
        let curMonth = this.curDate.getMonth();
        if (curMonth > 0) {
        } else {
            curMonth = 12;
            curFullYear -= 1;
        }
        this.curDate = new Date(`${curFullYear}-${curMonth}`);
        this.initCalendar();
    }

    nextWeek() {
        this.curWeekDay = this.curWeekDay + 7;
        let _date = this.curDate;
        let fullYear = _date.getFullYear();
        let month = _date.getMonth() + 1;
        let monthDay = this.getMonthDay(fullYear, month);
        if(this.curWeekDay > monthDay) {
            this.nextMonth();
            this.curWeekDay = this.curWeekDay - monthDay;
        }else if(this.curWeekDay == monthDay) {
            this.curWeekDay = monthDay;
        }
        this.initCalendar();
    }

    preWeek() {
        this.curWeekDay = this.curWeekDay - 7;
        let _date = this.curDate;
        let fullYear = _date.getFullYear();
        let month = _date.getMonth() + 1;
        let monthDay = this.getMonthDay(fullYear, month);
        if(this.curWeekDay < 1) {
            month -= 1;
            if(month < 1) {
                fullYear -= 1;
                month = 12;
            }
            let lasMonthDay = this.getMonthDay(fullYear, month);
            this.preMonth();
            this.curWeekDay = lasMonthDay + this.curWeekDay;
        }else if(this.curWeekDay == monthDay) {
            this.curWeekDay = monthDay;
        }
        this.initCalendar();
    }

    // nextWeek() {
    //     let newWeek = [];
    //     let _date = new Date();
    //     let fullYear = _date.getFullYear();
    //     let month = _date.getMonth() + 1;
    //     let today = new Date().getDate();
    //     let todayFullYear = new Date().getFullYear();
    //     let todayMonth = new Date().getMonth() + 1;
    //     let monthDay = this.getMonthDay(fullYear, month);
    //     let hasNextMonth =false;
    //     weekData.map((data) => {
    //         let d = data + 7;
    //         if(d > monthDay) {
    //             d = d - monthDay;
    //             hasNextMonth = true;
    //         }
    //         newWeek.push(d);
    //     });
    //     weekData = newWeek;
    //     let tpl = ``;
    //     newWeek.map((data, k) => {
    //         tpl += `<div class="day-wrap">
    //                 <div class="day ${(data == today && fullYear == todayFullYear && month == todayMonth) ? 'day-today' : ''}">${data}</div>
    //             </div>`;
    //     });
    //     $('.days').html(tpl);
    //     if(hasNextMonth) {
    //         $('.curMonth').text(`${fullYear}年${this.formatNumber(month)}-${this.formatNumber(month + 1)}月`)
    //     }else {
    //         $('.curMonth').text(`${fullYear}年${this.formatNumber(month)}月`);
    //     }
    // }
    //
    // preWeek() {
    //     let newWeek = [];
    //     let _date = new Date();
    //     let fullYear = _date.getFullYear();
    //     let month = _date.getMonth() + 1;
    //     let today = new Date().getDate();
    //     let todayFullYear = new Date().getFullYear();
    //     let todayMonth = new Date().getMonth() + 1;
    //     weekData.map((data) => {
    //         newWeek.push(data - 7);
    //     });
    //     weekData = newWeek;
    //     let tpl = ``;
    //     newWeek.map((data, k) => {
    //         tpl += `<div class="day-wrap">
    //                 <div class="day ${(data == today && fullYear == todayFullYear && month == todayMonth) ? 'day-today' : ''}">${data}</div>
    //             </div>`;
    //     });
    //     $('.days').html(tpl);
    //     $('.curMonth').text(`${fullYear}年${this.formatNumber(month)}月`)
    // }
}

let calendar = new Calendar();
$('.next').click(() => {
    if(calendar.mode == 'month') {
        calendar.nextMonth();
    }else {
        calendar.nextWeek();
    }
});
$('.pre').click(() => {
    if(calendar.mode == 'month') {
        calendar.preMonth();
    }else {
        calendar.preWeek();
    }
});
$('.today').click(() => {
    calendar.todayPosition();
});
$('.mode-week').click((e) => {
    $('.mode-active').removeClass('mode-active');
    $(e.target).addClass('mode-active');
    calendar.setMode('week');
});
$('.mode-month').click((e) => {
    $('.mode-active').removeClass('mode-active');
    $(e.target).addClass('mode-active');
    calendar.setMode('month');
});
