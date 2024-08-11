package com.projects.teamservicesapi.entity;


import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="wfo")
public class Wfo {

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private int id;
@JsonProperty("Month")
private String month;
@JsonProperty("Name")
private String name;
@JsonProperty("TO")
private int toffice;
@JsonProperty("TH")
private int th;
@JsonProperty("TL")
private int tl;


public int getId() {
    return id;
}

public void setId(int id) {
    this.id = id;
}

public String getMonth() {
    return month;
}

public void setMonth(String month) {
    this.month = month;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public int getTO() {
    return toffice;
}

public void setTO(int toffice) {
    this.toffice = toffice;
}

public int getTH() {
    return th;
}

public void setTH(int th) {
    this.th = th;
}

public int getTL() {
    return tl;
}

public void setTL(int tl) {
    this.tl = tl;
}

}

