package com.md.dentmanager.services;

import com.md.dentmanager.domain.BacklogClient;
import com.md.dentmanager.domain.Client;
import com.md.dentmanager.domain.Tooth;
import com.md.dentmanager.exceptions.ClientNotFoundException;
import com.md.dentmanager.repositories.BacklogClientRepository;
import com.md.dentmanager.repositories.ClientRepository;
import com.md.dentmanager.repositories.ToothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToothService {

    @Autowired
    private BacklogClientRepository backlogClientRepository;

    @Autowired
    private ToothRepository toothRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientService clientService;

    public Tooth addTooth(String pesel, Tooth tooth, String username){

            BacklogClient backlogClient = clientService.findClientByIdentifier(pesel, username).getBacklogClient();
            tooth.setBacklogClient(backlogClient);
            Integer BacklogSequence = backlogClient.getTSequence();
            BacklogSequence++;

            backlogClient.setTSequence(BacklogSequence);
            tooth.setClientSequence(backlogClient.getPesel()+"-"+BacklogSequence);
            tooth.setPesel(pesel);

            if(tooth.getStatus() == ""|| tooth.getStatus()==null){
                tooth.setStatus("TO_DO");
            }

            if(tooth.getPriority()==null|| tooth.getPriority()==0){
                tooth.setPriority(3);
            }
            return toothRepository.save(tooth);

    }

    public Iterable<Tooth> findBacklogById(String id, String username) {

        clientService.findClientByIdentifier(id, username);
        return toothRepository.findByPeselOrderByPriority(id);
    }

    public Tooth findTByClientSequence(String backlogClient_id, String t_id, String username){

       clientService.findClientByIdentifier(backlogClient_id, username);

        Tooth tooth = toothRepository.findByClientSequence(t_id);

        if(tooth == null){
            throw new ClientNotFoundException("Client Tooth '"+t_id+"'not found");
        }

        if(!tooth.getPesel().equals(backlogClient_id)){
            throw new ClientNotFoundException("Client Tooth '"+t_id+"' does not exist: '"+backlogClient_id);
        }

        return tooth;
    }

    public Tooth updateByClientSequence(Tooth updatedTask, String backlogClient_id, String t_id, String username){
        Tooth tooth = findTByClientSequence(backlogClient_id, t_id, username);

        tooth = updatedTask;

        return  toothRepository.save(tooth);
    }

    public void deletePTByClientSequence(String backlogClient_id, String t_id, String username){
        Tooth tooth = findTByClientSequence(backlogClient_id, t_id, username);

        toothRepository.delete(tooth);
    }

}
