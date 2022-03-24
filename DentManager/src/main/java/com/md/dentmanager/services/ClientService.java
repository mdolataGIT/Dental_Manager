package com.md.dentmanager.services;

import com.md.dentmanager.domain.BacklogClient;
import com.md.dentmanager.domain.Client;
import com.md.dentmanager.domain.User;
import com.md.dentmanager.exceptions.ClientIdException;
import com.md.dentmanager.exceptions.ClientNotFoundException;
import com.md.dentmanager.repositories.BacklogClientRepository;
import com.md.dentmanager.repositories.ClientRepository;
import com.md.dentmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private BacklogClientRepository backlogClientRepository;

    @Autowired
    private UserRepository userRepository;

    public Client saveOrUpdateClient (Client client, String username){
        if(client.getId() != null){
            Client existingClient = clientRepository.findByPesel(client.getPesel());

            if(existingClient != null && (!existingClient.getProjectLeader().equals(username))){
                throw new ClientNotFoundException("Client not found in your account");
            }else if (existingClient == null){
                throw new ClientNotFoundException("Client with ID '"+ client.getPesel()+ "' can not be updated because it does not exists");
            }
        }



        try {
            User user = userRepository.findByUsername(username);
            client.setUser(user);
            client.setProjectLeader(user.getUsername());
            client.setPesel(client.getPesel().toUpperCase());

           if(client.getId()==null){
               BacklogClient backlogClient = new BacklogClient();
               client.setBacklogClient(backlogClient);
               backlogClient.setClient(client);
               backlogClient.setPesel(client.getPesel().toUpperCase());
           }
            if(client.getId() != null){
                client.setBacklogClient(backlogClientRepository.findByPesel(client.getPesel().toUpperCase()));
            }
            return clientRepository.save(client);

        }catch (Exception e){
            throw new ClientIdException("PESEL '" + client.getPesel().toUpperCase() + "' already exists");
        }
    }

    public Client findClientByIdentifier(String clientId, String username){

        Client client = clientRepository.findByPesel(clientId.toUpperCase());

        if(client == null){
            throw new ClientIdException("Client ID '" + clientId +"' does not exists");
        }
        if(!client.getProjectLeader().equals(username)){
            throw new ClientNotFoundException("Client not found in your account");
        }
        return client;
    }

    public Iterable<Client>findAllClients(String username){
        return clientRepository.findAllByProjectLeader(username);
    }

    public void deleteClientByIdentifier(String clientId, String username){
        clientRepository.delete(findClientByIdentifier(clientId, username));
    }

}
