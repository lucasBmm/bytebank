package br.com.bytebank.server.infra;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

	@ExceptionHandler(UserAlreadyExistAuthenticationException.class) 
	public ResponseEntity tratarErro400(UserAlreadyExistAuthenticationException ex) {
        return ResponseEntity.badRequest().body(ex);
	}
}
