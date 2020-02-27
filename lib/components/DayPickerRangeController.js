"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _moment = _interopRequireDefault(require("moment"));

var _object = _interopRequireDefault(require("object.values"));

var _isTouchDevice = _interopRequireDefault(require("is-touch-device"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _defaultPhrases = require("../defaultPhrases");

var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));

var _isInclusivelyAfterDay = _interopRequireDefault(require("../utils/isInclusivelyAfterDay"));

var _isNextDay = _interopRequireDefault(require("../utils/isNextDay"));

var _isSameDay = _interopRequireDefault(require("../utils/isSameDay"));

var _isAfterDay = _interopRequireDefault(require("../utils/isAfterDay"));

var _isBeforeDay = _interopRequireDefault(require("../utils/isBeforeDay"));

var _isPreviousDay = _interopRequireDefault(require("../utils/isPreviousDay"));

var _getVisibleDays = _interopRequireDefault(require("../utils/getVisibleDays"));

var _isDayVisible = _interopRequireDefault(require("../utils/isDayVisible"));

var _getSelectedDateOffset = _interopRequireDefault(require("../utils/getSelectedDateOffset"));

var _toISODateString = _interopRequireDefault(require("../utils/toISODateString"));

var _modifiers = require("../utils/modifiers");

var _DisabledShape = _interopRequireDefault(require("../shapes/DisabledShape"));

var _FocusedInputShape = _interopRequireDefault(require("../shapes/FocusedInputShape"));

var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));

var _DayOfWeekShape = _interopRequireDefault(require("../shapes/DayOfWeekShape"));

var _CalendarInfoPositionShape = _interopRequireDefault(require("../shapes/CalendarInfoPositionShape"));

var _NavPositionShape = _interopRequireDefault(require("../shapes/NavPositionShape"));

var _constants = require("../constants");

var _DayPicker = _interopRequireDefault(require("./DayPicker"));

var _getPooledMoment = _interopRequireDefault(require("../utils/getPooledMoment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var propTypes = process.env.NODE_ENV !== "production" ? (0, _airbnbPropTypes.forbidExtraProps)({
  startDate: _reactMomentProptypes["default"].momentObj,
  endDate: _reactMomentProptypes["default"].momentObj,
  onDatesChange: _propTypes["default"].func,
  startDateOffset: _propTypes["default"].func,
  endDateOffset: _propTypes["default"].func,
  minDate: _reactMomentProptypes["default"].momentObj,
  maxDate: _reactMomentProptypes["default"].momentObj,
  focusedInput: _FocusedInputShape["default"],
  onFocusChange: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  keepOpenOnDateSelect: _propTypes["default"].bool,
  minimumNights: _propTypes["default"].number,
  disabled: _DisabledShape["default"],
  isOutsideRange: _propTypes["default"].func,
  isDayBlocked: _propTypes["default"].func,
  isDayHighlighted: _propTypes["default"].func,
  getMinNightsForHoverDate: _propTypes["default"].func,
  daysViolatingMinNightsCanBeClicked: _propTypes["default"].bool,
  // DayPicker props
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: _propTypes["default"].func,
  enableOutsideDays: _propTypes["default"].bool,
  numberOfMonths: _propTypes["default"].number,
  orientation: _ScrollableOrientationShape["default"],
  withPortal: _propTypes["default"].bool,
  initialVisibleMonth: _propTypes["default"].func,
  hideKeyboardShortcutsPanel: _propTypes["default"].bool,
  daySize: _airbnbPropTypes.nonNegativeInteger,
  noBorder: _propTypes["default"].bool,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,
  horizontalMonthPadding: _airbnbPropTypes.nonNegativeInteger,
  dayPickerNavigationInlineStyles: _propTypes["default"].object,
  navPosition: _NavPositionShape["default"],
  navPrev: _propTypes["default"].node,
  navNext: _propTypes["default"].node,
  renderNavPrevButton: _propTypes["default"].func,
  renderNavNextButton: _propTypes["default"].func,
  noNavButtons: _propTypes["default"].bool,
  noNavNextButton: _propTypes["default"].bool,
  noNavPrevButton: _propTypes["default"].bool,
  onPrevMonthClick: _propTypes["default"].func,
  onNextMonthClick: _propTypes["default"].func,
  onOutsideClick: _propTypes["default"].func,
  renderCalendarDay: _propTypes["default"].func,
  renderDayContents: _propTypes["default"].func,
  renderCalendarInfo: _propTypes["default"].func,
  renderKeyboardShortcutsButton: _propTypes["default"].func,
  renderKeyboardShortcutsPanel: _propTypes["default"].func,
  calendarInfoPosition: _CalendarInfoPositionShape["default"],
  firstDayOfWeek: _DayOfWeekShape["default"],
  verticalHeight: _airbnbPropTypes.nonNegativeInteger,
  transitionDuration: _airbnbPropTypes.nonNegativeInteger,
  // accessibility
  onBlur: _propTypes["default"].func,
  isFocused: _propTypes["default"].bool,
  showKeyboardShortcuts: _propTypes["default"].bool,
  onTab: _propTypes["default"].func,
  onShiftTab: _propTypes["default"].func,
  // i18n
  monthFormat: _propTypes["default"].string,
  weekDayFormat: _propTypes["default"].string,
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DayPickerPhrases)),
  dayAriaLabelFormat: _propTypes["default"].string,
  isRTL: _propTypes["default"].bool
}) : {};
var defaultProps = {
  startDate: undefined,
  // TODO: use null
  endDate: undefined,
  // TODO: use null
  minDate: null,
  maxDate: null,
  onDatesChange: function onDatesChange() {},
  startDateOffset: undefined,
  endDateOffset: undefined,
  focusedInput: null,
  onFocusChange: function onFocusChange() {},
  onClose: function onClose() {},
  keepOpenOnDateSelect: false,
  minimumNights: 1,
  disabled: false,
  isOutsideRange: function isOutsideRange() {},
  isDayBlocked: function isDayBlocked() {},
  isDayHighlighted: function isDayHighlighted() {},
  getMinNightsForHoverDate: function getMinNightsForHoverDate() {},
  daysViolatingMinNightsCanBeClicked: false,
  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  daySize: _constants.DAY_SIZE,
  dayPickerNavigationInlineStyles: null,
  navPosition: _constants.NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  noNavButtons: false,
  noNavNextButton: false,
  noNavPrevButton: false,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onOutsideClick: function onOutsideClick() {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  renderMonthElement: null,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  firstDayOfWeek: null,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,
  horizontalMonthPadding: 13,
  // accessibility
  onBlur: function onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,
  onTab: function onTab() {},
  onShiftTab: function onShiftTab() {},
  // i18n
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: _defaultPhrases.DayPickerPhrases,
  dayAriaLabelFormat: undefined,
  isRTL: false
};

var getChooseAvailableDatePhrase = function getChooseAvailableDatePhrase(phrases, focusedInput) {
  if (focusedInput === _constants.START_DATE) {
    return phrases.chooseAvailableStartDate;
  }

  if (focusedInput === _constants.END_DATE) {
    return phrases.chooseAvailableEndDate;
  }

  return phrases.chooseAvailableDate;
};

var doesNotMeetMinimumNights = function doesNotMeetMinimumNights(day, props) {
  var startDate = props.startDate,
      isOutsideRange = props.isOutsideRange,
      focusedInput = props.focusedInput,
      minimumNights = props.minimumNights;
  if (focusedInput !== _constants.END_DATE) return false;

  if (startDate) {
    var dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
    return dayDiff < minimumNights && dayDiff >= 0;
  }

  return isOutsideRange((0, _moment["default"])(day).subtract(minimumNights, 'days'));
};

var isBlocked = function isBlocked(day) {
  var blockDaysViolatingMinNights = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var props = arguments.length > 2 ? arguments[2] : undefined;
  var isDayBlocked = props.isDayBlocked,
      isOutsideRange = props.isOutsideRange;
  return isDayBlocked(day) || isOutsideRange(day) || blockDaysViolatingMinNights && doesNotMeetMinimumNights(day, props);
};

var DayPickerRangeController =
/*#__PURE__*/
function (_ref) {
  (0, _inheritsLoose2["default"])(DayPickerRangeController, _ref);
  var _proto = DayPickerRangeController.prototype;

  _proto[!_react["default"].PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };

  DayPickerRangeController.deleteModifierFromRange = function deleteModifierFromRange(updatedDays, start, end, modifier, props, state) {
    var days = updatedDays;
    var spanStart = start.clone();

    while ((0, _isBeforeDay["default"])(spanStart, end)) {
      days = (0, _modifiers.deleteModifier)(days, spanStart, modifier, props, state);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  };

  DayPickerRangeController.addModifierToRange = function addModifierToRange(updatedDays, start, end, modifier, props, state) {
    var days = updatedDays;
    var spanStart = start.clone();

    while ((0, _isBeforeDay["default"])(spanStart, end)) {
      days = (0, _modifiers.addModifier)(days, spanStart, modifier, props, state);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  };

  function DayPickerRangeController(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    _this.isTouchDevice = (0, _isTouchDevice["default"])();
    var modifiers = {
      today: function today(day) {
        return _this.isToday(day);
      },
      blocked: function blocked(day) {
        return isBlocked(day, true, props);
      },
      'blocked-calendar': function blockedCalendar(day) {
        return props.isDayBlocked(day);
      },
      'blocked-out-of-range': function blockedOutOfRange(day) {
        return props.isOutsideRange(day);
      },
      'highlighted-calendar': function highlightedCalendar(day) {
        return props.isDayHighlighted(day);
      },
      valid: function valid(day) {
        return !isBlocked(day, true, props);
      },
      'selected-start': function selectedStart(day) {
        return _this.isStartDate(day);
      },
      'selected-end': function selectedEnd(day) {
        return _this.isEndDate(day);
      },
      'blocked-minimum-nights': function blockedMinimumNights(day) {
        return doesNotMeetMinimumNights(day, props);
      },
      'selected-span': function selectedSpan(day) {
        return _this.isInSelectedSpan(day);
      },
      'last-in-range': function lastInRange(day) {
        return _this.isLastInRange(day);
      },
      hovered: function hovered(day) {
        return _this.isHovered(day);
      },
      'hovered-span': function hoveredSpan(day) {
        return _this.isInHoveredSpan(day);
      },
      'hovered-offset': function hoveredOffset(day) {
        return _this.isInHoveredSpan(day);
      },
      'after-hovered-start': function afterHoveredStart(day) {
        return _this.isDayAfterHoveredStartDate(day);
      },
      'first-day-of-week': function firstDayOfWeek(day) {
        return _this.isFirstDayOfWeek(day);
      },
      'last-day-of-week': function lastDayOfWeek(day) {
        return _this.isLastDayOfWeek(day);
      },
      'hovered-start-first-possible-end': function hoveredStartFirstPossibleEnd(day, hoverDate) {
        return _this.isFirstPossibleEndDateForHoveredStartDate(day, hoverDate);
      },
      'hovered-start-blocked-minimum-nights': function hoveredStartBlockedMinimumNights(day, hoverDate) {
        return _this.doesNotMeetMinNightsForHoveredStartDate(day, hoverDate);
      },
      'before-hovered-end': function beforeHoveredEnd(day) {
        return _this.isDayBeforeHoveredEndDate(day);
      },
      'no-selected-start-before-selected-end': function noSelectedStartBeforeSelectedEnd(day) {
        return _this.beforeSelectedEnd(day) && !props.startDate;
      },
      'selected-start-in-hovered-span': function selectedStartInHoveredSpan(day, hoverDate) {
        return _this.isStartDate(day) && (0, _isAfterDay["default"])(hoverDate, day);
      },
      'selected-start-no-selected-end': function selectedStartNoSelectedEnd(day) {
        return _this.isStartDate(day) && !props.endDate;
      },
      'selected-end-no-selected-start': function selectedEndNoSelectedStart(day) {
        return _this.isEndDate(day) && !props.startDate;
      }
    };

    var _DayPickerRangeContro = DayPickerRangeController.getStateForNewMonth(props, {}),
        currentMonth = _DayPickerRangeContro.currentMonth,
        visibleDays = _DayPickerRangeContro.visibleDays; // initialize phrases
    // set the appropriate CalendarDay phrase based on focusedInput


    var chooseAvailableDate = getChooseAvailableDatePhrase(props.phrases, props.focusedInput);
    _this.state = {
      hoverDate: null,
      currentMonth: currentMonth,
      phrases: _objectSpread({}, props.phrases, {
        chooseAvailableDate: chooseAvailableDate
      }),
      visibleDays: visibleDays,
      disablePrev: _this.shouldDisableMonthNavigation(props.minDate, currentMonth),
      disableNext: _this.shouldDisableMonthNavigation(props.maxDate, currentMonth),
      today: (0, _moment["default"])(),
      modifiers: modifiers
    };
    _this.onDayClick = _this.onDayClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onNextMonthClick = _this.onNextMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onMonthChange = _this.onMonthChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onYearChange = _this.onYearChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onGetNextScrollableMonths = _this.onGetNextScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onGetPrevScrollableMonths = _this.onGetPrevScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  DayPickerRangeController.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    var startDate = props.startDate,
        endDate = props.endDate,
        focusedInput = props.focusedInput,
        getMinNightsForHoverDate = props.getMinNightsForHoverDate,
        minimumNights = props.minimumNights,
        isOutsideRange = props.isOutsideRange,
        isDayBlocked = props.isDayBlocked,
        isDayHighlighted = props.isDayHighlighted,
        phrases = props.phrases,
        initialVisibleMonth = props.initialVisibleMonth,
        numberOfMonths = props.numberOfMonths,
        enableOutsideDays = props.enableOutsideDays;
    var prevStartDate = state.startDate,
        prevEndDate = state.endDate,
        prevFocusedInput = state.focusedInput,
        prevMinimumNights = state.minimumNights,
        prevIsOutsideRange = state.isOutsideRange,
        prevIsDayBlocked = state.isDayBlocked,
        prevIsDayHighlighted = state.isDayHighlighted,
        prevPhrases = state.phrases,
        prevInitialVisibleMonth = state.initialVisibleMonth,
        prevNumberOfMonths = state.numberOfMonths,
        prevEnableOutsideDays = state.enableOutsideDays,
        hoverDate = state.hoverDate,
        modifiers = state.modifiers,
        oldToday = state.today; // Copy props to state to be able to compare them in the next call as if they were "prevProps"

    var newState = {
      startDate: props.startDate,
      endDate: props.endDate,
      focusedInput: props.focusedInput,
      minimumNights: props.minimumNights,
      isOutsideRange: props.isOutsideRange,
      isDayBlocked: props.isDayBlocked,
      isDayHighlighted: props.isDayHighlighted,
      phrases: props.phrases,
      initialVisibleMonth: props.initialVisibleMonth,
      numberOfMonths: props.numberOfMonths,
      enableOutsideDays: props.enableOutsideDays
    };
    var visibleDays = state.visibleDays;
    var recomputeOutsideRange = false;
    var recomputeDayBlocked = false;
    var recomputeDayHighlighted = false;

    if (isOutsideRange !== prevIsOutsideRange) {
      modifiers['blocked-out-of-range'] = function (day) {
        return isOutsideRange(day);
      };

      recomputeOutsideRange = true;
    }

    if (isDayBlocked !== prevIsDayBlocked) {
      modifiers['blocked-calendar'] = function (day) {
        return isDayBlocked(day);
      };

      recomputeDayBlocked = true;
    }

    if (isDayHighlighted !== prevIsDayHighlighted) {
      modifiers['highlighted-calendar'] = function (day) {
        return isDayHighlighted(day);
      };

      recomputeDayHighlighted = true;
    }

    var recomputePropModifiers = recomputeOutsideRange || recomputeDayBlocked || recomputeDayHighlighted;
    var didStartDateChange = startDate !== prevStartDate;
    var didEndDateChange = endDate !== prevEndDate;
    var didFocusChange = focusedInput !== prevFocusedInput;

    if (numberOfMonths !== prevNumberOfMonths || enableOutsideDays !== prevEnableOutsideDays || initialVisibleMonth !== prevInitialVisibleMonth && !prevFocusedInput && didFocusChange) {
      var newMonthState = DayPickerRangeController.getStateForNewMonth(props, modifiers);
      var currentMonth = newMonthState.currentMonth;
      visibleDays = newMonthState.visibleDays;
      newState.currentMonth = currentMonth;
      newState.visibleDays = visibleDays;
    }

    var newModifiers = {};

    if (didStartDateChange) {
      newModifiers = (0, _modifiers.deleteModifier)(newModifiers, prevStartDate, 'selected-start', props, state);
      newModifiers = (0, _modifiers.addModifier)(newModifiers, startDate, 'selected-start', props, state);

      if (prevStartDate) {
        var startSpan = prevStartDate.clone().add(1, 'day');
        var endSpan = prevStartDate.clone().add(prevMinimumNights + 1, 'days');
        newModifiers = DayPickerRangeController.deleteModifierFromRange(newModifiers, startSpan, endSpan, 'after-hovered-start', props, state);

        if (!endDate || !prevEndDate) {
          newModifiers = (0, _modifiers.deleteModifier)(newModifiers, prevStartDate, 'selected-start-no-selected-end', props, state);
        }
      }

      if (!prevStartDate && endDate && startDate) {
        newModifiers = (0, _modifiers.deleteModifier)(newModifiers, endDate, 'selected-end-no-selected-start', props, state);
        newModifiers = (0, _modifiers.deleteModifier)(newModifiers, endDate, 'selected-end-in-hovered-span', props, state);
        (0, _object["default"])(visibleDays).forEach(function (days) {
          Object.keys(days).forEach(function (day) {
            var momentObj = (0, _moment["default"])(day);
            newModifiers = (0, _modifiers.deleteModifier)(newModifiers, momentObj, 'no-selected-start-before-selected-end', props, state);
          });
        });
      }
    }

    if (didEndDateChange) {
      newModifiers = (0, _modifiers.deleteModifier)(newModifiers, prevEndDate, 'selected-end', props, state);
      newModifiers = (0, _modifiers.addModifier)(newModifiers, endDate, 'selected-end', props, state);

      if (prevEndDate && (!startDate || !prevStartDate)) {
        newModifiers = (0, _modifiers.deleteModifier)(newModifiers, prevEndDate, 'selected-end-no-selected-start', props, state);
      }
    }

    if (didStartDateChange || didEndDateChange) {
      if (prevStartDate && prevEndDate) {
        newModifiers = DayPickerRangeController.deleteModifierFromRange(newModifiers, prevStartDate, prevEndDate.clone().add(1, 'day'), 'selected-span', props, state);
      }

      if (startDate && endDate) {
        newModifiers = DayPickerRangeController.deleteModifierFromRange(newModifiers, startDate, endDate.clone().add(1, 'day'), 'hovered-span', props, state);
        newModifiers = DayPickerRangeController.addModifierToRange(newModifiers, startDate.clone().add(1, 'day'), endDate, 'selected-span', props, state);
      }

      if (startDate && !endDate) {
        newModifiers = (0, _modifiers.addModifier)(newModifiers, startDate, 'selected-start-no-selected-end', props, state);
      }

      if (endDate && !startDate) {
        newModifiers = (0, _modifiers.addModifier)(newModifiers, endDate, 'selected-end-no-selected-start', props, state);
      }

      if (!startDate && endDate) {
        (0, _object["default"])(visibleDays).forEach(function (days) {
          Object.keys(days).forEach(function (day) {
            var momentObj = (0, _moment["default"])(day);

            if ((0, _isBeforeDay["default"])(momentObj, endDate)) {
              newModifiers = (0, _modifiers.addModifier)(newModifiers, momentObj, 'no-selected-start-before-selected-end', props, state);
            }
          });
        });
      }
    }

    var isTouch = (0, _isTouchDevice["default"])();

    if (!isTouch && didStartDateChange && startDate && !endDate) {
      var _startSpan = startDate.clone().add(1, 'day');

      var _endSpan = startDate.clone().add(minimumNights + 1, 'days');

      newModifiers = DayPickerRangeController.addModifierToRange(newModifiers, _startSpan, _endSpan, 'after-hovered-start', props, state);
    }

    if (!isTouch && didEndDateChange && !startDate && endDate) {
      var _startSpan2 = endDate.clone().subtract(minimumNights, 'days');

      var _endSpan2 = endDate.clone();

      newModifiers = DayPickerRangeController.addModifierToRange(newModifiers, _startSpan2, _endSpan2, 'before-hovered-end', props, state);
    }

    if (prevMinimumNights > 0) {
      if (didFocusChange || didStartDateChange || minimumNights !== prevMinimumNights) {
        var _startSpan3 = prevStartDate || oldToday;

        newModifiers = DayPickerRangeController.deleteModifierFromRange(newModifiers, _startSpan3, _startSpan3.clone().add(prevMinimumNights, 'days'), 'blocked-minimum-nights', props, state);
        newModifiers = DayPickerRangeController.deleteModifierFromRange(newModifiers, _startSpan3, _startSpan3.clone().add(prevMinimumNights, 'days'), 'blocked', props, state);
      }
    }

    if (didFocusChange || recomputePropModifiers) {
      (0, _object["default"])(visibleDays).forEach(function (days) {
        Object.keys(days).forEach(function (day) {
          var momentObj = (0, _getPooledMoment["default"])(day);
          var isCurrentDayBlocked = false;

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              newModifiers = (0, _modifiers.addModifier)(newModifiers, momentObj, 'blocked-out-of-range', props, state);
              isCurrentDayBlocked = true;
            } else {
              newModifiers = (0, _modifiers.deleteModifier)(newModifiers, momentObj, 'blocked-out-of-range', props, state);
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              newModifiers = (0, _modifiers.addModifier)(newModifiers, momentObj, 'blocked-calendar', props, state);
              isCurrentDayBlocked = true;
            } else {
              newModifiers = (0, _modifiers.deleteModifier)(newModifiers, momentObj, 'blocked-calendar', props, state);
            }
          }

          if (isCurrentDayBlocked) {
            newModifiers = (0, _modifiers.addModifier)(newModifiers, momentObj, 'blocked', props, state);
          } else {
            newModifiers = (0, _modifiers.deleteModifier)(newModifiers, momentObj, 'blocked', props, state);
          }

          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(momentObj)) {
              newModifiers = (0, _modifiers.addModifier)(newModifiers, momentObj, 'highlighted-calendar', props, state);
            } else {
              newModifiers = (0, _modifiers.deleteModifier)(newModifiers, momentObj, 'highlighted-calendar', props, state);
            }
          }
        });
      });
    }

    if (!isTouch && didFocusChange && hoverDate && !isBlocked(hoverDate, true, props)) {
      var minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);

      if (minNightsForHoverDate > 0 && focusedInput === _constants.END_DATE) {
        newModifiers = DayPickerRangeController.deleteModifierFromRange(newModifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights', props, state);
        newModifiers = (0, _modifiers.deleteModifier)(newModifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end', props, state);
      }

      if (minNightsForHoverDate > 0 && focusedInput === _constants.START_DATE) {
        newModifiers = DayPickerRangeController.addModifierToRange(newModifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights', props, state);
        newModifiers = (0, _modifiers.addModifier)(newModifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end', props, state);
      }
    }

    if (minimumNights > 0 && startDate && focusedInput === _constants.END_DATE) {
      newModifiers = DayPickerRangeController.addModifierToRange(newModifiers, startDate, startDate.clone().add(minimumNights, 'days'), 'blocked-minimum-nights', props, state);
      newModifiers = DayPickerRangeController.addModifierToRange(newModifiers, startDate, startDate.clone().add(minimumNights, 'days'), 'blocked', props, state);
    }

    var today = (0, _moment["default"])();

    if (!(0, _isSameDay["default"])(oldToday, today)) {
      newModifiers = (0, _modifiers.deleteModifier)(newModifiers, this.today, 'today', props, state);
      newModifiers = (0, _modifiers.addModifier)(newModifiers, today, 'today', props, state);
      newState.today = today;
    }

    if (Object.keys(newModifiers).length > 0) {
      newState.visibleDays = _objectSpread({}, visibleDays, {}, newModifiers);
    }

    if (didFocusChange || phrases !== prevPhrases) {
      // set the appropriate CalendarDay phrase based on focusedInput
      var chooseAvailableDate = getChooseAvailableDatePhrase(phrases, focusedInput);
      newState.phrases = _objectSpread({}, phrases, {
        chooseAvailableDate: chooseAvailableDate
      });
    }

    return newState;
  };

  _proto.onDayClick = function onDayClick(day, e) {
    var _this$props = this.props,
        keepOpenOnDateSelect = _this$props.keepOpenOnDateSelect,
        minimumNights = _this$props.minimumNights,
        onBlur = _this$props.onBlur,
        focusedInput = _this$props.focusedInput,
        onFocusChange = _this$props.onFocusChange,
        onClose = _this$props.onClose,
        onDatesChange = _this$props.onDatesChange,
        startDateOffset = _this$props.startDateOffset,
        endDateOffset = _this$props.endDateOffset,
        disabled = _this$props.disabled,
        daysViolatingMinNightsCanBeClicked = _this$props.daysViolatingMinNightsCanBeClicked;
    if (e) e.preventDefault();
    if (isBlocked(day, !daysViolatingMinNightsCanBeClicked, this.props)) return;
    var _this$props2 = this.props,
        startDate = _this$props2.startDate,
        endDate = _this$props2.endDate;

    if (startDateOffset || endDateOffset) {
      startDate = (0, _getSelectedDateOffset["default"])(startDateOffset, day);
      endDate = (0, _getSelectedDateOffset["default"])(endDateOffset, day);

      if (isBlocked(startDate, true, this.props) || isBlocked(endDate, true, this.props)) {
        return;
      }

      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });

      if (!keepOpenOnDateSelect) {
        onFocusChange(null);
        onClose({
          startDate: startDate,
          endDate: endDate
        });
      }
    } else if (focusedInput === _constants.START_DATE) {
      var lastAllowedStartDate = endDate && endDate.clone().subtract(minimumNights, 'days');
      var isStartDateAfterEndDate = (0, _isBeforeDay["default"])(lastAllowedStartDate, day) || (0, _isAfterDay["default"])(startDate, endDate);
      var isEndDateDisabled = disabled === _constants.END_DATE;

      if (!isEndDateDisabled || !isStartDateAfterEndDate) {
        startDate = day;

        if (isStartDateAfterEndDate) {
          endDate = null;
        }
      }

      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });

      if (isEndDateDisabled && !isStartDateAfterEndDate) {
        onFocusChange(null);
        onClose({
          startDate: startDate,
          endDate: endDate
        });
      } else if (!isEndDateDisabled) {
        onFocusChange(_constants.END_DATE);
      }
    } else if (focusedInput === _constants.END_DATE) {
      var firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

      if (!startDate) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
        onFocusChange(_constants.START_DATE);
      } else if ((0, _isInclusivelyAfterDay["default"])(day, firstAllowedEndDate)) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });

        if (!keepOpenOnDateSelect) {
          onFocusChange(null);
          onClose({
            startDate: startDate,
            endDate: endDate
          });
        }
      } else if (daysViolatingMinNightsCanBeClicked && doesNotMeetMinimumNights(day, this.props)) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
      } else if (disabled !== _constants.START_DATE) {
        startDate = day;
        endDate = null;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
      } else {
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
      }
    } else {
      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });
    }

    onBlur();
  };

  _proto.onDayMouseEnter = function onDayMouseEnter(day) {
    /* eslint react/destructuring-assignment: 1 */
    if (this.isTouchDevice) return;
    var _this$props3 = this.props,
        startDate = _this$props3.startDate,
        endDate = _this$props3.endDate,
        focusedInput = _this$props3.focusedInput,
        getMinNightsForHoverDate = _this$props3.getMinNightsForHoverDate,
        minimumNights = _this$props3.minimumNights,
        startDateOffset = _this$props3.startDateOffset,
        endDateOffset = _this$props3.endDateOffset;
    var _this$state = this.state,
        hoverDate = _this$state.hoverDate,
        visibleDays = _this$state.visibleDays,
        dateOffset = _this$state.dateOffset;
    var nextDateOffset = null;

    if (focusedInput) {
      var hasOffset = startDateOffset || endDateOffset;
      var modifiers = {};

      if (hasOffset) {
        var start = (0, _getSelectedDateOffset["default"])(startDateOffset, day);
        var end = (0, _getSelectedDateOffset["default"])(endDateOffset, day, function (rangeDay) {
          return rangeDay.add(1, 'day');
        });
        nextDateOffset = {
          start: start,
          end: end
        }; // eslint-disable-next-line react/destructuring-assignment

        if (dateOffset && dateOffset.start && dateOffset.end) {
          modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset', this.props, this.state);
        }

        modifiers = DayPickerRangeController.addModifierToRange(modifiers, start, end, 'hovered-offset', this.props, this.state);
      }

      if (!hasOffset) {
        modifiers = (0, _modifiers.deleteModifier)(modifiers, hoverDate, 'hovered', this.props, this.state);
        modifiers = (0, _modifiers.addModifier)(modifiers, day, 'hovered', this.props, this.state);

        if (startDate && !endDate && focusedInput === _constants.END_DATE) {
          if ((0, _isAfterDay["default"])(hoverDate, startDate)) {
            var endSpan = hoverDate.clone().add(1, 'day');
            modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span', this.props, this.state);
          }

          if ((0, _isBeforeDay["default"])(day, startDate) || (0, _isSameDay["default"])(day, startDate)) {
            modifiers = (0, _modifiers.deleteModifier)(modifiers, startDate, 'selected-start-in-hovered-span', this.props, this.state);
          }

          if (!isBlocked(day, true, this.props) && (0, _isAfterDay["default"])(day, startDate)) {
            var _endSpan3 = day.clone().add(1, 'day');

            modifiers = DayPickerRangeController.addModifierToRange(modifiers, startDate, _endSpan3, 'hovered-span', this.props, this.state);
            modifiers = (0, _modifiers.addModifier)(modifiers, startDate, 'selected-start-in-hovered-span', this.props, this.state);
          }
        }

        if (!startDate && endDate && focusedInput === _constants.START_DATE) {
          if ((0, _isBeforeDay["default"])(hoverDate, endDate)) {
            modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span', this.props, this.state);
          }

          if ((0, _isAfterDay["default"])(day, endDate) || (0, _isSameDay["default"])(day, endDate)) {
            modifiers = (0, _modifiers.deleteModifier)(modifiers, endDate, 'selected-end-in-hovered-span', this.props, this.state);
          }

          if (!isBlocked(day, true, this.props) && (0, _isBeforeDay["default"])(day, endDate)) {
            modifiers = DayPickerRangeController.addModifierToRange(modifiers, day, endDate, 'hovered-span', this.props, this.state);
            modifiers = (0, _modifiers.addModifier)(modifiers, endDate, 'selected-end-in-hovered-span', this.props, this.state);
          }
        }

        if (startDate) {
          var startSpan = startDate.clone().add(1, 'day');

          var _endSpan4 = startDate.clone().add(minimumNights + 1, 'days');

          modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startSpan, _endSpan4, 'after-hovered-start', this.props, this.state);

          if ((0, _isSameDay["default"])(day, startDate)) {
            var newStartSpan = startDate.clone().add(1, 'day');
            var newEndSpan = startDate.clone().add(minimumNights + 1, 'days');
            modifiers = DayPickerRangeController.addModifierToRange(modifiers, newStartSpan, newEndSpan, 'after-hovered-start', this.props, this.state);
          }
        }

        if (endDate) {
          var _startSpan4 = endDate.clone().subtract(minimumNights, 'days');

          modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, _startSpan4, endDate, 'before-hovered-end', this.props, this.state);

          if ((0, _isSameDay["default"])(day, endDate)) {
            var _newStartSpan = endDate.clone().subtract(minimumNights, 'days');

            modifiers = DayPickerRangeController.addModifierToRange(modifiers, _newStartSpan, endDate, 'before-hovered-end', this.props, this.state);
          }
        }

        if (hoverDate && !isBlocked(hoverDate, true, this.props)) {
          var minNightsForPrevHoverDate = getMinNightsForHoverDate(hoverDate);

          if (minNightsForPrevHoverDate > 0 && focusedInput === _constants.START_DATE) {
            modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForPrevHoverDate, 'days'), 'hovered-start-blocked-minimum-nights', this.props, this.state);
            modifiers = (0, _modifiers.deleteModifier)(modifiers, hoverDate.clone().add(minNightsForPrevHoverDate, 'days'), 'hovered-start-first-possible-end', this.props, this.state);
          }
        }

        if (!isBlocked(day, true, this.props)) {
          var minNightsForHoverDate = getMinNightsForHoverDate(day);

          if (minNightsForHoverDate > 0 && focusedInput === _constants.START_DATE) {
            modifiers = DayPickerRangeController.addModifierToRange(modifiers, day.clone().add(1, 'days'), day.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights', this.props, this.state);
            modifiers = (0, _modifiers.addModifier)(modifiers, day.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end', this.props, this.state);
          }
        }
      }

      this.setState({
        hoverDate: day,
        dateOffset: nextDateOffset,
        visibleDays: _objectSpread({}, visibleDays, {}, modifiers)
      });
    }
  };

  _proto.onDayMouseLeave = function onDayMouseLeave(day) {
    var _this$props4 = this.props,
        startDate = _this$props4.startDate,
        endDate = _this$props4.endDate,
        focusedInput = _this$props4.focusedInput,
        getMinNightsForHoverDate = _this$props4.getMinNightsForHoverDate,
        minimumNights = _this$props4.minimumNights;
    var _this$state2 = this.state,
        hoverDate = _this$state2.hoverDate,
        visibleDays = _this$state2.visibleDays,
        dateOffset = _this$state2.dateOffset;
    if (this.isTouchDevice || !hoverDate) return;
    var modifiers = {};
    modifiers = (0, _modifiers.deleteModifier)(modifiers, hoverDate, 'hovered', this.props, this.state);

    if (dateOffset) {
      modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset', this.props, this.state);
    }

    if (startDate && !endDate) {
      if ((0, _isAfterDay["default"])(hoverDate, startDate)) {
        var endSpan = hoverDate.clone().add(1, 'day');
        modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span', this.props, this.state);
      }

      if ((0, _isAfterDay["default"])(day, startDate)) {
        modifiers = (0, _modifiers.deleteModifier)(modifiers, startDate, 'selected-start-in-hovered-span', this.props, this.state);
      }
    }

    if (!startDate && endDate) {
      if ((0, _isAfterDay["default"])(endDate, hoverDate)) {
        modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span', this.props, this.state);
      }

      if ((0, _isBeforeDay["default"])(day, endDate)) {
        modifiers = (0, _modifiers.deleteModifier)(modifiers, endDate, 'selected-end-in-hovered-span', this.props, this.state);
      }
    }

    if (startDate && (0, _isSameDay["default"])(day, startDate)) {
      var startSpan = startDate.clone().add(1, 'day');

      var _endSpan5 = startDate.clone().add(minimumNights + 1, 'days');

      modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startSpan, _endSpan5, 'after-hovered-start', this.props, this.state);
    }

    if (endDate && (0, _isSameDay["default"])(day, endDate)) {
      var _startSpan5 = endDate.clone().subtract(minimumNights, 'days');

      modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, _startSpan5, endDate, 'before-hovered-end', this.props, this.state);
    }

    if (!isBlocked(hoverDate, true, this.props)) {
      var minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);

      if (minNightsForHoverDate > 0 && focusedInput === _constants.START_DATE) {
        modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights', this.props, this.state);
        modifiers = (0, _modifiers.deleteModifier)(modifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end', this.props, this.state);
      }
    }

    this.setState({
      hoverDate: null,
      visibleDays: _objectSpread({}, visibleDays, {}, modifiers)
    });
  };

  _proto.onPrevMonthClick = function onPrevMonthClick() {
    var _this$props5 = this.props,
        enableOutsideDays = _this$props5.enableOutsideDays,
        maxDate = _this$props5.maxDate,
        minDate = _this$props5.minDate,
        numberOfMonths = _this$props5.numberOfMonths,
        onPrevMonthClick = _this$props5.onPrevMonthClick;
    var _this$state3 = this.state,
        currentMonth = _this$state3.currentMonth,
        visibleDays = _this$state3.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var prevMonth = currentMonth.clone().subtract(2, 'months');
    var prevMonthVisibleDays = (0, _getVisibleDays["default"])(prevMonth, 1, enableOutsideDays, true);
    var newCurrentMonth = currentMonth.clone().subtract(1, 'month');
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread({}, newVisibleDays, {}, DayPickerRangeController.getModifiers(prevMonthVisibleDays, modifiers))
    }, function () {
      onPrevMonthClick(newCurrentMonth.clone());
    });
  };

  _proto.onNextMonthClick = function onNextMonthClick() {
    var _this$props6 = this.props,
        enableOutsideDays = _this$props6.enableOutsideDays,
        maxDate = _this$props6.maxDate,
        minDate = _this$props6.minDate,
        numberOfMonths = _this$props6.numberOfMonths,
        onNextMonthClick = _this$props6.onNextMonthClick;
    var _this$state4 = this.state,
        currentMonth = _this$state4.currentMonth,
        visibleDays = _this$state4.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var nextMonth = currentMonth.clone().add(numberOfMonths + 1, 'month');
    var nextMonthVisibleDays = (0, _getVisibleDays["default"])(nextMonth, 1, enableOutsideDays, true);
    var newCurrentMonth = currentMonth.clone().add(1, 'month');
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread({}, newVisibleDays, {}, DayPickerRangeController.getModifiers(nextMonthVisibleDays, modifiers))
    }, function () {
      onNextMonthClick(newCurrentMonth.clone());
    });
  };

  _proto.onMonthChange = function onMonthChange(newMonth) {
    var _this$props7 = this.props,
        numberOfMonths = _this$props7.numberOfMonths,
        enableOutsideDays = _this$props7.enableOutsideDays,
        orientation = _this$props7.orientation;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var newVisibleDays = (0, _getVisibleDays["default"])(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: DayPickerRangeController.getModifiers(newVisibleDays, modifiers)
    });
  };

  _proto.onYearChange = function onYearChange(newMonth) {
    var _this$props8 = this.props,
        numberOfMonths = _this$props8.numberOfMonths,
        enableOutsideDays = _this$props8.enableOutsideDays,
        orientation = _this$props8.orientation;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var newVisibleDays = (0, _getVisibleDays["default"])(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: DayPickerRangeController.getModifiers(newVisibleDays, modifiers)
    });
  };

  _proto.onGetNextScrollableMonths = function onGetNextScrollableMonths() {
    var _this$props9 = this.props,
        numberOfMonths = _this$props9.numberOfMonths,
        enableOutsideDays = _this$props9.enableOutsideDays;
    var _this$state5 = this.state,
        currentMonth = _this$state5.currentMonth,
        visibleDays = _this$state5.visibleDays;
    var numberOfVisibleMonths = Object.keys(visibleDays).length;
    var nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
    var newVisibleDays = (0, _getVisibleDays["default"])(nextMonth, numberOfMonths, enableOutsideDays, true);
    var modifiers = this.state.modifiers;
    this.setState({
      visibleDays: _objectSpread({}, visibleDays, {}, DayPickerRangeController.getModifiers(newVisibleDays, modifiers))
    });
  };

  _proto.onGetPrevScrollableMonths = function onGetPrevScrollableMonths() {
    var _this$props10 = this.props,
        numberOfMonths = _this$props10.numberOfMonths,
        enableOutsideDays = _this$props10.enableOutsideDays;
    var _this$state6 = this.state,
        currentMonth = _this$state6.currentMonth,
        visibleDays = _this$state6.visibleDays;
    var firstPreviousMonth = currentMonth.clone().subtract(numberOfMonths, 'month');
    var newVisibleDays = (0, _getVisibleDays["default"])(firstPreviousMonth, numberOfMonths, enableOutsideDays, true);
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: firstPreviousMonth.clone(),
      visibleDays: _objectSpread({}, visibleDays, {}, DayPickerRangeController.getModifiers(newVisibleDays, modifiers))
    });
  };

  _proto.getFirstFocusableDay = function getFirstFocusableDay(newMonth) {
    var _this2 = this;

    var _this$props11 = this.props,
        startDate = _this$props11.startDate,
        endDate = _this$props11.endDate,
        focusedInput = _this$props11.focusedInput,
        minimumNights = _this$props11.minimumNights,
        numberOfMonths = _this$props11.numberOfMonths;
    var focusedDate = newMonth.clone().startOf('month');

    if (focusedInput === _constants.START_DATE && startDate) {
      focusedDate = startDate.clone();
    } else if (focusedInput === _constants.END_DATE && !endDate && startDate) {
      focusedDate = startDate.clone().add(minimumNights, 'days');
    } else if (focusedInput === _constants.END_DATE && endDate) {
      focusedDate = endDate.clone();
    }

    if (isBlocked(focusedDate, true, this.props)) {
      var days = [];
      var lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      var currentDay = focusedDate.clone();

      while (!(0, _isAfterDay["default"])(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      var viableDays = days.filter(function (day) {
        return !isBlocked(day, true, _this2.props);
      });

      if (viableDays.length > 0) {
        var _viableDays = (0, _slicedToArray2["default"])(viableDays, 1);

        focusedDate = _viableDays[0];
      }
    }

    return focusedDate;
  };

  DayPickerRangeController.getModifiers = function getModifiers(visibleDays, modifiers) {
    var newModifiers = {};
    Object.keys(visibleDays).forEach(function (month) {
      newModifiers[month] = {};
      visibleDays[month].forEach(function (day) {
        newModifiers[month][(0, _toISODateString["default"])(day)] = DayPickerRangeController.getModifiersForDay(day, modifiers);
      });
    });
    return newModifiers;
  };

  DayPickerRangeController.getModifiersForDay = function getModifiersForDay(day, modifiers) {
    return new Set(Object.keys(modifiers).filter(function (modifier) {
      return modifiers[modifier](day);
    }));
  };

  DayPickerRangeController.getStateForNewMonth = function getStateForNewMonth(nextProps, modifiers) {
    var _this3 = this;

    var initialVisibleMonth = nextProps.initialVisibleMonth,
        numberOfMonths = nextProps.numberOfMonths,
        enableOutsideDays = nextProps.enableOutsideDays,
        orientation = nextProps.orientation,
        startDate = nextProps.startDate;
    var initialVisibleMonthThunk = initialVisibleMonth || (startDate ? function () {
      return startDate;
    } : function () {
      return _this3.today;
    });
    var currentMonth = initialVisibleMonthThunk();
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var visibleDays = DayPickerRangeController.getModifiers((0, _getVisibleDays["default"])(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths), modifiers);
    return {
      currentMonth: currentMonth,
      visibleDays: visibleDays
    };
  };

  _proto.shouldDisableMonthNavigation = function shouldDisableMonthNavigation(date, visibleMonth) {
    if (!date) return false;
    var _this$props12 = this.props,
        numberOfMonths = _this$props12.numberOfMonths,
        enableOutsideDays = _this$props12.enableOutsideDays;
    return (0, _isDayVisible["default"])(date, visibleMonth, numberOfMonths, enableOutsideDays);
  };

  _proto.doesNotMeetMinNightsForHoveredStartDate = function doesNotMeetMinNightsForHoveredStartDate(day, hoverDate) {
    var _this$props13 = this.props,
        focusedInput = _this$props13.focusedInput,
        getMinNightsForHoverDate = _this$props13.getMinNightsForHoverDate;
    if (focusedInput !== _constants.END_DATE) return false;

    if (hoverDate && !isBlocked(hoverDate, true, this.props)) {
      var minNights = getMinNightsForHoverDate(hoverDate);
      var dayDiff = day.diff(hoverDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minNights && dayDiff >= 0;
    }

    return false;
  };

  _proto.isDayAfterHoveredStartDate = function isDayAfterHoveredStartDate(day) {
    var _this$props14 = this.props,
        startDate = _this$props14.startDate,
        endDate = _this$props14.endDate,
        minimumNights = _this$props14.minimumNights;

    var _ref2 = this.state || {},
        hoverDate = _ref2.hoverDate;

    return !!startDate && !endDate && !isBlocked(day, true, this.props) && (0, _isNextDay["default"])(hoverDate, day) && minimumNights > 0 && (0, _isSameDay["default"])(hoverDate, startDate);
  };

  _proto.isEndDate = function isEndDate(day) {
    var endDate = this.props.endDate;
    return (0, _isSameDay["default"])(day, endDate);
  };

  _proto.isHovered = function isHovered(day) {
    var _ref3 = this.state || {},
        hoverDate = _ref3.hoverDate;

    var focusedInput = this.props.focusedInput;
    return !!focusedInput && (0, _isSameDay["default"])(day, hoverDate);
  };

  _proto.isInHoveredSpan = function isInHoveredSpan(day) {
    var _this$props15 = this.props,
        startDate = _this$props15.startDate,
        endDate = _this$props15.endDate;

    var _ref4 = this.state || {},
        hoverDate = _ref4.hoverDate;

    var isForwardRange = !!startDate && !endDate && (day.isBetween(startDate, hoverDate) || (0, _isSameDay["default"])(hoverDate, day));
    var isBackwardRange = !!endDate && !startDate && (day.isBetween(hoverDate, endDate) || (0, _isSameDay["default"])(hoverDate, day));
    var isValidDayHovered = hoverDate && !isBlocked(hoverDate, true, this.props);
    return (isForwardRange || isBackwardRange) && isValidDayHovered;
  };

  _proto.isInSelectedSpan = function isInSelectedSpan(day) {
    var _this$props16 = this.props,
        startDate = _this$props16.startDate,
        endDate = _this$props16.endDate;
    return day.isBetween(startDate, endDate, 'days');
  };

  _proto.isLastInRange = function isLastInRange(day) {
    var endDate = this.props.endDate;
    return this.isInSelectedSpan(day) && (0, _isNextDay["default"])(day, endDate);
  };

  _proto.isStartDate = function isStartDate(day) {
    var startDate = this.props.startDate;
    return (0, _isSameDay["default"])(day, startDate);
  };

  _proto.isToday = function isToday(day) {
    return (0, _isSameDay["default"])(day, this.today);
  };

  _proto.isFirstDayOfWeek = function isFirstDayOfWeek(day) {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    return day.day() === (firstDayOfWeek || _moment["default"].localeData().firstDayOfWeek());
  };

  _proto.isLastDayOfWeek = function isLastDayOfWeek(day) {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    return day.day() === ((firstDayOfWeek || _moment["default"].localeData().firstDayOfWeek()) + 6) % 7;
  };

  _proto.isFirstPossibleEndDateForHoveredStartDate = function isFirstPossibleEndDateForHoveredStartDate(day, hoverDate) {
    var _this$props17 = this.props,
        focusedInput = _this$props17.focusedInput,
        getMinNightsForHoverDate = _this$props17.getMinNightsForHoverDate;

    if (focusedInput !== _constants.END_DATE || !hoverDate || isBlocked(hoverDate, true, this.props)) {
      return false;
    }

    var minNights = getMinNightsForHoverDate(hoverDate);
    var firstAvailableEndDate = hoverDate.clone().add(minNights, 'days');
    return (0, _isSameDay["default"])(day, firstAvailableEndDate);
  };

  _proto.beforeSelectedEnd = function beforeSelectedEnd(day) {
    var endDate = this.props.endDate;
    return (0, _isBeforeDay["default"])(day, endDate);
  };

  _proto.isDayBeforeHoveredEndDate = function isDayBeforeHoveredEndDate(day) {
    var _this$props18 = this.props,
        startDate = _this$props18.startDate,
        endDate = _this$props18.endDate,
        minimumNights = _this$props18.minimumNights;

    var _ref5 = this.state || {},
        hoverDate = _ref5.hoverDate;

    return !!endDate && !startDate && !isBlocked(day, true, this.props) && (0, _isPreviousDay["default"])(hoverDate, day) && minimumNights > 0 && (0, _isSameDay["default"])(hoverDate, endDate);
  };

  _proto.render = function render() {
    var _this$props19 = this.props,
        numberOfMonths = _this$props19.numberOfMonths,
        orientation = _this$props19.orientation,
        monthFormat = _this$props19.monthFormat,
        renderMonthText = _this$props19.renderMonthText,
        renderWeekHeaderElement = _this$props19.renderWeekHeaderElement,
        dayPickerNavigationInlineStyles = _this$props19.dayPickerNavigationInlineStyles,
        navPosition = _this$props19.navPosition,
        navPrev = _this$props19.navPrev,
        navNext = _this$props19.navNext,
        renderNavPrevButton = _this$props19.renderNavPrevButton,
        renderNavNextButton = _this$props19.renderNavNextButton,
        noNavButtons = _this$props19.noNavButtons,
        noNavNextButton = _this$props19.noNavNextButton,
        noNavPrevButton = _this$props19.noNavPrevButton,
        onOutsideClick = _this$props19.onOutsideClick,
        withPortal = _this$props19.withPortal,
        enableOutsideDays = _this$props19.enableOutsideDays,
        firstDayOfWeek = _this$props19.firstDayOfWeek,
        renderKeyboardShortcutsButton = _this$props19.renderKeyboardShortcutsButton,
        renderKeyboardShortcutsPanel = _this$props19.renderKeyboardShortcutsPanel,
        hideKeyboardShortcutsPanel = _this$props19.hideKeyboardShortcutsPanel,
        daySize = _this$props19.daySize,
        focusedInput = _this$props19.focusedInput,
        renderCalendarDay = _this$props19.renderCalendarDay,
        renderDayContents = _this$props19.renderDayContents,
        renderCalendarInfo = _this$props19.renderCalendarInfo,
        renderMonthElement = _this$props19.renderMonthElement,
        calendarInfoPosition = _this$props19.calendarInfoPosition,
        onBlur = _this$props19.onBlur,
        onShiftTab = _this$props19.onShiftTab,
        onTab = _this$props19.onTab,
        isFocused = _this$props19.isFocused,
        showKeyboardShortcuts = _this$props19.showKeyboardShortcuts,
        isRTL = _this$props19.isRTL,
        weekDayFormat = _this$props19.weekDayFormat,
        dayAriaLabelFormat = _this$props19.dayAriaLabelFormat,
        verticalHeight = _this$props19.verticalHeight,
        noBorder = _this$props19.noBorder,
        transitionDuration = _this$props19.transitionDuration,
        verticalBorderSpacing = _this$props19.verticalBorderSpacing,
        horizontalMonthPadding = _this$props19.horizontalMonthPadding;
    var _this$state7 = this.state,
        currentMonth = _this$state7.currentMonth,
        phrases = _this$state7.phrases,
        visibleDays = _this$state7.visibleDays,
        disablePrev = _this$state7.disablePrev,
        disableNext = _this$state7.disableNext;
    return _react["default"].createElement(_DayPicker["default"], {
      orientation: orientation,
      enableOutsideDays: enableOutsideDays,
      modifiers: visibleDays,
      numberOfMonths: numberOfMonths,
      onDayClick: this.onDayClick,
      onDayMouseEnter: this.onDayMouseEnter,
      onDayMouseLeave: this.onDayMouseLeave,
      onPrevMonthClick: this.onPrevMonthClick,
      onNextMonthClick: this.onNextMonthClick,
      onMonthChange: this.onMonthChange,
      onTab: onTab,
      onShiftTab: onShiftTab,
      onYearChange: this.onYearChange,
      onGetNextScrollableMonths: this.onGetNextScrollableMonths,
      onGetPrevScrollableMonths: this.onGetPrevScrollableMonths,
      monthFormat: monthFormat,
      renderMonthText: renderMonthText,
      renderWeekHeaderElement: renderWeekHeaderElement,
      withPortal: withPortal,
      hidden: !focusedInput,
      initialVisibleMonth: function initialVisibleMonth() {
        return currentMonth;
      },
      daySize: daySize,
      onOutsideClick: onOutsideClick,
      disablePrev: disablePrev,
      disableNext: disableNext,
      dayPickerNavigationInlineStyles: dayPickerNavigationInlineStyles,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      noNavButtons: noNavButtons,
      noNavPrevButton: noNavPrevButton,
      noNavNextButton: noNavNextButton,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      renderKeyboardShortcutsButton: renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel: renderKeyboardShortcutsPanel,
      calendarInfoPosition: calendarInfoPosition,
      firstDayOfWeek: firstDayOfWeek,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      isFocused: isFocused,
      getFirstFocusableDay: this.getFirstFocusableDay,
      onBlur: onBlur,
      showKeyboardShortcuts: showKeyboardShortcuts,
      phrases: phrases,
      isRTL: isRTL,
      weekDayFormat: weekDayFormat,
      dayAriaLabelFormat: dayAriaLabelFormat,
      verticalHeight: verticalHeight,
      verticalBorderSpacing: verticalBorderSpacing,
      noBorder: noBorder,
      transitionDuration: transitionDuration,
      horizontalMonthPadding: horizontalMonthPadding
    });
  };

  return DayPickerRangeController;
}(_react["default"].PureComponent || _react["default"].Component);

exports["default"] = DayPickerRangeController;
(0, _reactLifecyclesCompat.polyfill)(DayPickerRangeController);
DayPickerRangeController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerRangeController.defaultProps = defaultProps;