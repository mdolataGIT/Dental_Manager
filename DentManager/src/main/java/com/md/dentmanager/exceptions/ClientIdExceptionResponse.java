package com.md.dentmanager.exceptions;

public class ClientIdExceptionResponse {

    private String pesel;

    public ClientIdExceptionResponse(String pesel){
        this.pesel = pesel;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }
}
