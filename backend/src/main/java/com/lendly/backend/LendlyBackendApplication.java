package com.lendly.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

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
    
    public static void main(String[] args) {
        SpringApplication.run(LendlyBackendApplication.class, args);
    }
}
