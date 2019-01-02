package ru.aptech.library.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private DataSource dataSource;

    @Value("${spring.queries.users-query}")
    private String usersQuery;

    @Value("${spring.queries.roles-query}")
    private String rolesQuery;

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.
                jdbcAuthentication()
                .usersByUsernameQuery(usersQuery)
                .authoritiesByUsernameQuery(rolesQuery)
                .dataSource(dataSource)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/api/authors/findAll/**").permitAll()
                .antMatchers("/api/genres/findAll/**").permitAll()
                .antMatchers("/api/books/findAll/**").permitAll()
                .antMatchers("/api/authors/findById/**").permitAll()
                .antMatchers("/api/genres/findById/**").permitAll()
                .antMatchers("/api/books/findById/**").permitAll()
                .antMatchers("/api/users/registration").permitAll()
                .antMatchers("/api/users/userIsAuthorize").permitAll()
                .antMatchers("/api/authors/save").hasAuthority("ADMIN")
                .antMatchers("/api/authors/deleteById/**").hasAuthority("ADMIN")
                .antMatchers("/api/books/save").hasAuthority("ADMIN")
                .antMatchers("/api/books/deleteById/**").hasAuthority("ADMIN")
                .antMatchers("/", "/books/**", "/authors/**", "/about-us/**", "/auth/**").permitAll()
                .anyRequest().authenticated()
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/users/logout"))
                .and()
                .httpBasic();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**", "/static/**", "/css/**", "/built/**", "/img/**", "/fonts/**");
    }

}
