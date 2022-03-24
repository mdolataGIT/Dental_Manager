package com.md.dentmanager.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Client name is required")
    private String clientName;
    @NotBlank(message = "PESEL is required")
    @Size(min = 1, max = 11, message = "Please use 11 characters")
    @Column(updatable = false, unique = true)
    private String pesel;
    @NotBlank(message = "Client surname is required")
    private String clientSurname;
    @NotNull
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date date_of_birth;
    @JsonFormat(pattern = "yyyy-mm-dd")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Address is required")
    private String address;
    @NotBlank(message = "City is required")
    private String city;
    @NotBlank(message = "Postcode is required")
    private String postcode;
    @NotBlank(message = "Phone number is required")
    @Size(min = 1, max = 11, message = "Phone number should have 8 to 11 characters")
    private String phoneNumber;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "client")
    @JsonIgnore
    private BacklogClient backlogClient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private String projectLeader;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.REFRESH,mappedBy = "client", orphanRemoval = true)
    private List<XrayPhoto> xrayPhotos = new ArrayList<>();

    public Client(){

    }

    public List<XrayPhoto> getXrayPhotos() {
        return xrayPhotos;
    }

    public void setXrayPhotos(List<XrayPhoto> xrayPhotos) {
        this.xrayPhotos = xrayPhotos;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getProjectLeader() {
        return projectLeader;
    }

    public void setProjectLeader(String projectLeader) {
        this.projectLeader = projectLeader;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getClientSurname() {
        return clientSurname;
    }

    public void setClientSurname(String clientSurname) {
        this.clientSurname = clientSurname;
    }

    public Date getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(Date date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    public BacklogClient getBacklogClient() {
        return backlogClient;
    }

    public void setBacklogClient(BacklogClient backlogClient) {
        this.backlogClient = backlogClient;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @PrePersist
    protected void onCreate(){
        this.created_At= new Date();
    }

    @PreUpdate
    protected  void onUpdate(){
        this.updated_At = new Date();
    }

}
