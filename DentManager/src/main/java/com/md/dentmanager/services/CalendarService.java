package com.md.dentmanager.services;

import com.md.dentmanager.domain.Calendar;
import com.md.dentmanager.domain.Client;
import com.md.dentmanager.domain.User;
import com.md.dentmanager.exceptions.CalendarIdException;
import com.md.dentmanager.exceptions.ClientIdException;
import com.md.dentmanager.exceptions.ClientNotFoundException;
import com.md.dentmanager.exceptions.XrayPhotoIdException;
import com.md.dentmanager.repositories.CalendarRepository;
import com.md.dentmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarService {

    @Autowired
    CalendarRepository calendarRepository;

    @Autowired
    UserRepository userRepository;

    public Iterable<Calendar> getCalendars(String username){
        return calendarRepository.findAllByProjectLeader(username);
    }

    public Calendar saveCalendar(Calendar calendar, String username){
        User user = userRepository.findByUsername(username);
        calendar.setUser(user);
        calendar.setProjectLeader(user.getUsername());

        return calendarRepository.save(calendar);
    }

    public void deleteCalendarByIdentifier(Long calendarId, String username){
        //Calendar calendar = calendarRepository.findByCalendarId(calendarId);

        calendarRepository.delete(findCalendarByIdentifier(calendarId, username));
    }

    public Calendar findCalendarByIdentifier(Long calendarId, String username){

        Calendar calendar = calendarRepository.findByCalendarId(calendarId);

        if(calendar == null){
            throw new CalendarIdException("Calendar ID '" + calendarId +"' does not exists");
        }
        if(!calendar.getProjectLeader().equals(username)){
            throw new ClientNotFoundException("Client not found in your account");
        }

        return calendar;
    }
}
