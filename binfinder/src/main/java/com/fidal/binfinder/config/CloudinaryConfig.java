package com.fidal.binfinder.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud.name}")
    private String cloudName;

    @Value("${cloudinary.api.key}")
    private String apiKey;

    @Value("${cloudinary.api.secret}")
    private String apiSecret;

//    @Configuration tells Spring: “This class has bean definitions.”
//    @Bean tells Spring: “Put this object (MyServiceImpl)
//    into the Spring container, so it can be injected elsewhere.”

    @Bean
    public Cloudinary cloudinary() {
        System.out.println("printing -- - " + cloudName);

        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }
}
