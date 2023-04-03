package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class LendlyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LendlyBackendApplication.class, args);
    }

    @GetMapping("/api/hello")
    public String helloLendly() {
        return "Hello, Lendly!";
    }
}

