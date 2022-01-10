/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 * remove moment depends
 */

(function (root, factory)
{
    'use strict';

    if (typeof exports === 'object') {
        // CommonJS module
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req)
        {
            return factory();
        });
    } else {
        root.Pikaday = factory();
    }
}(this, function ()
{
    'use strict';

    var hasEventListeners = !!window.addEventListener,
    document = window.document,
    sto = window.setTimeout,

    addEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },

    removeEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },

    fireEvent = function(el, eventName, data)
    {
        var ev;

        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            // todo pikaday ie8 error
            try { el.fireEvent('on' + eventName, ev); } catch (err) {}
        }
    },

    trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    },

    hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },

    addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    },

    removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    },

    isArray = function(obj)
    {
        return (/Array/).test(Object.prototype.toString.call(obj));
    },

    isDate = function(obj)
    {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    },

    isLeapYear = function(year)
    {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },

    getDaysInMonth = function(year, month)
    {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    setToStartOfDay = function(date)
    {
        if (isDate(date)) date.setHours(0,0,0,0);
    },

    nodeContains = function(a, b) {
        return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
    },

    compareDates = function(a,b)
    {
        if (!a || !b) {
            return null;
        }
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        if (a.getTime() > b.getTime()) {
            return 1;
        }

        if (a.getTime() === b.getTime()) {
            return 0;
        }
        return -1;
    },

    extend = function(to, from, overwrite)
    {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },

    adjustCalendar = function(calendar) {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month)/12);
            calendar.month -= 12;
        }
        return calendar;
    },

    /**
     * defaults and localisation
     */
    defaults = {

        // bind the picker to a form field
        field: null,

        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,

        // container tag
        containerTag: 'calendar',

        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',

        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',

        // the initial date to view when first opened
        defaultDate: null,

        // make the `defaultDate` the initial selected value
        setDefaultDate: false,

        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,

        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,

        // number of years either side, or array of upper/lower range
        yearRange: 10,

        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,

        isRTL: false,

        // Additional text to append to the year in the calendar title
        yearSuffix: '',

        // Render the month after year in the calendar title
        showMonthAfterYear: false,

        // how many months are visible
        numberOfMonths: 1,

        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
        // only used for the first display or when a selected date is not visible
        mainCalendar: 'left',

        // time interval select
        timeRange : false,

        // two times join with
        rangeJoiner : ' ',

        // internationalization
        i18n: {
            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        },

        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null,
		
		onFocus: null
    },


    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function(opts, day, abbr)
    {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },

    renderDay = function(d, m, y, isSelected, isToday, isDisabled, isEmpty, isRangeSelected,title)
    {
        if (isEmpty) {
            return '<li class="empty"></li>';
        }
        var arr = [];
        if (isDisabled) {
            arr.push('disabled');
        }
        if (isToday) {
            arr.push('today');
        }
        if (isSelected) {
            arr.push('selected');
        }
        if (isRangeSelected) {
            arr.push('active');
        }
        if (title){
            title = ' title="' + title + '" ';
        }else{
            title ='';
        }
        return '<li ' + title + 'data-day="' + d + '" class="pika-button ' + arr.join(' ') + '" data-pika-year="' +
            y + '" data-pika-month="' + m + '" data-pika-day="' + d + '">' + d + '</li>';
    },

    renderRow = function(days, isRTL)
    {
        return (isRTL ? days.reverse() : days).join('');
    },

    renderToday = function(opts, date)
    {
        if (opts.minDate && opts.minDate < new Date(date)) {
            return '<div class="'+ opts.containerTag +'-current pika-today">Today:<span class="date pika-today">'+ date +'</span></div>';
        }
        return '';
    },

    renderHead = function(opts)
    {
        var i, arr = [], tag = opts.containerTag;
        for (i = 0; i < 7; i++) {
            arr.push('<li>' + renderDayName(opts, i, true) + '</li>');
        }
        return '<ul class="'+ tag +'-weeks">' + (opts.isRTL ? arr.reverse() : arr).join('') + '</ul>';
    },

    renderTitle = function(instance, c, year, month, refYear)
    {
        var i, j, arr,
            opts = instance._o,
            tag = opts.containerTag,
            isMinYear = (year === opts.minYear),
            isMaxYear = (year === opts.maxYear),
            html = '<div class="'+ tag +'-header pika-title">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                (i === month ? ' selected': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled' : '') + '>' +
                opts.i18n.months[i] + '</option>');
        }
        monthHtml = '<span class="month">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month">' + arr.join('') + '</select></span>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected': '') + '>' + (i) + '</option>');
            }
        }
        yearHtml = '<span class="year">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year">' + arr.join('') + '</select></span>';

        if (opts.showMonthAfterYear) {
            html += '<div class="title">' + yearHtml + monthHtml + '</div>';
        } else {
            html += '<div class="title">' + monthHtml + yearHtml + '</div>';
        }

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }

        if (c === 0) {
            html += '<div class="pre micon icon-left pika-prev' + (prev ? '' : ' disabled') + '"></div>';
        }
        if (c === (instance._o.numberOfMonths - 1) ) {
            html += '<div class="next micon icon-right pika-next' + (next ? '' : ' disabled') + '"></div>';
        }

        return html += '</div>';
    },

    renderQuickChoose = function() {
        /*<ul class="calendar-footer">
            <li class="calendar-area">0-30 days ago</li>
            <li class="calendar-area">31-60 days ago</li>
            <li class="calendar-area">61-91 days ago</li>
            <li class="calendar-area">91-120 days ago</li>
            <li class="calendar-area">above 120 days</li>
        </ul>*/
    },

    renderTable = function(opts, rows) {

        return renderHead(opts) +  '<ul class="'+ opts.containerTag +'-days">'+ rows.join('') +'</ul>';
    },


    /**
     * Pikaday constructor
     */
    Pikaday = function(options)
    {
        var self = this,
            opts = self.config(options);

        // 区间选择开始和结束时间
        self._rangeFinsh = false;
        self._sd = null;
        self._ed = null;

        self._onMouseDown = function(e)
        {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            // 修复IE下设置选择范围后，仍然可以选择超出设置范围的时间的bug
            if (hasClass(target, 'pika-day') && hasClass(target.parentNode, 'disabled')) {
                self._c = true;
                return false;
            }

            if (!hasClass(target, 'disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'empty')) {
                    var _date = new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day'));
                    if (opts.timeRange) {
                        addClass(target, 'selected');
                        if (self._sd !== null && !self._rangeFinsh) {
                            self._ed = _date;
                            if (self._sd > self._ed) {
                                _date = self._sd;
                                self._sd = self._ed;
                                self._ed = _date;
                            }
                            self.draw();
                            self._rangeFinsh = true;
                        } else {
                            self._rangeFinsh = false;
                            self._sd = _date;
                            self._ed = _date;
                            self.draw();
                            if (typeof self._o.onSelect === 'function') {
                                self._o.onSelect.call(self, self.getDate());
                            }
                        }
                        if (self._rangeFinsh) {
                            self.setDate([self._sd, self._ed]);
                            if (opts.bound) {
                                sto(function() {
                                    self.hide();
                                }, 100);
                            }
                            return;
                        }
                    } else {
                        self.setDate(_date);
                        if (opts.bound) {
                            sto(function() {
                                self.hide();
                            }, 100);
                        }
                        return;
                    }
                }
                else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                }
                else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                } else if (hasClass(target, 'pika-today')) {
                    self.setDate(self.format(new Date()));
                    if (opts.bound) {
                        sto(function() {
                            self.hide();
                        }, 100);
                    }
                }
            }
            if (!hasClass(target, 'pika-select')) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };

        self._onChange = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            }
            else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };

        self._onInputChange = function(e)
        {
            var date;

            if (e.firedBy === self) {
                return;
            }

            // 如果没有年份则指定当前年份为默认年份
            var currentYear = new Date().getFullYear();
            date = new Date(Date.parse(opts.field.value));
            if (isDate(date) && opts.field.value.indexOf(date.getFullYear()) == -1) {
                date = new Date(Date.parse(opts.field.value + '.'+ currentYear));
            }

            self.setDate(isDate(date) ? date : null);
            if (!self._v) {
                self.show();
            }
        };

        self._onInputFocus = (typeof opts.onFocus === 'function'
			? opts.onFocus
			: function(){self.show()});

        self._onInputClick = function()
        {
            self.show();
        };

        self._onInputBlur = function()
        {
            if (opts.timeRange) {
                self.setDate(self.getDate());
                self._rangeFinsh = true;
                return;
            }
            if (!self._c) {
                self._b = sto(function() {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };

        self._onClick = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'pika-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, opts.containerTag)) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));
            if (self._v && target !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = opts.containerTag + (opts.isRTL ? ' is-rtl' : '');
        if (opts.numberOfMonths > 1) {
            self.el.className += ' split-cols' + opts.numberOfMonths;
        }

        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);
                addEvent(self.el, 'mouseover', function(e){
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            // 修复IE下设置选择范围后，仍然可以选择超出设置范围的时间的bug
            if (hasClass(target, 'pika-day') && hasClass(target.parentNode, 'disabled')) {
                self._c = true;
                return false;
            }

            if (!hasClass(target, 'disabled') && !hasClass(target, 'nopermission')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'empty') && !hasClass(target, 'pika-select')) {
                    var _index = target.getAttribute('index');
                    var _date = new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day'));
                    if (opts.timeRange) {
                        if (self._sd !== null && !self._rangeFinsh) {
                            let chooseEndDate = _date;
                            let chooseStartDate = self._sd;
                            if (chooseStartDate > chooseEndDate) {
                                _date = chooseStartDate;
                                chooseStartDate = chooseEndDate;
                                chooseEndDate = _date;
                            }
                            let allbtn = self.el.getElementsByClassName("pika-button");
                            for(var i=0;i<allbtn.length;i++){
                                let selfDate = new Date(allbtn[i].getAttribute('data-pika-year'), allbtn[i].getAttribute('data-pika-month'), allbtn[i].getAttribute('data-pika-day'));
                                if(selfDate>=chooseStartDate && selfDate<=chooseEndDate && !hasClass(allbtn[i], 'selected')){
                                    addClass(allbtn[i], 'active');
                                }else{
                                    removeClass(allbtn[i], 'active');
                                }
                            }

                        } 
                        
                    }
                }
            }
        }, true);
        addEvent(self.el, 'mouseout', function(){
            if (opts.timeRange && !self._rangeFinsh) {
                let allbtn = self.el.getElementsByClassName("pika-button");
                for(var i=0;i<allbtn.length;i++){
                    removeClass(allbtn[i], 'active');
                }
            }
        }, true);
        /* time range select, if out set end */
        /*if (opts.timeRange) {
            addEvent(self.el, 'mouseout', function(e) {
                e = e || window.event;
                if (!nodeContains(self.el, (e.relatedTarget || e.toElement)) && self._sd && !self._ed && !self._rangeFinsh) {
                    self._rangeFinsh = true;
                    self.setDate([self._sd, self._ed]);
                }
                if (e.cancelBubble) {
                    e.cancelBubble = true;
                }
                e.stopPropagation && e.stopPropagation();
            }, false);
        }*/

        if (opts.field) {
            if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                if (opts.field.nodeName === 'input') {
                    opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
                } else {
                    opts.field.appendChild(self.el);
                }
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                opts.defaultDate = new Date(Date.parse(opts.field.value));
                opts.setDefaultDate = true;
            }
        }

        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
                self._sd = defDate;
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }

        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }

    };

    /* 重置全局参数 */
    Pikaday.setDefault = function(options) {
        var opts = extend({}, options, true);
        defaults = extend(defaults, options, true);
    };

    /**
     * public Pikaday API
     */
    Pikaday.prototype = {
        /**
         * configure functionality
         */
        config: function(options)
        {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            // range select stop clear startTime when endtime not selected
            opts.stopRangeClear = (opts.field && opts.field.nodeName !== 'input') ? true : false;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;
            opts.titleDayFn = (typeof opts.titleDayFn) === 'function' ? opts.titleDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                setToStartOfDay(opts.minDate);
                opts.minYear  = opts.minDate.getFullYear();
                opts.minMonth = opts.minDate.getMonth();
            }
            if (opts.maxDate) {
                setToStartOfDay(opts.maxDate);
                opts.maxYear  = opts.maxDate.getFullYear();
                opts.maxMonth = opts.maxDate.getMonth();
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function()
        {
            if (this._o.timeRange) {
                return (!isDate(this._sd) ? '' : this._sd.toDateString()) + this._o.rangeJoiner +
                    (!isDate(this._ed) ? '' : this._ed.toDateString());
            } else {
                return !isDate(this._d) ? '' : this._d.toDateString();
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function()
        {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect)
        {
            if (!date) {
                this._d = null;
                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date)
        {
            var newCalendar = true,
                mainCalendar = this._o.mainCalendar,
                minDate = (this._o.minDate && new Date(this._o.minDate)) || null,
                maxData = (this._o.maxDate && new Date(this._o.maxDate)) || null;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                    visibleDate = date.getTime();

                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
                lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(), year: date.getFullYear(), date: date
                }];

                if (minDate && minDate > date) {
                    this.calendars[0] = {month: minDate.getMonth(), year: minDate.getFullYear(), date: date};
                }

                if (maxData && maxData < date) {
                    this.calendars[0] = {month: maxData.getMonth(), year: maxData.getFullYear(), date: date};
                    if (this._o.numberOfMonths > 1) {
                        this._o.mainCalendar = 'right';
                    }
                } else {
                    this._o.mainCalendar = mainCalendar;
                }

                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function()
        {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month)
        {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function()
        {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function()
        {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year)
        {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value)
        {
            this._o.minDate = value;
            if (!this._o.bound) {
                this._o.minYear  = value.getFullYear();
                this._o.minMonth = value.getMonth();
                this.gotoDate(this.calendars[0].date);
            }
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value)
        {
            this._o.maxDate = value;
            if (!this._o.bound) {
                this._o.maxYear  = value.getFullYear();
                this._o.maxMonth = value.getMonth();
                this.gotoDate(this.calendars[0].date);
            }
        },

        /**
         * refresh the HTML
         */
        draw: function(force)
        {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                tag = opts.containerTag,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '';

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            for (var c = 0; c < opts.numberOfMonths; c++) {
                if (opts.numberOfMonths > 1) { html += '<div class="'+ tag +'-split">'; }
                html += renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year) + this.render(this.calendars[c].year, this.calendars[c].month);
                if (opts.numberOfMonths > 1) { html += '</div>'; }
            }

            if (opts.numberOfMonths === 1) {
                html += renderToday(opts, this.format(new Date()));
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                var self = this;
                sto(function() {
                    self._o.onDraw.call(self);
                }, 0);
            }
        },

        adjustPosition: function()
        {
            var field = this._o.trigger, pEl = field,
            width = this.el.offsetWidth, height = this.el.offsetHeight,
            viewportWidth = window.innerWidth || document.documentElement.clientWidth,
            viewportHeight = window.innerHeight || document.documentElement.clientHeight,
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
            left, top, clientRect;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if (left + width > viewportWidth ||
                (
                    this._o.position.indexOf('right') > -1 &&
                    left - width + field.offsetWidth > 0
                )
            ) {
                left = left - width + field.offsetWidth;
            }
            if (top + height > viewportHeight + scrollTop ||
                (
                    this._o.position.indexOf('top') > -1 &&
                    top - height - field.offsetHeight > 0
                )
            ) {
                top = top - height - field.offsetHeight;
            }
            this.el.style.cssText = [
                'position: absolute',
                'left: ' + left + 'px',
                'top: ' + top + 'px'
            ].join(';');
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month)
        {
            var opts   = this._o,
                now    = new Date(),
                days   = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data   = [],
                row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var cells = days + before,
                after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            for (var i = 0, r = 0; i < cells; i++)
            {
                var day = new Date(year, month, 1 + (i - before)),
                    isDisabled = (opts.minDate && day < opts.minDate) || (opts.maxDate && day > opts.maxDate) ||  (opts.disableDayFn && opts.disableDayFn(day)),
                    isSelected = isDate(this._d) ? (compareDates(day, this._d) === 0) : false,
                    isRangeSelected = false,
                    isToday = (compareDates(day, now) === 0),
                    title = opts.titleDayFn && opts.titleDayFn(day),
                    isEmpty = i < before || i >= (days + before);
                    

                if (this._sd && !this._ed) {
                    isRangeSelected = compareDates(day, this._sd) === 0;
                } else if (this._sd && this._ed) {
                    isRangeSelected = (compareDates(day, this._sd) === 0 || compareDates(this._ed , day) === 0) ? true :
                        (compareDates(day, this._sd) >= 0 && compareDates(this._ed , day) >= 0);
                }

                if (compareDates(day, this._sd) === 0 || compareDates(day, this._ed) === 0) {
                    isSelected = true;
                }

                row.push(renderDay(1 + (i - before), month, year, isSelected, isToday, isDisabled, isEmpty, isRangeSelected,title));

                if (++r === 7) {
                    data.push(renderRow(row, opts.isRTL));
                    row = [];
                    r = 0;
                }
            }
            return renderTable(opts, data);
        },

        isVisible: function()
        {
            return this._v;
        },

        show: function()
        {
            if (!this._v) {
                removeClass(this.el, 'is-hidden');
                this._v = true;
                this.draw();
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function()
        {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.cssText = '';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function()
        {
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (this._o.field) {
                removeEvent(this._o.field, 'change', this._onInputChange);
                if (this._o.bound) {
                    removeEvent(this._o.trigger, 'click', this._onInputClick);
                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
            this._sd = null;
            this._ed = null;
        }

    };

    Pikaday.prototype._fireEvent = fireEvent;
    Pikaday.prototype._isDate = isDate;
    Pikaday.prototype._isArray = isArray;

    // Copyright 2014 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview pikaday format extend
 * @author sheny@made-in-china.com
 * @version v0.1
 */

(function(root, pikday) {
    'use strict';

    // default American time value
    var opts = {
            i18n : {
                monthShortVal : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                weekShortVal : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
            }
        };

    /**
     * override toString method to set the field value
     * @return {String}
     */
    pikday.prototype.toString = function() {
        if (this._o.timeRange) {
            return (!this._isDate(this._sd) ? '' : this.format(this._sd)) +
                this._o.rangeJoiner +
                (!this._isDate(this._ed) ? '' : this.format(this._ed));
        } else {
            return !this._isDate(this._d) ? '' : this.format(this._d);
        }
    };

    /**
     * format Date
     * yyyy : year, MM : monthShort, mm : month, dd : day, hh : hour, mi : minute, ss : second, WW : week
     * @param {Date} date
     * @return {String}
     */
    pikday.prototype.format = function(date) {
        var regs, reg,
            format = (this._o.format === 'YYYY-MM-DD' ? 'MM dd, yyyy' : this._o.format);

        if (!format) {
            return date.toLocaleString();
        }

        if (!this._isDate(date)) {
            return '';
        }

        if (!this._o.i18n.monthShortVal) {
            this._o.i18n.monthShortVal = opts.i18n.monthShortVal;
            this._o.i18n.weekShortVal = opts.i18n.weekShortVal;
        }

        regs = {
            'y+': date.getFullYear(),
            'm+': date.getMonth() + 1,
            'M+': date.getMonth(),
            'd+': date.getDate(),
            //'h+': date.getHours(),
            //'mi': date.getMinutes(),
            //'s+': date.getSeconds(),
            'W+': date.getDay()
        };

        for (reg in regs) {
            if (new RegExp('(' + reg + ')').test(format)) {
                if (reg === 'M+' && this._o.i18n.monthShortVal) {
                    format = format.replace(RegExp.$1, this._o.i18n.monthShortVal[regs[reg]]);
                }

                if (reg === 'W+' && this._o.i18n.monthShortVal) {
                    format = format.replace(RegExp.$1, this._o.i18n.weekShortVal[regs[reg]]);
                }

                format = format.replace(RegExp.$1, (RegExp.$1.length === 1 || reg === 'y+') ? regs[reg] :
                    ("00" + regs[reg]).substr(('' + regs[reg]).length));
            }
        }

        return format;
    };

}(this, Pikaday));

    // Copyright 2015 FOCUS Inc.All Rights Reserved.

/**
 * @fileOverview DevBranches
 * @author sheny@made-in-china.com
 */


(function(root, pikday) {
    'use strict';

    var _setDate = pikday.prototype.setDate,
        _getDate = pikday.prototype.getDate,
        _adjustCalendars = pikday.prototype.adjustCalendars;

    // override setDate method
    pikday.prototype.setDate = function(date, preventOnSelect) {
        if (this._isArray(date) && date.length === 2) {

            var sd = date[0],
                ed = date[1];

            if (sd && typeof sd === 'string') {
                sd = new Date(Date.parse(sd));
            }
            if (ed && typeof ed === 'string') {
                ed = new Date(Date.parse(ed));
            }
            if (this._isDate(sd) && this._isDate(ed)) {
                var min = this._o.minDate,
                    max = this._o.maxDate;

                if (this._isDate(min) && sd < min) {
                    sd = min;
                } else if (this._isDate(max) && ed > max) {
                    ed = max;
                }
                sd.setHours(0,0,0,0);
                ed.setHours(0,0,0,0);

                this._sd = new Date(sd.getTime());
                this._ed = new Date(ed.getTime());
                this.gotoDate(this._ed);
                //this._rangeFinsh = true;
                if(this._o.timeRange && sd.getTime()===ed.getTime()){
                    this._rangeFinsh = false;
                }else{
                    this._rangeFinsh = true;
                }
                if (this._o.field) {
                    this._o.field.value = this.toString();
                    this._fireEvent(this._o.field, 'change', { firedBy: this });
                }
            }

            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
            this.draw();
        } else {
            _setDate.call(this, date, preventOnSelect);
        }
    };

    /**
     * override getDate method
     * if timeRange select then return Array  0 - startTime 1 - endTime
     * return {Array}
     */
    pikday.prototype.getDate = function() {
        if (this._o.timeRange) {
            return [(this._isDate(this._sd) ? this.format(this._sd) : null), (this._isDate(this._ed) ? this.format(this._ed) : null)];
        } else {
            return _getDate.call(this);
        }
    };

    /**
     * clear the date when starTime selected and endTime not selected or other ?
     */
    pikday.prototype.clearRange = function() {
        this._sd = null;
        this._ed = null;
        this.draw();
    };

}(this, Pikaday));


   return Pikaday;

}));
