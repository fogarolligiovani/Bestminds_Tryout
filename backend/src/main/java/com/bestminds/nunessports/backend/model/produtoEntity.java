package com.bestminds.nunessports.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Table(
        name = "produtos"
)
@Entity(
        name = "produtos"
)
@Data
public class produtoEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codigo;
    private String nome;
    private String descricao;
    private Float preco;

    public produtoEntity() {

    }

    public produtoEntity(produtoRequestDTO data) {
        this.nome = data.nome();
        this.descricao = data.descricao();
        this.preco = data.preco();
    }
}


