package com.knf.dev.repository;

import java.util.List;
import java.util.Optional;

import com.knf.dev.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import com.knf.dev.models.User;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
	@Query("FROM User u WHERE u.id =?1")
	User getByUserId(Long id);
	@Query("FROM User u WHERE u.username =?1")
	User getByUsername(String username);
}
