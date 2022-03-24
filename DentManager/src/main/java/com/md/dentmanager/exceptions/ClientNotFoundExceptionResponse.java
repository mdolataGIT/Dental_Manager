package com.md.dentmanager.exceptions;

public class ClientNotFoundExceptionResponse {

    private String ClientNotFound;

    public ClientNotFoundExceptionResponse(String clientNotFound){
        ClientNotFound = clientNotFound;
    }

    public String getClientNotFound(){
        return ClientNotFound;
    }

    public void setClientNotFound(String clientNotFound){
        ClientNotFound = clientNotFound;
    }
}
