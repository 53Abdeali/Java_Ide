package com.IDE.IDE.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
public class TokenService {
    private final Set<String> invalidatedToken = new HashSet<>();

    public void invalidatedToken(String token){
        invalidatedToken.add(token);
    }

    public boolean isTokenInvalid(String token) {
        return invalidatedToken.contains(token);
    }
}
