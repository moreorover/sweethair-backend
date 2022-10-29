package dev.martin.sweethair.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.CONFLICT,
        reason = "Record already exists."
)
public class RecordAlreadyExist
        extends RuntimeException {

    public RecordAlreadyExist() {
    }
}