package com.md.dentmanager.web;

import com.md.dentmanager.domain.Calendar;
import com.md.dentmanager.domain.Client;
import com.md.dentmanager.services.CalendarService;
import com.md.dentmanager.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("api/calendar")
@CrossOrigin("*")
public class CalendarController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    CalendarService calendarService;

    @GetMapping()
    public Iterable<Calendar> getCalendars(Principal principal){
        return  calendarService.getCalendars(principal.getName());
    }

    @PostMapping()
    public ResponseEntity<?> createNewCalendar(@Valid @RequestBody Calendar calendar, BindingResult result,Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Calendar calendar1 = calendarService.saveCalendar(calendar,  principal.getName());

        return new ResponseEntity<Calendar>(calendar1, HttpStatus.CREATED);
    }

    @DeleteMapping("/{calendarId}")
    public ResponseEntity<?> deleteCalendar(@PathVariable Long calendarId, Principal principal){
        calendarService.deleteCalendarByIdentifier(calendarId, principal.getName());

        return new ResponseEntity<String>("Calendar with ID: '"+calendarId+"' was deleted", HttpStatus.OK);
    }

    @GetMapping("/{calendarId}")
    public ResponseEntity<?> getCalendarById(@PathVariable Long calendarId, Principal principal){

        Calendar calendar = calendarService.findCalendarByIdentifier(calendarId, principal.getName());

        return new ResponseEntity<Calendar>(calendar, HttpStatus.OK);
    }
}
