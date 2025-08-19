package com.fidal.binfinder.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("resource_type", "auto")
            );

            // Cloudinary response has "url" and "secure_url"
            return (String) uploadResult.get("secure_url");

        } catch (Exception e) {
//            throw new RuntimeException("Image upload failed", e);
            System.out.println(e);
            return "";
        }
    }
}
