// package com.example.backend;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfiguration {
//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeHttpRequests((authz) -> authz
//                 .anyRequest().authenticated()
//             )
//             .httpBasic(withDefaults());
//         return http.build();
//     }

//     @Bean
//     public WebSecurityCustomizer webSecurityCustomizer() {
//         return (web) -> web.ignoring().requestMatchers("/*");
//     }
// }