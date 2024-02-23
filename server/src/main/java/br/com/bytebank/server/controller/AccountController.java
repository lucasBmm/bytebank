package br.com.bytebank.server.controller;

import br.com.bytebank.server.domain.account.AccountService;
import br.com.bytebank.server.record.BalanceRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bytebank.server.domain.user.AuthenticationService;
import br.com.bytebank.server.domain.user.User;

import java.math.BigDecimal;

@RestController()
@RequestMapping("account")
public class AccountController {
	@Autowired
	private AuthenticationService userService;

	@Autowired
	private AccountService service;

	@GetMapping("balance")
	public ResponseEntity<BalanceRecord> getBalance() {
		BigDecimal balance = service.getUserBalance();

		return ResponseEntity.ok(new BalanceRecord(balance));
	}
}
