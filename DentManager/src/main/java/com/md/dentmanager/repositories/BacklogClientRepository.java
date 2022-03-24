package com.md.dentmanager.repositories;

import com.md.dentmanager.domain.BacklogClient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogClientRepository extends CrudRepository<BacklogClient, Long> {
    BacklogClient findByPesel(String Identifier);
}
