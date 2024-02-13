package br.com.bytebank.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("account")
public class AccountController {

	@GetMapping("balance")
	public ResponseEntity<?> getBalance() {
		return ResponseEntity.ok("Account works!");
	}
}
