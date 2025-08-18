package com.fidal.binfinder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NonNull;


@Entity
@Data
public class Bin {

    @Id
    private  Long id;

    @NonNull
    private Double latitude;
    @NonNull
    private Double longitude;
    @NonNull
    private String image;
    @NonNull

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
