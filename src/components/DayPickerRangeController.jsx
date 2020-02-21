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

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';
import isBeforeDay from '../utils/isBeforeDay';
import isPreviousDay from '../utils/isPreviousDay';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';

import getSelectedDateOffset from '../utils/getSelectedDateOffset';

import toISODateString from '../utils/toISODateString';
import { addModifier, deleteModifier } from '../utils/modifiers';

import DisabledShape from '../shapes/DisabledShape';
import FocusedInputShape from '../shapes/FocusedInputShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
  INFO_POSITION_BOTTOM,
  NAV_POSITION_TOP,
} from '../constants';

import DayPicker from './DayPicker';
import getPooledMoment from '../utils/getPooledMoment';

const propTypes = forbidExtraProps({
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  minDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,

  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  disabled: DisabledShape,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,
  getMinNightsForHoverDate: PropTypes.func,
  daysViolatingMinNightsCanBeClicked: PropTypes.bool,

  // DayPicker props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  noBorder: PropTypes.bool,
  verticalBorderSpacing: nonNegativeInteger,
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
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  firstDayOfWeek: DayOfWeekShape,
  verticalHeight: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,

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
  startDate: undefined, // TODO: use null
  endDate: undefined, // TODO: use null
  minDate: null,
  maxDate: null,
  onDatesChange() {},
  startDateOffset: undefined,
  endDateOffset: undefined,

  focusedInput: null,
  onFocusChange() {},
  onClose() {},

  keepOpenOnDateSelect: false,
  minimumNights: 1,
  disabled: false,
  isOutsideRange() {},
  isDayBlocked() {},
  isDayHighlighted() {},
  getMinNightsForHoverDate() {},
  daysViolatingMinNightsCanBeClicked: false,

  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  daySize: DAY_SIZE,

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
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  firstDayOfWeek: null,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,
  horizontalMonthPadding: 13,

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

const getChooseAvailableDatePhrase = (phrases, focusedInput) => {
  if (focusedInput === START_DATE) {
    return phrases.chooseAvailableStartDate;
  }
  if (focusedInput === END_DATE) {
    return phrases.chooseAvailableEndDate;
  }
  return phrases.chooseAvailableDate;
};

const doesNotMeetMinimumNights = (day, props) => {
  const {
    startDate,
    isOutsideRange,
    focusedInput,
    minimumNights,
  } = props;
  if (focusedInput !== END_DATE) return false;

  if (startDate) {
    const dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
    return dayDiff < minimumNights && dayDiff >= 0;
  }
  return isOutsideRange(moment(day).subtract(minimumNights, 'days'));
};

const isBlocked = (day, blockDaysViolatingMinNights = true, props) => {
  const { isDayBlocked, isOutsideRange } = props;
  return isDayBlocked(day)
    || isOutsideRange(day)
    || (blockDaysViolatingMinNights
      && doesNotMeetMinimumNights(day, props));
};

export default class DayPickerRangeController extends React.PureComponent {
  static deleteModifierFromRange(updatedDays, start, end, modifier, props, state) {
    let days = updatedDays;

    let spanStart = start.clone();
    while (isBeforeDay(spanStart, end)) {
      days = deleteModifier(days, spanStart, modifier, props, state);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  }

  static addModifierToRange(updatedDays, start, end, modifier, props, state) {
    let days = updatedDays;

    let spanStart = start.clone();
    while (isBeforeDay(spanStart, end)) {
      days = addModifier(days, spanStart, modifier, props, state);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  }

  constructor(props) {
    super(props);

    this.isTouchDevice = isTouchDevice();

    const modifiers = {
      today: (day) => this.isToday(day),
      blocked: (day) => isBlocked(day, true, props),
      'blocked-calendar': (day) => props.isDayBlocked(day),
      'blocked-out-of-range': (day) => props.isOutsideRange(day),
      'highlighted-calendar': (day) => props.isDayHighlighted(day),
      valid: (day) => !isBlocked(day, true, props),
      'selected-start': (day) => this.isStartDate(day),
      'selected-end': (day) => this.isEndDate(day),
      'blocked-minimum-nights': (day) => doesNotMeetMinimumNights(day, props),
      'selected-span': (day) => this.isInSelectedSpan(day),
      'last-in-range': (day) => this.isLastInRange(day),
      hovered: (day) => this.isHovered(day),
      'hovered-span': (day) => this.isInHoveredSpan(day),
      'hovered-offset': (day) => this.isInHoveredSpan(day),
      'after-hovered-start': (day) => this.isDayAfterHoveredStartDate(day),
      'first-day-of-week': (day) => this.isFirstDayOfWeek(day),
      'last-day-of-week': (day) => this.isLastDayOfWeek(day),
      'hovered-start-first-possible-end': (day, hoverDate) => this.isFirstPossibleEndDateForHoveredStartDate(day, hoverDate),
      'hovered-start-blocked-minimum-nights': (day, hoverDate) => this.doesNotMeetMinNightsForHoveredStartDate(day, hoverDate),
      'before-hovered-end': (day) => this.isDayBeforeHoveredEndDate(day),
      'no-selected-start-before-selected-end': (day) => this.beforeSelectedEnd(day) && !props.startDate,
      'selected-start-in-hovered-span': (day, hoverDate) => this.isStartDate(day) && isAfterDay(hoverDate, day),
      'selected-start-no-selected-end': (day) => this.isStartDate(day) && !props.endDate,
      'selected-end-no-selected-start': (day) => this.isEndDate(day) && !props.startDate,
    };

    const { currentMonth, visibleDays } = DayPickerRangeController.getStateForNewMonth(props, {});

    // initialize phrases
    // set the appropriate CalendarDay phrase based on focusedInput
    const chooseAvailableDate = getChooseAvailableDatePhrase(props.phrases, props.focusedInput);

    this.state = {
      hoverDate: null,
      currentMonth,
      phrases: {
        ...props.phrases,
        chooseAvailableDate,
      },
      visibleDays,
      disablePrev: this.shouldDisableMonthNavigation(props.minDate, currentMonth),
      disableNext: this.shouldDisableMonthNavigation(props.maxDate, currentMonth),
      today: moment(),
      modifiers,
    };

    this.onDayClick = this.onDayClick.bind(this);
    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onGetNextScrollableMonths = this.onGetNextScrollableMonths.bind(this);
    this.onGetPrevScrollableMonths = this.onGetPrevScrollableMonths.bind(this);
    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      startDate,
      endDate,
      focusedInput,
      getMinNightsForHoverDate,
      minimumNights,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      phrases,
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
    } = props;

    const {
      startDate: prevStartDate,
      endDate: prevEndDate,
      focusedInput: prevFocusedInput,
      minimumNights: prevMinimumNights,
      isOutsideRange: prevIsOutsideRange,
      isDayBlocked: prevIsDayBlocked,
      isDayHighlighted: prevIsDayHighlighted,
      phrases: prevPhrases,
      initialVisibleMonth: prevInitialVisibleMonth,
      numberOfMonths: prevNumberOfMonths,
      enableOutsideDays: prevEnableOutsideDays,

      hoverDate,
      modifiers,
      today: oldToday,
    } = state;

    // Copy props to state to be able to compare them in the next call as if they were "prevProps"
    const newState = {
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
      enableOutsideDays: props.enableOutsideDays,
    };

    let { visibleDays } = state;

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

    const didStartDateChange = startDate !== prevStartDate;
    const didEndDateChange = endDate !== prevEndDate;
    const didFocusChange = focusedInput !== prevFocusedInput;

    if (
      numberOfMonths !== prevNumberOfMonths
      || enableOutsideDays !== prevEnableOutsideDays
      || (
        initialVisibleMonth !== prevInitialVisibleMonth
        && !prevFocusedInput
        && didFocusChange
      )
    ) {
      const newMonthState = DayPickerRangeController.getStateForNewMonth(props, modifiers);
      const { currentMonth } = newMonthState;
      ({ visibleDays } = newMonthState);
      newState.currentMonth = currentMonth;
      newState.visibleDays = visibleDays;
    }

    let newModifiers = {};

    if (didStartDateChange) {
      newModifiers = deleteModifier(newModifiers, prevStartDate, 'selected-start', props, state);
      newModifiers = addModifier(newModifiers, startDate, 'selected-start', props, state);

      if (prevStartDate) {
        const startSpan = prevStartDate.clone().add(1, 'day');
        const endSpan = prevStartDate.clone().add(prevMinimumNights + 1, 'days');
        newModifiers = DayPickerRangeController.deleteModifierFromRange(newModifiers, startSpan, endSpan, 'after-hovered-start', props, state);

        if (!endDate || !prevEndDate) {
          newModifiers = deleteModifier(newModifiers, prevStartDate, 'selected-start-no-selected-end', props, state);
        }
      }

      if (!prevStartDate && endDate && startDate) {
        newModifiers = deleteModifier(newModifiers, endDate, 'selected-end-no-selected-start', props, state);
        newModifiers = deleteModifier(newModifiers, endDate, 'selected-end-in-hovered-span', props, state);

        values(visibleDays).forEach((days) => {
          Object.keys(days).forEach((day) => {
            const momentObj = moment(day);
            newModifiers = deleteModifier(newModifiers, momentObj, 'no-selected-start-before-selected-end', props, state);
          });
        });
      }
    }

    if (didEndDateChange) {
      newModifiers = deleteModifier(newModifiers, prevEndDate, 'selected-end', props, state);
      newModifiers = addModifier(newModifiers, endDate, 'selected-end', props, state);

      if (prevEndDate && (!startDate || !prevStartDate)) {
        newModifiers = deleteModifier(newModifiers, prevEndDate, 'selected-end-no-selected-start', props, state);
      }
    }

    if (didStartDateChange || didEndDateChange) {
      if (prevStartDate && prevEndDate) {
        newModifiers = DayPickerRangeController.deleteModifierFromRange(
          newModifiers,
          prevStartDate,
          prevEndDate.clone().add(1, 'day'),
          'selected-span',
          props,
          state,
        );
      }

      if (startDate && endDate) {
        newModifiers = DayPickerRangeController.deleteModifierFromRange(
          newModifiers,
          startDate,
          endDate.clone().add(1, 'day'),
          'hovered-span',
          props,
          state,
        );

        newModifiers = DayPickerRangeController.addModifierToRange(
          newModifiers,
          startDate.clone().add(1, 'day'),
          endDate,
          'selected-span',
          props,
          state,
        );
      }

      if (startDate && !endDate) {
        newModifiers = addModifier(newModifiers, startDate, 'selected-start-no-selected-end', props, state);
      }

      if (endDate && !startDate) {
        newModifiers = addModifier(newModifiers, endDate, 'selected-end-no-selected-start', props, state);
      }

      if (!startDate && endDate) {
        values(visibleDays).forEach((days) => {
          Object.keys(days).forEach((day) => {
            const momentObj = moment(day);

            if (isBeforeDay(momentObj, endDate)) {
              newModifiers = addModifier(newModifiers, momentObj, 'no-selected-start-before-selected-end', props, state);
            }
          });
        });
      }
    }

    const isTouch = isTouchDevice();

    if (!isTouch && didStartDateChange && startDate && !endDate) {
      const startSpan = startDate.clone().add(1, 'day');
      const endSpan = startDate.clone().add(minimumNights + 1, 'days');
      newModifiers = DayPickerRangeController.addModifierToRange(newModifiers, startSpan, endSpan, 'after-hovered-start', props, state);
    }

    if (!isTouch && didEndDateChange && !startDate && endDate) {
      const startSpan = endDate.clone().subtract(minimumNights, 'days');
      const endSpan = endDate.clone();
      newModifiers = DayPickerRangeController.addModifierToRange(newModifiers, startSpan, endSpan, 'before-hovered-end', props, state);
    }

    if (prevMinimumNights > 0) {
      if (didFocusChange || didStartDateChange || minimumNights !== prevMinimumNights) {
        const startSpan = prevStartDate || oldToday;
        newModifiers = DayPickerRangeController.deleteModifierFromRange(
          newModifiers,
          startSpan,
          startSpan.clone().add(prevMinimumNights, 'days'),
          'blocked-minimum-nights',
          props,
          state,
        );

        newModifiers = DayPickerRangeController.deleteModifierFromRange(
          newModifiers,
          startSpan,
          startSpan.clone().add(prevMinimumNights, 'days'),
          'blocked',
          props,
          state,
        );
      }
    }

    if (didFocusChange || recomputePropModifiers) {
      values(visibleDays).forEach((days) => {
        Object.keys(days).forEach((day) => {
          const momentObj = getPooledMoment(day);
          let isCurrentDayBlocked = false;

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              newModifiers = addModifier(newModifiers, momentObj, 'blocked-out-of-range', props, state);
              isCurrentDayBlocked = true;
            } else {
              newModifiers = deleteModifier(newModifiers, momentObj, 'blocked-out-of-range', props, state);
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              newModifiers = addModifier(newModifiers, momentObj, 'blocked-calendar', props, state);
              isCurrentDayBlocked = true;
            } else {
              newModifiers = deleteModifier(newModifiers, momentObj, 'blocked-calendar', props, state);
            }
          }

          if (isCurrentDayBlocked) {
            newModifiers = addModifier(newModifiers, momentObj, 'blocked', props, state);
          } else {
            newModifiers = deleteModifier(newModifiers, momentObj, 'blocked', props, state);
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

    if (!isTouch && didFocusChange && hoverDate && !isBlocked(hoverDate, true, props)) {
      const minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);
      if (minNightsForHoverDate > 0 && focusedInput === END_DATE) {
        newModifiers = DayPickerRangeController.deleteModifierFromRange(
          newModifiers,
          hoverDate.clone().add(1, 'days'),
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-blocked-minimum-nights',
          props,
          state,
        );

        newModifiers = deleteModifier(
          newModifiers,
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-first-possible-end',
          props,
          state,
        );
      }

      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        newModifiers = DayPickerRangeController.addModifierToRange(
          newModifiers,
          hoverDate.clone().add(1, 'days'),
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-blocked-minimum-nights',
          props,
          state,
        );

        newModifiers = addModifier(
          newModifiers,
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-first-possible-end',
          props,
          state,
        );
      }
    }

    if (minimumNights > 0 && startDate && focusedInput === END_DATE) {
      newModifiers = DayPickerRangeController.addModifierToRange(
        newModifiers,
        startDate,
        startDate.clone().add(minimumNights, 'days'),
        'blocked-minimum-nights',
        props,
        state,
      );

      newModifiers = DayPickerRangeController.addModifierToRange(
        newModifiers,
        startDate,
        startDate.clone().add(minimumNights, 'days'),
        'blocked',
        props,
        state,
      );
    }

    const today = moment();
    if (!isSameDay(oldToday, today)) {
      newModifiers = deleteModifier(newModifiers, this.today, 'today', props, state);
      newModifiers = addModifier(newModifiers, today, 'today', props, state);
      newState.today = today;
    }

    if (Object.keys(newModifiers).length > 0) {
      newState.visibleDays = {
        ...visibleDays,
        ...newModifiers,
      };
    }

    if (didFocusChange || phrases !== prevPhrases) {
      // set the appropriate CalendarDay phrase based on focusedInput
      const chooseAvailableDate = getChooseAvailableDatePhrase(phrases, focusedInput);

      newState.phrases = {
        ...phrases,
        chooseAvailableDate,
      };
    }
    return newState;
  }

  onDayClick(day, e) {
    const {
      keepOpenOnDateSelect,
      minimumNights,
      onBlur,
      focusedInput,
      onFocusChange,
      onClose,
      onDatesChange,
      startDateOffset,
      endDateOffset,
      disabled,
      daysViolatingMinNightsCanBeClicked,
    } = this.props;

    if (e) e.preventDefault();
    if (isBlocked(day, !daysViolatingMinNightsCanBeClicked, this.props)) return;

    let { startDate, endDate } = this.props;

    if (startDateOffset || endDateOffset) {
      startDate = getSelectedDateOffset(startDateOffset, day);
      endDate = getSelectedDateOffset(endDateOffset, day);

      if (isBlocked(startDate, true, this.props) || isBlocked(endDate, true, this.props)) {
        return;
      }

      onDatesChange({ startDate, endDate });

      if (!keepOpenOnDateSelect) {
        onFocusChange(null);
        onClose({ startDate, endDate });
      }
    } else if (focusedInput === START_DATE) {
      const lastAllowedStartDate = endDate && endDate.clone().subtract(minimumNights, 'days');
      const isStartDateAfterEndDate = isBeforeDay(lastAllowedStartDate, day)
        || isAfterDay(startDate, endDate);
      const isEndDateDisabled = disabled === END_DATE;

      if (!isEndDateDisabled || !isStartDateAfterEndDate) {
        startDate = day;
        if (isStartDateAfterEndDate) {
          endDate = null;
        }
      }

      onDatesChange({ startDate, endDate });

      if (isEndDateDisabled && !isStartDateAfterEndDate) {
        onFocusChange(null);
        onClose({ startDate, endDate });
      } else if (!isEndDateDisabled) {
        onFocusChange(END_DATE);
      }
    } else if (focusedInput === END_DATE) {
      const firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

      if (!startDate) {
        endDate = day;
        onDatesChange({ startDate, endDate });
        onFocusChange(START_DATE);
      } else if (isInclusivelyAfterDay(day, firstAllowedEndDate)) {
        endDate = day;
        onDatesChange({ startDate, endDate });
        if (!keepOpenOnDateSelect) {
          onFocusChange(null);
          onClose({ startDate, endDate });
        }
      } else if (
        daysViolatingMinNightsCanBeClicked
        && doesNotMeetMinimumNights(day, this.props)
      ) {
        endDate = day;
        onDatesChange({ startDate, endDate });
      } else if (disabled !== START_DATE) {
        startDate = day;
        endDate = null;
        onDatesChange({ startDate, endDate });
      } else {
        onDatesChange({ startDate, endDate });
      }
    } else {
      onDatesChange({ startDate, endDate });
    }

    onBlur();
  }

  onDayMouseEnter(day) {
    /* eslint react/destructuring-assignment: 1 */
    if (this.isTouchDevice) return;
    const {
      startDate,
      endDate,
      focusedInput,
      getMinNightsForHoverDate,
      minimumNights,
      startDateOffset,
      endDateOffset,
    } = this.props;

    const {
      hoverDate,
      visibleDays,
      dateOffset,
    } = this.state;

    let nextDateOffset = null;

    if (focusedInput) {
      const hasOffset = startDateOffset || endDateOffset;
      let modifiers = {};

      if (hasOffset) {
        const start = getSelectedDateOffset(startDateOffset, day);
        const end = getSelectedDateOffset(endDateOffset, day, (rangeDay) => rangeDay.add(1, 'day'));

        nextDateOffset = {
          start,
          end,
        };

        // eslint-disable-next-line react/destructuring-assignment
        if (dateOffset && dateOffset.start && dateOffset.end) {
          modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset', this.props, this.state);
        }
        modifiers = DayPickerRangeController.addModifierToRange(modifiers, start, end, 'hovered-offset', this.props, this.state);
      }

      if (!hasOffset) {
        modifiers = deleteModifier(modifiers, hoverDate, 'hovered', this.props, this.state);
        modifiers = addModifier(modifiers, day, 'hovered', this.props, this.state);

        if (startDate && !endDate && focusedInput === END_DATE) {
          if (isAfterDay(hoverDate, startDate)) {
            const endSpan = hoverDate.clone().add(1, 'day');
            modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span', this.props, this.state);
          }

          if (isBeforeDay(day, startDate) || isSameDay(day, startDate)) {
            modifiers = deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span', this.props, this.state);
          }

          if (!isBlocked(day, true, this.props) && isAfterDay(day, startDate)) {
            const endSpan = day.clone().add(1, 'day');
            modifiers = DayPickerRangeController.addModifierToRange(modifiers, startDate, endSpan, 'hovered-span', this.props, this.state);
            modifiers = addModifier(modifiers, startDate, 'selected-start-in-hovered-span', this.props, this.state);
          }
        }

        if (!startDate && endDate && focusedInput === START_DATE) {
          if (isBeforeDay(hoverDate, endDate)) {
            modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span', this.props, this.state);
          }

          if (isAfterDay(day, endDate) || isSameDay(day, endDate)) {
            modifiers = deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span', this.props, this.state);
          }

          if (!isBlocked(day, true, this.props) && isBeforeDay(day, endDate)) {
            modifiers = DayPickerRangeController.addModifierToRange(modifiers, day, endDate, 'hovered-span', this.props, this.state);
            modifiers = addModifier(modifiers, endDate, 'selected-end-in-hovered-span', this.props, this.state);
          }
        }

        if (startDate) {
          const startSpan = startDate.clone().add(1, 'day');
          const endSpan = startDate.clone().add(minimumNights + 1, 'days');
          modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start', this.props, this.state);

          if (isSameDay(day, startDate)) {
            const newStartSpan = startDate.clone().add(1, 'day');
            const newEndSpan = startDate.clone().add(minimumNights + 1, 'days');
            modifiers = DayPickerRangeController.addModifierToRange(
              modifiers,
              newStartSpan,
              newEndSpan,
              'after-hovered-start',
              this.props,
              this.state,
            );
          }
        }

        if (endDate) {
          const startSpan = endDate.clone().subtract(minimumNights, 'days');
          modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startSpan, endDate, 'before-hovered-end', this.props, this.state);

          if (isSameDay(day, endDate)) {
            const newStartSpan = endDate.clone().subtract(minimumNights, 'days');
            modifiers = DayPickerRangeController.addModifierToRange(
              modifiers,
              newStartSpan,
              endDate,
              'before-hovered-end',
              this.props,
              this.state,
            );
          }
        }

        if (hoverDate && !isBlocked(hoverDate, true, this.props)) {
          const minNightsForPrevHoverDate = getMinNightsForHoverDate(hoverDate);
          if (minNightsForPrevHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = DayPickerRangeController.deleteModifierFromRange(
              modifiers,
              hoverDate.clone().add(1, 'days'),
              hoverDate.clone().add(minNightsForPrevHoverDate, 'days'),
              'hovered-start-blocked-minimum-nights',
              this.props,
              this.state,
            );

            modifiers = deleteModifier(
              modifiers,
              hoverDate.clone().add(minNightsForPrevHoverDate, 'days'),
              'hovered-start-first-possible-end',
              this.props,
              this.state,
            );
          }
        }

        if (!isBlocked(day, true, this.props)) {
          const minNightsForHoverDate = getMinNightsForHoverDate(day);
          if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = DayPickerRangeController.addModifierToRange(
              modifiers,
              day.clone().add(1, 'days'),
              day.clone().add(minNightsForHoverDate, 'days'),
              'hovered-start-blocked-minimum-nights',
              this.props,
              this.state,
            );

            modifiers = addModifier(
              modifiers,
              day.clone().add(minNightsForHoverDate, 'days'),
              'hovered-start-first-possible-end',
              this.props,
              this.state,
            );
          }
        }
      }

      this.setState({
        hoverDate: day,
        dateOffset: nextDateOffset,
        visibleDays: {
          ...visibleDays,
          ...modifiers,
        },
      });
    }
  }

  onDayMouseLeave(day) {
    const {
      startDate,
      endDate,
      focusedInput,
      getMinNightsForHoverDate,
      minimumNights,
    } = this.props;
    const { hoverDate, visibleDays, dateOffset } = this.state;

    if (this.isTouchDevice || !hoverDate) return;

    let modifiers = {};
    modifiers = deleteModifier(modifiers, hoverDate, 'hovered', this.props, this.state);

    if (dateOffset) {
      modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset', this.props, this.state);
    }

    if (startDate && !endDate) {
      if (isAfterDay(hoverDate, startDate)) {
        const endSpan = hoverDate.clone().add(1, 'day');
        modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span', this.props, this.state);
      }

      if (isAfterDay(day, startDate)) {
        modifiers = deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span', this.props, this.state);
      }
    }

    if (!startDate && endDate) {
      if (isAfterDay(endDate, hoverDate)) {
        modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span', this.props, this.state);
      }

      if (isBeforeDay(day, endDate)) {
        modifiers = deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span', this.props, this.state);
      }
    }

    if (startDate && isSameDay(day, startDate)) {
      const startSpan = startDate.clone().add(1, 'day');
      const endSpan = startDate.clone().add(minimumNights + 1, 'days');
      modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start', this.props, this.state);
    }

    if (endDate && isSameDay(day, endDate)) {
      const startSpan = endDate.clone().subtract(minimumNights, 'days');
      modifiers = DayPickerRangeController.deleteModifierFromRange(modifiers, startSpan, endDate, 'before-hovered-end', this.props, this.state);
    }

    if (!isBlocked(hoverDate, true, this.props)) {
      const minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);
      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        modifiers = DayPickerRangeController.deleteModifierFromRange(
          modifiers,
          hoverDate.clone().add(1, 'days'),
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-blocked-minimum-nights',
          this.props,
          this.state,
        );

        modifiers = deleteModifier(
          modifiers,
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-first-possible-end',
          this.props,
          this.state,
        );
      }
    }


    this.setState({
      hoverDate: null,
      visibleDays: {
        ...visibleDays,
        ...modifiers,
      },
    });
  }

  onPrevMonthClick() {
    const {
      enableOutsideDays,
      maxDate,
      minDate,
      numberOfMonths,
      onPrevMonthClick,
    } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const prevMonth = currentMonth.clone().subtract(2, 'months');
    const prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays, true);

    const newCurrentMonth = currentMonth.clone().subtract(1, 'month');
    const { modifiers } = this.state;
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: {
        ...newVisibleDays,
        ...DayPickerRangeController.getModifiers(prevMonthVisibleDays, modifiers),
      },
    }, () => {
      onPrevMonthClick(newCurrentMonth.clone());
    });
  }

  onNextMonthClick() {
    const {
      enableOutsideDays,
      maxDate,
      minDate,
      numberOfMonths,
      onNextMonthClick,
    } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const nextMonth = currentMonth.clone().add(numberOfMonths + 1, 'month');
    const nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays, true);
    const newCurrentMonth = currentMonth.clone().add(1, 'month');
    const { modifiers } = this.state;
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: {
        ...newVisibleDays,
        ...DayPickerRangeController.getModifiers(nextMonthVisibleDays, modifiers),
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
      visibleDays: DayPickerRangeController.getModifiers(newVisibleDays, modifiers),
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
      visibleDays: DayPickerRangeController.getModifiers(newVisibleDays, modifiers),
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
        ...DayPickerRangeController.getModifiers(newVisibleDays, modifiers),
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
        ...DayPickerRangeController.getModifiers(newVisibleDays, modifiers),
      },
    });
  }

  getFirstFocusableDay(newMonth) {
    const {
      startDate,
      endDate,
      focusedInput,
      minimumNights,
      numberOfMonths,
    } = this.props;

    let focusedDate = newMonth.clone().startOf('month');
    if (focusedInput === START_DATE && startDate) {
      focusedDate = startDate.clone();
    } else if (focusedInput === END_DATE && !endDate && startDate) {
      focusedDate = startDate.clone().add(minimumNights, 'days');
    } else if (focusedInput === END_DATE && endDate) {
      focusedDate = endDate.clone();
    }

    if (isBlocked(focusedDate, true, this.props)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter((day) => !isBlocked(day, true, this.props));

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
        newModifiers[month][toISODateString(day)] = DayPickerRangeController
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
      numberOfMonths,
      enableOutsideDays,
      orientation,
      startDate,
    } = nextProps;
    const initialVisibleMonthThunk = initialVisibleMonth || (
      startDate ? () => startDate : () => this.today
    );
    const currentMonth = initialVisibleMonthThunk();
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const visibleDays = DayPickerRangeController.getModifiers(getVisibleDays(
      currentMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
    ), modifiers);
    return { currentMonth, visibleDays };
  }

  shouldDisableMonthNavigation(date, visibleMonth) {
    if (!date) return false;

    const {
      numberOfMonths,
      enableOutsideDays,
    } = this.props;

    return isDayVisible(date, visibleMonth, numberOfMonths, enableOutsideDays);
  }

  doesNotMeetMinNightsForHoveredStartDate(day, hoverDate) {
    const {
      focusedInput,
      getMinNightsForHoverDate,
    } = this.props;
    if (focusedInput !== END_DATE) return false;

    if (hoverDate && !isBlocked(hoverDate, true, this.props)) {
      const minNights = getMinNightsForHoverDate(hoverDate);
      const dayDiff = day.diff(hoverDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minNights && dayDiff >= 0;
    }
    return false;
  }

  isDayAfterHoveredStartDate(day) {
    const { startDate, endDate, minimumNights } = this.props;
    const { hoverDate } = this.state || {};
    return !!startDate
      && !endDate
      && !isBlocked(day, true, this.props)
      && isNextDay(hoverDate, day)
      && minimumNights > 0
      && isSameDay(hoverDate, startDate);
  }

  isEndDate(day) {
    const { endDate } = this.props;
    return isSameDay(day, endDate);
  }

  isHovered(day) {
    const { hoverDate } = this.state || {};
    const { focusedInput } = this.props;
    return !!focusedInput && isSameDay(day, hoverDate);
  }

  isInHoveredSpan(day) {
    const { startDate, endDate } = this.props;
    const { hoverDate } = this.state || {};

    const isForwardRange = !!startDate && !endDate && (
      day.isBetween(startDate, hoverDate) || isSameDay(hoverDate, day)
    );
    const isBackwardRange = !!endDate && !startDate && (
      day.isBetween(hoverDate, endDate) || isSameDay(hoverDate, day)
    );

    const isValidDayHovered = hoverDate && !isBlocked(hoverDate, true, this.props);

    return (isForwardRange || isBackwardRange) && isValidDayHovered;
  }

  isInSelectedSpan(day) {
    const { startDate, endDate } = this.props;
    return day.isBetween(startDate, endDate, 'days');
  }

  isLastInRange(day) {
    const { endDate } = this.props;
    return this.isInSelectedSpan(day) && isNextDay(day, endDate);
  }

  isStartDate(day) {
    const { startDate } = this.props;
    return isSameDay(day, startDate);
  }

  isToday(day) {
    return isSameDay(day, this.today);
  }

  isFirstDayOfWeek(day) {
    const { firstDayOfWeek } = this.props;
    return day.day() === (firstDayOfWeek || moment.localeData().firstDayOfWeek());
  }

  isLastDayOfWeek(day) {
    const { firstDayOfWeek } = this.props;
    return day.day() === ((firstDayOfWeek || moment.localeData().firstDayOfWeek()) + 6) % 7;
  }

  isFirstPossibleEndDateForHoveredStartDate(day, hoverDate) {
    const { focusedInput, getMinNightsForHoverDate } = this.props;
    if (focusedInput !== END_DATE
      || !hoverDate
      || isBlocked(hoverDate, true, this.props)) {
      return false;
    }
    const minNights = getMinNightsForHoverDate(hoverDate);
    const firstAvailableEndDate = hoverDate.clone().add(minNights, 'days');
    return isSameDay(day, firstAvailableEndDate);
  }

  beforeSelectedEnd(day) {
    const { endDate } = this.props;
    return isBeforeDay(day, endDate);
  }

  isDayBeforeHoveredEndDate(day) {
    const { startDate, endDate, minimumNights } = this.props;
    const { hoverDate } = this.state || {};

    return !!endDate
      && !startDate
      && !isBlocked(day, true, this.props)
      && isPreviousDay(hoverDate, day)
      && minimumNights > 0
      && isSameDay(hoverDate, endDate);
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
      noNavNextButton,
      noNavPrevButton,
      onOutsideClick,
      withPortal,
      enableOutsideDays,
      firstDayOfWeek,
      renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel,
      hideKeyboardShortcutsPanel,
      daySize,
      focusedInput,
      renderCalendarDay,
      renderDayContents,
      renderCalendarInfo,
      renderMonthElement,
      calendarInfoPosition,
      onBlur,
      onShiftTab,
      onTab,
      isFocused,
      showKeyboardShortcuts,
      isRTL,
      weekDayFormat,
      dayAriaLabelFormat,
      verticalHeight,
      noBorder,
      transitionDuration,
      verticalBorderSpacing,
      horizontalMonthPadding,
    } = this.props;

    const {
      currentMonth,
      phrases,
      visibleDays,
      disablePrev,
      disableNext,
    } = this.state;

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
        onTab={onTab}
        onShiftTab={onShiftTab}
        onYearChange={this.onYearChange}
        onGetNextScrollableMonths={this.onGetNextScrollableMonths}
        onGetPrevScrollableMonths={this.onGetPrevScrollableMonths}
        monthFormat={monthFormat}
        renderMonthText={renderMonthText}
        renderWeekHeaderElement={renderWeekHeaderElement}
        withPortal={withPortal}
        hidden={!focusedInput}
        initialVisibleMonth={() => currentMonth}
        daySize={daySize}
        onOutsideClick={onOutsideClick}
        disablePrev={disablePrev}
        disableNext={disableNext}
        dayPickerNavigationInlineStyles={dayPickerNavigationInlineStyles}
        navPosition={navPosition}
        navPrev={navPrev}
        navNext={navNext}
        renderNavPrevButton={renderNavPrevButton}
        renderNavNextButton={renderNavNextButton}
        noNavButtons={noNavButtons}
        noNavPrevButton={noNavPrevButton}
        noNavNextButton={noNavNextButton}
        renderCalendarDay={renderCalendarDay}
        renderDayContents={renderDayContents}
        renderCalendarInfo={renderCalendarInfo}
        renderMonthElement={renderMonthElement}
        renderKeyboardShortcutsButton={renderKeyboardShortcutsButton}
        renderKeyboardShortcutsPanel={renderKeyboardShortcutsPanel}
        calendarInfoPosition={calendarInfoPosition}
        firstDayOfWeek={firstDayOfWeek}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        isFocused={isFocused}
        getFirstFocusableDay={this.getFirstFocusableDay}
        onBlur={onBlur}
        showKeyboardShortcuts={showKeyboardShortcuts}
        phrases={phrases}
        isRTL={isRTL}
        weekDayFormat={weekDayFormat}
        dayAriaLabelFormat={dayAriaLabelFormat}
        verticalHeight={verticalHeight}
        verticalBorderSpacing={verticalBorderSpacing}
        noBorder={noBorder}
        transitionDuration={transitionDuration}
        horizontalMonthPadding={horizontalMonthPadding}
      />
    );
  }
}

polyfill(DayPickerRangeController);

DayPickerRangeController.propTypes = propTypes;
DayPickerRangeController.defaultProps = defaultProps;
