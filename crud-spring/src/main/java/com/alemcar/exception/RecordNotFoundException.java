package com.alemcar.exception;

public class RecordNotFoundException extends RuntimeException {

    public RecordNotFoundException(Long id) {
        super("Não foi possível encontrar o registro " + id);
    }
}
