package br.com.apirestfull.todolistdesafio.dto;

import jakarta.validation.constraints.NotNull;


public record TaskDto(@NotNull String title,
                      @NotNull String description,
                      @NotNull String status) {
}
