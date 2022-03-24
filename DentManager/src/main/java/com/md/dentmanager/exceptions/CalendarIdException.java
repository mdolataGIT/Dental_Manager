package com.md.dentmanager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CalendarIdException extends RuntimeException{

    public CalendarIdException(String message) {
        super(message);
    }
}