package br.com.bytebank.server.domain.user;

import br.com.bytebank.server.security.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.bytebank.server.domain.account.Account;
import br.com.bytebank.server.domain.account.AccountService;
import br.com.bytebank.server.infra.UserAlreadyExistAuthenticationException;
import br.com.bytebank.server.record.AuthData;
import br.com.bytebank.server.record.RegisterData;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;
    
    @Autowired
    private AccountService accountService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    	UserDetails user = repository.findByEmail(email);
        
    	if(user != null) {
    		return user;
    	}
    	
    	throw new UsernameNotFoundException("User not found!");
    }
    
    public User getCurrentUser() {
    	  return ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    @Transactional
	public User createUser(@Valid RegisterData data) throws AuthenticationException {
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
	
	private String generateAccountNumber() {
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

