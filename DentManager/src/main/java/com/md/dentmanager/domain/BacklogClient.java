package com.md.dentmanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class BacklogClient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer TSequence = 0;
    private String pesel;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="client_id",nullable = false)
    @JsonIgnore
    private Client client;



    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "backlogClient",orphanRemoval = true)
    private List <Tooth> teeth = new ArrayList<>();


    public BacklogClient() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTSequence() {
        return TSequence;
    }

    public void setTSequence(Integer TSequence) {
        this.TSequence = TSequence;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Tooth> getTeeth() {
        return teeth;
    }

    public void setTeeth(List<Tooth> teeth) {
        this.teeth = teeth;
    }
}