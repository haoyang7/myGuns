package cn.mystudy.myguns.core.util;

import cn.mystudy.myguns.core.common.exception.BizExceptionEnum;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;

/**
 * 时间处理的工具类
 */
public class TimeUtil {
    private static final Logger logger = LoggerFactory.getLogger(TimeUtil.class);

    /**
     * 字符串转换为日期类型
     * string-->yyyy-MM-dd HH:mm:ss
     *
     * @param dateString
     * @return
     */
    public static Date stringToDate(String dateString) {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//完整日期加时间格式
            return format.parse(dateString);
        } catch (ParseException e) {
            throw new ServiceException(BizExceptionEnum.INVLIDE_DATE_STRING); //日期字符串的格式不对异常
        }
    }

    /**
     * 日期类型转化为字符串
     * yyyy-MM-dd HH:mm:ss -->string
     *
     * @param date
     * @return
     */
    public static String dateToString(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//完整日期加时间格式
        return format.format(date);
    }

    /**
     * 日期类型转化为年月日字符串
     * Date-->yyyy-MM-dd
     *
     * @param date
     * @return
     */
    public static String dateToSubString(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");//时间格式为年月日
        return format.format(date);
    }

    /**
     * 年月日字符串转化为日期类型
     * yyyy-MM-dd-->Date
     *
     * @param date
     * @return
     */
    public static Date subStringToDate(String date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");//时间格式为年月日
        Date date1 = null;
        try {
            date1 = format.parse(date);
        } catch (ParseException e) {
            throw new ServiceException(BizExceptionEnum.DATE_FORMAT_ERROR); //日期字符串的格式不对异常
        }
        return date1;
    }

    /**
     * 获得某天最小时间00:00:00
     * Date-->00:00:00
     *
     * @param date
     * @return
     */
    public static Date getStartOfDay(String date) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(subStringToDate(date).getTime()), ZoneId.systemDefault());
        LocalDateTime startOfDay = localDateTime.with(LocalTime.MIN);
        return Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 获得某天最大时间23:59:59
     * Date-->23:59:59
     *
     * @param date
     * @return
     */
    public static Date getEndOfDay(String date) {
        Calendar calendarEnd = Calendar.getInstance();
        calendarEnd.setTime(subStringToDate(date));
        calendarEnd.set(Calendar.HOUR_OF_DAY, 23);
        calendarEnd.set(Calendar.MINUTE, 59);
        calendarEnd.set(Calendar.SECOND, 59);

        //防止mysql自动加一秒,毫秒设为0
        calendarEnd.set(Calendar.MILLISECOND, 0);
        return calendarEnd.getTime();
    }

    /**
     * 将完整的日期格式(yyyy-MM-dd HH:mm:ss)转化为只有年月日(yyyy-MM-dd)格式的时间
     * yyyy-MM-dd HH:mm:ss --->yyyy-MM-dd
     *
     * @param date
     * @return
     */
    public static Date timeToDate(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");//日期格式
        String str = format.format(date);
        try {
            return format.parse(str);
        } catch (ParseException e) {
            throw new ServiceException(BizExceptionEnum.DATE_FORMAT_ERROR); //日期字符串的格式不对异常
        }
    }

    /**
     * 将完整的日期格式(yyyy-MM-dd HH:mm:ss)转化为只有时分秒(HH:mm:ss)格式的时间
     * yyyy-MM-dd HH:mm:ss --->HH:mm:ss
     *
     * @param date
     * @return
     */
    public static Date dateToTime(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");//日期格式
        String str = format.format(date);
        try {
            return format.parse(str);
        } catch (ParseException e) {
            throw new ServiceException(BizExceptionEnum.DATE_FORMAT_ERROR); //日期字符串的格式不对异常
        }
    }

}
