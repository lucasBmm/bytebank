package br.com.bytebank.server.domain.account;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.bytebank.server.domain.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity( name = "Account")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table( name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
    
    private String accountNumber;
    
    private BigDecimal balance;
    
    private AccountStatus status;
    
    private LocalDateTime creationDate;
    private LocalDateTime lastUpdated;
}
