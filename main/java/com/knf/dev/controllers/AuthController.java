package com.knf.dev.controllers;

import com.knf.dev.models.Product;
import com.knf.dev.request.ChangePasswordRequest;
import com.knf.dev.request.ForgotPasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.knf.dev.models.User;
import com.knf.dev.repository.UserRepository;
import com.knf.dev.request.LoginRequest;
import com.knf.dev.request.SignupRequest;
import com.knf.dev.response.JwtResponse;
import com.knf.dev.response.MessageResponse;
import com.knf.dev.security.jwt.JwtUtils;
import com.knf.dev.security.services.UserDetailsImpl;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateuser(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		return ResponseEntity
				.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),userDetails.getEmail()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user account
//		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
//				encoder.encode(signUpRequest.getPassword()), encoder.encode(signUpRequest.getConfirmpassword()),
//				signUpRequest.getFirstname(),signUpRequest.getLastname(),signUpRequest.getPhone());
		User user = new User(signUpRequest.getName(),signUpRequest.getUsername(),
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()),
				signUpRequest.getMobileNumber());

		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("user registered successfully!"));
	}
	@GetMapping("/userdetail/{id}")
	public ResponseEntity<User> getUserDetail(@PathVariable(value = "id") Long id)
	{
		User user = userRepository.getByUserId(id);
		User user2=new User(user.getName(),user.getUsername(),user.getEmail(),user.getPassword(),user.getMobileNumber());
		if(user2 == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(user2);
		//return new ResponseEntity<List<Product>> productRepository.getById(fetchProduct.getUserid());
	}
	@PutMapping ("/changepassword/{id}")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, @PathVariable(value = "id") Long id)
	{
		User user = userRepository.getByUserId(id);
		//User user2=new User(user.getName(),user.getUsername(),user.getEmail(),user.getPassword(),user.getMobileNumber());
		if(user == null) {
			return ResponseEntity.notFound().build();
		}
		System.out.println(encoder.matches(changePasswordRequest.getOldPassword(),user.getPassword()));
		System.out.println(user.getPassword());
		if(encoder.matches(changePasswordRequest.getOldPassword(),user.getPassword()) &&
		!encoder.matches(changePasswordRequest.getNewPassword(),user.getPassword())){
		user.setPassword(encoder.encode(changePasswordRequest.getNewPassword()));
		userRepository.save(user);
			return ResponseEntity.ok(new MessageResponse("Password Updated successfully!"));
		}
		else if(!encoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())){
			return ResponseEntity.badRequest().body(new MessageResponse("Current Password is Wrong!"));

	}
		else if(encoder.matches(changePasswordRequest.getNewPassword(), user.getPassword())){
			return ResponseEntity.badRequest().body(new MessageResponse("New Password same as Old Password!"));

		}

		else{
			return ResponseEntity.badRequest().body(new MessageResponse("Credential are wrong!"));		}


		//return ResponseEntity.ok().body(user2);
		//return new ResponseEntity<List<Product>> productRepository.getById(fetchProduct.getUserid());
	}
	@PutMapping ("/setnewpassword")
	public ResponseEntity<?> setnewpassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest)
	{
		//Optional<?> user = userRepository.findByUsername(forgotPasswordRequest.getUsername());
		//User user2=new User(user.getName(),user.getUsername(),user.getEmail(),user.getPassword(),user.getMobileNumber());
		if(!userRepository.existsByUsername(forgotPasswordRequest.getUsername())) {
			return ResponseEntity.notFound().build();
		}
			User user=userRepository.getByUsername(forgotPasswordRequest.getUsername());
		user.setPassword(encoder.encode(forgotPasswordRequest.getNewpassword()));
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("Password Updated successfully!"));




		//System.out.println(encoder.matches(forgotPasswordRequest.getOldPassword(),user.getPassword()));
		//System.out.println(user.getPassword())


		//return ResponseEntity.ok().body(user2);
		//return new ResponseEntity<List<Product>> productRepository.getById(fetchProduct.getUserid());
	}
}
