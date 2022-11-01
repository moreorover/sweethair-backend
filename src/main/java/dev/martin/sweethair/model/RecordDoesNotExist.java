package dev.martin.sweethair.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.CONFLICT,
        reason = "Record does not exist."
)
public class RecordDoesNotExist
        extends RuntimeException {

    public RecordDoesNotExist() {
    }
}