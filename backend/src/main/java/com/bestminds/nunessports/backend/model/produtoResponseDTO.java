package com.bestminds.nunessports.backend.model;

public record produtoResponseDTO(Integer codigo, String nome, String descricao, Float preco) {
    public produtoResponseDTO(produtoEntity prod) {
        this(prod.getCodigo(), prod.getNome(), prod.getDescricao(), prod.getPreco());
    }
}
