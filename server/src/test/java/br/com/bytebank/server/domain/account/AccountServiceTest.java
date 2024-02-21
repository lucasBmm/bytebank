package br.com.bytebank.server.domain.account;

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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccountServiceTest {

    @Mock
    private AccountRepository repository;

    @Autowired
    @InjectMocks AccountService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @DisplayName("should return account number successfully when account exists")
    void isAccountNumberExistsSuccess() {
        String accountNumber = "01234";
        when(repository.existsByAccountNumber(anyString())).thenReturn(true);

        Boolean exists = service.isAccountNumberExists(accountNumber);

        verify(repository, times(1)).existsByAccountNumber(accountNumber);
        assertTrue(exists);
    }

    @Test
    @DisplayName("should throw exception if account not exists")
    void isAccountExistsFail() {
        String accountNumber = "01234";
        when(repository.existsByAccountNumber(anyString())).thenReturn(false);

        var exception = assertThrows(AccountNotFoundException.class, () -> service.isAccountNumberExists(accountNumber));

        verify(repository, times(1)).existsByAccountNumber(accountNumber);
        assertNotNull(exception);
    }
}