package br.com.bytebank.server.domain.account;

import br.com.bytebank.server.domain.user.AuthenticationService;
import br.com.bytebank.server.domain.user.User;
import br.com.bytebank.server.domain.user.UserService;
import br.com.bytebank.server.infra.AccountNotFoundException;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccountServiceTest {

    @Mock
    private AccountRepository repository;

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationService authService;

    @Autowired
    @InjectMocks AccountService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @DisplayName("should return true if account exists")
    void isAccountNumberExistsSuccess() {
        String accountNumber = "01234";
        when(repository.existsByAccountNumber(anyString())).thenReturn(true);

        Boolean exists = service.isAccountNumberExists(accountNumber);

        verify(repository, times(1)).existsByAccountNumber(accountNumber);
        assertTrue(exists);
    }

    @Test
    @DisplayName("should return false if account not exists")
    void isAccountExistsFail() {
        String accountNumber = "01234";
        when(repository.existsByAccountNumber(anyString())).thenReturn(false);

        var accountExist = service.isAccountNumberExists(accountNumber);

        verify(repository, times(1)).existsByAccountNumber(accountNumber);
        assertFalse(accountExist);
    }

    @Test
    @DisplayName("Should return user balance")
    void getUserBalanceSuccess() {
        User user = new User();
        user.setAccount(new Account());
        user.getAccount().setBalance(BigDecimal.valueOf(100));

        when(authService.getCurrentUser()).thenReturn(user);

        BigDecimal balance = service.getUserBalance();

        verify(authService, times(1));
        assertEquals(balance, user.getAccount().getBalance());
    }
}