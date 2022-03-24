package com.md.dentmanager.repositories;

import com.md.dentmanager.domain.Calendar;
import com.md.dentmanager.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    Calendar findByCalendarId(Long id);

    @Override
    List<Calendar> findAll();

    Iterable<Calendar> findAllByProjectLeader(String username);
}
