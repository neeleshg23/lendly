package com.lendly.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.Executor;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@ComponentScan({"com.lendly.backend"})
@EnableJdbcRepositories("com.lendly.backend")
public class LendlyBackendApplication {

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("LendlyAsync-");
        executor.initialize();
        return executor;
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://frontend-dot-lendly-383321.wl.r.appspot.com", "https://frontend-dot-lendly-383321.wl.r.appspot.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600)
                        .exposedHeaders("Access-Control-Allow-Origin");
            }
        };
    }
    
    public static void main(String[] args) {
        SpringApplication.run(LendlyBackendApplication.class, args);
    }
}
