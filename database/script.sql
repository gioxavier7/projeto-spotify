create database db_controle_musicas_ba;

use db_controle_musicas_ba;

create table tbl_musica(
  id int primary key auto_increment,
  nome varchar(80) not null,
  link varchar(200) not null,
  duracao time not null,
  data_lancamento date not null,
  foto_capa varchar(200),
  letra text
);

create table tbl_usuario(
  id int primary key auto_increment,
  nome varchar(50) not null,
  username varchar(45) not null,
  email varchar(75) not null,
  senha varchar(8) not null
);

create table tbl_artista(
  id int primary key auto_increment,
  nome varchar(50) not null,
  biografia varchar(250)
);

create table tbl_banda(
  id int primary key auto_increment,
  nome varchar(45) not null,
  integrantes varchar(200) not null
);

create table tbl_genero(
  id int primary key auto_increment,
  tipo varchar(50) not null
);

create table tbl_plano(
  id int primary key auto_increment,
  nome varchar(45) not null,
  preco varchar(10) not null,
  beneficios varchar(150) not null
);

create table tbl_tipo_pagamento(
  id int primary key auto_increment,
  tipo_pagamento varchar(45) not null
);




show tables;
desc tbl_musica;
select * from tbl_musica;
select id from tbl_musica;