package com.codecool.league.security;

import com.codecool.league.service.CustomUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtFilter jwtFilter;
    private final CustomUserDetailsService customUserDetailsService;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()

//                    .antMatchers("/**").permitAll()

                    .antMatchers("/auth/login").permitAll()

                    .antMatchers(HttpMethod.POST, "/user").permitAll()
                    .antMatchers(HttpMethod.GET, "/user/**").authenticated()
                    .antMatchers(HttpMethod.PUT, "/user/**").authenticated()
                    .antMatchers(HttpMethod.DELETE, "/user/**").hasRole("ADMIN")

                    .antMatchers(HttpMethod.GET, "/team").permitAll()
                    .antMatchers(HttpMethod.GET, "/team/**").authenticated()
                    .antMatchers(HttpMethod.POST, "/team").authenticated()
                    .antMatchers(HttpMethod.PUT, "/team").authenticated()
                    .antMatchers(HttpMethod.DELETE, "/team/**").hasRole("ADMIN")

                    .antMatchers(HttpMethod.GET, "/tournament").permitAll()
                    .antMatchers(HttpMethod.PUT, "/tournament").hasRole("ADMIN")
                    .antMatchers(HttpMethod.POST, "/tournament").hasRole("ADMIN")
                    .antMatchers(HttpMethod.DELETE, "/tournament").hasRole("ADMIN")
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


}
