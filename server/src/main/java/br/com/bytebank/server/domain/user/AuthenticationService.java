package br.com.bytebank.server.domain.user;

import br.com.bytebank.server.infra.AccountNotFoundException;
import br.com.bytebank.server.security.TokenService;
import lombok.SneakyThrows;
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
}

