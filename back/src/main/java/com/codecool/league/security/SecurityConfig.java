package com.codecool.league.security;

import com.google.common.collect.ImmutableList;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtServices jwtServices;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors()
                .and()
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()

                    .antMatchers("/**").permitAll()

//                    .antMatchers("/auth/login").permitAll()
//
//                    .antMatchers(HttpMethod.POST, "/user").permitAll()
//                    .antMatchers(HttpMethod.GET, "/user/**").hasRole("ADMIN")
//                    .antMatchers(HttpMethod.PUT, "/user/**").hasRole("ADMIN")
//                    .antMatchers(HttpMethod.DELETE, "/user/**").hasRole("ADMIN")
//
//                    .antMatchers(HttpMethod.GET, "/team").permitAll()
//                    .antMatchers(HttpMethod.GET, "/team/**").authenticated()
//                    .antMatchers(HttpMethod.POST, "/team").authenticated()
//                    .antMatchers(HttpMethod.PUT, "/team").authenticated()
//                    .antMatchers(HttpMethod.DELETE, "/team/**").hasRole("ADMIN")
//
//                    .antMatchers(HttpMethod.GET, "/tournament").permitAll()
//                    .antMatchers(HttpMethod.PUT, "/tournament").hasRole("ADMIN")
//                    .antMatchers(HttpMethod.POST, "/tournament").hasRole("ADMIN")
//                    .antMatchers(HttpMethod.DELETE, "/tournament").hasRole("ADMIN")
                .and()
                .addFilterBefore(new JwtFilter(jwtServices), UsernamePasswordAuthenticationFilter.class);
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH",
//                "DELETE", "OPTIONS"));
////        configuration.setAllowCredentials(true);
//        configuration.validateAllowCredentials();
////        configuration.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Headers", "Origin","Accept",
////                "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers",
////                "Access-Control-Allow-Origin", "Authorization", "X-Auth-Token"));
////        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type",
////                "x-auth-token", "access-control-allow-origin", "access-control-allow-headers"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setExposedHeaders(Arrays.asList("*"));
//        UrlBasedCorsConfigurationSource source = new
//                UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//
//        return source;
//    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        final CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(ImmutableList.of("http://localhost:3000"));
//        configuration.setAllowedMethods(ImmutableList.of("HEAD",
//                "GET", "POST", "PUT", "DELETE", "PATCH"));
//        // setAllowCredentials(true) is important, otherwise:
//        // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
//        configuration.setAllowCredentials(true);
//        // setAllowedHeaders is important! Without it, OPTIONS preflight request
//        // will fail with 403 Invalid CORS request
//        configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

}
