package br.com.bytebank.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bytebank.server.domain.user.AuthenticationService;
import br.com.bytebank.server.domain.user.User;

@RestController()
@RequestMapping("account")
public class AccountController {
	
	@Autowired
	private AuthenticationService userService;

	@GetMapping("balance")
	public ResponseEntity<?> getBalance() {
		User currentUser = userService.getCurrentUser();
		
		return ResponseEntity.ok(new BalanceRecord(currentUser.getAccount().getBalance()));
	}
}
