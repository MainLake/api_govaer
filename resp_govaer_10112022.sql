--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dsap; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA dsap;


ALTER SCHEMA dsap OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = dsap, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: customer; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE customer (
    id_customer integer NOT NULL,
    first_name character varying(64),
    last_name character varying(64),
    address_customer character varying(256),
    mail character varying(64),
    phone_number character varying(18),
    rfc character varying(18),
    date_create timestamp without time zone,
    id_user_create integer,
    date_update timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_user_update integer,
    id_status integer
);


ALTER TABLE customer OWNER TO postgres;

--
-- Name: customer_id_customer_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE customer_id_customer_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE customer_id_customer_seq OWNER TO postgres;

--
-- Name: customer_id_customer_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE customer_id_customer_seq OWNED BY customer.id_customer;


SET search_path = public, pg_catalog;

--
-- Name: fumigation_date_id_fum_date_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE fumigation_date_id_fum_date_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fumigation_date_id_fum_date_seq OWNER TO postgres;

SET search_path = dsap, pg_catalog;

--
-- Name: fumigation_date; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE fumigation_date (
    id_fum_date integer DEFAULT nextval('public.fumigation_date_id_fum_date_seq'::regclass) NOT NULL,
    fum_date date,
    hour time(0) without time zone,
    no_orden integer NOT NULL,
    date_create timestamp(0) without time zone,
    id_user_create integer,
    date_update timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_user_update integer,
    id_status integer
);


ALTER TABLE fumigation_date OWNER TO postgres;

--
-- Name: plane_runaway; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE plane_runaway (
    id_runaway integer NOT NULL,
    name_runaway character varying(64),
    municipality character varying(64),
    date_create timestamp without time zone,
    id_user_create integer,
    date_update timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_user_update integer,
    id_status integer
);


ALTER TABLE plane_runaway OWNER TO postgres;

--
-- Name: plane_runaway_id_runaway_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE plane_runaway_id_runaway_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE plane_runaway_id_runaway_seq OWNER TO postgres;

--
-- Name: plane_runaway_id_runaway_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE plane_runaway_id_runaway_seq OWNED BY plane_runaway.id_runaway;


--
-- Name: price_ha; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE price_ha (
    id_price integer NOT NULL,
    description character varying(64),
    amount numeric(9,2),
    date_create timestamp without time zone,
    id_user_create integer,
    date_update timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_user_update integer,
    id_status integer
);


ALTER TABLE price_ha OWNER TO postgres;

--
-- Name: price_ha_id_price_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE price_ha_id_price_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE price_ha_id_price_seq OWNER TO postgres;

--
-- Name: price_ha_id_price_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE price_ha_id_price_seq OWNED BY price_ha.id_price;


--
-- Name: property; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE property (
    id_property integer NOT NULL,
    name_property character varying(40),
    coordinates character varying(64),
    municipality character varying(64),
    ha double precision,
    rfc character varying(18),
    id_price integer NOT NULL,
    id_customer integer NOT NULL,
    date_create timestamp without time zone,
    id_user_create integer,
    date_update timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_user_update integer,
    id_status integer
);


ALTER TABLE property OWNER TO postgres;

--
-- Name: property_id_property_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE property_id_property_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE property_id_property_seq OWNER TO postgres;

--
-- Name: property_id_property_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE property_id_property_seq OWNED BY property.id_property;


--
-- Name: rol; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE rol (
    id_rol integer NOT NULL,
    name_rol character varying(64),
    id_status integer
);


ALTER TABLE rol OWNER TO postgres;

--
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rol_id_rol_seq OWNER TO postgres;

--
-- Name: rol_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE rol_id_rol_seq OWNED BY rol.id_rol;


--
-- Name: service_activity; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE service_activity (
    id_activity integer NOT NULL,
    activity_description character varying(50),
    date_create timestamp without time zone,
    id_user_create integer,
    date_update timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_user_update integer,
    id_status integer
);


ALTER TABLE service_activity OWNER TO postgres;

--
-- Name: service_activity_id_activity_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE service_activity_id_activity_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE service_activity_id_activity_seq OWNER TO postgres;

--
-- Name: service_activity_id_activity_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE service_activity_id_activity_seq OWNED BY service_activity.id_activity;


--
-- Name: service_orden; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE service_orden (
    no_orden integer NOT NULL,
    agreed_date date,
    so_description character varying(256),
    id_property integer NOT NULL,
    id_activity integer NOT NULL,
    date_create timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_user_create integer,
    date_update timestamp without time zone,
    id_user_update integer,
    id_status integer
);


ALTER TABLE service_orden OWNER TO postgres;

--
-- Name: service_orden_no_orden_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE service_orden_no_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE service_orden_no_orden_seq OWNER TO postgres;

--
-- Name: service_orden_no_orden_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE service_orden_no_orden_seq OWNED BY service_orden.no_orden;


--
-- Name: status; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE status (
    id_status integer NOT NULL,
    description_status character varying(32)
);


ALTER TABLE status OWNER TO postgres;

--
-- Name: status_id_status_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE status_id_status_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE status_id_status_seq OWNER TO postgres;

--
-- Name: status_id_status_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE status_id_status_seq OWNED BY status.id_status;


--
-- Name: users; Type: TABLE; Schema: dsap; Owner: postgres
--

CREATE TABLE users (
    id_user integer NOT NULL,
    name character varying(64),
    first_name character varying(64),
    last_name character varying(64),
    login character varying(64),
    psswrd character varying(64),
    date_update timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_rol integer,
    id_status integer
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: dsap; Owner: postgres
--

CREATE SEQUENCE users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_user_seq OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: dsap; Owner: postgres
--

ALTER SEQUENCE users_id_user_seq OWNED BY users.id_user;


--
-- Name: customer id_customer; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY customer ALTER COLUMN id_customer SET DEFAULT nextval('customer_id_customer_seq'::regclass);


--
-- Name: plane_runaway id_runaway; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY plane_runaway ALTER COLUMN id_runaway SET DEFAULT nextval('plane_runaway_id_runaway_seq'::regclass);


--
-- Name: price_ha id_price; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY price_ha ALTER COLUMN id_price SET DEFAULT nextval('price_ha_id_price_seq'::regclass);


--
-- Name: property id_property; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY property ALTER COLUMN id_property SET DEFAULT nextval('property_id_property_seq'::regclass);


--
-- Name: rol id_rol; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY rol ALTER COLUMN id_rol SET DEFAULT nextval('rol_id_rol_seq'::regclass);


--
-- Name: service_activity id_activity; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_activity ALTER COLUMN id_activity SET DEFAULT nextval('service_activity_id_activity_seq'::regclass);


--
-- Name: service_orden no_orden; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_orden ALTER COLUMN no_orden SET DEFAULT nextval('service_orden_no_orden_seq'::regclass);


--
-- Name: status id_status; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY status ALTER COLUMN id_status SET DEFAULT nextval('status_id_status_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id_user SET DEFAULT nextval('users_id_user_seq'::regclass);


--
-- Data for Name: customer; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY customer (id_customer, first_name, last_name, address_customer, mail, phone_number, rfc, date_create, id_user_create, date_update, id_user_update, id_status) FROM stdin;
1	ARNULFO	CARRILLO	TAPACHULA	arnulfo@gmail.com	749274022	KDHEUS837493	2022-10-05 23:24:25.246816	\N	\N	\N	1
2	EDUAN	RUIZ	EDO MEX	eduan77@gmail.com	85403023	WEBOS847493	2022-10-05 23:25:28.329091	\N	\N	2	2
3	NICOL	VARGAS	PUEBLA	nicol669@gmail.com	86482203	N93047LFDE4	\N	1	2022-10-09 11:17:41.194491	\N	1
\.


--
-- Data for Name: fumigation_date; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY fumigation_date (id_fum_date, fum_date, hour, no_orden, date_create, id_user_create, date_update, id_user_update, id_status) FROM stdin;
1	2022-10-12	11:00:12	1	2022-10-25 23:05:45	1	\N	\N	1
2	2022-10-25	22:46:21	2	2022-10-25 23:06:33	2	\N	1	1
\.


--
-- Data for Name: plane_runaway; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY plane_runaway (id_runaway, name_runaway, municipality, date_create, id_user_create, date_update, id_user_update, id_status) FROM stdin;
1	RUNAWAY 1	SUCHIATE	\N	1	2022-10-31 22:37:32.872333	\N	1
3	RUNAWAY 3	TAPACHULA 3	\N	2	2022-10-31 22:38:59.615117	\N	1
2	RUNAWAY 2	MAZATAN 2	\N	2	2022-10-31 22:38:26.978428	1	1
\.


--
-- Data for Name: price_ha; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY price_ha (id_price, description, amount, date_create, id_user_create, date_update, id_user_update, id_status) FROM stdin;
2	PATIO 2	1500.00	2022-10-05 23:27:15.168164	\N	\N	\N	1
3	PATIO 3	1700.00	\N	1	2022-11-01 09:25:27.619656	\N	1
1	PATIO 1	1300.00	2022-10-05 23:27:14.514987	\N	\N	2	1
\.


--
-- Data for Name: property; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY property (id_property, name_property, coordinates, municipality, ha, rfc, id_price, id_customer, date_create, id_user_create, date_update, id_user_update, id_status) FROM stdin;
2	ZONA 2	LAT 30, LOG 88	SUCHIATE	15.800000000000001	SKFK9934J3	1	1	\N	2	2022-10-13 12:33:20.903402	\N	1
3	ZONA XX	LAT 77, LOG 25	TAPACHULA	17.800000000000001	SKFK9934J3	1	2	\N	1	2022-10-13 12:36:13.813307	\N	1
1	ZONA ORO	LAT 52, LOG 04	TAPACHULA	20.800000000000001	GKDJN8342	1	2	\N	1	2022-10-13 12:30:37.247337	1	1
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY rol (id_rol, name_rol, id_status) FROM stdin;
1	ADMINISTRADOR	1
2	AUDITOR	1
4	VISITANTE	1
3	CAPTURISTA	1
\.


--
-- Data for Name: service_activity; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY service_activity (id_activity, activity_description, date_create, id_user_create, date_update, id_user_update, id_status) FROM stdin;
1	ACTIVIDAD 1	2022-10-05 23:30:33.929129	\N	\N	\N	1
2	MONITOREO	2022-10-05 23:30:34.59423	\N	\N	1	1
3	ACTIVIDAD 3	\N	2	2022-10-21 19:29:16.580874	\N	1
\.


--
-- Data for Name: service_orden; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY service_orden (no_orden, agreed_date, so_description, id_property, id_activity, date_create, id_user_create, date_update, id_user_update, id_status) FROM stdin;
1	2022-10-10	PRUEBA 1 SERVICIO	2	1	2022-10-21 21:54:51.044574	2	\N	\N	1
3	2022-10-17	PRUEBA 3 SERVICIO	1	2	2022-10-21 21:55:30.608104	1	\N	\N	1
4	2022-10-20	TEST 3 SERVICE	1	2	2022-10-21 21:58:54.009244	1	\N	\N	2
2	2022-10-20	TEST X SERVICE	1	2	2022-10-21 21:55:09.065232	2	\N	1	2
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY status (id_status, description_status) FROM stdin;
1	ACTIVO
2	INACTIVO
3	ACCESO BLOQUEADO
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: dsap; Owner: postgres
--

COPY users (id_user, name, first_name, last_name, login, psswrd, date_update, id_rol, id_status) FROM stdin;
1	JUAN	MALDONADO	PEREZ	bananero	qwerty	2022-10-09 10:23:41.708667	1	\N
2	DAVID	LOPEZ	RODES	gatita	vodkaveza	2022-10-09 10:23:41.708667	2	\N
4	ARNULFO	CARRILLO	XXXXX	naruto	nima943	2022-10-31 23:18:48.079729	2	1
3	EDUANCILLO	VILLEGAS	RUIZ	baki88	sailormoon	2022-10-31 23:17:55.024591	2	1
\.


--
-- Name: customer_id_customer_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('customer_id_customer_seq', 3, true);


--
-- Name: plane_runaway_id_runaway_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('plane_runaway_id_runaway_seq', 3, true);


--
-- Name: price_ha_id_price_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('price_ha_id_price_seq', 3, true);


--
-- Name: property_id_property_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('property_id_property_seq', 3, true);


--
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('rol_id_rol_seq', 4, true);


--
-- Name: service_activity_id_activity_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('service_activity_id_activity_seq', 3, true);


--
-- Name: service_orden_no_orden_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('service_orden_no_orden_seq', 4, true);


--
-- Name: status_id_status_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('status_id_status_seq', 3, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: dsap; Owner: postgres
--

SELECT pg_catalog.setval('users_id_user_seq', 4, true);


SET search_path = public, pg_catalog;

--
-- Name: fumigation_date_id_fum_date_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('fumigation_date_id_fum_date_seq', 2, true);


SET search_path = dsap, pg_catalog;

--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id_customer);


--
-- Name: fumigation_date fumigation_date_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY fumigation_date
    ADD CONSTRAINT fumigation_date_pkey PRIMARY KEY (id_fum_date);


--
-- Name: plane_runaway plane_runaway_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY plane_runaway
    ADD CONSTRAINT plane_runaway_pkey PRIMARY KEY (id_runaway);


--
-- Name: price_ha price_ha_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY price_ha
    ADD CONSTRAINT price_ha_pkey PRIMARY KEY (id_price);


--
-- Name: property property_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY property
    ADD CONSTRAINT property_pkey PRIMARY KEY (id_property);


--
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);


--
-- Name: service_activity service_activity_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_activity
    ADD CONSTRAINT service_activity_pkey PRIMARY KEY (id_activity);


--
-- Name: service_orden service_orden_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_orden
    ADD CONSTRAINT service_orden_pkey PRIMARY KEY (no_orden);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id_status);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: customer customer_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- Name: customer customer_id_user_create_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_id_user_create_fkey FOREIGN KEY (id_user_create) REFERENCES users(id_user);


--
-- Name: customer customer_id_user_update_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_id_user_update_fkey FOREIGN KEY (id_user_update) REFERENCES users(id_user);


--
-- Name: fumigation_date fumigation_date_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY fumigation_date
    ADD CONSTRAINT fumigation_date_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- Name: fumigation_date fumigation_date_id_user_create_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY fumigation_date
    ADD CONSTRAINT fumigation_date_id_user_create_fkey FOREIGN KEY (id_user_create) REFERENCES users(id_user);


--
-- Name: fumigation_date fumigation_date_id_user_update_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY fumigation_date
    ADD CONSTRAINT fumigation_date_id_user_update_fkey FOREIGN KEY (id_user_update) REFERENCES users(id_user);


--
-- Name: service_orden id_activity_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_orden
    ADD CONSTRAINT id_activity_fkey FOREIGN KEY (id_activity) REFERENCES service_activity(id_activity);


--
-- Name: service_orden id_property_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_orden
    ADD CONSTRAINT id_property_fkey FOREIGN KEY (id_property) REFERENCES property(id_property);


--
-- Name: fumigation_date no_orden_fum_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY fumigation_date
    ADD CONSTRAINT no_orden_fum_fkey FOREIGN KEY (no_orden) REFERENCES service_orden(no_orden);


--
-- Name: plane_runaway plane_runaway_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY plane_runaway
    ADD CONSTRAINT plane_runaway_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- Name: plane_runaway plane_runaway_id_user_create_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY plane_runaway
    ADD CONSTRAINT plane_runaway_id_user_create_fkey FOREIGN KEY (id_user_create) REFERENCES users(id_user);


--
-- Name: plane_runaway plane_runaway_id_user_update_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY plane_runaway
    ADD CONSTRAINT plane_runaway_id_user_update_fkey FOREIGN KEY (id_user_update) REFERENCES users(id_user);


--
-- Name: price_ha price_ha_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY price_ha
    ADD CONSTRAINT price_ha_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- Name: price_ha price_ha_id_user_create_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY price_ha
    ADD CONSTRAINT price_ha_id_user_create_fkey FOREIGN KEY (id_user_create) REFERENCES users(id_user);


--
-- Name: price_ha price_ha_id_user_update_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY price_ha
    ADD CONSTRAINT price_ha_id_user_update_fkey FOREIGN KEY (id_user_update) REFERENCES users(id_user);


--
-- Name: property property_id_customer_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY property
    ADD CONSTRAINT property_id_customer_fkey FOREIGN KEY (id_customer) REFERENCES customer(id_customer);


--
-- Name: property property_id_price_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY property
    ADD CONSTRAINT property_id_price_fkey FOREIGN KEY (id_price) REFERENCES price_ha(id_price);


--
-- Name: property property_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY property
    ADD CONSTRAINT property_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- Name: property property_id_user_create_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY property
    ADD CONSTRAINT property_id_user_create_fkey FOREIGN KEY (id_user_create) REFERENCES users(id_user);


--
-- Name: property property_id_user_update_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY property
    ADD CONSTRAINT property_id_user_update_fkey FOREIGN KEY (id_user_update) REFERENCES users(id_user);


--
-- Name: rol rol_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY rol
    ADD CONSTRAINT rol_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- Name: service_activity service_activity_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_activity
    ADD CONSTRAINT service_activity_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- Name: service_activity service_activity_id_user_create_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_activity
    ADD CONSTRAINT service_activity_id_user_create_fkey FOREIGN KEY (id_user_create) REFERENCES users(id_user);


--
-- Name: service_activity service_activity_id_user_update_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_activity
    ADD CONSTRAINT service_activity_id_user_update_fkey FOREIGN KEY (id_user_update) REFERENCES users(id_user);


--
-- Name: service_orden service_orden_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_orden
    ADD CONSTRAINT service_orden_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- Name: service_orden service_orden_id_user_create_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_orden
    ADD CONSTRAINT service_orden_id_user_create_fkey FOREIGN KEY (id_user_create) REFERENCES users(id_user);


--
-- Name: service_orden service_orden_id_user_update_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY service_orden
    ADD CONSTRAINT service_orden_id_user_update_fkey FOREIGN KEY (id_user_update) REFERENCES users(id_user);


--
-- Name: users users_id_rol_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES rol(id_rol);


--
-- Name: users users_id_status_fkey; Type: FK CONSTRAINT; Schema: dsap; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_id_status_fkey FOREIGN KEY (id_status) REFERENCES status(id_status);


--
-- PostgreSQL database dump complete
--

