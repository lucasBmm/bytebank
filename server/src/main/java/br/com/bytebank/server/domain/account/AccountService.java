package br.com.bytebank.server.domain.account;

import br.com.bytebank.server.infra.AccountNotFoundException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

	@Autowired
    private AccountRepository accountRepository;

    @SneakyThrows
    public boolean isAccountNumberExists(String accountNumber) {
        var account = accountRepository.existsByAccountNumber(accountNumber);

        if (account) {
            return account;
        }

        throw new AccountNotFoundException("Not found");
    }
}