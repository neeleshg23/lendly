import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Auth0Config {

    @Value("${auth0.domain}")
    private String domain;

    @Value("${auth0.clientId}")
    private String clientId;

    @Value("${auth0.clientSecret}")
    private String clientSecret;

    @Value("${auth0.audience}")
    private String audience;

    @Value("${auth0.managementApiToken}")
    private String managementApiToken;

    @Bean
    public AuthAPI authAPI() {
        return new AuthAPI(domain, clientId, clientSecret);
    }

    @Bean
    public ManagementAPI managementAPI() {
        return new ManagementAPI(domain, managementApiToken);
    }
}
