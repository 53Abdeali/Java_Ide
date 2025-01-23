package com.IDE.IDE.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.IDE.IDE.model.CodeHistory;
import com.IDE.IDE.model.User;
import com.IDE.IDE.repository.CodeHistoryRepository;
import com.IDE.IDE.repository.UserRepository;

@Service
public class CodeHistoryService {

    private final CodeHistoryRepository codeHistoryRepository;
    private final UserRepository userRepository;

    public CodeHistoryService(CodeHistoryRepository codeHistoryRepository, UserRepository userRepository) {
        this.codeHistoryRepository = codeHistoryRepository;
        this.userRepository = userRepository;
    }

    public boolean isUserValid(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public boolean isDuplicateCode(String code) {
        return codeHistoryRepository.existsByCode(code);
    }

    public void saveCodeHistory(String username, String code, String result) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            CodeHistory codeHistory = new CodeHistory();
            codeHistory.setCode(code);
            codeHistory.setResult(result);
            codeHistory.setTimestamp(LocalDateTime.now());
            codeHistory.setUser(user);
            codeHistoryRepository.save(codeHistory);
        } else {
            throw new RuntimeException("User not found.");
        }
    }

    public List<CodeHistory> getUserHistory(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            return codeHistoryRepository.findTop5ByUserOrderByTimestampDesc(userOptional.get()).stream()
            .map(history -> {
                history.setUser(null); // Avoid sending user details
                return history;
            })
            .collect(Collectors.toList());
        }
        throw new RuntimeException("User not found.");
    }

}
