package com.lendly.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@ComponentScan({"com.example.backend"})
@EnableJdbcRepositories("com.example.backend")
public class LendlyBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(LendlyBackendApplication.class, args);
    }
}
