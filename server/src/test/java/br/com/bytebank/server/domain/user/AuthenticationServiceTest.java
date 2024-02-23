package br.com.bytebank.server.domain.user;

import br.com.bytebank.server.domain.account.AccountService;
import br.com.bytebank.server.record.RegisterData;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private UserRepository repository;

    @Autowired
    @InjectMocks
    private AuthenticationService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @DisplayName("should return userDetails when user is in db")
    void loadUserByUsernameTestSuccess() {
        User user = new User(new RegisterData("user@email.com", "user fullname", "password"));

        when(repository.findByEmail(user.getEmail())).thenReturn(user);

        service.loadUserByUsername(user.getEmail());

        verify(repository, times(1)).findByEmail(user.getEmail());
    }

    @Test
    @DisplayName("should return exception when user is not in db")
    void loadUserByUsernameTestFail() {
        UsernameNotFoundException exception = Assertions.assertThrows(
            UsernameNotFoundException.class, () -> service.loadUserByUsername("noUser@email.com")
        );

        Assertions.assertNotNull(exception);
    }
}