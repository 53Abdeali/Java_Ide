package com.IDE.IDE.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<CodeHistory> codeHistoryList;

    public User(Long id, String username, String password, List<CodeHistory> codeHistoryList) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.codeHistoryList = codeHistoryList;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<CodeHistory> getCodeHistoryList() {
        return codeHistoryList;
    }

    public void setCodeHistoryList(List<CodeHistory> codeHistoryList) {
        this.codeHistoryList = codeHistoryList;
    }

}