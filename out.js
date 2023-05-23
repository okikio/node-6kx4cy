// index.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(
      required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present"
    );
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn(
        "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"
      );
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
var minTime = -maxTime;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger(
    (_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0
  );
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger(
    (_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1
  );
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError(
      "firstWeekContainsDate must be between 1 and 7 inclusively"
    );
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger(
    (_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1
  );
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}
var MILLISECONDS_IN_WEEK2 = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK2) + 1;
}
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var MILLISECONDS_IN_MINUTE = 1e3 * 60;
var MINUTES_IN_DAY = 60 * 24;
var MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
var MINUTES_IN_YEAR = MINUTES_IN_DAY * 365;
var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1e3;
function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {
      })
    );
    return true;
  } catch (e) {
    return false;
  }
}
function _typeof2(obj) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof2(obj);
}
function _assertThisInitialized2(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }
  return _assertThisInitialized2(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _toPrimitive(input, hint) {
  if (_typeof2(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof2(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof2(key) === "symbol" ? key : String(key);
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Setter = /* @__PURE__ */ function() {
  function Setter2() {
    _classCallCheck(this, Setter2);
    _defineProperty(this, "priority", void 0);
    _defineProperty(this, "subPriority", 0);
  }
  _createClass(Setter2, [
    {
      key: "validate",
      value: function validate(_utcDate, _options) {
        return true;
      }
    }
  ]);
  return Setter2;
}();
var ValueSetter = /* @__PURE__ */ function(_Setter) {
  _inherits(ValueSetter2, _Setter);
  var _super = _createSuper(ValueSetter2);
  function ValueSetter2(value, validateValue, setValue, priority, subPriority) {
    var _this;
    _classCallCheck(this, ValueSetter2);
    _this = _super.call(this);
    _this.value = value;
    _this.validateValue = validateValue;
    _this.setValue = setValue;
    _this.priority = priority;
    if (subPriority) {
      _this.subPriority = subPriority;
    }
    return _this;
  }
  _createClass(ValueSetter2, [
    {
      key: "validate",
      value: function validate(utcDate, options) {
        return this.validateValue(utcDate, this.value, options);
      }
    },
    {
      key: "set",
      value: function set2(utcDate, flags, options) {
        return this.setValue(utcDate, flags, this.value, options);
      }
    }
  ]);
  return ValueSetter2;
}(Setter);
var Parser = /* @__PURE__ */ function() {
  function Parser2() {
    _classCallCheck(this, Parser2);
    _defineProperty(this, "incompatibleTokens", void 0);
    _defineProperty(this, "priority", void 0);
    _defineProperty(this, "subPriority", void 0);
  }
  _createClass(Parser2, [
    {
      key: "run",
      value: function run(dateString, token, match2, options) {
        var result = this.parse(dateString, token, match2, options);
        if (!result) {
          return null;
        }
        return {
          setter: new ValueSetter(
            result.value,
            this.validate,
            this.set,
            this.priority,
            this.subPriority
          ),
          rest: result.rest
        };
      }
    },
    {
      key: "validate",
      value: function validate(_utcDate, _value, _options) {
        return true;
      }
    }
  ]);
  return Parser2;
}();
var EraParser = /* @__PURE__ */ function(_Parser) {
  _inherits(EraParser2, _Parser);
  var _super = _createSuper(EraParser2);
  function EraParser2() {
    var _this;
    _classCallCheck(this, EraParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 140);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "R",
      "u",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(EraParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "G":
          case "GG":
          case "GGG":
            return match2.era(dateString, {
              width: "abbreviated"
            }) || match2.era(dateString, {
              width: "narrow"
            });
          case "GGGGG":
            return match2.era(dateString, {
              width: "narrow"
            });
          case "GGGG":
          default:
            return match2.era(dateString, {
              width: "wide"
            }) || match2.era(dateString, {
              width: "abbreviated"
            }) || match2.era(dateString, {
              width: "narrow"
            });
        }
      }
    },
    {
      key: "set",
      value: function set2(date, flags, value) {
        flags.era = value;
        date.setUTCFullYear(value, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return EraParser2;
}(Parser);
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  var sign = matchResult[1] === "+" ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0;
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
var YearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(YearParser2, _Parser);
  var _super = _createSuper(YearParser2);
  function YearParser2() {
    var _this;
    _classCallCheck(this, YearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "Y",
      "R",
      "u",
      "w",
      "I",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(YearParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        var valueCallback3 = function valueCallback4(year) {
          return {
            year,
            isTwoDigitYear: token === "yy"
          };
        };
        switch (token) {
          case "y":
            return mapValue(parseNDigits(4, dateString), valueCallback3);
          case "yo":
            return mapValue(
              match2.ordinalNumber(dateString, {
                unit: "year"
              }),
              valueCallback3
            );
          default:
            return mapValue(
              parseNDigits(token.length, dateString),
              valueCallback3
            );
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value.isTwoDigitYear || value.year > 0;
      }
    },
    {
      key: "set",
      value: function set2(date, flags, value) {
        var currentYear = date.getUTCFullYear();
        if (value.isTwoDigitYear) {
          var normalizedTwoDigitYear = normalizeTwoDigitYear(
            value.year,
            currentYear
          );
          date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        }
        var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
        date.setUTCFullYear(year, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return YearParser2;
}(Parser);
var LocalWeekYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(LocalWeekYearParser2, _Parser);
  var _super = _createSuper(LocalWeekYearParser2);
  function LocalWeekYearParser2() {
    var _this;
    _classCallCheck(this, LocalWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(LocalWeekYearParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        var valueCallback3 = function valueCallback4(year) {
          return {
            year,
            isTwoDigitYear: token === "YY"
          };
        };
        switch (token) {
          case "Y":
            return mapValue(parseNDigits(4, dateString), valueCallback3);
          case "Yo":
            return mapValue(
              match2.ordinalNumber(dateString, {
                unit: "year"
              }),
              valueCallback3
            );
          default:
            return mapValue(
              parseNDigits(token.length, dateString),
              valueCallback3
            );
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value.isTwoDigitYear || value.year > 0;
      }
    },
    {
      key: "set",
      value: function set2(date, flags, value, options) {
        var currentYear = getUTCWeekYear(date, options);
        if (value.isTwoDigitYear) {
          var normalizedTwoDigitYear = normalizeTwoDigitYear(
            value.year,
            currentYear
          );
          date.setUTCFullYear(
            normalizedTwoDigitYear,
            0,
            options.firstWeekContainsDate
          );
          date.setUTCHours(0, 0, 0, 0);
          return startOfUTCWeek(date, options);
        }
        var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
        date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date, options);
      }
    }
  ]);
  return LocalWeekYearParser2;
}(Parser);
var ISOWeekYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISOWeekYearParser2, _Parser);
  var _super = _createSuper(ISOWeekYearParser2);
  function ISOWeekYearParser2() {
    var _this;
    _classCallCheck(this, ISOWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(ISOWeekYearParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token) {
        if (token === "R") {
          return parseNDigitsSigned(4, dateString);
        }
        return parseNDigitsSigned(token.length, dateString);
      }
    },
    {
      key: "set",
      value: function set2(_date, _flags, value) {
        var firstWeekOfYear = /* @__PURE__ */ new Date(0);
        firstWeekOfYear.setUTCFullYear(value, 0, 4);
        firstWeekOfYear.setUTCHours(0, 0, 0, 0);
        return startOfUTCISOWeek(firstWeekOfYear);
      }
    }
  ]);
  return ISOWeekYearParser2;
}(Parser);
var ExtendedYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ExtendedYearParser2, _Parser);
  var _super = _createSuper(ExtendedYearParser2);
  function ExtendedYearParser2() {
    var _this;
    _classCallCheck(this, ExtendedYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "R",
      "w",
      "I",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(ExtendedYearParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token) {
        if (token === "u") {
          return parseNDigitsSigned(4, dateString);
        }
        return parseNDigitsSigned(token.length, dateString);
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCFullYear(value, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return ExtendedYearParser2;
}(Parser);
var QuarterParser = /* @__PURE__ */ function(_Parser) {
  _inherits(QuarterParser2, _Parser);
  var _super = _createSuper(QuarterParser2);
  function QuarterParser2() {
    var _this;
    _classCallCheck(this, QuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 120);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(QuarterParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "Q":
          case "QQ":
            return parseNDigits(token.length, dateString);
          case "Qo":
            return match2.ordinalNumber(dateString, {
              unit: "quarter"
            });
          case "QQQ":
            return match2.quarter(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.quarter(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "QQQQQ":
            return match2.quarter(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "QQQQ":
          default:
            return match2.quarter(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.quarter(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.quarter(dateString, {
              width: "narrow",
              context: "formatting"
            });
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 1 && value <= 4;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCMonth((value - 1) * 3, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return QuarterParser2;
}(Parser);
var StandAloneQuarterParser = /* @__PURE__ */ function(_Parser) {
  _inherits(StandAloneQuarterParser2, _Parser);
  var _super = _createSuper(StandAloneQuarterParser2);
  function StandAloneQuarterParser2() {
    var _this;
    _classCallCheck(this, StandAloneQuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 120);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(StandAloneQuarterParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "q":
          case "qq":
            return parseNDigits(token.length, dateString);
          case "qo":
            return match2.ordinalNumber(dateString, {
              unit: "quarter"
            });
          case "qqq":
            return match2.quarter(dateString, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.quarter(dateString, {
              width: "narrow",
              context: "standalone"
            });
          case "qqqqq":
            return match2.quarter(dateString, {
              width: "narrow",
              context: "standalone"
            });
          case "qqqq":
          default:
            return match2.quarter(dateString, {
              width: "wide",
              context: "standalone"
            }) || match2.quarter(dateString, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.quarter(dateString, {
              width: "narrow",
              context: "standalone"
            });
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 1 && value <= 4;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCMonth((value - 1) * 3, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return StandAloneQuarterParser2;
}(Parser);
var MonthParser = /* @__PURE__ */ function(_Parser) {
  _inherits(MonthParser2, _Parser);
  var _super = _createSuper(MonthParser2);
  function MonthParser2() {
    var _this;
    _classCallCheck(this, MonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    _defineProperty(_assertThisInitialized(_this), "priority", 110);
    return _this;
  }
  _createClass(MonthParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        var valueCallback3 = function valueCallback4(value) {
          return value - 1;
        };
        switch (token) {
          case "M":
            return mapValue(
              parseNumericPattern(numericPatterns.month, dateString),
              valueCallback3
            );
          case "MM":
            return mapValue(parseNDigits(2, dateString), valueCallback3);
          case "Mo":
            return mapValue(
              match2.ordinalNumber(dateString, {
                unit: "month"
              }),
              valueCallback3
            );
          case "MMM":
            return match2.month(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.month(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "MMMMM":
            return match2.month(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "MMMM":
          default:
            return match2.month(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.month(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.month(dateString, {
              width: "narrow",
              context: "formatting"
            });
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 11;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCMonth(value, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return MonthParser2;
}(Parser);
var StandAloneMonthParser = /* @__PURE__ */ function(_Parser) {
  _inherits(StandAloneMonthParser2, _Parser);
  var _super = _createSuper(StandAloneMonthParser2);
  function StandAloneMonthParser2() {
    var _this;
    _classCallCheck(this, StandAloneMonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 110);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(StandAloneMonthParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        var valueCallback3 = function valueCallback4(value) {
          return value - 1;
        };
        switch (token) {
          case "L":
            return mapValue(
              parseNumericPattern(numericPatterns.month, dateString),
              valueCallback3
            );
          case "LL":
            return mapValue(parseNDigits(2, dateString), valueCallback3);
          case "Lo":
            return mapValue(
              match2.ordinalNumber(dateString, {
                unit: "month"
              }),
              valueCallback3
            );
          case "LLL":
            return match2.month(dateString, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.month(dateString, {
              width: "narrow",
              context: "standalone"
            });
          case "LLLLL":
            return match2.month(dateString, {
              width: "narrow",
              context: "standalone"
            });
          case "LLLL":
          default:
            return match2.month(dateString, {
              width: "wide",
              context: "standalone"
            }) || match2.month(dateString, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.month(dateString, {
              width: "narrow",
              context: "standalone"
            });
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 11;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCMonth(value, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return StandAloneMonthParser2;
}(Parser);
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getUTCWeek(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
var LocalWeekParser = /* @__PURE__ */ function(_Parser) {
  _inherits(LocalWeekParser2, _Parser);
  var _super = _createSuper(LocalWeekParser2);
  function LocalWeekParser2() {
    var _this;
    _classCallCheck(this, LocalWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 100);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(LocalWeekParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "w":
            return parseNumericPattern(numericPatterns.week, dateString);
          case "wo":
            return match2.ordinalNumber(dateString, {
              unit: "week"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 1 && value <= 53;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value, options) {
        return startOfUTCWeek(setUTCWeek(date, value, options), options);
      }
    }
  ]);
  return LocalWeekParser2;
}(Parser);
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getUTCISOWeek(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
var ISOWeekParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISOWeekParser2, _Parser);
  var _super = _createSuper(ISOWeekParser2);
  function ISOWeekParser2() {
    var _this;
    _classCallCheck(this, ISOWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 100);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(ISOWeekParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "I":
            return parseNumericPattern(numericPatterns.week, dateString);
          case "Io":
            return match2.ordinalNumber(dateString, {
              unit: "week"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 1 && value <= 53;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        return startOfUTCISOWeek(setUTCISOWeek(date, value));
      }
    }
  ]);
  return ISOWeekParser2;
}(Parser);
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DateParser = /* @__PURE__ */ function(_Parser) {
  _inherits(DateParser2, _Parser);
  var _super = _createSuper(DateParser2);
  function DateParser2() {
    var _this;
    _classCallCheck(this, DateParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "subPriority", 1);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(DateParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "d":
            return parseNumericPattern(numericPatterns.date, dateString);
          case "do":
            return match2.ordinalNumber(dateString, {
              unit: "date"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(date, value) {
        var year = date.getUTCFullYear();
        var isLeapYear2 = isLeapYearIndex(year);
        var month = date.getUTCMonth();
        if (isLeapYear2) {
          return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
        } else {
          return value >= 1 && value <= DAYS_IN_MONTH[month];
        }
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCDate(value);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return DateParser2;
}(Parser);
var DayOfYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(DayOfYearParser2, _Parser);
  var _super = _createSuper(DayOfYearParser2);
  function DayOfYearParser2() {
    var _this;
    _classCallCheck(this, DayOfYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "subpriority", 1);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(DayOfYearParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "D":
          case "DD":
            return parseNumericPattern(numericPatterns.dayOfYear, dateString);
          case "Do":
            return match2.ordinalNumber(dateString, {
              unit: "date"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(date, value) {
        var year = date.getUTCFullYear();
        var isLeapYear2 = isLeapYearIndex(year);
        if (isLeapYear2) {
          return value >= 1 && value <= 366;
        } else {
          return value >= 1 && value <= 365;
        }
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCMonth(0, value);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return DayOfYearParser2;
}(Parser);
function setUTCDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger(
    (_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0
  );
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var DayParser = /* @__PURE__ */ function(_Parser) {
  _inherits(DayParser2, _Parser);
  var _super = _createSuper(DayParser2);
  function DayParser2() {
    var _this;
    _classCallCheck(this, DayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(DayParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "E":
          case "EE":
          case "EEE":
            return match2.day(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "EEEEE":
            return match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "EEEEEE":
            return match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "EEEE":
          default:
            return match2.day(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            });
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 6;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value, options) {
        date = setUTCDay(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return DayParser2;
}(Parser);
var LocalDayParser = /* @__PURE__ */ function(_Parser) {
  _inherits(LocalDayParser2, _Parser);
  var _super = _createSuper(LocalDayParser2);
  function LocalDayParser2() {
    var _this;
    _classCallCheck(this, LocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(LocalDayParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2, options) {
        var valueCallback3 = function valueCallback4(value) {
          var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
          return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
        };
        switch (token) {
          case "e":
          case "ee":
            return mapValue(
              parseNDigits(token.length, dateString),
              valueCallback3
            );
          case "eo":
            return mapValue(
              match2.ordinalNumber(dateString, {
                unit: "day"
              }),
              valueCallback3
            );
          case "eee":
            return match2.day(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "eeeee":
            return match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "eeeeee":
            return match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "eeee":
          default:
            return match2.day(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            });
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 6;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value, options) {
        date = setUTCDay(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return LocalDayParser2;
}(Parser);
var StandAloneLocalDayParser = /* @__PURE__ */ function(_Parser) {
  _inherits(StandAloneLocalDayParser2, _Parser);
  var _super = _createSuper(StandAloneLocalDayParser2);
  function StandAloneLocalDayParser2() {
    var _this;
    _classCallCheck(this, StandAloneLocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(StandAloneLocalDayParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2, options) {
        var valueCallback3 = function valueCallback4(value) {
          var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
          return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
        };
        switch (token) {
          case "c":
          case "cc":
            return mapValue(
              parseNDigits(token.length, dateString),
              valueCallback3
            );
          case "co":
            return mapValue(
              match2.ordinalNumber(dateString, {
                unit: "day"
              }),
              valueCallback3
            );
          case "ccc":
            return match2.day(dateString, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.day(dateString, {
              width: "short",
              context: "standalone"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "standalone"
            });
          case "ccccc":
            return match2.day(dateString, {
              width: "narrow",
              context: "standalone"
            });
          case "cccccc":
            return match2.day(dateString, {
              width: "short",
              context: "standalone"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "standalone"
            });
          case "cccc":
          default:
            return match2.day(dateString, {
              width: "wide",
              context: "standalone"
            }) || match2.day(dateString, {
              width: "abbreviated",
              context: "standalone"
            }) || match2.day(dateString, {
              width: "short",
              context: "standalone"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "standalone"
            });
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 6;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value, options) {
        date = setUTCDay(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return StandAloneLocalDayParser2;
}(Parser);
function setUTCISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var day = toInteger(dirtyDay);
  if (day % 7 === 0) {
    day = day - 7;
  }
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var ISODayParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISODayParser2, _Parser);
  var _super = _createSuper(ISODayParser2);
  function ISODayParser2() {
    var _this;
    _classCallCheck(this, ISODayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(ISODayParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        var valueCallback3 = function valueCallback4(value) {
          if (value === 0) {
            return 7;
          }
          return value;
        };
        switch (token) {
          case "i":
          case "ii":
            return parseNDigits(token.length, dateString);
          case "io":
            return match2.ordinalNumber(dateString, {
              unit: "day"
            });
          case "iii":
            return mapValue(
              match2.day(dateString, {
                width: "abbreviated",
                context: "formatting"
              }) || match2.day(dateString, {
                width: "short",
                context: "formatting"
              }) || match2.day(dateString, {
                width: "narrow",
                context: "formatting"
              }),
              valueCallback3
            );
          case "iiiii":
            return mapValue(
              match2.day(dateString, {
                width: "narrow",
                context: "formatting"
              }),
              valueCallback3
            );
          case "iiiiii":
            return mapValue(
              match2.day(dateString, {
                width: "short",
                context: "formatting"
              }) || match2.day(dateString, {
                width: "narrow",
                context: "formatting"
              }),
              valueCallback3
            );
          case "iiii":
          default:
            return mapValue(
              match2.day(dateString, {
                width: "wide",
                context: "formatting"
              }) || match2.day(dateString, {
                width: "abbreviated",
                context: "formatting"
              }) || match2.day(dateString, {
                width: "short",
                context: "formatting"
              }) || match2.day(dateString, {
                width: "narrow",
                context: "formatting"
              }),
              valueCallback3
            );
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 1 && value <= 7;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date = setUTCISODay(date, value);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    }
  ]);
  return ISODayParser2;
}(Parser);
var AMPMParser = /* @__PURE__ */ function(_Parser) {
  _inherits(AMPMParser2, _Parser);
  var _super = _createSuper(AMPMParser2);
  function AMPMParser2() {
    var _this;
    _classCallCheck(this, AMPMParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "b",
      "B",
      "H",
      "k",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(AMPMParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "a":
          case "aa":
          case "aaa":
            return match2.dayPeriod(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "aaaaa":
            return match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "aaaa":
          default:
            return match2.dayPeriod(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
        }
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date;
      }
    }
  ]);
  return AMPMParser2;
}(Parser);
var AMPMMidnightParser = /* @__PURE__ */ function(_Parser) {
  _inherits(AMPMMidnightParser2, _Parser);
  var _super = _createSuper(AMPMMidnightParser2);
  function AMPMMidnightParser2() {
    var _this;
    _classCallCheck(this, AMPMMidnightParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "a",
      "B",
      "H",
      "k",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(AMPMMidnightParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "b":
          case "bb":
          case "bbb":
            return match2.dayPeriod(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "bbbbb":
            return match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "bbbb":
          default:
            return match2.dayPeriod(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
        }
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date;
      }
    }
  ]);
  return AMPMMidnightParser2;
}(Parser);
var DayPeriodParser = /* @__PURE__ */ function(_Parser) {
  _inherits(DayPeriodParser2, _Parser);
  var _super = _createSuper(DayPeriodParser2);
  function DayPeriodParser2() {
    var _this;
    _classCallCheck(this, DayPeriodParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "a",
      "b",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(DayPeriodParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "B":
          case "BB":
          case "BBB":
            return match2.dayPeriod(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "BBBBB":
            return match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
          case "BBBB":
          default:
            return match2.dayPeriod(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.dayPeriod(dateString, {
              width: "narrow",
              context: "formatting"
            });
        }
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date;
      }
    }
  ]);
  return DayPeriodParser2;
}(Parser);
var Hour1to12Parser = /* @__PURE__ */ function(_Parser) {
  _inherits(Hour1to12Parser2, _Parser);
  var _super = _createSuper(Hour1to12Parser2);
  function Hour1to12Parser2() {
    var _this;
    _classCallCheck(this, Hour1to12Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "H",
      "K",
      "k",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(Hour1to12Parser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "h":
            return parseNumericPattern(numericPatterns.hour12h, dateString);
          case "ho":
            return match2.ordinalNumber(dateString, {
              unit: "hour"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 1 && value <= 12;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        var isPM = date.getUTCHours() >= 12;
        if (isPM && value < 12) {
          date.setUTCHours(value + 12, 0, 0, 0);
        } else if (!isPM && value === 12) {
          date.setUTCHours(0, 0, 0, 0);
        } else {
          date.setUTCHours(value, 0, 0, 0);
        }
        return date;
      }
    }
  ]);
  return Hour1to12Parser2;
}(Parser);
var Hour0to23Parser = /* @__PURE__ */ function(_Parser) {
  _inherits(Hour0to23Parser2, _Parser);
  var _super = _createSuper(Hour0to23Parser2);
  function Hour0to23Parser2() {
    var _this;
    _classCallCheck(this, Hour0to23Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "a",
      "b",
      "h",
      "K",
      "k",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(Hour0to23Parser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "H":
            return parseNumericPattern(numericPatterns.hour23h, dateString);
          case "Ho":
            return match2.ordinalNumber(dateString, {
              unit: "hour"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 23;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCHours(value, 0, 0, 0);
        return date;
      }
    }
  ]);
  return Hour0to23Parser2;
}(Parser);
var Hour0To11Parser = /* @__PURE__ */ function(_Parser) {
  _inherits(Hour0To11Parser2, _Parser);
  var _super = _createSuper(Hour0To11Parser2);
  function Hour0To11Parser2() {
    var _this;
    _classCallCheck(this, Hour0To11Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "h",
      "H",
      "k",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(Hour0To11Parser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "K":
            return parseNumericPattern(numericPatterns.hour11h, dateString);
          case "Ko":
            return match2.ordinalNumber(dateString, {
              unit: "hour"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 11;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        var isPM = date.getUTCHours() >= 12;
        if (isPM && value < 12) {
          date.setUTCHours(value + 12, 0, 0, 0);
        } else {
          date.setUTCHours(value, 0, 0, 0);
        }
        return date;
      }
    }
  ]);
  return Hour0To11Parser2;
}(Parser);
var Hour1To24Parser = /* @__PURE__ */ function(_Parser) {
  _inherits(Hour1To24Parser2, _Parser);
  var _super = _createSuper(Hour1To24Parser2);
  function Hour1To24Parser2() {
    var _this;
    _classCallCheck(this, Hour1To24Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "a",
      "b",
      "h",
      "H",
      "K",
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(Hour1To24Parser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "k":
            return parseNumericPattern(numericPatterns.hour24h, dateString);
          case "ko":
            return match2.ordinalNumber(dateString, {
              unit: "hour"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 1 && value <= 24;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        var hours = value <= 24 ? value % 24 : value;
        date.setUTCHours(hours, 0, 0, 0);
        return date;
      }
    }
  ]);
  return Hour1To24Parser2;
}(Parser);
var MinuteParser = /* @__PURE__ */ function(_Parser) {
  _inherits(MinuteParser2, _Parser);
  var _super = _createSuper(MinuteParser2);
  function MinuteParser2() {
    var _this;
    _classCallCheck(this, MinuteParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 60);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(MinuteParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "m":
            return parseNumericPattern(numericPatterns.minute, dateString);
          case "mo":
            return match2.ordinalNumber(dateString, {
              unit: "minute"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 59;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCMinutes(value, 0, 0);
        return date;
      }
    }
  ]);
  return MinuteParser2;
}(Parser);
var SecondParser = /* @__PURE__ */ function(_Parser) {
  _inherits(SecondParser2, _Parser);
  var _super = _createSuper(SecondParser2);
  function SecondParser2() {
    var _this;
    _classCallCheck(this, SecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 50);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(SecondParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token, match2) {
        switch (token) {
          case "s":
            return parseNumericPattern(numericPatterns.second, dateString);
          case "so":
            return match2.ordinalNumber(dateString, {
              unit: "second"
            });
          default:
            return parseNDigits(token.length, dateString);
        }
      }
    },
    {
      key: "validate",
      value: function validate(_date, value) {
        return value >= 0 && value <= 59;
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCSeconds(value, 0);
        return date;
      }
    }
  ]);
  return SecondParser2;
}(Parser);
var FractionOfSecondParser = /* @__PURE__ */ function(_Parser) {
  _inherits(FractionOfSecondParser2, _Parser);
  var _super = _createSuper(FractionOfSecondParser2);
  function FractionOfSecondParser2() {
    var _this;
    _classCallCheck(this, FractionOfSecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 30);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "t",
      "T"
    ]);
    return _this;
  }
  _createClass(FractionOfSecondParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token) {
        var valueCallback3 = function valueCallback4(value) {
          return Math.floor(value * Math.pow(10, -token.length + 3));
        };
        return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    },
    {
      key: "set",
      value: function set2(date, _flags, value) {
        date.setUTCMilliseconds(value);
        return date;
      }
    }
  ]);
  return FractionOfSecondParser2;
}(Parser);
var ISOTimezoneWithZParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISOTimezoneWithZParser2, _Parser);
  var _super = _createSuper(ISOTimezoneWithZParser2);
  function ISOTimezoneWithZParser2() {
    var _this;
    _classCallCheck(this, ISOTimezoneWithZParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 10);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "t",
      "T",
      "x"
    ]);
    return _this;
  }
  _createClass(ISOTimezoneWithZParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token) {
        switch (token) {
          case "X":
            return parseTimezonePattern(
              timezonePatterns.basicOptionalMinutes,
              dateString
            );
          case "XX":
            return parseTimezonePattern(timezonePatterns.basic, dateString);
          case "XXXX":
            return parseTimezonePattern(
              timezonePatterns.basicOptionalSeconds,
              dateString
            );
          case "XXXXX":
            return parseTimezonePattern(
              timezonePatterns.extendedOptionalSeconds,
              dateString
            );
          case "XXX":
          default:
            return parseTimezonePattern(timezonePatterns.extended, dateString);
        }
      }
    },
    {
      key: "set",
      value: function set2(date, flags, value) {
        if (flags.timestampIsSet) {
          return date;
        }
        return new Date(date.getTime() - value);
      }
    }
  ]);
  return ISOTimezoneWithZParser2;
}(Parser);
var ISOTimezoneParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISOTimezoneParser2, _Parser);
  var _super = _createSuper(ISOTimezoneParser2);
  function ISOTimezoneParser2() {
    var _this;
    _classCallCheck(this, ISOTimezoneParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 10);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", [
      "t",
      "T",
      "X"
    ]);
    return _this;
  }
  _createClass(ISOTimezoneParser2, [
    {
      key: "parse",
      value: function parse2(dateString, token) {
        switch (token) {
          case "x":
            return parseTimezonePattern(
              timezonePatterns.basicOptionalMinutes,
              dateString
            );
          case "xx":
            return parseTimezonePattern(timezonePatterns.basic, dateString);
          case "xxxx":
            return parseTimezonePattern(
              timezonePatterns.basicOptionalSeconds,
              dateString
            );
          case "xxxxx":
            return parseTimezonePattern(
              timezonePatterns.extendedOptionalSeconds,
              dateString
            );
          case "xxx":
          default:
            return parseTimezonePattern(timezonePatterns.extended, dateString);
        }
      }
    },
    {
      key: "set",
      value: function set2(date, flags, value) {
        if (flags.timestampIsSet) {
          return date;
        }
        return new Date(date.getTime() - value);
      }
    }
  ]);
  return ISOTimezoneParser2;
}(Parser);
var TimestampSecondsParser = /* @__PURE__ */ function(_Parser) {
  _inherits(TimestampSecondsParser2, _Parser);
  var _super = _createSuper(TimestampSecondsParser2);
  function TimestampSecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampSecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 40);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampSecondsParser2, [
    {
      key: "parse",
      value: function parse2(dateString) {
        return parseAnyDigitsSigned(dateString);
      }
    },
    {
      key: "set",
      value: function set2(_date, _flags, value) {
        return [
          new Date(value * 1e3),
          {
            timestampIsSet: true
          }
        ];
      }
    }
  ]);
  return TimestampSecondsParser2;
}(Parser);
var TimestampMillisecondsParser = /* @__PURE__ */ function(_Parser) {
  _inherits(TimestampMillisecondsParser2, _Parser);
  var _super = _createSuper(TimestampMillisecondsParser2);
  function TimestampMillisecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampMillisecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 20);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampMillisecondsParser2, [
    {
      key: "parse",
      value: function parse2(dateString) {
        return parseAnyDigitsSigned(dateString);
      }
    },
    {
      key: "set",
      value: function set2(_date, _flags, value) {
        return [
          new Date(value),
          {
            timestampIsSet: true
          }
        ];
      }
    }
  ]);
  return TimestampMillisecondsParser2;
}(Parser);
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};
export {
  isAfter
};
