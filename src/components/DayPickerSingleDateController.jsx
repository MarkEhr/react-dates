import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import values from 'object.values';
import isTouchDevice from 'is-touch-device';
import { polyfill } from 'react-lifecycles-compat';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';

import getVisibleDays from '../utils/getVisibleDays';

import toISODateString from '../utils/toISODateString';
import { addModifier, deleteModifier } from '../utils/modifiers';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
  INFO_POSITION_BOTTOM,
  NAV_POSITION_TOP,
} from '../constants';

import DayPicker from './DayPicker';
import getPooledMoment from '../utils/getPooledMoment';

const propTypes = forbidExtraProps({
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func,

  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  verticalHeight: nonNegativeInteger,
  noBorder: PropTypes.bool,
  verticalBorderSpacing: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,
  horizontalMonthPadding: nonNegativeInteger,

  dayPickerNavigationInlineStyles: PropTypes.object,
  navPosition: NavPositionShape,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  renderNavPrevButton: PropTypes.func,
  renderNavNextButton: PropTypes.func,
  noNavButtons: PropTypes.bool,
  noNavNextButton: PropTypes.bool,
  noNavPrevButton: PropTypes.bool,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,

  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,
  onTab: PropTypes.func,
  onShiftTab: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,

  isRTL: PropTypes.bool,
});

const defaultProps = {
  date: undefined, // TODO: use null
  onDateChange() {},

  focused: false,
  onFocusChange() {},
  onClose() {},

  keepOpenOnDateSelect: false,
  isOutsideRange() {},
  isDayBlocked() {},
  isDayHighlighted() {},

  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  daySize: DAY_SIZE,
  verticalHeight: null,
  noBorder: false,
  verticalBorderSpacing: undefined,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,

  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  noNavButtons: false,
  noNavNextButton: false,
  noNavPrevButton: false,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onOutsideClick() {},

  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  renderMonthElement: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,

  // accessibility
  onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,
  onTab() {},
  onShiftTab() {},

  // i18n
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,

  isRTL: false,
};

const isBlocked = (day, props) => {
  const { isDayBlocked, isOutsideRange } = props;
  return isDayBlocked(day) || isOutsideRange(day);
};

export default class DayPickerSingleDateController extends React.PureComponent {
  constructor(props) {
    super(props);

    this.isTouchDevice = false;

    const modifiers = {
      today: (day) => isSameDay(day, moment()),
      blocked: (day) => isBlocked(day, props),
      'blocked-calendar': (day) => props.isDayBlocked(day),
      'blocked-out-of-range': (day) => props.isOutsideRange(day),
      'highlighted-calendar': (day) => props.isDayHighlighted(day),
      valid: (day) => !isBlocked(day, props),
      hovered: (day) => this.isHovered(day),
      selected: (day) => this.isSelected(day),
      'first-day-of-week': (day) => this.isFirstDayOfWeek(day),
      'last-day-of-week': (day) => this.isLastDayOfWeek(day),
    };

    const { currentMonth, visibleDays } = DayPickerSingleDateController
      .getStateForNewMonth(props, modifiers);

    // `today` modifier was mocked to be able to get `currentMonth`
    // and then add everything to the state
    modifiers.today = (day) => this.isToday(day);

    this.state = {
      hoverDate: null,
      currentMonth,
      visibleDays,
      today: moment(),
      // Copy props to state to be able to compare changes inside getDerivedStateFromProps
      isOutsideRange: props.isOutsideRange,
      isDayBlocked: props.isDayBlocked,
      isDayHighlighted: props.isDayHighlighted,
      numberOfMonths: props.numberOfMonths,
      enableOutsideDays: props.enableOutsideDays,
      initialVisibleMonth: props.initialVisibleMonth,
      focused: props.focused,
      date: props.date,
      modifiers,
    };

    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onGetNextScrollableMonths = this.onGetNextScrollableMonths.bind(this);
    this.onGetPrevScrollableMonths = this.onGetPrevScrollableMonths.bind(this);
    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);
  }

  componentDidMount() {
    this.isTouchDevice = isTouchDevice();
  }

  static getDerivedStateFromProps(props, state) {
    const {
      date,
      focused,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
    } = props;
    const {
      isOutsideRange: prevIsOutsideRange,
      isDayBlocked: prevIsDayBlocked,
      isDayHighlighted: prevIsDayHighlighted,
      numberOfMonths: prevNumberOfMonths,
      enableOutsideDays: prevEnableOutsideDays,
      initialVisibleMonth: prevInitialVisibleMonth,
      focused: prevFocused,
      date: prevDate,
      modifiers,
      today: oldToday,
    } = state;
    let { visibleDays } = state;

    // Copy props to state to be able to compare them in the next call as if they were "prevProps"
    let newState = {
      isOutsideRange: props.isOutsideRange,
      isDayBlocked: props.isDayBlocked,
      isDayHighlighted: props.isDayHighlighted,
      numberOfMonths: props.numberOfMonths,
      enableOutsideDays: props.enableOutsideDays,
      initialVisibleMonth: props.initialVisibleMonth,
      focused: props.focused,
      date: props.date,
    };

    let recomputeOutsideRange = false;
    let recomputeDayBlocked = false;
    let recomputeDayHighlighted = false;

    if (isOutsideRange !== prevIsOutsideRange) {
      modifiers['blocked-out-of-range'] = (day) => isOutsideRange(day);
      recomputeOutsideRange = true;
    }

    if (isDayBlocked !== prevIsDayBlocked) {
      modifiers['blocked-calendar'] = (day) => isDayBlocked(day);
      recomputeDayBlocked = true;
    }

    if (isDayHighlighted !== prevIsDayHighlighted) {
      modifiers['highlighted-calendar'] = (day) => isDayHighlighted(day);
      recomputeDayHighlighted = true;
    }

    const recomputePropModifiers = (
      recomputeOutsideRange || recomputeDayBlocked || recomputeDayHighlighted
    );

    if (
      numberOfMonths !== prevNumberOfMonths
      || enableOutsideDays !== prevEnableOutsideDays
      || (
        initialVisibleMonth !== prevInitialVisibleMonth
        && !prevFocused
        && focused
      )
    ) {
      const newMonthState = this.getStateForNewMonth(props);
      const { currentMonth } = newMonthState;
      ({ visibleDays } = newMonthState);
      newState = {
        ...newState,
        currentMonth,
        visibleDays,
      };
    }

    const didDateChange = date !== prevDate;
    const didFocusChange = focused !== prevFocused;

    let newModifiers = {};

    if (didDateChange) {
      newModifiers = deleteModifier(newModifiers, prevDate, 'selected', props, state);
      newModifiers = addModifier(newModifiers, date, 'selected', props, state);
    }

    if (didFocusChange || recomputePropModifiers) {
      values(visibleDays).forEach((days) => {
        Object.keys(days).forEach((day) => {
          const momentObj = getPooledMoment(day);
          if (isBlocked(momentObj, props)) {
            newModifiers = addModifier(newModifiers, momentObj, 'blocked', props, state);
          } else {
            newModifiers = deleteModifier(newModifiers, momentObj, 'blocked', props, state);
          }

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              newModifiers = addModifier(newModifiers, momentObj, 'blocked-out-of-range', props, state);
            } else {
              newModifiers = deleteModifier(newModifiers, momentObj, 'blocked-out-of-range', props, state);
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              newModifiers = addModifier(newModifiers, momentObj, 'blocked-calendar', props, state);
            } else {
              newModifiers = deleteModifier(newModifiers, momentObj, 'blocked-calendar', props, state);
            }
          }

          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(momentObj)) {
              newModifiers = addModifier(newModifiers, momentObj, 'highlighted-calendar', props, state);
            } else {
              newModifiers = deleteModifier(newModifiers, momentObj, 'highlighted-calendar', props, state);
            }
          }
        });
      });
    }

    const today = moment();
    if (!isSameDay(oldToday, today)) {
      newModifiers = deleteModifier(newModifiers, oldToday, 'today', props, state);
      newModifiers = addModifier(newModifiers, today, 'today', props, state);
      newState.today = today;
    }

    if (Object.keys(newModifiers).length > 0) {
      newState = {
        ...newState,
        visibleDays: {
          ...visibleDays,
          ...newModifiers,
        },
      };
    }

    return newState;
  }

  onDayClick(day, e) {
    if (e) e.preventDefault();
    if (isBlocked(day, this.props)) return;
    const {
      onDateChange,
      keepOpenOnDateSelect,
      onFocusChange,
      onClose,
    } = this.props;

    onDateChange(day);
    if (!keepOpenOnDateSelect) {
      onFocusChange({ focused: false });
      onClose({ date: day });
    }
  }

  onDayMouseEnter(day) {
    if (this.isTouchDevice) return;
    const { hoverDate, visibleDays } = this.state;

    let modifiers = deleteModifier({}, hoverDate, 'hovered', this.props, this.state);
    modifiers = addModifier(modifiers, day, 'hovered', this.props, this.state);

    this.setState({
      hoverDate: day,
      visibleDays: {
        ...visibleDays,
        ...modifiers,
      },
    });
  }

  onDayMouseLeave() {
    const { hoverDate, visibleDays } = this.state;
    if (this.isTouchDevice || !hoverDate) return;

    const modifiers = deleteModifier({}, hoverDate, 'hovered', this.props, this.state);

    this.setState({
      hoverDate: null,
      visibleDays: {
        ...visibleDays,
        ...modifiers,
      },
    });
  }

  onPrevMonthClick() {
    const { onPrevMonthClick, numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const prevMonth = currentMonth.clone().subtract(1, 'month');
    const prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays);

    const { modifiers } = this.state;

    this.setState({
      currentMonth: prevMonth,
      visibleDays: {
        ...newVisibleDays,
        ...DayPickerSingleDateController.getModifiers(prevMonthVisibleDays, modifiers),
      },
    }, () => {
      onPrevMonthClick(prevMonth.clone());
    });
  }

  onNextMonthClick() {
    const { onNextMonthClick, numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const nextMonth = currentMonth.clone().add(numberOfMonths, 'month');
    const nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays);

    const newCurrentMonth = currentMonth.clone().add(1, 'month');
    const { modifiers } = this.state;
    this.setState({
      currentMonth: newCurrentMonth,
      visibleDays: {
        ...newVisibleDays,
        ...DayPickerSingleDateController.getModifiers(nextMonthVisibleDays, modifiers),
      },
    }, () => {
      onNextMonthClick(newCurrentMonth.clone());
    });
  }

  onMonthChange(newMonth) {
    const { numberOfMonths, enableOutsideDays, orientation } = this.props;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const newVisibleDays = getVisibleDays(
      newMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
    );
    const { modifiers } = this.state;
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: DayPickerSingleDateController.getModifiers(newVisibleDays, modifiers),
    });
  }

  onYearChange(newMonth) {
    const { numberOfMonths, enableOutsideDays, orientation } = this.props;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const newVisibleDays = getVisibleDays(
      newMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
    );
    const { modifiers } = this.state;

    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: DayPickerSingleDateController.getModifiers(newVisibleDays, modifiers),
    });
  }

  onGetNextScrollableMonths() {
    const { numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const numberOfVisibleMonths = Object.keys(visibleDays).length;
    const nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
    const newVisibleDays = getVisibleDays(nextMonth, numberOfMonths, enableOutsideDays, true);

    const { modifiers } = this.state;

    this.setState({
      visibleDays: {
        ...visibleDays,
        ...DayPickerSingleDateController.getModifiers(newVisibleDays, modifiers),
      },
    });
  }

  onGetPrevScrollableMonths() {
    const { numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const firstPreviousMonth = currentMonth.clone().subtract(numberOfMonths, 'month');
    const newVisibleDays = getVisibleDays(
      firstPreviousMonth, numberOfMonths, enableOutsideDays, true,
    );

    const { modifiers } = this.state;

    this.setState({
      currentMonth: firstPreviousMonth.clone(),
      visibleDays: {
        ...visibleDays,
        ...DayPickerSingleDateController.getModifiers(newVisibleDays, modifiers),
      },
    });
  }

  getFirstFocusableDay(newMonth) {
    const { date, numberOfMonths } = this.props;

    let focusedDate = newMonth.clone().startOf('month');
    if (date) {
      focusedDate = date.clone();
    }

    if (isBlocked(focusedDate, this.props)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter((day) => (
        !isBlocked(day, this.props) && isAfterDay(day, focusedDate)
      ));
      if (viableDays.length > 0) {
        ([focusedDate] = viableDays);
      }
    }

    return focusedDate;
  }

  static getModifiers(visibleDays, modifiers) {
    const newModifiers = {};
    Object.keys(visibleDays).forEach((month) => {
      newModifiers[month] = {};
      visibleDays[month].forEach((day) => {
        newModifiers[month][toISODateString(day)] = DayPickerSingleDateController
          .getModifiersForDay(day, modifiers);
      });
    });

    return newModifiers;
  }

  static getModifiersForDay(day, modifiers) {
    return new Set(Object.keys(modifiers).filter((modifier) => modifiers[modifier](day)));
  }

  static getStateForNewMonth(nextProps, modifiers) {
    const {
      initialVisibleMonth,
      date,
      numberOfMonths,
      orientation,
      enableOutsideDays,
    } = nextProps;
    const initialVisibleMonthThunk = initialVisibleMonth || (date ? () => date : () => moment());
    const currentMonth = initialVisibleMonthThunk();
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const visibleDays = DayPickerSingleDateController.getModifiers(getVisibleDays(
      currentMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
    ), modifiers);
    return { currentMonth, visibleDays };
  }

  isHovered(day) {
    const { hoverDate } = this.state || {};
    return isSameDay(day, hoverDate);
  }

  isSelected(day) {
    const { date } = this.props;
    return isSameDay(day, date);
  }

  isToday(day) {
    const { today } = this.state;
    return isSameDay(day, today);
  }

  isFirstDayOfWeek(day) {
    const { firstDayOfWeek } = this.props;
    return day.day() === (firstDayOfWeek || moment.localeData().firstDayOfWeek());
  }

  isLastDayOfWeek(day) {
    const { firstDayOfWeek } = this.props;
    return day.day() === ((firstDayOfWeek || moment.localeData().firstDayOfWeek()) + 6) % 7;
  }

  render() {
    const {
      numberOfMonths,
      orientation,
      monthFormat,
      renderMonthText,
      renderWeekHeaderElement,
      dayPickerNavigationInlineStyles,
      navPosition,
      navPrev,
      navNext,
      renderNavPrevButton,
      renderNavNextButton,
      noNavButtons,
      noNavPrevButton,
      noNavNextButton,
      onOutsideClick,
      onShiftTab,
      onTab,
      withPortal,
      focused,
      enableOutsideDays,
      hideKeyboardShortcutsPanel,
      daySize,
      firstDayOfWeek,
      renderCalendarDay,
      renderDayContents,
      renderCalendarInfo,
      renderMonthElement,
      calendarInfoPosition,
      isFocused,
      isRTL,
      phrases,
      dayAriaLabelFormat,
      onBlur,
      showKeyboardShortcuts,
      weekDayFormat,
      verticalHeight,
      noBorder,
      transitionDuration,
      verticalBorderSpacing,
      horizontalMonthPadding,
    } = this.props;

    const { currentMonth, visibleDays } = this.state;

    return (
      <DayPicker
        orientation={orientation}
        enableOutsideDays={enableOutsideDays}
        modifiers={visibleDays}
        numberOfMonths={numberOfMonths}
        onDayClick={this.onDayClick}
        onDayMouseEnter={this.onDayMouseEnter}
        onDayMouseLeave={this.onDayMouseLeave}
        onPrevMonthClick={this.onPrevMonthClick}
        onNextMonthClick={this.onNextMonthClick}
        onMonthChange={this.onMonthChange}
        onYearChange={this.onYearChange}
        onGetNextScrollableMonths={this.onGetNextScrollableMonths}
        onGetPrevScrollableMonths={this.onGetPrevScrollableMonths}
        monthFormat={monthFormat}
        withPortal={withPortal}
        hidden={!focused}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        initialVisibleMonth={() => currentMonth}
        firstDayOfWeek={firstDayOfWeek}
        onOutsideClick={onOutsideClick}
        dayPickerNavigationInlineStyles={dayPickerNavigationInlineStyles}
        navPosition={navPosition}
        navPrev={navPrev}
        navNext={navNext}
        renderNavPrevButton={renderNavPrevButton}
        renderNavNextButton={renderNavNextButton}
        noNavButtons={noNavButtons}
        noNavNextButton={noNavNextButton}
        noNavPrevButton={noNavPrevButton}
        renderMonthText={renderMonthText}
        renderWeekHeaderElement={renderWeekHeaderElement}
        renderCalendarDay={renderCalendarDay}
        renderDayContents={renderDayContents}
        renderCalendarInfo={renderCalendarInfo}
        renderMonthElement={renderMonthElement}
        calendarInfoPosition={calendarInfoPosition}
        isFocused={isFocused}
        getFirstFocusableDay={this.getFirstFocusableDay}
        onBlur={onBlur}
        onTab={onTab}
        onShiftTab={onShiftTab}
        phrases={phrases}
        daySize={daySize}
        isRTL={isRTL}
        showKeyboardShortcuts={showKeyboardShortcuts}
        weekDayFormat={weekDayFormat}
        dayAriaLabelFormat={dayAriaLabelFormat}
        verticalHeight={verticalHeight}
        noBorder={noBorder}
        transitionDuration={transitionDuration}
        verticalBorderSpacing={verticalBorderSpacing}
        horizontalMonthPadding={horizontalMonthPadding}
      />
    );
  }
}

polyfill(DayPickerSingleDateController);

DayPickerSingleDateController.propTypes = propTypes;
DayPickerSingleDateController.defaultProps = defaultProps;
