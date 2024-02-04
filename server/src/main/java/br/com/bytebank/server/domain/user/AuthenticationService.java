package br.com.bytebank.server.domain.user;

import org.springframework.security.core.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.bytebank.server.record.AuthData;
import jakarta.validation.Valid;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    	UserDetails user = repository.findByEmail(email);
        
    	if(user != null) {
    		return user;
    	}
    	
    	throw new UsernameNotFoundException("User not found!");
    }

	public User createUser(@Valid AuthData data) throws AuthenticationException {
		if (repository.findByEmail(data.email()) != null) {
			throw new UserAlreadyExistAuthenticationException("User already exists!");
		}
			
		return repository.save(new User(data));
	}
	
	
}

final class UserAlreadyExistAuthenticationException extends AuthenticationException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserAlreadyExistAuthenticationException(final String msg) {
        super(msg);
    }

}

