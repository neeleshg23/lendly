package com.lendly.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@ComponentScan({"com.lendly.backend"})
@EnableJdbcRepositories("com.lendly.backend")
public class LendlyBackendApplication {

    // Test DB Connection
    // @Autowired
    // private static UserRepository userRepository;
    // public static void main(String[] args) {
    //     ConfigurableApplicationContext context = SpringApplication.run(LendlyBackendApplication.class, args);

    //     // Get the UserRepository bean from the Spring context
    //     UserRepository userRepository = context.getBean(UserRepository.class);
    
    //     // Retrieve all users from the repository
    //     List<User> users = userRepository.findAll();
    
    //     // Print the users
    //     System.out.println("Users from the database:");
    //     for (User user : users) {
    //         System.out.println(user);
    //     }
    // }
    
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://frontend.lendly-383321.wl.r.appspot.com", "https://frontend.lendly-383321.wl.r.appspot.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
    
    public static void main(String[] args) {
        SpringApplication.run(LendlyBackendApplication.class, args);
    }
}
