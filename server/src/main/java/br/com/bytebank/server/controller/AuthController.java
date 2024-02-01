package br.com.bytebank.server.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bytebank.server.domain.user.User;
import br.com.bytebank.server.record.AuthData;
import br.com.bytebank.server.record.Token;
import br.com.bytebank.server.security.TokenService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private TokenService tokenService;

	@PostMapping("/login")
	public ResponseEntity<Token> login(@RequestBody @Valid AuthData data) {
		try {			
			var authenticationToken = new UsernamePasswordAuthenticationToken(data.email(), data.password());
			var authentication = manager.authenticate(authenticationToken);
			var token = tokenService.generateToken((User) authentication.getPrincipal());
			return ResponseEntity.ok(new Token(token));
		}
		 catch(AuthenticationException e) {
			 System.out.println(e);
			 return ResponseEntity.badRequest().build();
		 }
	}
}
