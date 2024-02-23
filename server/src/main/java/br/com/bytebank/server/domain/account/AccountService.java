package br.com.bytebank.server.domain.account;

import br.com.bytebank.server.domain.user.AuthenticationService;
import br.com.bytebank.server.domain.user.User;
import br.com.bytebank.server.infra.AccountNotFoundException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;

@Service
public class AccountService {

	@Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthenticationService authService;

    public boolean isAccountNumberExists(String accountNumber) {
        return accountRepository.existsByAccountNumber(accountNumber);
    }

    public BigDecimal getUserBalance() {
        User currentUser = authService.getCurrentUser();

        return currentUser.getAccount().getBalance();
    }
}