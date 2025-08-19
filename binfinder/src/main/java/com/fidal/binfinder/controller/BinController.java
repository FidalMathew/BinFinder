package com.fidal.binfinder.controller;

import com.fidal.binfinder.entity.Bin;
import com.fidal.binfinder.entity.User;
import com.fidal.binfinder.service.BinService;
import com.fidal.binfinder.service.CloudinaryService;
import com.fidal.binfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/bin")
public class BinController {

    @Autowired
    private  BinService binService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private UserService userService;

    // ✅ Add new bin
    @PostMapping(value = "/addBin", consumes = {"multipart/form-data"})
    public ResponseEntity<?> addBin(
//            @RequestParam("data") Bin bin,
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId,
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude
    ) {
        try {

            // fetch user
            Optional<User> optionalUser = userService.findUserById(userId);

            if (optionalUser.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("User with userId: " + userId + " not found");
            }

            Bin bin = new Bin();

            System.out.println("binnn" +bin);

            User user = optionalUser.get();
            bin.setUser(user);
            bin.setLatitude(latitude);
            bin.setLongitude(longitude);

            // Upload to Cloudinary
            String link = cloudinaryService.uploadImage(file);

            if(Objects.equals(link, ""))
                return ResponseEntity.internalServerError().body("Image upload failed");


            bin.setImage(link);
            bin.setLastUpdated(LocalDateTime.now());

            // Save to DB
            Bin savedBin = binService.addBin(bin);

            // Return 201 with savedBin
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedBin);

//            return  ResponseEntity.ok("dsa " +link+" "+latitude);

        } catch (Exception e) {
            e.printStackTrace(); // log properly in real projects
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving bin: " + e.getMessage());
        }
    }


    // ✅ Delete bin
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBin(@PathVariable Long id) {
        binService.removeBin(id);
        return ResponseEntity.ok("Bin deleted successfully");
    }

    // ✅ Get all bins
    @GetMapping("/allBins")
    public ResponseEntity<List<Bin>> getAllBins() {
        return ResponseEntity.ok(binService.viewAllBins());
    }

    // ✅ Get nearby bins
    @GetMapping("/nearby")
    public ResponseEntity<List<Bin>> getNearbyBins(
            @RequestParam("lat") Double latitude,
            @RequestParam("lng") Double longitude,
            @RequestParam("zoom") Long zoom
    ) {
        try {
            List<Bin> bins = binService.viewNearbyBins(latitude, longitude, zoom);
            return ResponseEntity.ok(bins);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Collections.emptyList());
        }
    }
}
