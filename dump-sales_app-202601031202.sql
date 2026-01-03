--
-- PostgreSQL database dump
--

\restrict qVWGPqVLUhdg7kDhJ8QamVNaOBSSaD95QKx1hCyKVDw4l5OS13GddFnTTnY9Zxc

-- Dumped from database version 18.1 (Homebrew)
-- Dumped by pg_dump version 18.1 (Homebrew)

-- Started on 2026-01-03 12:02:43 WIB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE sales_app;
--
-- TOC entry 4029 (class 1262 OID 44005)
-- Name: sales_app; Type: DATABASE; Schema: -; Owner: wahyu
--

CREATE DATABASE sales_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


ALTER DATABASE sales_app OWNER TO wahyu;

\unrestrict qVWGPqVLUhdg7kDhJ8QamVNaOBSSaD95QKx1hCyKVDw4l5OS13GddFnTTnY9Zxc
\connect sales_app
\restrict qVWGPqVLUhdg7kDhJ8QamVNaOBSSaD95QKx1hCyKVDw4l5OS13GddFnTTnY9Zxc

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 45433)
-- Name: cache; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO wahyu;

--
-- TOC entry 226 (class 1259 OID 45443)
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO wahyu;

--
-- TOC entry 231 (class 1259 OID 45484)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO wahyu;

--
-- TOC entry 230 (class 1259 OID 45483)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO wahyu;

--
-- TOC entry 4030 (class 0 OID 0)
-- Dependencies: 230
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 233 (class 1259 OID 45503)
-- Name: items; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.items (
    id bigint NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255),
    price numeric(15,2) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.items OWNER TO wahyu;

--
-- TOC entry 232 (class 1259 OID 45502)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_id_seq OWNER TO wahyu;

--
-- TOC entry 4031 (class 0 OID 0)
-- Dependencies: 232
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- TOC entry 229 (class 1259 OID 45469)
-- Name: job_batches; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO wahyu;

--
-- TOC entry 228 (class 1259 OID 45454)
-- Name: jobs; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO wahyu;

--
-- TOC entry 227 (class 1259 OID 45453)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO wahyu;

--
-- TOC entry 4032 (class 0 OID 0)
-- Dependencies: 227
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 220 (class 1259 OID 45388)
-- Name: migrations; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO wahyu;

--
-- TOC entry 219 (class 1259 OID 45387)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO wahyu;

--
-- TOC entry 4033 (class 0 OID 0)
-- Dependencies: 219
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 244 (class 1259 OID 45614)
-- Name: model_has_permissions; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.model_has_permissions (
    permission_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);


ALTER TABLE public.model_has_permissions OWNER TO wahyu;

--
-- TOC entry 245 (class 1259 OID 45628)
-- Name: model_has_roles; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.model_has_roles (
    role_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);


ALTER TABLE public.model_has_roles OWNER TO wahyu;

--
-- TOC entry 223 (class 1259 OID 45412)
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO wahyu;

--
-- TOC entry 239 (class 1259 OID 45567)
-- Name: payments; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.payments (
    id bigint NOT NULL,
    code character varying(255) NOT NULL,
    sale_id bigint NOT NULL,
    payment_date date NOT NULL,
    amount numeric(15,2) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.payments OWNER TO wahyu;

--
-- TOC entry 238 (class 1259 OID 45566)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO wahyu;

--
-- TOC entry 4034 (class 0 OID 0)
-- Dependencies: 238
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 241 (class 1259 OID 45587)
-- Name: permissions; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.permissions (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.permissions OWNER TO wahyu;

--
-- TOC entry 240 (class 1259 OID 45586)
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_seq OWNER TO wahyu;

--
-- TOC entry 4035 (class 0 OID 0)
-- Dependencies: 240
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- TOC entry 246 (class 1259 OID 45642)
-- Name: role_has_permissions; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.role_has_permissions (
    permission_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.role_has_permissions OWNER TO wahyu;

--
-- TOC entry 243 (class 1259 OID 45601)
-- Name: roles; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.roles OWNER TO wahyu;

--
-- TOC entry 242 (class 1259 OID 45600)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO wahyu;

--
-- TOC entry 4036 (class 0 OID 0)
-- Dependencies: 242
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 237 (class 1259 OID 45544)
-- Name: sale_items; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.sale_items (
    id bigint NOT NULL,
    sale_id bigint NOT NULL,
    item_id bigint NOT NULL,
    qty integer NOT NULL,
    price numeric(15,2) NOT NULL,
    total_price numeric(15,2) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.sale_items OWNER TO wahyu;

--
-- TOC entry 236 (class 1259 OID 45543)
-- Name: sale_items_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.sale_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sale_items_id_seq OWNER TO wahyu;

--
-- TOC entry 4037 (class 0 OID 0)
-- Dependencies: 236
-- Name: sale_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.sale_items_id_seq OWNED BY public.sale_items.id;


--
-- TOC entry 235 (class 1259 OID 45518)
-- Name: sales; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.sales (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    code character varying(255) NOT NULL,
    sale_date date NOT NULL,
    total_qty integer DEFAULT 0 NOT NULL,
    total_amount numeric(15,2) DEFAULT '0'::numeric NOT NULL,
    status character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT sales_status_check CHECK (((status)::text = ANY ((ARRAY['BELUM_DIBAYAR'::character varying, 'BELUM_DIBAYAR_SEPENUHNYA'::character varying, 'SUDAH_DIBAYAR'::character varying])::text[])))
);


ALTER TABLE public.sales OWNER TO wahyu;

--
-- TOC entry 234 (class 1259 OID 45517)
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.sales_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_id_seq OWNER TO wahyu;

--
-- TOC entry 4038 (class 0 OID 0)
-- Dependencies: 234
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;


--
-- TOC entry 224 (class 1259 OID 45421)
-- Name: sessions; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO wahyu;

--
-- TOC entry 222 (class 1259 OID 45398)
-- Name: users; Type: TABLE; Schema: public; Owner: wahyu
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    two_factor_secret text,
    two_factor_recovery_codes text,
    two_factor_confirmed_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO wahyu;

--
-- TOC entry 221 (class 1259 OID 45397)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: wahyu
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO wahyu;

--
-- TOC entry 4039 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wahyu
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3775 (class 2604 OID 45487)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 3777 (class 2604 OID 45506)
-- Name: items id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- TOC entry 3774 (class 2604 OID 45457)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 3772 (class 2604 OID 45391)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3782 (class 2604 OID 45570)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 3783 (class 2604 OID 45590)
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- TOC entry 3784 (class 2604 OID 45604)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3781 (class 2604 OID 45547)
-- Name: sale_items id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sale_items ALTER COLUMN id SET DEFAULT nextval('public.sale_items_id_seq'::regclass);


--
-- TOC entry 3778 (class 2604 OID 45521)
-- Name: sales id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);


--
-- TOC entry 3773 (class 2604 OID 45401)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4002 (class 0 OID 45433)
-- Dependencies: 225
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: wahyu
--

INSERT INTO public.cache VALUES ('laravel-cache-865e788b04118c15e66bbe17825a09b8:timer', 'i:1767409065;', 1767409065);
INSERT INTO public.cache VALUES ('laravel-cache-865e788b04118c15e66bbe17825a09b8', 'i:1;', 1767409065);


--
-- TOC entry 4003 (class 0 OID 45443)
-- Dependencies: 226
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4008 (class 0 OID 45484)
-- Dependencies: 231
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4010 (class 0 OID 45503)
-- Dependencies: 233
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: wahyu
--

INSERT INTO public.items VALUES (2, 'A2', 'Top Tubruk', 'items/q3TbYq6v2RceHNTxz0QPuAz8F81fyPXNkeZBg7IT.jpg', 4500.00, '2026-01-03 02:58:10', '2026-01-03 02:58:10');
INSERT INTO public.items VALUES (1, 'A1', 'Top', NULL, 1500.00, '2026-01-03 02:11:21', '2026-01-03 02:58:16');


--
-- TOC entry 4006 (class 0 OID 45469)
-- Dependencies: 229
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4005 (class 0 OID 45454)
-- Dependencies: 228
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 3997 (class 0 OID 45388)
-- Dependencies: 220
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: wahyu
--

INSERT INTO public.migrations VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO public.migrations VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO public.migrations VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO public.migrations VALUES (4, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1);
INSERT INTO public.migrations VALUES (5, '2026_01_01_043648_create_items_table', 1);
INSERT INTO public.migrations VALUES (6, '2026_01_01_043858_create_sales_table', 1);
INSERT INTO public.migrations VALUES (7, '2026_01_01_053424_create_sale_items_table', 1);
INSERT INTO public.migrations VALUES (8, '2026_01_01_070044_create_payments_table', 1);
INSERT INTO public.migrations VALUES (9, '2026_01_03_043706_create_permission_tables', 2);


--
-- TOC entry 4021 (class 0 OID 45614)
-- Dependencies: 244
-- Data for Name: model_has_permissions; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4022 (class 0 OID 45628)
-- Dependencies: 245
-- Data for Name: model_has_roles; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4000 (class 0 OID 45412)
-- Dependencies: 223
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4016 (class 0 OID 45567)
-- Dependencies: 239
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: wahyu
--

INSERT INTO public.payments VALUES (1, 'PB-20260103-0001', 1, '2026-01-05', 500.00, '2026-01-03 03:49:38', '2026-01-03 03:49:38');
INSERT INTO public.payments VALUES (2, 'PB-20260103-0002', 1, '2026-01-04', 500.00, '2026-01-03 03:50:10', '2026-01-03 03:50:10');
INSERT INTO public.payments VALUES (3, 'PB-20260103-0003', 1, '2026-01-03', 750.00, '2026-01-03 04:02:34', '2026-01-03 04:02:34');


--
-- TOC entry 4018 (class 0 OID 45587)
-- Dependencies: 241
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4023 (class 0 OID 45642)
-- Dependencies: 246
-- Data for Name: role_has_permissions; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4020 (class 0 OID 45601)
-- Dependencies: 243
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: wahyu
--



--
-- TOC entry 4014 (class 0 OID 45544)
-- Dependencies: 237
-- Data for Name: sale_items; Type: TABLE DATA; Schema: public; Owner: wahyu
--

INSERT INTO public.sale_items VALUES (1, 1, 2, 2, 4500.00, 9000.00, '2026-01-03 03:00:54', '2026-01-03 03:00:54');
INSERT INTO public.sale_items VALUES (2, 1, 1, 1, 1500.00, 1500.00, '2026-01-03 03:00:54', '2026-01-03 03:00:54');
INSERT INTO public.sale_items VALUES (3, 2, 2, 1, 4500.00, 4500.00, '2026-01-03 03:59:37', '2026-01-03 03:59:37');
INSERT INTO public.sale_items VALUES (4, 2, 2, 1, 4500.00, 4500.00, '2026-01-03 03:59:37', '2026-01-03 03:59:37');


--
-- TOC entry 4012 (class 0 OID 45518)
-- Dependencies: 235
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: wahyu
--

INSERT INTO public.sales VALUES (2, 1, 'SL-20260103-0002', '2026-01-03', 2, 9000.00, 'BELUM_DIBAYAR', '2026-01-03 03:59:37', '2026-01-03 03:59:37');
INSERT INTO public.sales VALUES (1, 1, 'SL-20260103-0001', '2026-01-03', 3, 10500.00, 'BELUM_DIBAYAR_SEPENUHNYA', '2026-01-03 03:00:54', '2026-01-03 04:02:34');


--
-- TOC entry 4001 (class 0 OID 45421)
-- Dependencies: 224
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: wahyu
--

INSERT INTO public.sessions VALUES ('o3qZld4hNUPk753PjBUqyXOdK4UjTt25uScMcgw7', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNjcwN2dHcXdNZWthME5nMDJJZ3dsQUFTaUtLOE1FRTFjOXRjRjU3YSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToyOntzOjM6InVybCI7czo0MToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL21hc3Rlci91c2Vycy9jcmVhdGUiO3M6NToicm91dGUiO3M6MTk6Im1hc3Rlci51c2Vycy5jcmVhdGUiO319', 1767416474);


--
-- TOC entry 3999 (class 0 OID 45398)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: wahyu
--

INSERT INTO public.users VALUES (1, 'wahyu', 'wahyuakbar.work@gmail.com', NULL, '$2y$12$PiO.NWb4FXndRYbv.0hQfeP5wNQK1rr2roPcsH/7d.4VXxKfW7qNO', '2vRLbSPCqC3ZNowmc2yn65N97FrjevQXRdKH4hCoo2MwznzxoCnFG9do59QC', '2026-01-03 00:31:11', '2026-01-03 00:31:11', NULL, NULL, NULL);
INSERT INTO public.users VALUES (4, 'test', 'test@test.com', NULL, '$2y$12$xMuRCiG5X6JOoVbMaaAURO54rII8SAINRAySpauzsCrKu1xyywbnW', NULL, '2026-01-03 05:00:20', '2026-01-03 05:00:20', NULL, NULL, NULL);


--
-- TOC entry 4040 (class 0 OID 0)
-- Dependencies: 230
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 4041 (class 0 OID 0)
-- Dependencies: 232
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.items_id_seq', 2, true);


--
-- TOC entry 4042 (class 0 OID 0)
-- Dependencies: 227
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- TOC entry 4043 (class 0 OID 0)
-- Dependencies: 219
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.migrations_id_seq', 9, true);


--
-- TOC entry 4044 (class 0 OID 0)
-- Dependencies: 238
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.payments_id_seq', 3, true);


--
-- TOC entry 4045 (class 0 OID 0)
-- Dependencies: 240
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.permissions_id_seq', 1, false);


--
-- TOC entry 4046 (class 0 OID 0)
-- Dependencies: 242
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 4047 (class 0 OID 0)
-- Dependencies: 236
-- Name: sale_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.sale_items_id_seq', 4, true);


--
-- TOC entry 4048 (class 0 OID 0)
-- Dependencies: 234
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.sales_id_seq', 2, true);


--
-- TOC entry 4049 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wahyu
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- TOC entry 3801 (class 2606 OID 45452)
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- TOC entry 3799 (class 2606 OID 45442)
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- TOC entry 3808 (class 2606 OID 45499)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3810 (class 2606 OID 45501)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 3812 (class 2606 OID 45516)
-- Name: items items_code_unique; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_code_unique UNIQUE (code);


--
-- TOC entry 3814 (class 2606 OID 45514)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- TOC entry 3806 (class 2606 OID 45482)
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- TOC entry 3803 (class 2606 OID 45467)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3787 (class 2606 OID 45396)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3835 (class 2606 OID 45627)
-- Name: model_has_permissions model_has_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_pkey PRIMARY KEY (permission_id, model_id, model_type);


--
-- TOC entry 3838 (class 2606 OID 45641)
-- Name: model_has_roles model_has_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_pkey PRIMARY KEY (role_id, model_id, model_type);


--
-- TOC entry 3793 (class 2606 OID 45420)
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- TOC entry 3822 (class 2606 OID 45584)
-- Name: payments payments_code_unique; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_code_unique UNIQUE (code);


--
-- TOC entry 3824 (class 2606 OID 45577)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 3826 (class 2606 OID 45599)
-- Name: permissions permissions_name_guard_name_unique; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_guard_name_unique UNIQUE (name, guard_name);


--
-- TOC entry 3828 (class 2606 OID 45597)
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 3840 (class 2606 OID 45658)
-- Name: role_has_permissions role_has_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_pkey PRIMARY KEY (permission_id, role_id);


--
-- TOC entry 3830 (class 2606 OID 45613)
-- Name: roles roles_name_guard_name_unique; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_guard_name_unique UNIQUE (name, guard_name);


--
-- TOC entry 3832 (class 2606 OID 45611)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3820 (class 2606 OID 45555)
-- Name: sale_items sale_items_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3816 (class 2606 OID 45542)
-- Name: sales sales_code_unique; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_code_unique UNIQUE (code);


--
-- TOC entry 3818 (class 2606 OID 45535)
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- TOC entry 3796 (class 2606 OID 45430)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3789 (class 2606 OID 45411)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 3791 (class 2606 OID 45409)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3804 (class 1259 OID 45468)
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: wahyu
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- TOC entry 3833 (class 1259 OID 45620)
-- Name: model_has_permissions_model_id_model_type_index; Type: INDEX; Schema: public; Owner: wahyu
--

CREATE INDEX model_has_permissions_model_id_model_type_index ON public.model_has_permissions USING btree (model_id, model_type);


--
-- TOC entry 3836 (class 1259 OID 45634)
-- Name: model_has_roles_model_id_model_type_index; Type: INDEX; Schema: public; Owner: wahyu
--

CREATE INDEX model_has_roles_model_id_model_type_index ON public.model_has_roles USING btree (model_id, model_type);


--
-- TOC entry 3794 (class 1259 OID 45432)
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: wahyu
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- TOC entry 3797 (class 1259 OID 45431)
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: wahyu
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- TOC entry 3845 (class 2606 OID 45621)
-- Name: model_has_permissions model_has_permissions_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- TOC entry 3846 (class 2606 OID 45635)
-- Name: model_has_roles model_has_roles_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 3844 (class 2606 OID 45578)
-- Name: payments payments_sale_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_sale_id_foreign FOREIGN KEY (sale_id) REFERENCES public.sales(id);


--
-- TOC entry 3847 (class 2606 OID 45647)
-- Name: role_has_permissions role_has_permissions_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- TOC entry 3848 (class 2606 OID 45652)
-- Name: role_has_permissions role_has_permissions_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 3842 (class 2606 OID 45561)
-- Name: sale_items sale_items_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- TOC entry 3843 (class 2606 OID 45556)
-- Name: sale_items sale_items_sale_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sale_items
    ADD CONSTRAINT sale_items_sale_id_foreign FOREIGN KEY (sale_id) REFERENCES public.sales(id) ON DELETE CASCADE;


--
-- TOC entry 3841 (class 2606 OID 45536)
-- Name: sales sales_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: wahyu
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-01-03 12:02:44 WIB

--
-- PostgreSQL database dump complete
--

\unrestrict qVWGPqVLUhdg7kDhJ8QamVNaOBSSaD95QKx1hCyKVDw4l5OS13GddFnTTnY9Zxc

