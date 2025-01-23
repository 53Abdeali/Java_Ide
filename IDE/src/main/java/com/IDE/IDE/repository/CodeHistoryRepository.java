package com.IDE.IDE.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.IDE.IDE.model.CodeHistory;
import com.IDE.IDE.model.User;

public interface CodeHistoryRepository extends JpaRepository<CodeHistory, Long> {
    // List<CodeHistory> findTop5ByOrderByTimestampDesc();
    boolean existsByCode(String code);
    List<CodeHistory> findTop5ByUserOrderByTimestampDesc(User user);
}
