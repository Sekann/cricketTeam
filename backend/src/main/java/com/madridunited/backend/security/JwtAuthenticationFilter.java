package com.madridunited.backend.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final ConfigurableJWTProcessor<SecurityContext> jwtProcessor;

    public JwtAuthenticationFilter(String jwksUrl) throws MalformedURLException {
        jwtProcessor = new DefaultJWTProcessor<>();
        JWKSource<SecurityContext> keySource = new RemoteJWKSet<>(new URL(jwksUrl));
        jwtProcessor.setJWSKeySelector(new com.nimbusds.jose.proc.JWSVerificationKeySelector<>(
                com.nimbusds.jose.JWSAlgorithm.RS256, keySource));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // No token → seguir sin autenticar
            return;
        }

        String token = authHeader.substring(7); // ✅ Extraer el token (sin "Bearer ")

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                var claims = jwtProcessor.process(token, null);

                String username = claims.getSubject();

                if (username != null) {
                    var authToken = new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            Collections.emptyList() // roles
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (ParseException | JOSEException e) {
                // token inválido → ignoramos y seguimos sin autenticar
            } catch (BadJOSEException e) {
                throw new RuntimeException(e);
            }
        }

        filterChain.doFilter(request, response);
    }
}