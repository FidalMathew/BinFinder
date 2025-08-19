package com.fidal.binfinder;

import com.fidal.binfinder.entity.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BinfinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(BinfinderApplication.class, args);
//
//		User u = new User();
//		u.setUserName("John");
//		System.out.println(u.getUserName());
	}

}
