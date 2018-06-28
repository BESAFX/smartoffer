package com.besafx.app.util;

import org.joda.time.*;
import org.joda.time.chrono.IslamicChronology;
import org.joda.time.format.DateTimeFormat;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.chrono.HijrahChronology;
import java.time.chrono.HijrahDate;
import java.time.chrono.IsoChronology;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class DateConverter {

    public static Date now() {
        int year = Calendar.getInstance().get(Calendar.YEAR);
        int month = Calendar.getInstance().get(Calendar.MONTH);
        int day_of_month = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
        int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        int min = Calendar.getInstance().get(Calendar.MINUTE);
        int sec = Calendar.getInstance().get(Calendar.SECOND);
        return new GregorianCalendar(year, month, day_of_month, hour, min, sec).getTime();
    }

    public static String getDateInFormat(long dateInSeconds) {
        return new SimpleDateFormat("yyyy-MM-dd").format(new Date(dateInSeconds));
    }

    public static String getDateInFormat(Date date) {
        return new SimpleDateFormat("yyyy/MM/dd").format(date);
    }

    public static String getTimeFromDate(Date date) {
        return new SimpleDateFormat("a mm:hh").format(date);
    }

    public static String getDateInFormatWithTime(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd hh:mm a").format(date);
    }

    public static String getYearShortcut(Date date) {
        Calendar cl = Calendar.getInstance();
        cl.setTime(date);
        HijrahDate islamicDate = HijrahChronology.INSTANCE
                .date(LocalDate.of(cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DATE)));
        String value = islamicDate.format(DateTimeFormatter.ofPattern("yyyy"));
        return value.substring(2);
        //return new SimpleDateFormat("yy").format(date);
    }

    public static HijrahDate getHijriFromDate(Date date) {
        Calendar cl = Calendar.getInstance();
        cl.setTime(date);
        return HijrahChronology.INSTANCE
                .date(LocalDate.of(cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DATE)));
    }

    public static String getHijriTodayString() {
        Calendar cl = Calendar.getInstance();
        cl.setTime(new Date());
        HijrahDate islamicDate = HijrahChronology.INSTANCE
                .date(LocalDate.of(cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DATE)));
        return islamicDate.format(DateTimeFormatter.ofPattern("EEEE", Locale.forLanguageTag("ar")));
    }

    public static String getHijriTodayDateString() {
        Calendar cl = Calendar.getInstance();
        cl.setTime(new Date());
        HijrahDate islamicDate = HijrahChronology.INSTANCE
                .date(LocalDate.of(cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DATE)));
        return islamicDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.forLanguageTag("ar")));
    }

    public static String getHijriStringFromDateLTR(long date) {
        return getHijriStringFromDateLTR(new Date(date));
    }

    public static String getHijriStringFromDateLTR(Date date) {
        Calendar cl = Calendar.getInstance();
        cl.setTime(date);
        HijrahDate islamicDate = HijrahChronology.INSTANCE
                .date(LocalDate.of(cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DATE)));
        return islamicDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    public static String getHijriStringFromDateRTLWithTime(long date) {
        return getHijriStringFromDateRTLWithTime(new Date(date));
    }

    public static String getHijriStringFromDateRTLWithTime(Date date) {
        Calendar cl = Calendar.getInstance();
        cl.setTime(date);
        HijrahDate islamicDate = HijrahChronology.INSTANCE.date(LocalDate.of(cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DATE)));
        return islamicDate.format(DateTimeFormatter.ofPattern("yyyy/MM/dd")) + " " + new SimpleDateFormat("hh:mm a").format(date).replaceAll("PM", "م").replaceAll("AM", "ص");
    }

    public static String getHijriStringFromDateLTRWithTime(Date date) {
        Calendar cl = Calendar.getInstance();
        cl.setTime(date);
        HijrahDate islamicDate = HijrahChronology.INSTANCE.date(LocalDate.of(cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DATE)));
        return islamicDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + " " + new SimpleDateFormat("hh:mm a").format(date);
    }

    public static String getHijriStringFromDateRTL(long date) {
        return getHijriStringFromDateRTL(new Date(date));
    }

    public static String getHijriStringFromDateRTL(Date date) {
        Calendar cl = Calendar.getInstance();
        cl.setTime(date);
        HijrahDate islamicDate = HijrahChronology.INSTANCE
                .date(LocalDate.of(cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DATE)));
        return islamicDate.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    public static Date getDateFromHijri(HijrahDate date) {
        LocalDate localDate = IsoChronology.INSTANCE.date(date);
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    public static Date getDateFromHijri(int year, int month, int day) {
        try {
            HijrahDate date = HijrahChronology.INSTANCE.date(year, month, day);
            LocalDate localDate = IsoChronology.INSTANCE.date(date);
            return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        } catch (Exception ex) {
            return null;
        }
    }

    public static String getDateStringFromHijri(HijrahDate date) {
        return IsoChronology.INSTANCE.date(date).format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    public static Date parseHijriDateStringWithFormat(String date, String format) throws Exception {
        org.joda.time.format.DateTimeFormatter formatter = DateTimeFormat.forPattern(format).withChronology(IslamicChronology.getInstance());
        return formatter.parseDateTime(date).toDate();
    }

    public static Date getCurrentWeekStart() {
        Calendar cal = GregorianCalendar.getInstance(Locale.forLanguageTag("ar"));
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.clear(Calendar.MINUTE);
        cal.clear(Calendar.SECOND);
        cal.clear(Calendar.MILLISECOND);
        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
        return cal.getTime();
    }

    public static Date getCurrentWeekEnd() {
        Calendar cal = GregorianCalendar.getInstance(Locale.forLanguageTag("ar"));
        cal.setTime(getCurrentWeekStart());
        cal.add(Calendar.DATE, 6);
        return cal.getTime();
    }

    public static List<Interval> getDaysOfThisWeek() {
        List<Interval> dates = new ArrayList<>();
        DateTime startDate = new DateTime(DateConverter.getCurrentWeekStart());
        DateTime endDate = new DateTime(DateConverter.getCurrentWeekEnd());
        int days = Days.daysBetween(startDate, endDate).getDays() + 1;
        for (int i = 0; i < days; i++) {
            DateTime start = startDate.withFieldAdded(DurationFieldType.days(), i).withTimeAtStartOfDay();
            DateTime end = start.plusDays(1).withTimeAtStartOfDay();
            dates.add(new Interval(start, end));
        }
        return dates;
    }

    public static List<Interval> getMonthsOfThisYear() {
        List<Interval> dates = new ArrayList<>();
        DateTime startDate = new DateTime().withMonthOfYear(1).withDayOfMonth(1);
        DateTime endDate = startDate.plusYears(1).minusMonths(1);
        int days = Months.monthsBetween(startDate, endDate).getMonths() + 1;
        for (int i = 0; i < days; i++) {
            DateTime start = startDate.withFieldAdded(DurationFieldType.months(), i).withTimeAtStartOfDay();
            DateTime end = start.plusMonths(1).withTimeAtStartOfDay();
            dates.add(new Interval(start, end));
        }
        return dates;
    }

    public static String getNowFileName() {
        StringBuilder builder = new StringBuilder();
        DateTime dateTime = new DateTime();
        builder.append(dateTime.getDayOfMonth());
        builder.append("_");
        builder.append(dateTime.getMonthOfYear());
        builder.append("_");
        builder.append(dateTime.getYear());
        return builder.toString();
    }
}
