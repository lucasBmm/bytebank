package br.com.bytebank.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bytebank.server.domain.user.User;
import br.com.bytebank.server.record.AuthData;
import br.com.bytebank.server.record.Token;
import br.com.bytebank.server.service.TokenService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private TokenService tokenService;

	@GetMapping("/login")
	public ResponseEntity<Token> login(@RequestBody AuthData data) {
		var authenticationToken = new UsernamePasswordAuthenticationToken(data.email(), data.password());
		var authentication = manager.authenticate(authenticationToken);
		
		var token = tokenService.generateToken((User) authentication.getPrincipal());
		return ResponseEntity.ok(new Token(token));
	}
}
