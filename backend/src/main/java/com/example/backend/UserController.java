package com.example.backend;

import com.auth0.json.mgmt.users.User;
import com.auth0.net.Request;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.models.ApplicationUser;
import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.exception.APIException;
import com.auth0.exception.Auth0Exception;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final ManagementAPI managementAPI;

    public UserController(ManagementAPI managementAPI) {
        this.managementAPI = managementAPI;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody ApplicationUser user) {
        User auth0User = new User();
        auth0User.setEmail(user.getEmail());
        auth0User.setPassword(user.getPassword());
        auth0User.setConnection("Username-Password-Authentication");
        auth0User.setEmailVerified(false);

        try {
            Request<User> request = managementAPI.users().create(auth0User);
            User createdUser = request.execute();

            // Save the createdUser or any additional information to your application's database if needed

            // Map the Auth0 user to your ApplicationUser object
            ApplicationUser registeredUser = new ApplicationUser();
            registeredUser.setUserId(createdUser.getId());
            registeredUser.setEmail(createdUser.getEmail());
            // Add any other properties from Auth0 User to ApplicationUser as needed

            return ResponseEntity.ok(registeredUser);
        } catch (APIException exception) {
            // Handle API errors, such as user already exists or invalid data
            return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
        } catch (Auth0Exception exception) {
            // Handle other exceptions, such as network errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }
}
