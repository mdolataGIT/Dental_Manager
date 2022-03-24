package com.md.dentmanager.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.Objects;
import java.util.Optional;

@Entity
public class XrayPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long xrayPhotoId;// to final
    private String description;// to final and delete setters
    private String xrayPhotoLink; //s3 key


    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToOne
    @JoinColumn(name = "client_id", updatable = false, nullable = false)
    @JsonIgnore
    private Client client;

    @Column(updatable = false)
    private String pesel;


    public XrayPhoto(Long xrayPhotoId, String description, String xrayPhotoLink) {
        this.xrayPhotoId = xrayPhotoId;
        this.description = description;
        this.xrayPhotoLink = xrayPhotoLink;
    }

    public XrayPhoto() {

    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public Long getXrayPhotoId() {
        return xrayPhotoId;
    }

    public void setXrayPhotoId(Long xrayPhotoId) {
        this.xrayPhotoId = xrayPhotoId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Optional<String> getXrayPhotoLink() {
        return Optional.ofNullable(xrayPhotoLink);
    }

    public void setXrayPhotoLink(String xrayPhotoLink) {
        this.xrayPhotoLink = xrayPhotoLink;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        XrayPhoto that = (XrayPhoto) o;
        return Objects.equals(xrayPhotoId, that.xrayPhotoId) &&
                Objects.equals(description, that.description) &&
                Objects.equals(xrayPhotoLink, that.xrayPhotoLink) &&
                Objects.equals(client, that.client) && Objects.equals(pesel, that.pesel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(xrayPhotoId, description, xrayPhotoLink, client, pesel);
    }

}
