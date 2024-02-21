package br.com.bytebank.server.infra;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(UserAlreadyExistAuthenticationException.class) 
	private ResponseEntity<ExceptionRecord> userAlreadyExistAuthenticationException(UserAlreadyExistAuthenticationException ex) {
        ExceptionRecord record = new ExceptionRecord("Usuário já cadastrado.", 400);
		return ResponseEntity.badRequest().body(record);
	}

	@ExceptionHandler(AccountNotFoundException.class)
	private ResponseEntity<ExceptionRecord> accountDontExist(AccountNotFoundException ex) {
		ExceptionRecord record = new ExceptionRecord("Essa conta não está cadastrada.", 404);
		return ResponseEntity.badRequest().body(record);
	}

	@ExceptionHandler(Exception.class)
	private ResponseEntity<ExceptionRecord> generalError(Exception ex) {
		ExceptionRecord record = new ExceptionRecord(ex.getMessage(), 500);
		return ResponseEntity.internalServerError().body(record);
	}
}
