package com.md.dentmanager.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Tooth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false, unique = true)
    private String clientSequence;
    @NotBlank(message = "Please include tooth number")
    private String numberOfTooth;
    private String place;
    private String status;
    private Integer priority;
    private String description;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date dueDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "backlogClient_id", updatable = false, nullable = false)
    @JsonIgnore
    private BacklogClient backlogClient;

    @Column(updatable = false)
    private String pesel;
    private Date create_At;
    private Date update_At;

    public Tooth() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientSequence() {
        return clientSequence;
    }

    public void setClientSequence(String clientSequence) {
        this.clientSequence = clientSequence;
    }

    public String getNumberOfTooth() {
        return numberOfTooth;
    }

    public void setNumberOfTooth(String numberOfTooth) {
        this.numberOfTooth = numberOfTooth;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public BacklogClient getBacklogClient() {
        return backlogClient;
    }

    public void setBacklogClient(BacklogClient backlogClient) {
        this.backlogClient = backlogClient;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }

    @Override
    public String toString() {
        return "Tooth{" +
                "id=" + id +
                ", clientSequence='" + clientSequence + '\'' +
                ", numberOfTooth='" + numberOfTooth + '\'' +
                ", place='" + place + '\'' +
                ", status='" + status + '\'' +
                ", priority=" + priority +
                ", description='" + description + '\'' +
                ", dueDate=" + dueDate +
                ", backlogClient=" + backlogClient +
                ", pesel='" + pesel + '\'' +
                ", create_At=" + create_At +
                ", update_At=" + update_At +
                '}';
    }
}