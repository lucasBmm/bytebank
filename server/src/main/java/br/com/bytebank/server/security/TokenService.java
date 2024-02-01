package br.com.bytebank.server.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.com.bytebank.server.domain.user.User;

@Service
public class TokenService {

	private String secret = "sadsad";
	
	public String generateToken(User user) {
		try {
			var algorithm = Algorithm.HMAC256(secret);
			return JWT.create()
					.withIssuer("Bytebank Server")
					.withSubject(user.getEmail())
					.withExpiresAt(ExpirationTime())
					.sign(algorithm);
		} catch (JWTCreationException exception){
            throw new RuntimeException("Error generating JWT token", exception);
        }
	}
	
	 private Instant ExpirationTime() {
	        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
	    }

	 public String getSubject(String tokenJWT) {
	        try {
	            var algoritmo = Algorithm.HMAC256(secret);
	            return JWT.require(algoritmo)
	                    .withIssuer("Bytebank Server")
	                    .build()
	                    .verify(tokenJWT)
	                    .getSubject();
	        } catch (JWTVerificationException exception) {
	            throw new RuntimeException("Token JWT inválido ou expirado!");
	        }
	 }
}
