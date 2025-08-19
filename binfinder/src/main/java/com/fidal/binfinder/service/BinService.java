package com.fidal.binfinder.service;

import com.fidal.binfinder.entity.Bin;
import org.springframework.stereotype.Service;

import java.util.List;


public interface BinService {

    Bin addBin(Bin bin);

    void removeBin(Long id);

    List<Bin> viewAllBins();

    List<Bin> viewNearbyBins(Double latitude, Double longitude, Long zoom);

}
