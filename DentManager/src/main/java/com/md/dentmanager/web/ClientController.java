package com.md.dentmanager.web;

import com.md.dentmanager.domain.Client;
import com.md.dentmanager.services.MapValidationErrorService;
import com.md.dentmanager.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/client")
@CrossOrigin
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewClient(@Valid @RequestBody Client client, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Client client1 = clientService.saveOrUpdateClient(client, principal.getName());
        return new ResponseEntity<Client>(client1, HttpStatus.CREATED);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<?> getClientById(@PathVariable String clientId, Principal principal){

        Client client = clientService.findClientByIdentifier(clientId, principal.getName());

        return new ResponseEntity<Client>(client, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Client> getAllClients(Principal principal){return clientService.findAllClients(principal.getName());}

    @DeleteMapping("/{clientId}")
    public ResponseEntity<?> deleteClient(@PathVariable String clientId, Principal principal){
        clientService.deleteClientByIdentifier(clientId, principal.getName());

        return new ResponseEntity<String>("Client with ID: '"+clientId+"' was deleted", HttpStatus.OK);
    }
}
