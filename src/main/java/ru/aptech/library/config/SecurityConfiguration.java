package ru.aptech.library.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
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
                .antMatchers("/authors/findAll/**").permitAll()
                .antMatchers("/genres/findAll/**").permitAll()
                .antMatchers("/books/findAll/**").permitAll()
                .antMatchers("/authors/findById/**").permitAll()
                .antMatchers("/genres/findById/**").permitAll()
                .antMatchers("/books/findById/**").permitAll()
                .antMatchers("/users/registration").permitAll()
                .antMatchers("/users/userIsAuthorize").permitAll()
                .antMatchers("/authors/save").hasAuthority("ADMIN")
                .antMatchers("/authors/deleteById/**").hasAuthority("ADMIN")
                .antMatchers("/books/save").hasAuthority("ADMIN")
                .antMatchers("/books/deleteById/**").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/users/logout"))
                .and()
                .httpBasic();
    }

//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web
//                .ignoring()
//                .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
//    }

}
