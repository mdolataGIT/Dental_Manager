package com.md.dentmanager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleClientException(ClientIdException ex, WebRequest request){
        ClientIdExceptionResponse exceptionResponse = new ClientIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleClientNotFoundException(ClientNotFoundException ex, WebRequest request){
        ClientNotFoundExceptionResponse exceptionResponse = new ClientNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameAlreadyExist(UsernameAlreadyExistException ex, WebRequest request){
        UsernameAlreadyExistResponse exceptionResponse = new UsernameAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }


}