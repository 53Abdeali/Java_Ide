package com.IDE.IDE.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IDE.IDE.JWT.JwtUtil;
import com.IDE.IDE.service.CodeHistoryService;
import com.IDE.IDE.service.TokenService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class CodeExecutionController {

    private final CodeHistoryService codeHistoryService;
    private final JwtUtil jwtUtil;
    private final TokenService tokenService;

    public CodeExecutionController(CodeHistoryService codeHistoryService,
            JwtUtil jwtUtil, TokenService tokenService) {
        this.codeHistoryService = codeHistoryService;
        this.jwtUtil = jwtUtil;
        this.tokenService = tokenService;
    }

    @PostMapping("/execute")
    public ResponseEntity<?> executeCode(@RequestBody CodeRequest request,
            @RequestHeader("Authorization") String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication Required");
            }

            String username = jwtUtil.extractUsername(token.substring(7));
            if (!codeHistoryService.isUserValid(username)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found or unauthorized!");
            }

            String code = request.getCode();
            if (codeHistoryService.isDuplicateCode(code)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Duplicate! Code already exist in your database");
            }

            File file = new File("Main.java");
            FileWriter writer = new FileWriter(file);
            writer.write(code);
            writer.close();

            Process compileProcess = Runtime.getRuntime().exec("javac Main.java");
            compileProcess.waitFor();

            Process runProcess = Runtime.getRuntime().exec("java Main");
            BufferedReader br = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                output.append(line).append("\n");
            }
            runProcess.waitFor();

            codeHistoryService.saveCodeHistory(username, code, output.toString());

            return ResponseEntity.ok(output.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error During Execution: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenService.invalidatedToken(token);
        }
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/history")
    public ResponseEntity<?> getUserHistory(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is required!");
        }

        String username = jwtUtil.extractUsername(token.substring(7));
        if (!codeHistoryService.isUserValid(username)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found or unauthorized.");
        }

        return ResponseEntity.ok(codeHistoryService.getUserHistory(username));
    }

    public static class CodeRequest {
        private String code;

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }
}
