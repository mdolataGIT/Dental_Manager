package com.md.dentmanager.repositories;

import com.md.dentmanager.domain.Tooth;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToothRepository extends CrudRepository<Tooth, Long> {
    List<Tooth> findByPeselOrderByPriority(String id);

    Tooth findByClientSequence(String sequence);
}
