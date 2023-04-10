package com.example.backend;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import com.auth0.client.auth.AuthAPI;
// import com.auth0.client.mgmt.ManagementAPI;

// @Configuration
// public class Auth0Config {
//     private static String domain;
//     private static String clientId;
//     private static String clientSecret;
//     private static String audience;

//     @Value("${auth0.managementApiToken}")
//     private String managementApiToken;

//     @Value("${auth0.domain}")
//     public void setDomain(String domain) {
//         Auth0Config.domain = domain;
//     }

//     @Value("${auth0.clientId}")
//     public void setClientId(String clientId) {
//         Auth0Config.clientId = clientId;
//     }

//     @Value("${auth0.clientSecret}")
//     public void setClientSecret(String clientSecret) {
//         Auth0Config.clientSecret = clientSecret;
//     }

//     @Value("${auth0.audience}")
//     public void setAudience(String audience) {
//         Auth0Config.audience = audience;
//     }

//     @Bean
//     public static AuthAPI authAPI() {
//         return new AuthAPI(domain, clientId, clientSecret);
//     }

//     @Bean
//     public ManagementAPI managementAPI() {
//         return new ManagementAPI(domain, managementApiToken);
//     }

//     public static String getDomain() {
//         return domain;
//     }

//     public static String getClientId() {
//         return clientId;
//     }

//     public static String getClientSecret() {
//         return clientSecret;
//     }

//     public static String getAudience() {
//         return audience;
//     }

//     public String getManagementApiToken() {
//         return managementApiToken;
//     }
// }
