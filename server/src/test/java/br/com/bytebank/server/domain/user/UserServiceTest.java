package br.com.bytebank.server.domain.user;

import br.com.bytebank.server.domain.account.AccountService;
import br.com.bytebank.server.infra.UserAlreadyExistAuthenticationException;
import br.com.bytebank.server.record.RegisterData;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.atLeast;

class UserServiceTest {

    @Mock
    private UserRepository repository;

    @Mock
    private AccountService accountService;

    @Autowired
    @InjectMocks
    private UserService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @DisplayName("should return saved user from repository")
    void createUserSuccess() throws UserAlreadyExistAuthenticationException {
        RegisterData data = new RegisterData("user@email.com", "user fullname", "password");
        User toBeCheckedUser = new User(data);

        when(repository.findByEmail(data.email())).thenReturn(null);
        when(repository.save(any())).thenReturn(toBeCheckedUser);

        User createdUser = service.createUser(data);

        verify(repository, times(1)).findByEmail(data.email());
        verify(repository, times(1)).save(toBeCheckedUser);
        Assertions.assertEquals(createdUser.getEmail(), data.email());
    }

    @Test
    @DisplayName("should throw error when user already exist in db")
    void createUserFail() {
        RegisterData data = new RegisterData("user@email.com", "user fullname", "password");
        User user = new User(data);

        when(repository.findByEmail(data.email())).thenReturn((UserDetails) user);

        UserAlreadyExistAuthenticationException exception = Assertions.assertThrows(
                UserAlreadyExistAuthenticationException.class, () -> service.createUser(data)
        );

        Assertions.assertNotNull(exception);
    }

    @Test
    @DisplayName("should not return a duplicate number")
    void generateAccountNumber() {
        Set<String> generatedAccountNumbers = new HashSet<>();

        when(accountService.isAccountNumberExists(anyString())).thenAnswer(invocation -> {
            String accountNumber = invocation.getArgument(0);
            return generatedAccountNumbers.contains(accountNumber);
        });

        int numberOfAccountsNumberToTest = 100;
        for (int i = 0; i < numberOfAccountsNumberToTest; i++) {
            String accountNumber = service.generateAccountNumber();
            Assertions.assertNotNull(accountNumber);
            Assertions.assertFalse(generatedAccountNumbers.contains(accountNumber));
            generatedAccountNumbers.add(accountNumber);
        }

        verify(accountService, atLeast(numberOfAccountsNumberToTest)).isAccountNumberExists(anyString());
    }
}