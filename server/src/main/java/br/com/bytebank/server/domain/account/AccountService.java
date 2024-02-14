package br.com.bytebank.server.domain.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

	@Autowired
    private AccountRepository accountRepository;

    public boolean isAccountNumberExists(String accountNumber) {
        return accountRepository.existsByAccountNumber(accountNumber);
    }
}