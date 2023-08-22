--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: soft_seller; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA soft_seller;


ALTER SCHEMA soft_seller OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: soft_seller; Owner: postgres
--

CREATE TABLE soft_seller.categories (
    id integer NOT NULL,
    name character varying(255),
    tax_percentage numeric
);


ALTER TABLE soft_seller.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: soft_seller; Owner: postgres
--

CREATE SEQUENCE soft_seller.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE soft_seller.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: soft_seller; Owner: postgres
--

ALTER SEQUENCE soft_seller.categories_id_seq OWNED BY soft_seller.categories.id;


--
-- Name: products; Type: TABLE; Schema: soft_seller; Owner: postgres
--

CREATE TABLE soft_seller.products (
    id integer NOT NULL,
    name character varying(255),
    category_id integer NOT NULL,
    price numeric,
    stock_qty integer,
    code character varying(20)
);


ALTER TABLE soft_seller.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: soft_seller; Owner: postgres
--

CREATE SEQUENCE soft_seller.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE soft_seller.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: soft_seller; Owner: postgres
--

ALTER SEQUENCE soft_seller.products_id_seq OWNED BY soft_seller.products.id;


--
-- Name: sales; Type: TABLE; Schema: soft_seller; Owner: postgres
--

CREATE TABLE soft_seller.sales (
    id integer NOT NULL,
    sale_date date NOT NULL,
    total_sale_value numeric NOT NULL,
    total_tax numeric(10,2) NOT NULL
);


ALTER TABLE soft_seller.sales OWNER TO postgres;

--
-- Name: sales_id_seq; Type: SEQUENCE; Schema: soft_seller; Owner: postgres
--

CREATE SEQUENCE soft_seller.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE soft_seller.sales_id_seq OWNER TO postgres;

--
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: soft_seller; Owner: postgres
--

ALTER SEQUENCE soft_seller.sales_id_seq OWNED BY soft_seller.sales.id;


--
-- Name: sales_products; Type: TABLE; Schema: soft_seller; Owner: postgres
--

CREATE TABLE soft_seller.sales_products (
    id integer NOT NULL,
    sale_id integer NOT NULL,
    product_id integer NOT NULL,
    sold_quantity integer NOT NULL,
    sold_value_product numeric(10,2) NOT NULL,
    tax_value_product numeric(10,2) NOT NULL
);


ALTER TABLE soft_seller.sales_products OWNER TO postgres;

--
-- Name: sales_products_id_seq; Type: SEQUENCE; Schema: soft_seller; Owner: postgres
--

CREATE SEQUENCE soft_seller.sales_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE soft_seller.sales_products_id_seq OWNER TO postgres;

--
-- Name: sales_products_id_seq; Type: SEQUENCE OWNED BY; Schema: soft_seller; Owner: postgres
--

ALTER SEQUENCE soft_seller.sales_products_id_seq OWNED BY soft_seller.sales_products.id;


--
-- Name: categories id; Type: DEFAULT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.categories ALTER COLUMN id SET DEFAULT nextval('soft_seller.categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.products ALTER COLUMN id SET DEFAULT nextval('soft_seller.products_id_seq'::regclass);


--
-- Name: sales id; Type: DEFAULT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.sales ALTER COLUMN id SET DEFAULT nextval('soft_seller.sales_id_seq'::regclass);


--
-- Name: sales_products id; Type: DEFAULT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.sales_products ALTER COLUMN id SET DEFAULT nextval('soft_seller.sales_products_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: soft_seller; Owner: postgres
--

COPY soft_seller.categories (id, name, tax_percentage) FROM stdin;
29	Limpeza	10
30	Alimentos	20
1	Bebidas	50
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: soft_seller; Owner: postgres
--

COPY soft_seller.products (id, name, category_id, price, stock_qty, code) FROM stdin;
165	Pinho Sol	29	50.99	20	PINHO123
166	Coca Cola	1	12.00	10	COCA123
\.


--
-- Data for Name: sales; Type: TABLE DATA; Schema: soft_seller; Owner: postgres
--

COPY soft_seller.sales (id, sale_date, total_sale_value, total_tax) FROM stdin;
\.


--
-- Data for Name: sales_products; Type: TABLE DATA; Schema: soft_seller; Owner: postgres
--

COPY soft_seller.sales_products (id, sale_id, product_id, sold_quantity, sold_value_product, tax_value_product) FROM stdin;
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: soft_seller; Owner: postgres
--

SELECT pg_catalog.setval('soft_seller.categories_id_seq', 30, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: soft_seller; Owner: postgres
--

SELECT pg_catalog.setval('soft_seller.products_id_seq', 166, true);


--
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: soft_seller; Owner: postgres
--

SELECT pg_catalog.setval('soft_seller.sales_id_seq', 39, true);


--
-- Name: sales_products_id_seq; Type: SEQUENCE SET; Schema: soft_seller; Owner: postgres
--

SELECT pg_catalog.setval('soft_seller.sales_products_id_seq', 54, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- Name: sales_products sales_products_pkey; Type: CONSTRAINT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.sales_products
    ADD CONSTRAINT sales_products_pkey PRIMARY KEY (id);


--
-- Name: products products_fk; Type: FK CONSTRAINT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.products
    ADD CONSTRAINT products_fk FOREIGN KEY (category_id) REFERENCES soft_seller.categories(id);


--
-- Name: sales_products sales_products_product_id_fkey; Type: FK CONSTRAINT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.sales_products
    ADD CONSTRAINT sales_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES soft_seller.products(id);


--
-- Name: sales_products sales_products_sale_id_fkey; Type: FK CONSTRAINT; Schema: soft_seller; Owner: postgres
--

ALTER TABLE ONLY soft_seller.sales_products
    ADD CONSTRAINT sales_products_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES soft_seller.sales(id);


--
-- PostgreSQL database dump complete
--

