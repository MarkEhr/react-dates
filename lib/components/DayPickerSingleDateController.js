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

var _isSameDay = _interopRequireDefault(require("../utils/isSameDay"));

var _isAfterDay = _interopRequireDefault(require("../utils/isAfterDay"));

var _isDayVisible = _interopRequireDefault(require("../utils/isDayVisible"));

var _getVisibleDays = _interopRequireDefault(require("../utils/getVisibleDays"));

var _toISODateString = _interopRequireDefault(require("../utils/toISODateString"));

var _modifiers = require("../utils/modifiers");

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
  date: _reactMomentProptypes["default"].momentObj,
  minDate: _reactMomentProptypes["default"].momentObj,
  maxDate: _reactMomentProptypes["default"].momentObj,
  onDateChange: _propTypes["default"].func,
  focused: _propTypes["default"].bool,
  onFocusChange: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  keepOpenOnDateSelect: _propTypes["default"].bool,
  isOutsideRange: _propTypes["default"].func,
  isDayBlocked: _propTypes["default"].func,
  isDayHighlighted: _propTypes["default"].func,
  // DayPicker props
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: _propTypes["default"].func,
  enableOutsideDays: _propTypes["default"].bool,
  numberOfMonths: _propTypes["default"].number,
  orientation: _ScrollableOrientationShape["default"],
  withPortal: _propTypes["default"].bool,
  initialVisibleMonth: _propTypes["default"].func,
  firstDayOfWeek: _DayOfWeekShape["default"],
  hideKeyboardShortcutsPanel: _propTypes["default"].bool,
  daySize: _airbnbPropTypes.nonNegativeInteger,
  verticalHeight: _airbnbPropTypes.nonNegativeInteger,
  noBorder: _propTypes["default"].bool,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,
  transitionDuration: _airbnbPropTypes.nonNegativeInteger,
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
  calendarInfoPosition: _CalendarInfoPositionShape["default"],
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
  date: undefined,
  // TODO: use null
  minDate: null,
  maxDate: null,
  onDateChange: function onDateChange() {},
  focused: false,
  onFocusChange: function onFocusChange() {},
  onClose: function onClose() {},
  keepOpenOnDateSelect: false,
  isOutsideRange: function isOutsideRange() {},
  isDayBlocked: function isDayBlocked() {},
  isDayHighlighted: function isDayHighlighted() {},
  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  daySize: _constants.DAY_SIZE,
  verticalHeight: null,
  noBorder: false,
  verticalBorderSpacing: undefined,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,
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
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
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

var isBlocked = function isBlocked(day, props) {
  var isDayBlocked = props.isDayBlocked,
      isOutsideRange = props.isOutsideRange;
  return isDayBlocked(day) || isOutsideRange(day);
};

var DayPickerSingleDateController =
/*#__PURE__*/
function (_ref) {
  (0, _inheritsLoose2["default"])(DayPickerSingleDateController, _ref);
  var _proto = DayPickerSingleDateController.prototype;

  _proto[!_react["default"].PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };

  function DayPickerSingleDateController(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    _this.isTouchDevice = false;
    var modifiers = {
      today: function today(day) {
        return (0, _isSameDay["default"])(day, (0, _moment["default"])());
      },
      blocked: function blocked(day) {
        return isBlocked(day, props);
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
        return !isBlocked(day, props);
      },
      hovered: function hovered(day) {
        return _this.isHovered(day);
      },
      selected: function selected(day) {
        return _this.isSelected(day);
      },
      'first-day-of-week': function firstDayOfWeek(day) {
        return _this.isFirstDayOfWeek(day);
      },
      'last-day-of-week': function lastDayOfWeek(day) {
        return _this.isLastDayOfWeek(day);
      }
    };

    var _DayPickerSingleDateC = DayPickerSingleDateController.getStateForNewMonth(props, modifiers),
        currentMonth = _DayPickerSingleDateC.currentMonth,
        visibleDays = _DayPickerSingleDateC.visibleDays; // `today` modifier was mocked to be able to get `currentMonth`
    // and then add everything to the state


    modifiers.today = function (day) {
      return _this.isToday(day);
    };

    _this.state = {
      hoverDate: null,
      currentMonth: currentMonth,
      visibleDays: visibleDays,
      disablePrev: _this.shouldDisableMonthNavigation(props.minDate, currentMonth),
      disableNext: _this.shouldDisableMonthNavigation(props.maxDate, currentMonth),
      today: (0, _moment["default"])(),
      // Copy props to state to be able to compare changes inside getDerivedStateFromProps
      isOutsideRange: props.isOutsideRange,
      isDayBlocked: props.isDayBlocked,
      isDayHighlighted: props.isDayHighlighted,
      numberOfMonths: props.numberOfMonths,
      enableOutsideDays: props.enableOutsideDays,
      initialVisibleMonth: props.initialVisibleMonth,
      focused: props.focused,
      date: props.date,
      modifiers: modifiers
    };
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDayClick = _this.onDayClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onNextMonthClick = _this.onNextMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onMonthChange = _this.onMonthChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onYearChange = _this.onYearChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onGetNextScrollableMonths = _this.onGetNextScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onGetPrevScrollableMonths = _this.onGetPrevScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  _proto.componentDidMount = function componentDidMount() {
    this.isTouchDevice = (0, _isTouchDevice["default"])();
  };

  DayPickerSingleDateController.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    var date = props.date,
        focused = props.focused,
        isOutsideRange = props.isOutsideRange,
        isDayBlocked = props.isDayBlocked,
        isDayHighlighted = props.isDayHighlighted,
        initialVisibleMonth = props.initialVisibleMonth,
        numberOfMonths = props.numberOfMonths,
        enableOutsideDays = props.enableOutsideDays;
    var prevIsOutsideRange = state.isOutsideRange,
        prevIsDayBlocked = state.isDayBlocked,
        prevIsDayHighlighted = state.isDayHighlighted,
        prevNumberOfMonths = state.numberOfMonths,
        prevEnableOutsideDays = state.enableOutsideDays,
        prevInitialVisibleMonth = state.initialVisibleMonth,
        prevFocused = state.focused,
        prevDate = state.date,
        modifiers = state.modifiers,
        oldToday = state.today;
    var visibleDays = state.visibleDays; // Copy props to state to be able to compare them in the next call as if they were "prevProps"

    var newState = {
      isOutsideRange: props.isOutsideRange,
      isDayBlocked: props.isDayBlocked,
      isDayHighlighted: props.isDayHighlighted,
      numberOfMonths: props.numberOfMonths,
      enableOutsideDays: props.enableOutsideDays,
      initialVisibleMonth: props.initialVisibleMonth,
      focused: props.focused,
      date: props.date
    };
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

    if (numberOfMonths !== prevNumberOfMonths || enableOutsideDays !== prevEnableOutsideDays || initialVisibleMonth !== prevInitialVisibleMonth && !prevFocused && focused) {
      var newMonthState = this.getStateForNewMonth(props);
      var currentMonth = newMonthState.currentMonth;
      visibleDays = newMonthState.visibleDays;
      newState = _objectSpread({}, newState, {
        currentMonth: currentMonth,
        visibleDays: visibleDays
      });
    }

    var didDateChange = date !== prevDate;
    var didFocusChange = focused !== prevFocused;
    var newModifiers = {};

    if (didDateChange) {
      newModifiers = (0, _modifiers.deleteModifier)(newModifiers, prevDate, 'selected', props, state);
      newModifiers = (0, _modifiers.addModifier)(newModifiers, date, 'selected', props, state);
    }

    if (didFocusChange || recomputePropModifiers) {
      (0, _object["default"])(visibleDays).forEach(function (days) {
        Object.keys(days).forEach(function (day) {
          var momentObj = (0, _getPooledMoment["default"])(day);

          if (isBlocked(momentObj, props)) {
            newModifiers = (0, _modifiers.addModifier)(newModifiers, momentObj, 'blocked', props, state);
          } else {
            newModifiers = (0, _modifiers.deleteModifier)(newModifiers, momentObj, 'blocked', props, state);
          }

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              newModifiers = (0, _modifiers.addModifier)(newModifiers, momentObj, 'blocked-out-of-range', props, state);
            } else {
              newModifiers = (0, _modifiers.deleteModifier)(newModifiers, momentObj, 'blocked-out-of-range', props, state);
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              newModifiers = (0, _modifiers.addModifier)(newModifiers, momentObj, 'blocked-calendar', props, state);
            } else {
              newModifiers = (0, _modifiers.deleteModifier)(newModifiers, momentObj, 'blocked-calendar', props, state);
            }
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

    var today = (0, _moment["default"])();

    if (!(0, _isSameDay["default"])(oldToday, today)) {
      newModifiers = (0, _modifiers.deleteModifier)(newModifiers, oldToday, 'today', props, state);
      newModifiers = (0, _modifiers.addModifier)(newModifiers, today, 'today', props, state);
      newState.today = today;
    }

    if (Object.keys(newModifiers).length > 0) {
      newState = _objectSpread({}, newState, {
        visibleDays: _objectSpread({}, visibleDays, {}, newModifiers)
      });
    }

    return newState;
  };

  _proto.onDayClick = function onDayClick(day, e) {
    if (e) e.preventDefault();
    if (isBlocked(day, this.props)) return;
    var _this$props = this.props,
        onDateChange = _this$props.onDateChange,
        keepOpenOnDateSelect = _this$props.keepOpenOnDateSelect,
        onFocusChange = _this$props.onFocusChange,
        onClose = _this$props.onClose;
    onDateChange(day);

    if (!keepOpenOnDateSelect) {
      onFocusChange({
        focused: false
      });
      onClose({
        date: day
      });
    }
  };

  _proto.onDayMouseEnter = function onDayMouseEnter(day) {
    if (this.isTouchDevice) return;
    var _this$state = this.state,
        hoverDate = _this$state.hoverDate,
        visibleDays = _this$state.visibleDays;
    var modifiers = (0, _modifiers.deleteModifier)({}, hoverDate, 'hovered', this.props, this.state);
    modifiers = (0, _modifiers.addModifier)(modifiers, day, 'hovered', this.props, this.state);
    this.setState({
      hoverDate: day,
      visibleDays: _objectSpread({}, visibleDays, {}, modifiers)
    });
  };

  _proto.onDayMouseLeave = function onDayMouseLeave() {
    var _this$state2 = this.state,
        hoverDate = _this$state2.hoverDate,
        visibleDays = _this$state2.visibleDays;
    if (this.isTouchDevice || !hoverDate) return;
    var modifiers = (0, _modifiers.deleteModifier)({}, hoverDate, 'hovered', this.props, this.state);
    this.setState({
      hoverDate: null,
      visibleDays: _objectSpread({}, visibleDays, {}, modifiers)
    });
  };

  _proto.onPrevMonthClick = function onPrevMonthClick() {
    var _this$props2 = this.props,
        enableOutsideDays = _this$props2.enableOutsideDays,
        maxDate = _this$props2.maxDate,
        minDate = _this$props2.minDate,
        numberOfMonths = _this$props2.numberOfMonths,
        onPrevMonthClick = _this$props2.onPrevMonthClick;
    var _this$state3 = this.state,
        currentMonth = _this$state3.currentMonth,
        visibleDays = _this$state3.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var prevMonth = currentMonth.clone().subtract(1, 'month');
    var prevMonthVisibleDays = (0, _getVisibleDays["default"])(prevMonth, 1, enableOutsideDays);
    var newCurrentMonth = currentMonth.clone().subtract(1, 'month');
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: prevMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread({}, newVisibleDays, {}, DayPickerSingleDateController.getModifiers(prevMonthVisibleDays, modifiers))
    }, function () {
      onPrevMonthClick(prevMonth.clone());
    });
  };

  _proto.onNextMonthClick = function onNextMonthClick() {
    var _this$props3 = this.props,
        enableOutsideDays = _this$props3.enableOutsideDays,
        maxDate = _this$props3.maxDate,
        minDate = _this$props3.minDate,
        numberOfMonths = _this$props3.numberOfMonths,
        onNextMonthClick = _this$props3.onNextMonthClick;
    var _this$state4 = this.state,
        currentMonth = _this$state4.currentMonth,
        visibleDays = _this$state4.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var nextMonth = currentMonth.clone().add(numberOfMonths, 'month');
    var nextMonthVisibleDays = (0, _getVisibleDays["default"])(nextMonth, 1, enableOutsideDays);
    var newCurrentMonth = currentMonth.clone().add(1, 'month');
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread({}, newVisibleDays, {}, DayPickerSingleDateController.getModifiers(nextMonthVisibleDays, modifiers))
    }, function () {
      onNextMonthClick(newCurrentMonth.clone());
    });
  };

  _proto.onMonthChange = function onMonthChange(newMonth) {
    var _this$props4 = this.props,
        numberOfMonths = _this$props4.numberOfMonths,
        enableOutsideDays = _this$props4.enableOutsideDays,
        orientation = _this$props4.orientation;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var newVisibleDays = (0, _getVisibleDays["default"])(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: DayPickerSingleDateController.getModifiers(newVisibleDays, modifiers)
    });
  };

  _proto.onYearChange = function onYearChange(newMonth) {
    var _this$props5 = this.props,
        numberOfMonths = _this$props5.numberOfMonths,
        enableOutsideDays = _this$props5.enableOutsideDays,
        orientation = _this$props5.orientation;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var newVisibleDays = (0, _getVisibleDays["default"])(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: DayPickerSingleDateController.getModifiers(newVisibleDays, modifiers)
    });
  };

  _proto.onGetNextScrollableMonths = function onGetNextScrollableMonths() {
    var _this$props6 = this.props,
        numberOfMonths = _this$props6.numberOfMonths,
        enableOutsideDays = _this$props6.enableOutsideDays;
    var _this$state5 = this.state,
        currentMonth = _this$state5.currentMonth,
        visibleDays = _this$state5.visibleDays;
    var numberOfVisibleMonths = Object.keys(visibleDays).length;
    var nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
    var newVisibleDays = (0, _getVisibleDays["default"])(nextMonth, numberOfMonths, enableOutsideDays, true);
    var modifiers = this.state.modifiers;
    this.setState({
      visibleDays: _objectSpread({}, visibleDays, {}, DayPickerSingleDateController.getModifiers(newVisibleDays, modifiers))
    });
  };

  _proto.onGetPrevScrollableMonths = function onGetPrevScrollableMonths() {
    var _this$props7 = this.props,
        numberOfMonths = _this$props7.numberOfMonths,
        enableOutsideDays = _this$props7.enableOutsideDays;
    var _this$state6 = this.state,
        currentMonth = _this$state6.currentMonth,
        visibleDays = _this$state6.visibleDays;
    var firstPreviousMonth = currentMonth.clone().subtract(numberOfMonths, 'month');
    var newVisibleDays = (0, _getVisibleDays["default"])(firstPreviousMonth, numberOfMonths, enableOutsideDays, true);
    var modifiers = this.state.modifiers;
    this.setState({
      currentMonth: firstPreviousMonth.clone(),
      visibleDays: _objectSpread({}, visibleDays, {}, DayPickerSingleDateController.getModifiers(newVisibleDays, modifiers))
    });
  };

  _proto.getFirstFocusableDay = function getFirstFocusableDay(newMonth) {
    var _this2 = this;

    var _this$props8 = this.props,
        date = _this$props8.date,
        numberOfMonths = _this$props8.numberOfMonths;
    var focusedDate = newMonth.clone().startOf('month');

    if (date) {
      focusedDate = date.clone();
    }

    if (isBlocked(focusedDate, this.props)) {
      var days = [];
      var lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      var currentDay = focusedDate.clone();

      while (!(0, _isAfterDay["default"])(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      var viableDays = days.filter(function (day) {
        return !isBlocked(day, _this2.props) && (0, _isAfterDay["default"])(day, focusedDate);
      });

      if (viableDays.length > 0) {
        var _viableDays = (0, _slicedToArray2["default"])(viableDays, 1);

        focusedDate = _viableDays[0];
      }
    }

    return focusedDate;
  };

  DayPickerSingleDateController.getModifiers = function getModifiers(visibleDays, modifiers) {
    var newModifiers = {};
    Object.keys(visibleDays).forEach(function (month) {
      newModifiers[month] = {};
      visibleDays[month].forEach(function (day) {
        newModifiers[month][(0, _toISODateString["default"])(day)] = DayPickerSingleDateController.getModifiersForDay(day, modifiers);
      });
    });
    return newModifiers;
  };

  DayPickerSingleDateController.getModifiersForDay = function getModifiersForDay(day, modifiers) {
    return new Set(Object.keys(modifiers).filter(function (modifier) {
      return modifiers[modifier](day);
    }));
  };

  DayPickerSingleDateController.getStateForNewMonth = function getStateForNewMonth(nextProps, modifiers) {
    var initialVisibleMonth = nextProps.initialVisibleMonth,
        date = nextProps.date,
        numberOfMonths = nextProps.numberOfMonths,
        orientation = nextProps.orientation,
        enableOutsideDays = nextProps.enableOutsideDays;
    var initialVisibleMonthThunk = initialVisibleMonth || (date ? function () {
      return date;
    } : function () {
      return (0, _moment["default"])();
    });
    var currentMonth = initialVisibleMonthThunk();
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var visibleDays = DayPickerSingleDateController.getModifiers((0, _getVisibleDays["default"])(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths), modifiers);
    return {
      currentMonth: currentMonth,
      visibleDays: visibleDays
    };
  };

  _proto.shouldDisableMonthNavigation = function shouldDisableMonthNavigation(date, visibleMonth) {
    if (!date) return false;
    var _this$props9 = this.props,
        numberOfMonths = _this$props9.numberOfMonths,
        enableOutsideDays = _this$props9.enableOutsideDays;
    return (0, _isDayVisible["default"])(date, visibleMonth, numberOfMonths, enableOutsideDays);
  };

  _proto.isHovered = function isHovered(day) {
    var _ref2 = this.state || {},
        hoverDate = _ref2.hoverDate;

    return (0, _isSameDay["default"])(day, hoverDate);
  };

  _proto.isSelected = function isSelected(day) {
    var date = this.props.date;
    return (0, _isSameDay["default"])(day, date);
  };

  _proto.isToday = function isToday(day) {
    var today = this.state.today;
    return (0, _isSameDay["default"])(day, today);
  };

  _proto.isFirstDayOfWeek = function isFirstDayOfWeek(day) {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    return day.day() === (firstDayOfWeek || _moment["default"].localeData().firstDayOfWeek());
  };

  _proto.isLastDayOfWeek = function isLastDayOfWeek(day) {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    return day.day() === ((firstDayOfWeek || _moment["default"].localeData().firstDayOfWeek()) + 6) % 7;
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        numberOfMonths = _this$props10.numberOfMonths,
        orientation = _this$props10.orientation,
        monthFormat = _this$props10.monthFormat,
        renderMonthText = _this$props10.renderMonthText,
        renderWeekHeaderElement = _this$props10.renderWeekHeaderElement,
        dayPickerNavigationInlineStyles = _this$props10.dayPickerNavigationInlineStyles,
        navPosition = _this$props10.navPosition,
        navPrev = _this$props10.navPrev,
        navNext = _this$props10.navNext,
        renderNavPrevButton = _this$props10.renderNavPrevButton,
        renderNavNextButton = _this$props10.renderNavNextButton,
        noNavButtons = _this$props10.noNavButtons,
        noNavPrevButton = _this$props10.noNavPrevButton,
        noNavNextButton = _this$props10.noNavNextButton,
        onOutsideClick = _this$props10.onOutsideClick,
        onShiftTab = _this$props10.onShiftTab,
        onTab = _this$props10.onTab,
        withPortal = _this$props10.withPortal,
        focused = _this$props10.focused,
        enableOutsideDays = _this$props10.enableOutsideDays,
        hideKeyboardShortcutsPanel = _this$props10.hideKeyboardShortcutsPanel,
        daySize = _this$props10.daySize,
        firstDayOfWeek = _this$props10.firstDayOfWeek,
        renderCalendarDay = _this$props10.renderCalendarDay,
        renderDayContents = _this$props10.renderDayContents,
        renderCalendarInfo = _this$props10.renderCalendarInfo,
        renderMonthElement = _this$props10.renderMonthElement,
        calendarInfoPosition = _this$props10.calendarInfoPosition,
        isFocused = _this$props10.isFocused,
        isRTL = _this$props10.isRTL,
        phrases = _this$props10.phrases,
        dayAriaLabelFormat = _this$props10.dayAriaLabelFormat,
        onBlur = _this$props10.onBlur,
        showKeyboardShortcuts = _this$props10.showKeyboardShortcuts,
        weekDayFormat = _this$props10.weekDayFormat,
        verticalHeight = _this$props10.verticalHeight,
        noBorder = _this$props10.noBorder,
        transitionDuration = _this$props10.transitionDuration,
        verticalBorderSpacing = _this$props10.verticalBorderSpacing,
        horizontalMonthPadding = _this$props10.horizontalMonthPadding;
    var _this$state7 = this.state,
        currentMonth = _this$state7.currentMonth,
        disableNext = _this$state7.disableNext,
        disablePrev = _this$state7.disablePrev,
        visibleDays = _this$state7.visibleDays;
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
      onYearChange: this.onYearChange,
      onGetNextScrollableMonths: this.onGetNextScrollableMonths,
      onGetPrevScrollableMonths: this.onGetPrevScrollableMonths,
      monthFormat: monthFormat,
      withPortal: withPortal,
      hidden: !focused,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      initialVisibleMonth: function initialVisibleMonth() {
        return currentMonth;
      },
      firstDayOfWeek: firstDayOfWeek,
      onOutsideClick: onOutsideClick,
      dayPickerNavigationInlineStyles: dayPickerNavigationInlineStyles,
      navPosition: navPosition,
      disablePrev: disablePrev,
      disableNext: disableNext,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      noNavButtons: noNavButtons,
      noNavNextButton: noNavNextButton,
      noNavPrevButton: noNavPrevButton,
      renderMonthText: renderMonthText,
      renderWeekHeaderElement: renderWeekHeaderElement,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      calendarInfoPosition: calendarInfoPosition,
      isFocused: isFocused,
      getFirstFocusableDay: this.getFirstFocusableDay,
      onBlur: onBlur,
      onTab: onTab,
      onShiftTab: onShiftTab,
      phrases: phrases,
      daySize: daySize,
      isRTL: isRTL,
      showKeyboardShortcuts: showKeyboardShortcuts,
      weekDayFormat: weekDayFormat,
      dayAriaLabelFormat: dayAriaLabelFormat,
      verticalHeight: verticalHeight,
      noBorder: noBorder,
      transitionDuration: transitionDuration,
      verticalBorderSpacing: verticalBorderSpacing,
      horizontalMonthPadding: horizontalMonthPadding
    });
  };

  return DayPickerSingleDateController;
}(_react["default"].PureComponent || _react["default"].Component);

exports["default"] = DayPickerSingleDateController;
(0, _reactLifecyclesCompat.polyfill)(DayPickerSingleDateController);
DayPickerSingleDateController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerSingleDateController.defaultProps = defaultProps;