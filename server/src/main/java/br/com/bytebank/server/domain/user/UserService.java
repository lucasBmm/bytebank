package br.com.bytebank.server.domain.user;

import br.com.bytebank.server.domain.account.Account;
import br.com.bytebank.server.domain.account.AccountService;
import br.com.bytebank.server.infra.UserAlreadyExistAuthenticationException;
import br.com.bytebank.server.record.RegisterData;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AccountService accountService;

    @Transactional
    public User createUser(@Valid RegisterData data) throws UserAlreadyExistAuthenticationException {
        if (repository.findByEmail(data.email()) != null) {
            throw new UserAlreadyExistAuthenticationException("User already exists!");
        }

        var accountNumber = generateAccountNumber();

        Account account = new Account(accountNumber);

        User user = new User(data);

        user.setAccount(account);
        account.setUser(user);

        return repository.save(user);
    }

    public String generateAccountNumber() {
        String accountNumber;
        do {
            accountNumber = generateRandomAccountNumber();
        } while (accountService.isAccountNumberExists(accountNumber));
        return accountNumber;
    }

    private String generateRandomAccountNumber() {
        Random random = new Random();
        return String.format("%05d", random.nextInt(100000)); // Generate a random 5-digit number
    }
}
