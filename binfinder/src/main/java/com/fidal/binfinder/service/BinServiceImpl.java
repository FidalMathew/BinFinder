package com.fidal.binfinder.service;

import com.fidal.binfinder.entity.Bin;
import com.fidal.binfinder.repository.BinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BinServiceImpl implements  BinService{

    @Autowired
    BinRepository binRepository;

    @Override
    public Bin addBin(Bin bin) {
        return binRepository.save(bin);
    }

    @Override
    public void removeBin(Long id) {
        binRepository.deleteById(id);
    }

    @Override
    public List<Bin> viewAllBins() {
        return binRepository.findAll();
    }


    private double getRadiusFromZoom(long zoom) {
        switch ((int) zoom) {
            case 16: return 1000; // 1 km
            case 17: return 500;  // 500 m
            case 18: return 250;  // 250 m
            case 19: return 150;  // 150 m
            case 20: return 75;   // 75 m
            case 21: return 40;   // 40 m
            case 22: return 20;   // 20 m
            default: return 5000; // fallback (5 km)
        }
    }


    @Override
    public List<Bin> viewNearbyBins(Double latitude, Double longitude, Long zoom) {
        double radius = getRadiusFromZoom(zoom);
        return binRepository.findNearbyBins(latitude, longitude, radius);
    }
}
