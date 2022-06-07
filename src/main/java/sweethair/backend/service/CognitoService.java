package sweethair.backend.service;

import reactor.core.publisher.Mono;
import sweethair.backend.config.UserType;

public interface CognitoService {

    Mono<String> createUser(String emailId, UserType userType, String messageAction);
}
