package sweethair.backend.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.*;
import sweethair.backend.config.UserType;
import sweethair.backend.exception.InviteUserException;
import sweethair.backend.exception.UserAlreadyExistsException;
import sweethair.backend.util.PasswordGenerator;

import java.util.Arrays;
import java.util.List;

@Log4j2
@Service
public class CognitoServiceImpl implements CognitoService {


    @Value("${aws.cognito.userpool.id}")
    private String USER_POOL_ID;

    @Autowired
    private CognitoIdentityProviderClient cognitoClient;


    public String createUser(String emailId, UserType userType, String messageAction) {

        log.info("createUser -> (emailId) {} (userType) {}", emailId, userType);

        AdminCreateUserRequest adminCreateUserRequest =
                AdminCreateUserRequest.builder()
                        .userPoolId(USER_POOL_ID)
                        .username(emailId)
                        .desiredDeliveryMediums(DeliveryMediumType.EMAIL)
                        .messageAction((String) messageAction)
                        .forceAliasCreation(true)
                        .temporaryPassword(PasswordGenerator.generatePasswordWithGuideline())
                        .userAttributes(buildAllAttributeType(emailId))
                        .build();

        try {
            AdminCreateUserResponse adminCreateUserResponse = cognitoClient.adminCreateUser(adminCreateUserRequest);
            addUserToGroupResult(adminCreateUserResponse.user().username(), userType);
            return adminCreateUserResponse.user().username();
        } catch (UsernameExistsException e) {
            log.error("UsernameExistsException occured -> ", e);
            throw new UserAlreadyExistsException("Found existing account in cognito with email " + emailId);
        } catch (Exception e) {
            log.error("Exception occured -> ", e);
            throw new InviteUserException("Unable to invite account with (email) " + emailId + ", please try again later");
        }
    }

    private List<AttributeType> buildAllAttributeType(String emailId) {

        AttributeType attributeType2 = AttributeType.builder().name("email")
                .value(emailId)
                .build();
        AttributeType attributeType3 = AttributeType.builder().name("email_verified")
                .value(Boolean.toString(true))
                .build();

        return Arrays.asList(attributeType2, attributeType3);
    }


    public void addUserToGroupResult(String username, UserType userType) {
        log.info("addUserToGroupResult -> (username) {} (userType) {}", username, userType);

        AdminAddUserToGroupRequest adminAddUserToGroupRequest =
                AdminAddUserToGroupRequest.builder()
                        .groupName(userType.toString())
                        .userPoolId(USER_POOL_ID)
                        .username(username)
                        .build();
    }
}
