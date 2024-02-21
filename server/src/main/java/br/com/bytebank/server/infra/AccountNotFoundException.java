package br.com.bytebank.server.infra;

public class AccountNotFoundException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public AccountNotFoundException(final String msg) {
        super(msg);
    }

}

