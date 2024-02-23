package br.com.bytebank.server.controller;

import br.com.bytebank.server.domain.user.UserService;
import br.com.bytebank.server.infra.UserAlreadyExistAuthenticationException;
import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.bytebank.server.domain.user.AuthenticationService;
import br.com.bytebank.server.domain.user.User;
import br.com.bytebank.server.record.AuthData;
import br.com.bytebank.server.record.RegisterData;
import br.com.bytebank.server.record.Token;
import br.com.bytebank.server.record.UserDetailsRecord;
import br.com.bytebank.server.security.TokenService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationService service;

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private TokenService tokenService;

	@PostMapping("/login")
	public ResponseEntity<Token> login(@RequestBody @Valid AuthData data) {
		try {
			var authenticationToken = new UsernamePasswordAuthenticationToken(data.email(), data.password());
			var authentication = manager.authenticate(authenticationToken);
			User user = (User) authentication.getPrincipal();
			var token = tokenService.generateToken(user);

			return ResponseEntity.ok(new Token(token));
		}
		 catch(AuthenticationException e) {
			 return ResponseEntity.badRequest().build();
		 }
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody @Valid RegisterData data, UriComponentsBuilder uriBuilder) throws Exception {
		User createdUser = userService.createUser(data);

		UriComponents uri = uriBuilder.path("/rest/auth/register").buildAndExpand(createdUser.getId());

		return ResponseEntity.created(uri.toUri()).build();
	}
	
	@GetMapping("user")
	public ResponseEntity<UserDetailsRecord> getUserDetails() {
		User currentUser = service.getCurrentUser();
		UserDetailsRecord userDetailsRecord = new UserDetailsRecord(currentUser.getEmail(), currentUser.getFullname());
		
		return ResponseEntity.ok(userDetailsRecord);
	}
}
