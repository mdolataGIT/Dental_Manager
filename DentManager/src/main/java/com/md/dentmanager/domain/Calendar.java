package com.md.dentmanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calendarId;
    @NotBlank(message = "Title is required")
    private String title;
    private boolean allDay;
    @NotBlank(message = "Start date is required")
    private String start;
    @NotBlank(message = "End date is required")
    private String end;

    private String projectLeader;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id",nullable = false)
    @JsonIgnore
    private User user;

    public String getProjectLeader() {
        return projectLeader;
    }

    public void setProjectLeader(String projectLeader) {
        this.projectLeader = projectLeader;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getCalendarId() {
        return calendarId;
    }

    public void setCalendarId(Long id) {
        this.calendarId = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isAllDay() {
        return allDay;
    }

    public void setAllDay(boolean allDay) {
        this.allDay = allDay;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

}
