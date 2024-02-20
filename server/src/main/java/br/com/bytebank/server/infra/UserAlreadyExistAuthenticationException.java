package br.com.bytebank.server.infra;

import org.springframework.security.core.AuthenticationException;

public class UserAlreadyExistAuthenticationException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserAlreadyExistAuthenticationException(final String msg) {
        super(msg);
    }

}
