package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class LendlyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LendlyBackendApplication.class, args);
    }

    @PostMapping(value = "/api/hello", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public String helloLendly(@RequestBody NameRequest request) {
        return "Hi " + request.getName() + "!";
    }
    
    static class NameRequest {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
