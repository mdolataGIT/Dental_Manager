package com.md.dentmanager.repositories;

import com.md.dentmanager.domain.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends PagingAndSortingRepository<Client, Long> {

    Client findByPesel (String clientId);

    @Override
    Iterable<Client> findAll();


    Iterable<Client> findAllByProjectLeader(String username);
}
