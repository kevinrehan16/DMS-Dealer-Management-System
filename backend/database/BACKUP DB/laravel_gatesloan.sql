--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2026-02-06 18:13:15

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 240 (class 1259 OID 16619)
-- Name: credit_application_attachments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_application_attachments (
    id bigint NOT NULL,
    credit_application_primary_id bigint NOT NULL,
    "creditAppAttachments_id" character varying(255) NOT NULL,
    "creditAppPrimary_id" character varying(30),
    "attModule" character varying(50) NOT NULL,
    "attReq" character varying(50) NOT NULL,
    "attFileName" character varying(255) NOT NULL,
    "attFileType" character varying(100) NOT NULL,
    "attFileSize" integer,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    customer_id bigint
);


ALTER TABLE public.credit_application_attachments OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16618)
-- Name: credit_application_attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_application_attachments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_application_attachments_id_seq OWNER TO postgres;

--
-- TOC entry 3578 (class 0 OID 0)
-- Dependencies: 239
-- Name: credit_application_attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_application_attachments_id_seq OWNED BY public.credit_application_attachments.id;


--
-- TOC entry 236 (class 1259 OID 16585)
-- Name: credit_application_incomes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_application_incomes (
    id bigint NOT NULL,
    credit_application_primary_id bigint NOT NULL,
    "creditAppInc_id" character varying(255) NOT NULL,
    "creditAppPrimary_id" character varying(30),
    "incNature" character varying(150),
    "incAddress" text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    customer_id bigint
);


ALTER TABLE public.credit_application_incomes OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16584)
-- Name: credit_application_incoms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_application_incoms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_application_incoms_id_seq OWNER TO postgres;

--
-- TOC entry 3579 (class 0 OID 0)
-- Dependencies: 235
-- Name: credit_application_incoms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_application_incoms_id_seq OWNED BY public.credit_application_incomes.id;


--
-- TOC entry 232 (class 1259 OID 16550)
-- Name: credit_application_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_application_preferences (
    id bigint NOT NULL,
    credit_application_primary_id bigint NOT NULL,
    "creditAppPref_id" character varying(255) NOT NULL,
    "creditAppPrimary_id" character varying(255),
    "prefCreditor" character varying(255),
    "prefAddress" text,
    "prefDateGranted" date,
    "prefOrigBal" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "prefPresBal" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "prefMonInstallment" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    customer_id bigint
);


ALTER TABLE public.credit_application_preferences OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16549)
-- Name: credit_application_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_application_preferences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_application_preferences_id_seq OWNER TO postgres;

--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 231
-- Name: credit_application_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_application_preferences_id_seq OWNED BY public.credit_application_preferences.id;


--
-- TOC entry 230 (class 1259 OID 16536)
-- Name: credit_application_primaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_application_primaries (
    id bigint NOT NULL,
    "creditApp_id" character varying(30) NOT NULL,
    "lastName" character varying(60),
    "firstName" character varying(60),
    "middleName" character varying(60),
    birthdate date,
    age integer,
    gender character varying(8),
    "civilStatus" character varying(15),
    education character varying(50),
    "spouseName" character varying(150),
    "spouseBirthDate" date,
    "spouseAge" integer,
    "numChildren" integer DEFAULT 0 NOT NULL,
    "numStudying" integer DEFAULT 0 NOT NULL,
    "otherDependetn" integer DEFAULT 0 NOT NULL,
    "presentAddress" text,
    mobile character varying(20),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    customer_id bigint
);


ALTER TABLE public.credit_application_primaries OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16535)
-- Name: credit_application_primaries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_application_primaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_application_primaries_id_seq OWNER TO postgres;

--
-- TOC entry 3581 (class 0 OID 0)
-- Dependencies: 229
-- Name: credit_application_primaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_application_primaries_id_seq OWNED BY public.credit_application_primaries.id;


--
-- TOC entry 238 (class 1259 OID 16601)
-- Name: credit_application_properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_application_properties (
    id bigint NOT NULL,
    credit_application_primary_id bigint NOT NULL,
    "creditAppProps_id" character varying(255) NOT NULL,
    "creditAppPrimary_id" character varying(30),
    "propsKind" character varying(200),
    "propsLocation" text,
    "propsValue" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "propsImbursement" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    customer_id bigint
);


ALTER TABLE public.credit_application_properties OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16600)
-- Name: credit_application_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_application_properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_application_properties_id_seq OWNER TO postgres;

--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 237
-- Name: credit_application_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_application_properties_id_seq OWNED BY public.credit_application_properties.id;


--
-- TOC entry 234 (class 1259 OID 16569)
-- Name: credit_application_references; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_application_references (
    id bigint NOT NULL,
    credit_application_primary_id bigint NOT NULL,
    "creditAppRef_id" character varying(255) NOT NULL,
    "creditAppPrimary_id" character varying(30),
    "refFullName" character varying(150),
    "refAddress" text,
    "refContact" character varying(20),
    "refRelation" character varying(20),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    customer_id bigint
);


ALTER TABLE public.credit_application_references OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16568)
-- Name: credit_application_references_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_application_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_application_references_id_seq OWNER TO postgres;

--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 233
-- Name: credit_application_references_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_application_references_id_seq OWNED BY public.credit_application_references.id;


--
-- TOC entry 248 (class 1259 OID 16845)
-- Name: credit_investigation_credit_references; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_investigation_credit_references (
    id bigint NOT NULL,
    inquiry_id bigint NOT NULL,
    "creditCr_id" character varying(30) NOT NULL,
    crcreditor character varying(100),
    craddress text,
    crdategranted date,
    crorigbalance numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    crpresbalance numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    crmoinstallment numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.credit_investigation_credit_references OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 16844)
-- Name: credit_investigation_credit_references_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_investigation_credit_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_investigation_credit_references_id_seq OWNER TO postgres;

--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 247
-- Name: credit_investigation_credit_references_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_investigation_credit_references_id_seq OWNED BY public.credit_investigation_credit_references.id;


--
-- TOC entry 246 (class 1259 OID 16811)
-- Name: credit_investigation_other_source_incomes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_investigation_other_source_incomes (
    id bigint NOT NULL,
    inquiry_id bigint NOT NULL,
    "creditOsi_id" character varying(30) NOT NULL,
    osisource character varying(100) NOT NULL,
    osiamount numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.credit_investigation_other_source_incomes OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16810)
-- Name: credit_investigation_other_source_incomes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_investigation_other_source_incomes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_investigation_other_source_incomes_id_seq OWNER TO postgres;

--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 245
-- Name: credit_investigation_other_source_incomes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_investigation_other_source_incomes_id_seq OWNED BY public.credit_investigation_other_source_incomes.id;


--
-- TOC entry 244 (class 1259 OID 16770)
-- Name: credit_investigation_primaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credit_investigation_primaries (
    id bigint NOT NULL,
    inquiry_id bigint NOT NULL,
    "creditInv_id" character varying(30) NOT NULL,
    "cicontactPerson" character varying(100),
    cigender character varying(255),
    cibirthday date,
    cicpage smallint,
    "cispouseName" character varying(100),
    "cispouseGender" character varying(255),
    "cispouseBirthday" date,
    cisage smallint,
    "cicivilStatus" character varying(20),
    cieducation character varying(100),
    "citinNumber" character varying(20),
    cimobile character varying(20),
    "cidependentChildren" smallint DEFAULT '0'::smallint NOT NULL,
    "cistudyingChildren" smallint DEFAULT '0'::smallint NOT NULL,
    "ciotherDependents" smallint DEFAULT '0'::smallint NOT NULL,
    "ciPresAddress" text,
    "ciPresAddrLenStay" smallint DEFAULT '0'::smallint NOT NULL,
    "ciPresAddrMonStay" character varying(12),
    "ciPresAddrType" character varying(12),
    "ciPresAddrRentFee" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciPrevAddress" text,
    "ciPrevAddrLenStay" smallint DEFAULT '0'::smallint NOT NULL,
    "ciPrevAddrMonStay" character varying(12),
    "ciProvAddress" text,
    "ciEmployedBy" character varying(30),
    "ciEmpAddrEmp" text,
    "ciEmpAddrLenStay" smallint DEFAULT '0'::smallint NOT NULL,
    "ciEmpAddrMonStay" character varying(12),
    "ciEmpStatus" character varying(20),
    "ciEmpDesignation" character varying(30),
    "ciEmpTelNo" character varying(15),
    "ciEmpPrevEmp" character varying(30),
    "ciEmpPrevAddrEmp" text,
    "ciEmpSpouseEmp" character varying(12),
    "ciEmpSpouseEmpAddr" text,
    "ciEmpSpousePosition" character varying(30),
    "ciEmpPrevTelNo" character varying(15),
    "ciIncomeSalaryNet" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciSpouseIncome" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciRentalIncome" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciBusinessNet" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciOthers" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciTotalIncome" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciExpenseLiving" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciExpenseRent" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciExpenseSchooling" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciExpenseInsurance" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciExpenseElectWat" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciExpenseObligation" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciExpenseLoan" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciExpenseTotal" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ciCheckingAccount" character varying(30),
    "ciCAAddrr" text,
    "ciSavingsAccount" character varying(30),
    "ciSAAddrr" text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT credit_investigation_primaries_cigender_check CHECK (((cigender)::text = ANY ((ARRAY['Male'::character varying, 'Female'::character varying])::text[]))),
    CONSTRAINT "credit_investigation_primaries_cispouseGender_check" CHECK ((("cispouseGender")::text = ANY ((ARRAY['Male'::character varying, 'Female'::character varying])::text[])))
);


ALTER TABLE public.credit_investigation_primaries OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16769)
-- Name: credit_investigation_primaries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credit_investigation_primaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_investigation_primaries_id_seq OWNER TO postgres;

--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 243
-- Name: credit_investigation_primaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credit_investigation_primaries_id_seq OWNED BY public.credit_investigation_primaries.id;


--
-- TOC entry 222 (class 1259 OID 16461)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id bigint NOT NULL,
    customer_id character varying(255) NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    "middleName" character varying(255),
    title character varying(255) NOT NULL,
    gender character varying(255) NOT NULL,
    birthdate date NOT NULL,
    age integer,
    mobile character varying(255),
    telno character varying(255),
    email character varying(255),
    addressnum character varying(255),
    addressbldg character varying(255),
    addressstreet character varying(255),
    addressssubd character varying(255),
    addressscity character varying(255),
    addresssbrgy character varying(255),
    addresssprovince character varying(255),
    addresssregion character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16460)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 221
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- TOC entry 220 (class 1259 OID 16437)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.failed_jobs OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16436)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.failed_jobs_id_seq OWNER TO postgres;

--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 219
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 226 (class 1259 OID 16496)
-- Name: inquiries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inquiries (
    id bigint NOT NULL,
    customer_id bigint NOT NULL,
    inquiry_id character varying(255) NOT NULL,
    "sourceInquiry" character varying(255),
    "salesPersonid" character varying(255),
    "employmentStatus" character varying(255),
    "motorBrand" character varying(255),
    "motorModel" character varying(255),
    "motorSeries" character varying(255),
    "motorColor" character varying(255),
    "motorChassis" character varying(255),
    "motorLcp" character varying(255),
    "motorCashprice" character varying(255),
    "motorRate" character varying(255),
    "motorDiscount" character varying(255),
    "motorPromnote" character varying(255),
    "motorBranchcode" character varying(255),
    "motorInstallmentterm" character varying(255),
    "motorDownpayment" character varying(255),
    "motorReservation" character varying(255),
    "motorSubsidy" character varying(255),
    "motorMonthlyinstallment" character varying(255),
    "motorInstallmentPrice" character varying(255),
    "motorAmountfinance" character varying(255),
    "motorMonthlyuid" character varying(255),
    "motorCustomertype" character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    inquiry_status character varying(255) DEFAULT 'New'::character varying,
    userid character varying(255),
    date_creditinvestigation date,
    time_creditinvestigation time(0) without time zone
);


ALTER TABLE public.inquiries OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16495)
-- Name: inquiries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inquiries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inquiries_id_seq OWNER TO postgres;

--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 225
-- Name: inquiries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inquiries_id_seq OWNED BY public.inquiries.id;


--
-- TOC entry 228 (class 1259 OID 16515)
-- Name: item_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_lists (
    id bigint NOT NULL,
    item_number character varying(255) NOT NULL,
    "itemName" character varying(255) NOT NULL,
    "itemDescription" character varying(255),
    "itemPicture" character varying(255),
    units character varying(255),
    "brandName" character varying(255) NOT NULL,
    "modelName" character varying(255) NOT NULL,
    color character varying(255) NOT NULL,
    "origPrice" double precision NOT NULL,
    "cashPrice" double precision NOT NULL,
    "unitCost" double precision NOT NULL,
    "srpValue" double precision NOT NULL,
    interest double precision NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    chassis character varying(255),
    series character varying(255)
);


ALTER TABLE public.item_lists OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16514)
-- Name: item_lists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_lists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_lists_id_seq OWNER TO postgres;

--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 227
-- Name: item_lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_lists_id_seq OWNED BY public.item_lists.id;


--
-- TOC entry 215 (class 1259 OID 16412)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16411)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 214
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 218 (class 1259 OID 16429)
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16472)
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16471)
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personal_access_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 223
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- TOC entry 242 (class 1259 OID 16671)
-- Name: requirements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requirements (
    id bigint NOT NULL,
    module character varying(2) DEFAULT 'CA'::character varying NOT NULL,
    "reqName" character varying(100) NOT NULL,
    "reqShortName" character varying(5) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.requirements OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16670)
-- Name: requirements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requirements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.requirements_id_seq OWNER TO postgres;

--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 241
-- Name: requirements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requirements_id_seq OWNED BY public.requirements.id;


--
-- TOC entry 217 (class 1259 OID 16419)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    userid character varying(255) NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    "middleName" character varying(255),
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    gender character varying(255) NOT NULL,
    "userName" character varying(255),
    password character varying(255) NOT NULL,
    "userType" character varying(255),
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16418)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3279 (class 2604 OID 16622)
-- Name: credit_application_attachments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_attachments ALTER COLUMN id SET DEFAULT nextval('public.credit_application_attachments_id_seq'::regclass);


--
-- TOC entry 3275 (class 2604 OID 16588)
-- Name: credit_application_incomes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_incomes ALTER COLUMN id SET DEFAULT nextval('public.credit_application_incoms_id_seq'::regclass);


--
-- TOC entry 3270 (class 2604 OID 16553)
-- Name: credit_application_preferences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_preferences ALTER COLUMN id SET DEFAULT nextval('public.credit_application_preferences_id_seq'::regclass);


--
-- TOC entry 3266 (class 2604 OID 16539)
-- Name: credit_application_primaries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_primaries ALTER COLUMN id SET DEFAULT nextval('public.credit_application_primaries_id_seq'::regclass);


--
-- TOC entry 3276 (class 2604 OID 16604)
-- Name: credit_application_properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_properties ALTER COLUMN id SET DEFAULT nextval('public.credit_application_properties_id_seq'::regclass);


--
-- TOC entry 3274 (class 2604 OID 16572)
-- Name: credit_application_references id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_references ALTER COLUMN id SET DEFAULT nextval('public.credit_application_references_id_seq'::regclass);


--
-- TOC entry 3306 (class 2604 OID 16848)
-- Name: credit_investigation_credit_references id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_credit_references ALTER COLUMN id SET DEFAULT nextval('public.credit_investigation_credit_references_id_seq'::regclass);


--
-- TOC entry 3304 (class 2604 OID 16814)
-- Name: credit_investigation_other_source_incomes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_other_source_incomes ALTER COLUMN id SET DEFAULT nextval('public.credit_investigation_other_source_incomes_id_seq'::regclass);


--
-- TOC entry 3282 (class 2604 OID 16773)
-- Name: credit_investigation_primaries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_primaries ALTER COLUMN id SET DEFAULT nextval('public.credit_investigation_primaries_id_seq'::regclass);


--
-- TOC entry 3261 (class 2604 OID 16464)
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 3259 (class 2604 OID 16440)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 3263 (class 2604 OID 16499)
-- Name: inquiries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries ALTER COLUMN id SET DEFAULT nextval('public.inquiries_id_seq'::regclass);


--
-- TOC entry 3265 (class 2604 OID 16518)
-- Name: item_lists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_lists ALTER COLUMN id SET DEFAULT nextval('public.item_lists_id_seq'::regclass);


--
-- TOC entry 3257 (class 2604 OID 16415)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3262 (class 2604 OID 16475)
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- TOC entry 3280 (class 2604 OID 16674)
-- Name: requirements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requirements ALTER COLUMN id SET DEFAULT nextval('public.requirements_id_seq'::regclass);


--
-- TOC entry 3258 (class 2604 OID 16422)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3564 (class 0 OID 16619)
-- Dependencies: 240
-- Data for Name: credit_application_attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_application_attachments (id, credit_application_primary_id, "creditAppAttachments_id", "creditAppPrimary_id", "attModule", "attReq", "attFileName", "attFileType", "attFileSize", created_at, updated_at, customer_id) FROM stdin;
6	15	ATT-0000001	APP-0000001	COE	CA	COE.jpg	jpg	71189	2025-11-13 02:57:25	2025-11-13 02:57:25	1
7	16	ATT-0000002	APP-0000001	COE	CA	COE.jpg	jpg	71189	2025-11-13 03:02:14	2025-11-13 03:02:14	1
8	17	ATT-0000003	APP-0000001	COE	CA	COE.jpg	jpg	71189	2025-11-13 04:09:04	2025-11-13 04:09:04	1
10	46	ATT-0000004	APP-0000016	Mod1	sfsaf	credit_attachments/Mod1.png	image/png	1982303	2025-11-15 14:44:01	2025-11-15 14:44:01	1
11	46	ATT-0000005	APP-0000016	Mod2	asdfaf	credit_attachments/Mod2.png	image/png	92206	2025-11-15 14:44:01	2025-11-15 14:44:01	2
13	52	ATT-0000006	APP-0000020	fsaf	fsaf	credit_attachments/APP-0000020/fsaf.jpg	image/jpeg	13057	2025-11-18 05:36:59	2025-11-18 05:36:59	1
14	52	ATT-0000007	APP-0000020	fsad	safdasfd	credit_attachments/APP-0000020/fsad.png	image/png	19529	2025-11-18 05:36:59	2025-11-18 05:36:59	1
15	53	ATT-0000008	APP-0000021	CA	Voters ID (VI)	credit_attachments/APP-0000021/CA.pdf	application/pdf	234823	2025-11-18 05:58:27	2025-11-18 05:58:27	1
16	53	ATT-0000009	APP-0000021	CA	Certificate of Employment (COE)	credit_attachments/APP-0000021/CA.pdf	application/pdf	268787	2025-11-18 05:58:27	2025-11-18 05:58:27	1
17	53	ATT-0000010	APP-0000021	CA	2 Months Payslip (2MP)	credit_attachments/APP-0000021/CA.pdf	application/pdf	206511	2025-11-18 05:58:27	2025-11-18 05:58:27	1
18	53	ATT-0000011	APP-0000021	CA	Business Permit (BP)	credit_attachments/APP-0000021/CA.docx	application/vnd.openxmlformats-officedocument.wordprocessingml.document	18048	2025-11-18 05:58:27	2025-11-18 05:58:27	1
19	54	ATT-0000012	APP-0000022	Voters ID (VI)	Voters ID (VI)	credit_attachments/APP-0000022/Voters_ID__VI_.pdf	application/pdf	234823	2025-11-18 05:59:26	2025-11-18 05:59:26	1
20	54	ATT-0000013	APP-0000022	Certificate of Employment (COE)	Certificate of Employment (COE)	credit_attachments/APP-0000022/Certificate_of_Employment__COE_.pdf	application/pdf	268787	2025-11-18 05:59:26	2025-11-18 05:59:26	1
21	54	ATT-0000014	APP-0000022	2 Months Payslip (2MP)	2 Months Payslip (2MP)	credit_attachments/APP-0000022/2_Months_Payslip__2MP_.pdf	application/pdf	206511	2025-11-18 05:59:26	2025-11-18 05:59:26	1
22	54	ATT-0000015	APP-0000022	Business Permit (BP)	Business Permit (BP)	credit_attachments/APP-0000022/Business_Permit__BP_.docx	application/vnd.openxmlformats-officedocument.wordprocessingml.document	18048	2025-11-18 05:59:26	2025-11-18 05:59:26	1
\.


--
-- TOC entry 3560 (class 0 OID 16585)
-- Dependencies: 236
-- Data for Name: credit_application_incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_application_incomes (id, credit_application_primary_id, "creditAppInc_id", "creditAppPrimary_id", "incNature", "incAddress", created_at, updated_at, customer_id) FROM stdin;
11	17	INC-0000003	APP-0000003	Business	Sucat Muntinlupa	2025-11-13 04:09:04	2025-11-13 04:09:04	1
12	18	INC-0000004	APP-0000004	Business	Sucat	2025-11-13 06:49:23	2025-11-13 06:49:23	1
13	18	INC-0000005	APP-0000004	Freelance	Online	2025-11-13 06:49:23	2025-11-13 06:49:23	1
16	22	INC-0000006	APP-0000005	Business	Sucat	2025-11-13 07:56:31	2025-11-13 07:56:31	1
17	22	INC-0000007	APP-0000005	Freelance	Online	2025-11-13 07:56:31	2025-11-13 07:56:31	1
18	27	INC-0000008	APP-0000006	Business	Sucat	2025-11-13 08:16:41	2025-11-13 08:16:41	1
19	27	INC-0000009	APP-0000006	Freelance	Online	2025-11-13 08:16:41	2025-11-13 08:16:41	1
9	15	INC-0000001	APP-0000001	Business	Sucat Muntinlupa	2025-11-13 02:57:25	2025-11-13 02:57:25	1
20	30	INC-0000010	APP-0000007	fasda	fasfda	2025-11-13 08:30:57	2025-11-13 08:30:57	1
10	16	INC-0000002	APP-0000002	Business	Sucat Muntinlupa	2025-11-13 03:02:14	2025-11-13 03:02:14	1
21	30	INC-0000011	APP-0000007	fsadfa	asdfaf	2025-11-13 08:30:57	2025-11-13 08:30:57	1
22	31	INC-0000012	APP-0000008	safa	fsdaf	2025-11-13 08:53:19	2025-11-13 08:53:19	1
23	31	INC-0000013	APP-0000008	fsdaf	fsaf	2025-11-13 08:53:19	2025-11-13 08:53:19	1
24	32	INC-0000014	APP-0000009	Nature Nature 1	Address Address 1	2025-11-13 09:14:46	2025-11-13 09:14:46	2
25	32	INC-0000015	APP-0000009	Nature Nature 2	Address Address 2	2025-11-13 09:14:46	2025-11-13 09:14:46	2
26	33	INC-0000016	APP-0000010	Nature 1	Address 1	2025-11-13 09:39:53	2025-11-13 09:39:53	1
27	34	INC-0000017	APP-0000011	Nature 1	Address 1	2025-11-13 09:41:02	2025-11-13 09:41:02	1
28	35	INC-0000018	APP-0000012	Business	Sucat	2025-11-13 10:18:13	2025-11-13 10:18:13	1
29	35	INC-0000019	APP-0000012	Freelance	Online	2025-11-13 10:18:13	2025-11-13 10:18:13	1
30	36	INC-0000020	APP-0000013	Business	Sucat	2025-11-13 10:19:15	2025-11-13 10:19:15	1
31	36	INC-0000021	APP-0000013	Freelance	Online	2025-11-13 10:19:15	2025-11-13 10:19:15	1
32	37	INC-0000022	APP-0000014	Business	Sucat	2025-11-14 14:50:21	2025-11-14 14:50:21	1
33	37	INC-0000023	APP-0000014	Freelance	Online	2025-11-14 14:50:21	2025-11-14 14:50:21	1
34	38	INC-0000024	APP-0000015	Nature 1	Address 1	2025-11-14 15:30:02	2025-11-14 15:30:02	1
41	46	INC-0000025	APP-0000016	fsa	saf	2025-11-15 14:44:01	2025-11-15 14:44:01	1
43	48	INC-0000026	APP-0000017	saf	asf	2025-11-18 05:15:01	2025-11-18 05:15:01	1
44	49	INC-0000027	APP-0000018	saf	asf	2025-11-18 05:22:49	2025-11-18 05:22:49	1
45	50	INC-0000028	APP-0000019	saf	asf	2025-11-18 05:24:37	2025-11-18 05:24:37	1
46	52	INC-0000029	APP-0000020	fasfd	safaf	2025-11-18 05:36:59	2025-11-18 05:36:59	1
47	53	INC-0000030	APP-0000021	fsdaf	saf	2025-11-18 05:58:27	2025-11-18 05:58:27	1
48	54	INC-0000031	APP-0000022	fsdaf	saf	2025-11-18 05:59:26	2025-11-18 05:59:26	1
\.


--
-- TOC entry 3556 (class 0 OID 16550)
-- Dependencies: 232
-- Data for Name: credit_application_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_application_preferences (id, credit_application_primary_id, "creditAppPref_id", "creditAppPrimary_id", "prefCreditor", "prefAddress", "prefDateGranted", "prefOrigBal", "prefPresBal", "prefMonInstallment", created_at, updated_at, customer_id) FROM stdin;
16	17	PREF-0000003	APP-0000003	Lito Villoria	Pasig City	2020-01-01	50000.00	25000.00	5000.00	2025-11-13 04:09:03	2025-11-13 04:09:03	1
18	22	PREF-0000004	APP-0000005	BDO Philippines	Muntinlupa City	2025-01-23	500500.00	250100.00	120000.00	2025-11-13 07:56:31	2025-11-13 07:56:31	1
19	22	PREF-0000005	APP-0000005	BPI Philippines	Pasig City	2023-11-18	210800.00	50400.00	25000.00	2025-11-13 07:56:31	2025-11-13 07:56:31	1
25	27	PREF-0000006	APP-0000006	BDO Philippines	Muntinlupa City	2025-01-23	500500.00	250100.00	120000.00	2025-11-13 08:16:41	2025-11-13 08:16:41	1
26	27	PREF-0000007	APP-0000006	BPI Philippines	Pasig City	2023-11-18	210800.00	50400.00	25000.00	2025-11-13 08:16:41	2025-11-13 08:16:41	1
14	15	PREF-0000001	APP-0000001	Lito Villoria	Pasig City	2020-01-01	50000.00	25000.00	5000.00	2025-11-13 02:57:25	2025-11-13 02:57:25	1
15	16	PREF-0000002	APP-0000002	Lito Villoria	Pasig City	2020-01-01	50000.00	25000.00	5000.00	2025-11-13 03:02:14	2025-11-13 03:02:14	1
28	30	PREF-0000008	APP-0000007	fsadf	asdf	2005-12-12	500.00	250.00	600.00	2025-11-13 08:30:57	2025-11-13 08:30:57	1
29	30	PREF-0000009	APP-0000007	sadfa	safa	2018-11-11	600.00	500.00	100.00	2025-11-13 08:30:57	2025-11-13 08:30:57	1
30	31	PREF-0000010	APP-0000008	fsa	fas	2000-12-12	500.00	500.00	500.00	2025-11-13 08:53:19	2025-11-13 08:53:19	1
31	31	PREF-0000011	APP-0000008	asdfa	safafa	2020-11-11	500.00	500.00	500.00	2025-11-13 08:53:19	2025-11-13 08:53:19	1
32	32	PREF-0000012	APP-0000009	Creditor Creditor 1	Address Address 1	2018-08-12	50000.00	20000.00	10000.00	2025-11-13 09:14:46	2025-11-13 09:14:46	2
33	32	PREF-0000013	APP-0000009	Creditor Creditor 2	Address Address 2	2015-08-17	60000.00	30000.00	4000.00	2025-11-13 09:14:46	2025-11-13 09:14:46	2
34	33	PREF-0000014	APP-0000010	Creditor 1	Address 1	2023-11-11	200.00	200.00	200.00	2025-11-13 09:39:53	2025-11-13 09:39:53	1
35	33	PREF-0000015	APP-0000010	Creditor 2	Address 2	2020-09-08	200.00	200.00	200.00	2025-11-13 09:39:53	2025-11-13 09:39:53	1
36	34	PREF-0000016	APP-0000011	Creditor 1	Address 1	2023-11-11	200.00	200.00	200.00	2025-11-13 09:41:02	2025-11-13 09:41:02	1
37	34	PREF-0000017	APP-0000011	Creditor 2	Address 2	2020-09-08	200.00	200.00	200.00	2025-11-13 09:41:02	2025-11-13 09:41:02	1
38	35	PREF-0000018	APP-0000012	BDO Philippines	Muntinlupa City	2025-01-23	500500.00	250100.00	120000.00	2025-11-13 10:18:13	2025-11-13 10:18:13	1
39	35	PREF-0000019	APP-0000012	BPI Philippines	Pasig City	2023-11-18	210800.00	50400.00	25000.00	2025-11-13 10:18:13	2025-11-13 10:18:13	1
40	36	PREF-0000020	APP-0000013	BDO Philippines	Muntinlupa City	2025-01-23	500500.00	250100.00	120000.00	2025-11-13 10:19:15	2025-11-13 10:19:15	1
41	36	PREF-0000021	APP-0000013	BPI Philippines	Pasig City	2023-11-18	210800.00	50400.00	25000.00	2025-11-13 10:19:15	2025-11-13 10:19:15	1
42	37	PREF-0000022	APP-0000014	BDO Philippines	Muntinlupa City	2025-01-23	500500.00	250100.00	120000.00	2025-11-14 14:50:21	2025-11-14 14:50:21	1
43	37	PREF-0000023	APP-0000014	BPI Philippines	Pasig City	2023-11-18	210800.00	50400.00	25000.00	2025-11-14 14:50:21	2025-11-14 14:50:21	1
44	38	PREF-0000024	APP-0000015	Creditor 1	Address 1	2022-11-11	100000.00	50000.00	10000.00	2025-11-14 15:30:02	2025-11-14 15:30:02	1
51	46	PREF-0000025	APP-0000016	fsda	asfd	2020-12-12	100.00	100.00	100.00	2025-11-15 14:44:01	2025-11-15 14:44:01	1
53	48	PREF-0000026	APP-0000017	fsad	asdf	2015-12-12	250.00	250.00	250.00	2025-11-18 05:15:00	2025-11-18 05:15:00	1
54	49	PREF-0000027	APP-0000018	fsad	asdf	2015-12-12	250.00	250.00	250.00	2025-11-18 05:22:49	2025-11-18 05:22:49	1
55	50	PREF-0000028	APP-0000019	fsad	asdf	2015-12-12	250.00	250.00	250.00	2025-11-18 05:24:37	2025-11-18 05:24:37	1
57	52	PREF-0000029	APP-0000020	fsadf	safd	2015-12-12	500.00	500.00	500.00	2025-11-18 05:36:59	2025-11-18 05:36:59	1
58	53	PREF-0000030	APP-0000021	saf	asf	2015-12-12	550.00	550.00	550.00	2025-11-18 05:58:27	2025-11-18 05:58:27	1
59	54	PREF-0000031	APP-0000022	saf	asf	2015-12-12	550.00	550.00	550.00	2025-11-18 05:59:26	2025-11-18 05:59:26	1
\.


--
-- TOC entry 3554 (class 0 OID 16536)
-- Dependencies: 230
-- Data for Name: credit_application_primaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_application_primaries (id, "creditApp_id", "lastName", "firstName", "middleName", birthdate, age, gender, "civilStatus", education, "spouseName", "spouseBirthDate", "spouseAge", "numChildren", "numStudying", "otherDependetn", "presentAddress", mobile, created_at, updated_at, customer_id) FROM stdin;
15	APP-0000001	Macandog	Kevin	Francisco	1995-07-06	30	Male	Single	College	Adrienne Estrella	1998-01-23	26	0	0	0	Muntinlupa	09153169518	2025-11-13 02:57:25	2025-11-13 02:57:25	1
16	APP-0000002	Macandog	Mico	Francisco	1997-12-23	30	Male	Single	College	Jynelle Natad	1996-01-23	29	0	0	0	Muntinlupa	09153169518	2025-11-13 03:02:14	2025-11-13 03:02:14	1
17	APP-0000003	Macandog	Sean Carlo	Francisco	1999-01-24	28	Male	Single	College	Marielle Rojo	1999-01-23	27	0	0	0	Muntinlupa	09153169518	2025-11-13 04:09:03	2025-11-13 04:09:03	1
18	APP-0000004	Macandog	Monica Mica	Francisco	1991-08-07	34	Female	Single	College	Pau Macandog	1990-01-23	35	0	0	0	Muntinlupa	09153169518	2025-11-13 06:49:23	2025-11-13 06:49:23	1
22	APP-0000005	Macandog	Eugine	Francisco	2000-12-23	31	Male	Single	College	Jynelle Natad	1996-01-23	29	0	0	0	Muntinlupa	09153169518	2025-11-13 07:56:31	2025-11-13 07:56:31	1
27	APP-0000006	Macandog	Eugine	Francisco	2000-12-23	31	Male	Single	College	Jynelle Natad	1996-01-23	29	0	0	0	Muntinlupa	09153169518	2025-11-13 08:16:41	2025-11-13 08:16:41	1
30	APP-0000007	sadfaf	safda	saf	2020-02-02	0	Male	Single	Elementary	Spouse	2003-12-12	0	0	0	0	fsadfsadf	234242423	2025-11-13 08:30:57	2025-11-13 08:30:57	1
31	APP-0000008	haha	hhe	sfa	2020-04-04	0	Male	Married	Elementary	fasda	2000-12-12	0	0	0	0	fsadfaf	3424243	2025-11-13 08:53:19	2025-11-13 08:53:19	1
32	APP-0000009	Rivera	Nica Isabel	Sanchez	1996-10-16	0	Female	Single	Collge	Kevin Macandog	1995-07-06	0	1	1	0	US Florida	09124289941	2025-11-13 09:14:46	2025-11-13 09:14:46	2
33	APP-0000010	Last Name	First Name	Middle Name	1982-11-11	0	Female	Single	High School	Spouse	2018-12-12	0	1	2	3	Present Address 123	09185596799	2025-11-13 09:39:53	2025-11-13 09:39:53	1
34	APP-0000011	Last Name	First Name	Middle Name	1982-11-11	0	Female	Single	High School	Spouse	2018-12-12	0	1	2	3	Present Address 123	09185596799	2025-11-13 09:41:02	2025-11-13 09:41:02	1
35	APP-0000012	Macandog	Eugine	Francisco	2000-12-23	31	Male	Single	College	Jynelle Natad	1996-01-23	29	0	0	0	Muntinlupa	09153169518	2025-11-13 10:18:13	2025-11-13 10:18:13	1
36	APP-0000013	Macandog	Eugine	Francisco	2000-12-23	31	Male	Single	College	Jynelle Natad	1996-01-23	29	0	0	0	Muntinlupa	09153169518	2025-11-13 10:19:15	2025-11-13 10:19:15	1
37	APP-0000014	Macandog	Eugine	Francisco	2000-12-23	31	Male	Single	College	Jynelle Natad	1996-01-23	29	0	0	0	Muntinlupa	09153169518	2025-11-14 14:50:20	2025-11-14 14:50:20	1
38	APP-0000015	Monroy	Katherine	Roymon	1993-12-12	0	Female	Married	Collge	Jeffrey Dominguez	1991-11-11	0	1	1	1	Present Address	091855967999	2025-11-14 15:30:02	2025-11-14 15:30:02	1
46	APP-0000016	fsad	saf	fsd	2012-02-11	0	Female	Single	High School	fasf	2015-12-12	0	0	0	0	fasf	4546	2025-11-15 14:44:01	2025-11-15 14:44:01	1
48	APP-0000017	Hahaha	Hehehe	Huhuhu	2015-12-12	0	Male	Single	Elementary	sdafa	1995-12-12	0	0	0	0	fsafa	474645456456456	2025-11-18 05:15:00	2025-11-18 05:15:00	1
49	APP-0000018	Wahaha	Wehehe	Wuhuhu	2015-12-12	0	Male	Single	Elementary	sdafa	1995-12-12	0	0	0	0	fsafa	474645456456456	2025-11-18 05:22:49	2025-11-18 05:22:49	1
50	APP-0000019	Wahaha	Wehehe	Wuhuhu	2015-12-12	0	Male	Single	Elementary	sdafa	1995-12-12	0	0	0	0	fsafa	474645456456456	2025-11-18 05:24:37	2025-11-18 05:24:37	1
52	APP-0000020	fsadf	saf	fsad	1995-12-11	0	Male	Single	Elementary	fsdafa	\N	0	0	0	0	\N	65465466	2025-11-18 05:36:59	2025-11-18 05:36:59	1
53	APP-0000021	fsafa	safsa	safsa	1999-12-12	0	Male	Married	Elementary	fsafaf	1995-12-12	0	-2	0	0	fsdafa	565664	2025-11-18 05:58:27	2025-11-18 05:58:27	1
54	APP-0000022	fsafa	safsa	safsa	1999-12-12	0	Male	Married	Elementary	fsafaf	1995-12-12	0	-2	0	0	fsdafa	565664	2025-11-18 05:59:26	2025-11-18 05:59:26	1
\.


--
-- TOC entry 3562 (class 0 OID 16601)
-- Dependencies: 238
-- Data for Name: credit_application_properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_application_properties (id, credit_application_primary_id, "creditAppProps_id", "creditAppPrimary_id", "propsKind", "propsLocation", "propsValue", "propsImbursement", created_at, updated_at, customer_id) FROM stdin;
6	15	PRO-0000001	APP-0000001	House and Lot	Ayala Alabang	80000000.00	50000000.00	2025-11-13 02:57:25	2025-11-13 02:57:25	1
7	16	PRO-0000002	APP-0000002	House and Lot	Ayala Alabang	80000000.00	50000000.00	2025-11-13 03:02:14	2025-11-13 03:02:14	1
8	17	PRO-0000003	APP-0000003	House and Lot	Ayala Alabang	80000000.00	50000000.00	2025-11-13 04:09:04	2025-11-13 04:09:04	1
11	38	PRO-0000004	APP-0000015	Kind 1	Location 1	50000.00	20000.00	2025-11-14 15:30:02	2025-11-14 15:30:02	1
18	46	PRO-0000005	APP-0000016	sfafsaasfd	safsaf	100.00	100.00	2025-11-15 14:44:01	2025-11-15 14:44:01	1
20	48	PRO-0000006	APP-0000017	fsaf	asdf	250.00	250.00	2025-11-18 05:15:01	2025-11-18 05:15:01	1
21	49	PRO-0000007	APP-0000018	fsaf	asdf	250.00	250.00	2025-11-18 05:22:49	2025-11-18 05:22:49	1
22	50	PRO-0000008	APP-0000019	fsaf	asdf	250.00	250.00	2025-11-18 05:24:37	2025-11-18 05:24:37	1
23	52	PRO-0000009	APP-0000020	fsad	saf	500.00	500.00	2025-11-18 05:36:59	2025-11-18 05:36:59	1
24	53	PRO-0000010	APP-0000021	fsd	saf	550.00	550.00	2025-11-18 05:58:27	2025-11-18 05:58:27	1
25	54	PRO-0000011	APP-0000022	fsd	saf	550.00	550.00	2025-11-18 05:59:26	2025-11-18 05:59:26	1
\.


--
-- TOC entry 3558 (class 0 OID 16569)
-- Dependencies: 234
-- Data for Name: credit_application_references; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_application_references (id, credit_application_primary_id, "creditAppRef_id", "creditAppPrimary_id", "refFullName", "refAddress", "refContact", "refRelation", created_at, updated_at, customer_id) FROM stdin;
11	15	REF-0000001	APP-0000001	Valerie Barbacion	Laguna City	09124289941	Friend	2025-11-13 02:57:25	2025-11-13 02:57:25	1
12	16	REF-0000002	APP-0000002	Valerie Barbacion	Laguna City	09124289941	Friend	2025-11-13 03:02:14	2025-11-13 03:02:14	1
13	17	REF-0000003	APP-0000003	Valerie Barbacion	Laguna City	09124289941	Friend	2025-11-13 04:09:04	2025-11-13 04:09:04	1
14	33	REF-0000004	\N	Full Name 1	Address 1	09153169518	Relation 1	2025-11-13 09:39:53	2025-11-13 09:39:53	1
15	33	REF-0000005	\N	Full Name 2	Address 2	09153169518	Relation 2	2025-11-13 09:39:53	2025-11-13 09:39:53	1
16	34	REF-0000006	APP-0000011	Full Name 1	Address 1	09153169518	Relation 1	2025-11-13 09:41:02	2025-11-13 09:41:02	1
17	34	REF-0000007	APP-0000011	Full Name 2	Address 2	09153169518	Relation 2	2025-11-13 09:41:02	2025-11-13 09:41:02	1
18	35	REF-0000008	APP-0000012	Valerie Barbacion	Laguna City	09124289941	Friend	2025-11-13 10:18:13	2025-11-13 10:18:13	1
19	35	REF-0000009	APP-0000012	Veredine Concepcion	Pasig City	09185596799	Friend	2025-11-13 10:18:13	2025-11-13 10:18:13	1
20	36	REF-0000010	APP-0000013	Valerie Barbacion	Laguna City	09124289941	Friend	2025-11-13 10:19:15	2025-11-13 10:19:15	1
21	36	REF-0000011	APP-0000013	Veredine Concepcion	Pasig City	09185596799	Friend	2025-11-13 10:19:15	2025-11-13 10:19:15	1
22	37	REF-0000012	APP-0000014	Valerie Barbacion	Laguna City	09124289941	Friend	2025-11-14 14:50:21	2025-11-14 14:50:21	1
23	37	REF-0000013	APP-0000014	Veredine Concepcion	Pasig City	09185596799	Friend	2025-11-14 14:50:21	2025-11-14 14:50:21	1
24	38	REF-0000014	APP-0000015	Full Name 1	Address 1	09124289941	Sibling	2025-11-14 15:30:02	2025-11-14 15:30:02	1
31	46	REF-0000015	APP-0000016	saf	asdf	564	sfa	2025-11-15 14:44:01	2025-11-15 14:44:01	1
33	48	REF-0000016	APP-0000017	fsaf	asf	545654	safafsa	2025-11-18 05:15:01	2025-11-18 05:15:01	1
34	49	REF-0000017	APP-0000018	fsaf	asf	545654	safafsa	2025-11-18 05:22:49	2025-11-18 05:22:49	1
35	50	REF-0000018	APP-0000019	fsaf	asf	545654	safafsa	2025-11-18 05:24:37	2025-11-18 05:24:37	1
36	52	REF-0000019	APP-0000020	saf	asf	545456	sfafas	2025-11-18 05:36:59	2025-11-18 05:36:59	1
37	53	REF-0000020	APP-0000021	afs	sadf	4465	sfsda	2025-11-18 05:58:27	2025-11-18 05:58:27	1
38	54	REF-0000021	APP-0000022	afs	sadf	4465	sfsda	2025-11-18 05:59:26	2025-11-18 05:59:26	1
\.


--
-- TOC entry 3572 (class 0 OID 16845)
-- Dependencies: 248
-- Data for Name: credit_investigation_credit_references; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_investigation_credit_references (id, inquiry_id, "creditCr_id", crcreditor, craddress, crdategranted, crorigbalance, crpresbalance, crmoinstallment, created_at, updated_at) FROM stdin;
1	1	CICR-0000001	fdsa	sadf	\N	1.00	1.00	1.00	2026-02-06 09:36:39	2026-02-06 09:36:39
2	1	CICR-0000002	haha	hehe	\N	7.00	7.00	7.00	2026-02-06 09:36:39	2026-02-06 09:36:39
3	7	CICR-0000003	Creditor	Address	\N	1.00	2.00	2.00	2026-02-06 09:39:51	2026-02-06 09:39:51
4	7	CICR-0000004	Creditor Creditor	Address Address	2026-02-10	1.00	4.00	3.00	2026-02-06 09:40:34	2026-02-06 09:40:34
\.


--
-- TOC entry 3570 (class 0 OID 16811)
-- Dependencies: 246
-- Data for Name: credit_investigation_other_source_incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_investigation_other_source_incomes (id, inquiry_id, "creditOsi_id", osisource, osiamount, created_at, updated_at) FROM stdin;
1	9	OSI-0000001	Source 1	10.00	2026-02-06 08:47:13	2026-02-06 08:47:13
2	9	OSI-0000002	Source 2	20.00	2026-02-06 08:47:13	2026-02-06 08:47:13
3	9	OSI-0000003	Source 3	30.00	2026-02-06 08:47:13	2026-02-06 08:47:13
4	9	OSI-0000004	Source 1	10.00	2026-02-06 08:48:16	2026-02-06 08:48:16
5	9	OSI-0000005	Source 2	20.00	2026-02-06 08:48:16	2026-02-06 08:48:16
6	9	OSI-0000006	Source 3	30.00	2026-02-06 08:48:16	2026-02-06 08:48:16
7	9	OSI-0000007	Source 1	10.00	2026-02-06 08:48:31	2026-02-06 08:48:31
8	9	OSI-0000008	Source 2	20.00	2026-02-06 08:48:31	2026-02-06 08:48:31
9	9	OSI-0000009	Source 3	30.00	2026-02-06 08:48:31	2026-02-06 08:48:31
10	1	CISI-0000001	Source Source 1	1000.00	2026-02-06 09:25:03	2026-02-06 09:25:03
11	1	CISI-0000002	Source Source 2	2000.00	2026-02-06 09:25:03	2026-02-06 09:25:03
12	1	CISI-0000003	fdsa	4.00	2026-02-06 09:30:18	2026-02-06 09:30:18
13	1	CISI-0000004	fdsa	4.00	2026-02-06 09:33:43	2026-02-06 09:33:43
14	1	CISI-0000005	fdsa	4.00	2026-02-06 09:36:39	2026-02-06 09:36:39
15	7	CISI-0000006	saf	4.00	2026-02-06 09:39:51	2026-02-06 09:39:51
16	7	CISI-0000007	saf	4.00	2026-02-06 09:40:34	2026-02-06 09:40:34
\.


--
-- TOC entry 3568 (class 0 OID 16770)
-- Dependencies: 244
-- Data for Name: credit_investigation_primaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credit_investigation_primaries (id, inquiry_id, "creditInv_id", "cicontactPerson", cigender, cibirthday, cicpage, "cispouseName", "cispouseGender", "cispouseBirthday", cisage, "cicivilStatus", cieducation, "citinNumber", cimobile, "cidependentChildren", "cistudyingChildren", "ciotherDependents", "ciPresAddress", "ciPresAddrLenStay", "ciPresAddrMonStay", "ciPresAddrType", "ciPresAddrRentFee", "ciPrevAddress", "ciPrevAddrLenStay", "ciPrevAddrMonStay", "ciProvAddress", "ciEmployedBy", "ciEmpAddrEmp", "ciEmpAddrLenStay", "ciEmpAddrMonStay", "ciEmpStatus", "ciEmpDesignation", "ciEmpTelNo", "ciEmpPrevEmp", "ciEmpPrevAddrEmp", "ciEmpSpouseEmp", "ciEmpSpouseEmpAddr", "ciEmpSpousePosition", "ciEmpPrevTelNo", "ciIncomeSalaryNet", "ciSpouseIncome", "ciRentalIncome", "ciBusinessNet", "ciOthers", "ciTotalIncome", "ciExpenseLiving", "ciExpenseRent", "ciExpenseSchooling", "ciExpenseInsurance", "ciExpenseElectWat", "ciExpenseObligation", "ciExpenseLoan", "ciExpenseTotal", "ciCheckingAccount", "ciCAAddrr", "ciSavingsAccount", "ciSAAddrr", created_at, updated_at) FROM stdin;
1	9	INV-0000001	Contact Person	Male	2026-02-04	0	Spouse Name	Female	2026-02-09	0	Married	College	23423	42342	1	2	3	Present Address	2	10 Months	Free House	7500.00	Previous Address	2	9 Months	Prov. Address	Employed By	Address of Employer	1	10 Months	Emp. Status	Designation	234234	Prev. Employment	Address	Spouse Emp	Spouse Emp Address	Position	23423432	5.00	6.00	7.00	0.00	2.00	0.00	10.00	2.00	3.00	4.00	5.00	6.00	5.00	0.00	Checking Account	sdaff	Savings Account	gfsdf	2026-02-05 07:05:16	2026-02-05 07:05:16
3	9	INV-0000002	Contact Person	Male	2026-03-02	0	Spouse Name	Male	2026-02-16	0	\N	\N	242	234234	5	10	15	Present Address	3	4 Months	Free House	5000.00	Previous Address	3	3 Months	Prov. Address	Employed By	Address of Employer	4	2 Months	Emp. Status	Designation	32424242	Prev. Employment	Address	Spouses	Address Position	Position	3242430	100.00	200.00	300.00	400.00	500.00	0.00	10.00	20.00	30.00	40.00	50.00	60.00	70.00	0.00	Checking Account	Address	Savings Account	Address	2026-02-06 08:47:13	2026-02-06 08:47:13
4	9	INV-0000003	Contact Person	Male	2026-03-02	0	Spouse Name	Male	2026-02-16	0	\N	\N	242	234234	5	10	15	Present Address	3	4 Months	Free House	5000.00	Previous Address	3	3 Months	Prov. Address	Employed By	Address of Employer	4	2 Months	Emp. Status	Designation	32424242	Prev. Employment	Address	Spouse's	Address Position	Position	3242430	100.00	200.00	300.00	400.00	500.00	0.00	10.00	20.00	30.00	40.00	50.00	60.00	70.00	0.00	Checking Account	Address	Savings Account	Address	2026-02-06 08:48:16	2026-02-06 08:48:16
5	9	INV-0000004	Contact Person	Male	2026-03-02	0	Spouse Name	Male	2026-02-16	0	\N	\N	242	234234	5	10	15	Present Address	3	4 Months	Free House	5000.00	Previous Address	3	3 Months	Prov. Address	Employed By	Address of Employer	4	2 Months	Emp. Status	Designation	32424242	Prev. Employment	Address	Spouse Emp.	Address Position	Position	3242430	100.00	200.00	300.00	400.00	500.00	0.00	10.00	20.00	30.00	40.00	50.00	60.00	70.00	0.00	Checking Account	Address	Savings Account	Address	2026-02-06 08:48:31	2026-02-06 08:48:31
6	1	INV-0000005	Contact Person	Female	2026-02-12	0	Spouse Name	Male	2026-02-22	0	Married	High School	432424	4234234	2	4	6	Present Address	1	8 Months	Own	0.00	Previous Address	2	8 Months	Prov. Address	Employed By	Address of Employer	3	4 Months	Emp. Status	Designation	54243	Prev. Employment	Address	Spouse	Address	Position	24234	10.00	20.00	30.00	40.00	50.00	0.00	1.00	2.00	3.00	4.00	5.00	6.00	7.00	0.00	Checking Account	Checking Account Address	Savings Account	Savings Account Address	2026-02-06 09:25:03	2026-02-06 09:25:03
7	1	INV-0000006	Contact Person	Male	2026-02-17	0	Spouse Name	Male	2026-02-10	0	\N	High School	342	432	0	0	0	fsda	3	2 Months	Rented	40.00	fa	0	\N	fdsafa	fsdaf	saf	4	2 Months	fsda	safsaf	34	saf	asfd	asf	asf	afs	34	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	fdsa	asf	asfd	afs	2026-02-06 09:30:18	2026-02-06 09:30:18
9	1	INV-0000007	fsadf	Male	2026-02-18	0	fsaf	Male	2026-02-03	0	\N	\N	2423	4223	0	0	0	fsad	4	\N	Own	546.00	safda	5	\N	fdsaf	fdsa	asfd	4	0	saf	asdf	asfd	afds	asfd	fsa	saf	saf	dafs	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	fdsa	sadf	asfd	\N	2026-02-06 09:33:43	2026-02-06 09:33:43
10	1	INV-0000008	fsadf	Male	2026-02-18	0	fsaf	Male	2026-02-03	0	\N	\N	2423	4223	0	0	0	fsad	4	\N	Own	546.00	safda	5	\N	fdsaf	fdsa	asfd	4	0	saf	asdf	asfd	afds	asfd	fsa	saf	saf	dafs	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	fdsa	sadf	asfd	\N	2026-02-06 09:36:39	2026-02-06 09:36:39
11	7	INV-0000009	fdsa	Male	2026-02-12	0	fsad	Female	2026-02-03	0	\N	\N	242	43	0	0	0	fsafd	3	2 Months	Own	342.00	fdsaf	5	2 Months	fsda	safd	asdf	4	0	sdaf	sadfaf	42	fsda	safd	saf	saf	saf	asfd	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	fdsa	saf	asfd	safd	2026-02-06 09:39:51	2026-02-06 09:39:51
12	7	INV-0000010	fdsa	Male	2026-02-12	0	fsad	Female	2026-02-03	0	\N	\N	242	43	0	0	0	fsafd	3	2 Months	Own	342.00	fdsaf	5	2 Months	fsda	safd	asdf	4	0	sdaf	sadfaf	42	fsda	safd	saf	saf	saf	asfd	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	0.00	fdsa	saf	asfd	safd	2026-02-06 09:40:34	2026-02-06 09:40:34
\.


--
-- TOC entry 3546 (class 0 OID 16461)
-- Dependencies: 222
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, customer_id, "firstName", "lastName", "middleName", title, gender, birthdate, age, mobile, telno, email, addressnum, addressbldg, addressstreet, addressssubd, addressscity, addresssbrgy, addresssprovince, addresssregion, created_at, updated_at) FROM stdin;
1	C-0000001	Monroy	Katherine	Pretty	Ms.	Female	1993-02-14	\N	09185596799	\N	kathmonroy@gmail.com	\N	\N	\N	\N	\N	\N	\N	\N	2025-11-05 06:04:48	2025-11-05 06:04:48
2	C-0000002	Rivera	Nica Isabel	Sanchez	Ms.	Female	1996-10-16	\N	09124289941	\N	nicisabel@gmail.com	\N	\N	\N	\N	\N	\N	\N	\N	2025-11-05 06:05:23	2025-11-05 06:05:23
3	C-0000003	Jeffrey	Dominguez	Pastor	mr	male	1990-10-10	\N	09127187364	\N	jepoy@gmail.com	\N	\N	\N	\N	\N	\N	\N	\N	2025-11-05 12:53:11	2025-11-05 12:53:11
6	C-0000005	Adrianne	Estrella	Perez	ms	female	1998-11-12	\N	+63-910-359-5984	\N	dianne@gmail.com	Blk 1 Lot 2	\N	Moses Street	Ayala	Muntinlupa City	Alabang	Metro Manila	NCR	2025-11-05 15:07:42	2025-11-05 15:07:42
4	C-0000004	Trish Anne	Macandog	Chua	mrs	female	1997-02-14	\N	+63-912-428-9941	\N	trishanne@gmail.com	Blk 3 Lot 4	\N	Sampaguitta Street	Bacoor	Cavite	Dasma	Metro Manila	NCR	2025-11-05 13:35:06	2025-11-05 13:35:06
\.


--
-- TOC entry 3544 (class 0 OID 16437)
-- Dependencies: 220
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- TOC entry 3550 (class 0 OID 16496)
-- Dependencies: 226
-- Data for Name: inquiries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inquiries (id, customer_id, inquiry_id, "sourceInquiry", "salesPersonid", "employmentStatus", "motorBrand", "motorModel", "motorSeries", "motorColor", "motorChassis", "motorLcp", "motorCashprice", "motorRate", "motorDiscount", "motorPromnote", "motorBranchcode", "motorInstallmentterm", "motorDownpayment", "motorReservation", "motorSubsidy", "motorMonthlyinstallment", "motorInstallmentPrice", "motorAmountfinance", "motorMonthlyuid", "motorCustomertype", created_at, updated_at, inquiry_status, userid, date_creditinvestigation, time_creditinvestigation) FROM stdin;
1	1	INQ-0000001	Walk-In	USER-0000001	Employed	YAMAHA	MIO AEROX S BRW5	2025	MATTE DARK GRAY/BLACK	AFAS65456ASDA	0.00	145000.00	1.36	0.00	12420	TBK	12	10000	0.00	0.00	1035	0.00	10000	201.67	Regular	2025-11-10 06:24:22	2025-11-10 06:24:22	New	\N	\N	\N
2	2	INQ-0000002	Walk-In	USER-0000001	Employed	HONDA	ADV 160	2026	MAT SOLAR RED METALLIC	AFAS3213468SDA	0.00	166900.00	1.72	0.00	6732.00	TBK	18	5000	0.00	0.00	3500	0.00	5000	300.00	Regular	2025-11-10 06:29:45	2025-11-10 06:29:45	New	\N	\N	\N
4	6	INQ-0000004	Advertisement	USER-0000001	Self-employed	YAMAHA	NMAX ABS	5465SAFAS78797	MATTE DARK GRAY /BLACK	9321FSAF788	2.79	152900.00	1.60	0.00	140688.00	TBK	12	50000	0.00	0.00	12741.70	0.00	14688.00	741.70	Regular	2025-11-10 12:42:51	2025-11-10 12:42:51	New	\N	\N	\N
5	4	INQ-0000005	Advertisement	USER-0000001	Self-employed	YAMAHA	NMAX ABS	5465SAFAS78797	MATTE DARK GRAY /BLACK	9321FSAF788	2.79	152900.00	1.60	0.00	140688.00	TBK	12	50000	0.00	0.00	12741.70	0.00	14688.00	741.70	Regular	2025-11-10 12:49:17	2025-11-10 12:49:17	New	\N	\N	\N
7	4	INQ-0000007	Walk-in	USER-0000001	Employed	HONDA	HONDA CBR	2020	BLUE	GCFSM32313	2.79	60,000.00	1.48	2500	241,308.08	BTK	24	25,000.00	0.00	0.00	10054.50	67,400.00	163,046.00	3,260.92	Regular	2025-11-12 08:27:12	2025-12-02 05:43:02	New	\N	2025-12-14	16:30:00
8	4	INQ-0000008	Referral	USER-0000001	Employed	SUZUKI	SUZUKI NINJA	2015	YELLOW	GCFTGY12315	2.79	95200.50	1.12	0.00	306953.92	TBK	24	20000.00	0.00	0.00	12789.75	105400.00	274066.00	1370.33	Regular	2025-11-12 09:12:46	2025-12-02 05:43:02	New	\N	2025-12-14	16:30:00
9	3	INQ-0000009	Walk-in	USER-0000001	Employed	KAWASAKI	KAWASAKI NINJA	2026	RED	GCFBCR21657	2.79	63200.00	1.72	0.00	291034.32	TBK	12	30000.00	0.00	0.00	24252.86	71400.00	169206.00	10152.36	Regular	2025-11-12 10:07:23	2025-12-02 05:50:57	New	\N	2026-01-01	10:00:00
6	6	INQ-0000006	Hth	USER-0000001	Employed	KAWASAKI	ROUSER NS 160 TD	2022	GRAY	654645WRSXS654	2.79	99,900.00	1.24	0.00	125,632.00	TBK	12	15000	0.00	0.00	10469.40	0.00	25,632.00	,632	Regular	2025-11-10 23:13:30	2025-12-02 06:47:57	New	\N	2025-12-28	17:45:00
3	3	INQ-0000003	Advertisement	USER-0000001	Employed	SUZUKI	BURGMAN STREET	2024	PEARL MIRAGE WHITE	AEDF6545689	2.79	96000	1.36	0.00	112000	BTK	24	5000	0.00	0.00	3700	0.00	90000	250	Regular	2025-11-10 11:30:14	2025-12-02 07:16:09	New	\N	2025-12-30	08:30:00
\.


--
-- TOC entry 3552 (class 0 OID 16515)
-- Dependencies: 228
-- Data for Name: item_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_lists (id, item_number, "itemName", "itemDescription", "itemPicture", units, "brandName", "modelName", color, "origPrice", "cashPrice", "unitCost", "srpValue", interest, created_at, updated_at, chassis, series) FROM stdin;
1	ITEM-0000001	Honda CBR	150 CC	ITEM-0000001/picture	1	Honda	Honda CBR	Blue	60500	60000	150000	67400	2.79	2025-11-11 15:08:48	2025-11-11 15:08:48	GCFSM32313	2020
2	ITEM-0000002	Kawasaki Ninja	400 CC	ITEM-0000002/picture	10	Kawasaki	Kawasaki Ninja	Red	65000	63200	150000	71400	2.79	2025-11-11 15:16:49	2025-11-11 15:16:49	GCFBCR21657	2022
3	ITEM-0000003	Suzuki Ninja	120 CC	ITEM-0000003/picture	20	Suzuki	Suzuki Ninja	Yellow	100200	95200	150000	105400	2.79	2025-11-11 15:33:40	2025-11-11 15:33:40	GCFTGY12315	2015
5	ITEM-0000004	CRF150L	160 CC	ITEM-0000004/picture	10	Honda	CRF150L	Pink	90000	85000	150000	92400	2.79	2025-11-11 16:24:18	2025-11-11 16:24:18	GCFNVL87956	2024
6	ITEM-0000005	CRF150L	160 CC	ITEM-0000005/picture	10	Honda	CRF150L	Green	100100	98500	150000	102900	2.79	2025-11-11 16:25:32	2025-11-11 16:25:32	GCFDSM34098	2013
\.


--
-- TOC entry 3539 (class 0 OID 16412)
-- Dependencies: 215
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	2014_10_12_000000_create_users_table	1
2	2014_10_12_100000_create_password_reset_tokens_table	1
3	2019_08_19_000000_create_failed_jobs_table	1
5	2025_11_05_044048_create_customers_table	2
6	2019_12_14_000001_create_personal_access_tokens_table	3
7	2025_11_10_044000_create_inquiries_table	4
8	2025_11_10_052502_rename_customerid_to_customer_id_in_customers_table	4
9	2025_11_10_225647_make_userid_unique_in_users_table	5
10	2025_11_10_233829_create_item_lists_table	6
11	2025_11_12_021211_add_fields_to_item_lists_table	7
12	2025_11_13_001433_create_credit_application_primaries_table	8
13	2025_11_13_001442_create_credit_application_preferences_table	8
14	2025_11_13_001448_create_credit_application_references_table	8
15	2025_11_13_001454_create_credit_application_incoms_table	8
16	2025_11_13_001501_create_credit_application_properties_table	8
17	2025_11_13_001507_create_credit_application_attachments_table	8
18	2025_11_13_005122_rename_credit_application_incoms_to_incomes	8
19	2025_11_13_021004_add_customer_id_to_credit_application_tables	9
20	2025_11_15_144159_update_credit_application_attachments_columns	10
21	2025_11_18_031846_create_requirements_table	11
22	2025_11_18_040033_update_requirements_columns	12
23	2025_11_19_112308_add_fields_to_inquiries_table	13
27	2025_12_04_140332_create_credit_investigation_primaries_table	14
28	2026_02_06_081513_create_credit_investigation_other_source_incomes_table	15
30	2026_02_06_085738_create_credit_investigation_credit_references_table	16
\.


--
-- TOC entry 3542 (class 0 OID 16429)
-- Dependencies: 218
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- TOC entry 3548 (class 0 OID 16472)
-- Dependencies: 224
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
1	App\\Models\\User	2	auth_token	501622b0b92f51e5bce4a6ba451a40a67654f897fb8f45684e6ce3a207d6a760	["*"]	\N	\N	2025-11-05 05:33:42	2025-11-05 05:33:42
9	App\\Models\\User	1	auth_token	7dc3d3b6d5041469413ea2095b6386547661328670cddf726e4a3322fcdf63f0	["*"]	2025-11-11 13:31:59	\N	2025-11-10 11:16:53	2025-11-11 13:31:59
21	App\\Models\\User	1	auth_token	8021e59a5f7332421bda11ebfeec96d9b803ac7c0d02374f4cd8864345c7445d	["*"]	2025-11-10 13:49:35	\N	2025-11-10 13:49:29	2025-11-10 13:49:35
22	App\\Models\\User	1	auth_token	69d6432655e545e0981af2aaeb33db58a3278d06336560fa14afac41a1d79e6d	["*"]	2025-11-10 13:51:46	\N	2025-11-10 13:50:18	2025-11-10 13:51:46
23	App\\Models\\User	1	auth_token	aed0268e07c01810ffbf8950cd975cd2c9afd82773d5d77c66ee7c5c59508ca4	["*"]	2025-11-10 13:52:44	\N	2025-11-10 13:51:59	2025-11-10 13:52:44
8	App\\Models\\User	1	auth_token	ff14bfcf18a65bfb2207666c585fc909425edfc77d9d25b5426d68d61471095c	["*"]	2025-11-10 13:09:07	\N	2025-11-10 11:16:22	2025-11-10 13:09:07
12	App\\Models\\User	1	auth_token	58ff604d664c6fb0f798725aa2837e7c8d3333474c2a33b1c543532d67219d5b	["*"]	2025-11-10 13:28:06	\N	2025-11-10 13:21:30	2025-11-10 13:28:06
24	App\\Models\\User	1	auth_token	530b63ae8a355fb0c9f26ff779e4dbdb18f348ccc6c0346d5526b33bc8614b08	["*"]	\N	\N	2025-11-10 13:53:47	2025-11-10 13:53:47
13	App\\Models\\User	1	auth_token	765ef1a1ac3bb1cf127dabc62c3c37c54a1f2ffffc363768a0ddef5a9db567da	["*"]	2025-11-10 13:33:57	\N	2025-11-10 13:32:43	2025-11-10 13:33:57
2	App\\Models\\User	2	auth_token	6d5c34ed974eacca5da82cefb5a5416f47d98b3063d3cd98500ad06cd662951a	["*"]	2025-11-05 06:05:42	\N	2025-11-05 05:42:34	2025-11-05 06:05:42
14	App\\Models\\User	1	auth_token	693532ac6c1ca7ab5583f23e16601d708703f5915e10a496eb3dc5e97ae3f864	["*"]	2025-11-10 13:37:21	\N	2025-11-10 13:35:07	2025-11-10 13:37:21
25	App\\Models\\User	1	auth_token	6a67372a8c216989baf3b2bd90a0e2174934eb6acca39d4af5a97bd84fcb6a1e	["*"]	2025-11-10 13:56:02	\N	2025-11-10 13:55:17	2025-11-10 13:56:02
26	App\\Models\\User	1	auth_token	e82fddae5890f853f2e716c792b8187cce7474667e050d204f32434728e5bc7a	["*"]	\N	\N	2025-11-10 13:58:57	2025-11-10 13:58:57
3	App\\Models\\User	1	auth_token	41df41e2e5e3e458054dfa0b2d4ab722ec946e7dac737b5915eebd8e7df72c66	["*"]	2025-11-05 15:07:42	\N	2025-11-05 06:12:43	2025-11-05 15:07:42
4	App\\Models\\User	1	auth_token	8754e94a4e764c9ecf03186dee5eb72b8636b7ce45c27341f60a31bc8aff53fd	["*"]	\N	\N	2025-11-10 04:42:15	2025-11-10 04:42:15
27	App\\Models\\User	1	auth_token	11cbcfed0c4fed61483c6a22d7cdc11866d6afe7b2126100354fcbbe6769f268	["*"]	\N	\N	2025-11-10 14:02:49	2025-11-10 14:02:49
5	App\\Models\\User	1	auth_token	8906bad8e218dccc2feb71a684b9016d0e1c9f929f538d7e9c0e777ea0368f52	["*"]	2025-11-10 11:16:12	\N	2025-11-10 04:42:16	2025-11-10 11:16:12
6	App\\Models\\User	1	auth_token	69bbcae79dec6cbb39f5a2d9b6804062b30dccd71a0b222059152432885c5151	["*"]	\N	\N	2025-11-10 05:45:59	2025-11-10 05:45:59
30	App\\Models\\User	1	auth_token	9981cff98805cad0af3dbc9c0ea443eadda5a8dbc0104ee9355c4b646e403aa5	["*"]	2025-11-10 14:23:27	\N	2025-11-10 14:23:22	2025-11-10 14:23:27
10	App\\Models\\User	1	auth_token	f4f91abdaa6a74a7e1eae2584b794174f6d48ef7bf70a982c8ab26ef18f763c1	["*"]	2025-11-10 13:17:15	\N	2025-11-10 13:09:17	2025-11-10 13:17:15
11	App\\Models\\User	1	auth_token	87b5a97aa261deacb1dcd68800ef1670202b6d6d9f75f9ef3f9458c20c6aa66e	["*"]	\N	\N	2025-11-10 13:17:39	2025-11-10 13:17:39
15	App\\Models\\User	1	auth_token	dab432b23cef6b637d35231422c3d252ed2ac199b866433e00c19bed730b4ca2	["*"]	2025-11-10 13:43:59	\N	2025-11-10 13:38:03	2025-11-10 13:43:59
16	App\\Models\\User	1	auth_token	d6dfb0038d6cfc66971a9b001618d25b6e9dc146d5d9898a40e31593aef10bc3	["*"]	2025-11-10 13:44:22	\N	2025-11-10 13:44:13	2025-11-10 13:44:22
17	App\\Models\\User	1	auth_token	c358498f680c97d74a4fc946d33e883f430daf57b446c1b10dcf5c9a75ca40c5	["*"]	\N	\N	2025-11-10 13:46:16	2025-11-10 13:46:16
18	App\\Models\\User	1	auth_token	e0cbd071ee4526f24e217d4fa8f7632713231b29122e54cd20065f150e1612e5	["*"]	\N	\N	2025-11-10 13:48:49	2025-11-10 13:48:49
19	App\\Models\\User	1	auth_token	b02b0d6f6eb25272dc1d2f915e9c8d825b5d4bcd59c3208176c609d5bb4f24a1	["*"]	\N	\N	2025-11-10 13:48:54	2025-11-10 13:48:54
20	App\\Models\\User	1	auth_token	3f46248c347d7702051727f91d598ce660b53f892147b8289e6b141b9277d11a	["*"]	2025-11-10 13:49:17	\N	2025-11-10 13:49:04	2025-11-10 13:49:17
33	App\\Models\\User	1	auth_token	ec8a3bd2a4fc50ea380eccd86eb83d3dfeef1f955bcbae698da5ae23b1cd4530	["*"]	2025-11-12 02:16:52	\N	2025-11-11 13:32:11	2025-11-12 02:16:52
34	App\\Models\\User	1	auth_token	64b4862da2f906f756464b8f09cd7439ff5480483ba019f0d09e18b041bbc46d	["*"]	2025-11-11 16:30:58	\N	2025-11-11 13:33:07	2025-11-11 16:30:58
28	App\\Models\\User	1	auth_token	bf60a3acda016e49d4ca05a78e27aab93eeb0293e63ffb2cebb16696b1a5ff9c	["*"]	2025-11-10 14:15:39	\N	2025-11-10 14:05:04	2025-11-10 14:15:39
35	App\\Models\\User	1	auth_token	98b9a32ab6dd870469d8103ba4a1cd381dd001ebd79656b826d7b7d2f3a7b30d	["*"]	\N	\N	2025-11-12 01:53:25	2025-11-12 01:53:25
31	App\\Models\\User	1	auth_token	75c2aa6e5961d3ae732a32df766d01c79e3743c62f9920cafe83e909ae7120bb	["*"]	2025-11-11 00:51:57	\N	2025-11-10 23:03:42	2025-11-11 00:51:57
7	App\\Models\\User	1	auth_token	adc9680e07524aca1fa621d4b3074abeee47867e390b0981ebd5b1ba555fc155	["*"]	2025-11-11 00:55:42	\N	2025-11-10 05:50:30	2025-11-11 00:55:42
29	App\\Models\\User	2	auth_token	7b48742b138b31feb2383b57aa485d9743a833f65e4f7c81211ee366506d68e6	["*"]	2025-11-10 14:23:07	\N	2025-11-10 14:16:01	2025-11-10 14:23:07
32	App\\Models\\User	1	auth_token	1106c0c03c722afd1d967a28ce7637db07a3e10baa3a5252fecdf4e73d562722	["*"]	2025-11-19 08:22:15	\N	2025-11-10 23:08:32	2025-11-19 08:22:15
39	App\\Models\\User	1	auth_token	54166ffb0c1e27675afe073df672d7d25669a7c423eda116f8e0531559d1c260	["*"]	2025-11-13 04:09:03	\N	2025-11-13 03:17:30	2025-11-13 04:09:03
36	App\\Models\\User	1	auth_token	c7c79a3020a2aeb37e311f6fe990605ae686073f8b981b6e1752e161213b62e4	["*"]	2025-11-12 10:46:32	\N	2025-11-12 01:53:27	2025-11-12 10:46:32
37	App\\Models\\User	1	auth_token	924c6ef289e48b6999ad11931591a9888ec07def2c01d81b65462f5151370fb6	["*"]	2025-11-12 02:43:42	\N	2025-11-12 02:17:01	2025-11-12 02:43:42
41	App\\Models\\User	1	auth_token	e4ac1faa5b74aed0df08f5e7dfd094802b185ed081d2e0f5f18ced1f9e5f5872	["*"]	2025-11-13 10:19:54	\N	2025-11-13 04:55:03	2025-11-13 10:19:54
40	App\\Models\\User	1	auth_token	f740926befbd3a3227a9c07aabe2773fd60707290d51c791e2282830df5e8d06	["*"]	\N	\N	2025-11-13 04:55:01	2025-11-13 04:55:01
38	App\\Models\\User	1	auth_token	272e7eb2c91e14e7b8ad1f7e9f6a302b008980a6053acd335a2ff06779ef769b	["*"]	2025-11-14 14:50:20	\N	2025-11-13 01:44:52	2025-11-14 14:50:20
42	App\\Models\\User	1	auth_token	25c30e807a126b69f0d4cdc95cb564cfbd6d43b8faf5dd26fdcc0003f93b949e	["*"]	\N	\N	2025-11-14 14:43:15	2025-11-14 14:43:15
43	App\\Models\\User	1	auth_token	cf78865438c5d93f2a7869ff105635011313cf3306ebb56a8961addc7ba46ec7	["*"]	\N	\N	2025-11-14 14:43:17	2025-11-14 14:43:17
44	App\\Models\\User	1	auth_token	fb9ba747f221d381c0e88e2be9e9f00a7ffd97b37d0ef9d4a0dc29b3d3746a6c	["*"]	2025-11-14 14:43:21	\N	2025-11-14 14:43:18	2025-11-14 14:43:21
57	App\\Models\\User	1	auth_token	c6991de209f8e398de8a88c30190c857698b7cbcffad05f29e03ee30e845661b	["*"]	\N	\N	2025-12-04 14:05:22	2025-12-04 14:05:22
58	App\\Models\\User	1	auth_token	87e3a85f7cae3f9c53a62f12a530f4247f2356eff23ff7046b5817b338af8452	["*"]	\N	\N	2025-12-04 14:05:25	2025-12-04 14:05:25
68	App\\Models\\User	1	auth_token	ab820d8d4cbad2f8bc7fc90e63ad8febb7f2da8c47def91bb06296f68c2db9c9	["*"]	2026-02-05 07:05:16	\N	2026-02-05 01:26:05	2026-02-05 07:05:16
48	App\\Models\\User	1	auth_token	e2ddc7ead8984abdaf37a515afd9f62c25ae82ddd13968238b666ff8a38f419c	["*"]	2025-11-18 02:50:06	\N	2025-11-15 13:22:51	2025-11-18 02:50:06
45	App\\Models\\User	1	auth_token	61c3b2da59474dfd87c2c25e33a31bfcc7ad10f72772658db5c676d9cc8f7ef1	["*"]	2025-11-14 16:07:20	\N	2025-11-14 14:43:18	2025-11-14 16:07:20
46	App\\Models\\User	1	auth_token	cf207d65cf6dc9483d6727159303964bb4c5b18a4b8f3d76849ba499208ee3d3	["*"]	\N	\N	2025-11-14 16:07:29	2025-11-14 16:07:29
47	App\\Models\\User	1	auth_token	2ccca6bce6e44020a20e32cdbfc5a2d8f991c2c41849c0e58563eb0e5eeaae43	["*"]	\N	\N	2025-11-15 13:22:49	2025-11-15 13:22:49
70	App\\Models\\User	1	auth_token	cd51dc9303d770afbb1ab6bddc955928ec126d551d8d6737f11620e08d5b4ae0	["*"]	\N	\N	2026-02-06 05:10:20	2026-02-06 05:10:20
60	App\\Models\\User	1	auth_token	3f22acf67e6b8ec4898600cc5b2d6192cb08d3ac541b0f5f99380d93c763afa0	["*"]	2026-02-05 03:45:28	\N	2025-12-04 14:14:15	2026-02-05 03:45:28
71	App\\Models\\User	1	auth_token	61939ce930f78ccc71c4e5714f7c5385310334f9d5fac036642028b6d6f555f3	["*"]	\N	\N	2026-02-06 05:10:23	2026-02-06 05:10:23
51	App\\Models\\User	1	auth_token	5a1ce2c3bfdc91745de176f157f2464e254833cf4b6d971beb96cc6a327ab53c	["*"]	2025-11-19 11:37:28	\N	2025-11-19 07:26:20	2025-11-19 11:37:28
53	App\\Models\\User	1	auth_token	3368ff5d565bd4969ac7b0ebe283c6cc600696be57e5607bd3d8860c3a1e7e0c	["*"]	\N	\N	2025-12-02 04:20:14	2025-12-02 04:20:14
54	App\\Models\\User	1	auth_token	be2ccc996bb54a0373f125249528c0bb777e45fcbff50a5b560b987a00466b7b	["*"]	\N	\N	2025-12-02 04:20:15	2025-12-02 04:20:15
55	App\\Models\\User	1	auth_token	65155899ca4082cb8c0c6334b1d18e5b1e4cf5855a929c00b4adee7d30af01d8	["*"]	2025-12-02 04:20:22	\N	2025-12-02 04:20:16	2025-12-02 04:20:22
50	App\\Models\\User	1	auth_token	cee843d8f0100e8f39b2bfc4378cc3a9ab2ea7659628e7dc16ac1ce6f9e81b28	["*"]	2025-11-18 04:07:11	\N	2025-11-18 03:30:46	2025-11-18 04:07:11
59	App\\Models\\User	1	auth_token	e4181d2f7285c5ea810868fb2d6393c8d9320784f76c290e9ead83456801819e	["*"]	2025-12-04 14:42:22	\N	2025-12-04 14:05:26	2025-12-04 14:42:22
61	App\\Models\\User	2	auth_token	771d77ab84af12df1caa0c3dbd5ec97708461c38582a97ae76011af488a4c22b	["*"]	\N	\N	2026-02-04 05:12:19	2026-02-04 05:12:19
49	App\\Models\\User	1	auth_token	193932b68c8fbdb60da2cf2e91d0fa2869c2992024453966d3c0eb40ffe3b3b5	["*"]	2025-11-18 07:48:29	\N	2025-11-18 02:50:43	2025-11-18 07:48:29
69	App\\Models\\User	1	auth_token	80b02b6ad1f83d3914b5bcb57476cfb150627bb2407ddd3b6322b7043beb1eb4	["*"]	2026-02-05 02:12:57	\N	2026-02-05 02:09:28	2026-02-05 02:12:57
72	App\\Models\\User	1	auth_token	08a205409ff5cae98d4497159fb32ea790b76c5fbedb8a9b63ef91971e03c5ef	["*"]	2026-02-06 09:52:28	\N	2026-02-06 05:10:23	2026-02-06 09:52:28
52	App\\Models\\User	1	auth_token	1b4fe94bef97380d94c81532c86a0fa23ae09c138090d8dfcaaaf12f5dd66148	["*"]	2025-11-19 08:01:14	\N	2025-11-19 07:57:51	2025-11-19 08:01:14
62	App\\Models\\User	1	auth_token	6e049ce92d2ef4260702a6a84e6deb466d9822804abe6ca3a1aaec93007c2a0c	["*"]	2026-02-04 10:34:15	\N	2026-02-04 05:13:05	2026-02-04 10:34:15
63	App\\Models\\User	1	auth_token	24222c14c779a41625fd96d98fb50352328ac39fc01c0685b5245ff9839243ae	["*"]	\N	\N	2026-02-04 10:34:28	2026-02-04 10:34:28
56	App\\Models\\User	1	auth_token	955257c91b1683b1f35f2df03fe3f5731f097078f04619723b2c5d38de249143	["*"]	2025-12-02 10:27:29	\N	2025-12-02 04:20:17	2025-12-02 10:27:29
64	App\\Models\\User	1	auth_token	a78cbb31245c3d91095a020efa241ca3f4b12647491f05e7adf3a11f690235dd	["*"]	\N	\N	2026-02-04 10:34:29	2026-02-04 10:34:29
65	App\\Models\\User	1	auth_token	b5182a46a2a5ebb1fedb7eca8b77864236ec119628b327cd4ce32d459b817616	["*"]	\N	\N	2026-02-05 01:26:01	2026-02-05 01:26:01
66	App\\Models\\User	1	auth_token	a14a5d693f4c62faaf0d0662ea68d4c4a866868306c2e33ebe02b7da4f1c6f8f	["*"]	\N	\N	2026-02-05 01:26:04	2026-02-05 01:26:04
67	App\\Models\\User	1	auth_token	536c0db410c8403db84c4fa5cc93a06284559cb32246871718550d6f64ed029f	["*"]	\N	\N	2026-02-05 01:26:04	2026-02-05 01:26:04
\.


--
-- TOC entry 3566 (class 0 OID 16671)
-- Dependencies: 242
-- Data for Name: requirements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requirements (id, module, "reqName", "reqShortName", created_at, updated_at) FROM stdin;
1	CA	Voters ID	VI	2025-11-18 03:53:57	2025-11-18 03:53:57
2	CA	Certificate of Employment	COE	2025-11-18 04:02:01	2025-11-18 04:02:01
3	CA	2 Months Payslip	2MP	2025-11-18 04:02:45	2025-11-18 04:02:45
4	CA	Business Permit	BP	2025-11-18 04:06:47	2025-11-18 04:06:47
\.


--
-- TOC entry 3541 (class 0 OID 16419)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, userid, "firstName", "lastName", "middleName", email, email_verified_at, gender, "userName", password, "userType", remember_token, created_at, updated_at) FROM stdin;
1	USER-0000001	Kevin	Macandog	\N	kevinrehan16@gmail.com	\N	Male	kevinrehan16	$2y$12$A1GBsJSefdyobfz3nTs72eW4yTA8M7UzuEkJXVkIDWBOXPHG2Wh1S	Administrator	\N	2025-11-04 05:53:31	2025-11-04 05:53:31
2	USER-0000002	Ivy Nicole	De guzman	\N	ivydeguzman@gmail.com	\N	Female	ivy143	$2y$12$XAJ4Jc8DEAEsAkEbHCwQmur6Kro/QlTXawnWAjOIIsbf.iIjPypOC	Staff	\N	2025-11-04 06:25:10	2025-11-04 06:25:10
3	USER-0000003	Andrea	Estrella	\N	andi@gmail.com	\N	female	andi143	$2y$12$2xvyOUlpvkReqgRgVqvYMOSzHAL4/Oar4bcAQiF/HgraLocNQ8Fiy	staff	\N	2025-11-04 11:27:16	2025-11-04 11:27:16
4	USER-0000004	Kaye	Roxas	\N	kayer@gmail.com	\N	female	kaye143	$2y$12$o6OmkchFp7uhDN3DIRNHU.SF8t1unDm2QgeryXUprHlYuh1urjy9y	staff	\N	2025-11-04 11:35:37	2025-11-04 11:35:37
5	USER-0000005	Samantha Marie	Caleo	\N	sammarie@gmail.com	\N	female	sam143	$2y$12$ubyHGUvZ7BdoD7kI5AvzhO8VwuofSdkuXBo0IFpU3M46lvnCx9KdS	staff	\N	2025-11-04 11:38:20	2025-11-04 11:38:20
6	USER-0000006	Adrianne	Estrella	\N	dianne@gmail.com	\N	female	dianne	$2y$12$e0MEHFA/YQZlv/j/GeAq9urX9mBeZTKlZU8V7Cuj6MLs/M3k0CXdm	staff	\N	2025-11-11 01:00:52	2025-11-11 01:00:52
\.


--
-- TOC entry 3595 (class 0 OID 0)
-- Dependencies: 239
-- Name: credit_application_attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_application_attachments_id_seq', 22, true);


--
-- TOC entry 3596 (class 0 OID 0)
-- Dependencies: 235
-- Name: credit_application_incoms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_application_incoms_id_seq', 48, true);


--
-- TOC entry 3597 (class 0 OID 0)
-- Dependencies: 231
-- Name: credit_application_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_application_preferences_id_seq', 59, true);


--
-- TOC entry 3598 (class 0 OID 0)
-- Dependencies: 229
-- Name: credit_application_primaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_application_primaries_id_seq', 54, true);


--
-- TOC entry 3599 (class 0 OID 0)
-- Dependencies: 237
-- Name: credit_application_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_application_properties_id_seq', 25, true);


--
-- TOC entry 3600 (class 0 OID 0)
-- Dependencies: 233
-- Name: credit_application_references_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_application_references_id_seq', 38, true);


--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 247
-- Name: credit_investigation_credit_references_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_investigation_credit_references_id_seq', 4, true);


--
-- TOC entry 3602 (class 0 OID 0)
-- Dependencies: 245
-- Name: credit_investigation_other_source_incomes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_investigation_other_source_incomes_id_seq', 16, true);


--
-- TOC entry 3603 (class 0 OID 0)
-- Dependencies: 243
-- Name: credit_investigation_primaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credit_investigation_primaries_id_seq', 12, true);


--
-- TOC entry 3604 (class 0 OID 0)
-- Dependencies: 221
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 6, true);


--
-- TOC entry 3605 (class 0 OID 0)
-- Dependencies: 219
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 3606 (class 0 OID 0)
-- Dependencies: 225
-- Name: inquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inquiries_id_seq', 9, true);


--
-- TOC entry 3607 (class 0 OID 0)
-- Dependencies: 227
-- Name: item_lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_lists_id_seq', 6, true);


--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 214
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 30, true);


--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 223
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 72, true);


--
-- TOC entry 3610 (class 0 OID 0)
-- Dependencies: 241
-- Name: requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requirements_id_seq', 4, true);


--
-- TOC entry 3611 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- TOC entry 3364 (class 2606 OID 16631)
-- Name: credit_application_attachments credit_application_attachments_creditappattachments_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_attachments
    ADD CONSTRAINT credit_application_attachments_creditappattachments_id_unique UNIQUE ("creditAppAttachments_id");


--
-- TOC entry 3366 (class 2606 OID 16624)
-- Name: credit_application_attachments credit_application_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_attachments
    ADD CONSTRAINT credit_application_attachments_pkey PRIMARY KEY (id);


--
-- TOC entry 3356 (class 2606 OID 16599)
-- Name: credit_application_incomes credit_application_incoms_creditappinc_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_incomes
    ADD CONSTRAINT credit_application_incoms_creditappinc_id_unique UNIQUE ("creditAppInc_id");


--
-- TOC entry 3358 (class 2606 OID 16592)
-- Name: credit_application_incomes credit_application_incoms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_incomes
    ADD CONSTRAINT credit_application_incoms_pkey PRIMARY KEY (id);


--
-- TOC entry 3348 (class 2606 OID 16567)
-- Name: credit_application_preferences credit_application_preferences_creditapppref_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_preferences
    ADD CONSTRAINT credit_application_preferences_creditapppref_id_unique UNIQUE ("creditAppPref_id");


--
-- TOC entry 3350 (class 2606 OID 16560)
-- Name: credit_application_preferences credit_application_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_preferences
    ADD CONSTRAINT credit_application_preferences_pkey PRIMARY KEY (id);


--
-- TOC entry 3344 (class 2606 OID 16548)
-- Name: credit_application_primaries credit_application_primaries_creditapp_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_primaries
    ADD CONSTRAINT credit_application_primaries_creditapp_id_unique UNIQUE ("creditApp_id");


--
-- TOC entry 3346 (class 2606 OID 16546)
-- Name: credit_application_primaries credit_application_primaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_primaries
    ADD CONSTRAINT credit_application_primaries_pkey PRIMARY KEY (id);


--
-- TOC entry 3360 (class 2606 OID 16617)
-- Name: credit_application_properties credit_application_properties_creditappprops_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_properties
    ADD CONSTRAINT credit_application_properties_creditappprops_id_unique UNIQUE ("creditAppProps_id");


--
-- TOC entry 3362 (class 2606 OID 16610)
-- Name: credit_application_properties credit_application_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_properties
    ADD CONSTRAINT credit_application_properties_pkey PRIMARY KEY (id);


--
-- TOC entry 3352 (class 2606 OID 16583)
-- Name: credit_application_references credit_application_references_creditappref_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_references
    ADD CONSTRAINT credit_application_references_creditappref_id_unique UNIQUE ("creditAppRef_id");


--
-- TOC entry 3354 (class 2606 OID 16576)
-- Name: credit_application_references credit_application_references_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_references
    ADD CONSTRAINT credit_application_references_pkey PRIMARY KEY (id);


--
-- TOC entry 3378 (class 2606 OID 16862)
-- Name: credit_investigation_credit_references credit_investigation_credit_references_creditcr_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_credit_references
    ADD CONSTRAINT credit_investigation_credit_references_creditcr_id_unique UNIQUE ("creditCr_id");


--
-- TOC entry 3380 (class 2606 OID 16855)
-- Name: credit_investigation_credit_references credit_investigation_credit_references_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_credit_references
    ADD CONSTRAINT credit_investigation_credit_references_pkey PRIMARY KEY (id);


--
-- TOC entry 3374 (class 2606 OID 16824)
-- Name: credit_investigation_other_source_incomes credit_investigation_other_source_incomes_creditosi_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_other_source_incomes
    ADD CONSTRAINT credit_investigation_other_source_incomes_creditosi_id_unique UNIQUE ("creditOsi_id");


--
-- TOC entry 3376 (class 2606 OID 16817)
-- Name: credit_investigation_other_source_incomes credit_investigation_other_source_incomes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_other_source_incomes
    ADD CONSTRAINT credit_investigation_other_source_incomes_pkey PRIMARY KEY (id);


--
-- TOC entry 3370 (class 2606 OID 16807)
-- Name: credit_investigation_primaries credit_investigation_primaries_creditinv_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_primaries
    ADD CONSTRAINT credit_investigation_primaries_creditinv_id_unique UNIQUE ("creditInv_id");


--
-- TOC entry 3372 (class 2606 OID 16800)
-- Name: credit_investigation_primaries credit_investigation_primaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_primaries
    ADD CONSTRAINT credit_investigation_primaries_pkey PRIMARY KEY (id);


--
-- TOC entry 3327 (class 2606 OID 16470)
-- Name: customers customers_customerid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_customerid_unique UNIQUE (customer_id);


--
-- TOC entry 3329 (class 2606 OID 16468)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 3323 (class 2606 OID 16445)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3325 (class 2606 OID 16447)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 3336 (class 2606 OID 16510)
-- Name: inquiries inquiries_inquiry_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_inquiry_id_unique UNIQUE (inquiry_id);


--
-- TOC entry 3338 (class 2606 OID 16503)
-- Name: inquiries inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_pkey PRIMARY KEY (id);


--
-- TOC entry 3340 (class 2606 OID 16524)
-- Name: item_lists item_lists_item_number_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_lists
    ADD CONSTRAINT item_lists_item_number_unique UNIQUE (item_number);


--
-- TOC entry 3342 (class 2606 OID 16522)
-- Name: item_lists item_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_lists
    ADD CONSTRAINT item_lists_pkey PRIMARY KEY (id);


--
-- TOC entry 3313 (class 2606 OID 16417)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3321 (class 2606 OID 16435)
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- TOC entry 3331 (class 2606 OID 16479)
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3333 (class 2606 OID 16482)
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- TOC entry 3368 (class 2606 OID 16677)
-- Name: requirements requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requirements
    ADD CONSTRAINT requirements_pkey PRIMARY KEY (id);


--
-- TOC entry 3315 (class 2606 OID 16428)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 3317 (class 2606 OID 16426)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3319 (class 2606 OID 16513)
-- Name: users users_userid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_userid_unique UNIQUE (userid);


--
-- TOC entry 3334 (class 1259 OID 16480)
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- TOC entry 3391 (class 2606 OID 16625)
-- Name: credit_application_attachments credit_application_attachments_credit_application_primary_id_fo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_attachments
    ADD CONSTRAINT credit_application_attachments_credit_application_primary_id_fo FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3392 (class 2606 OID 16657)
-- Name: credit_application_attachments credit_application_attachments_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_attachments
    ADD CONSTRAINT credit_application_attachments_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3387 (class 2606 OID 16647)
-- Name: credit_application_incomes credit_application_incomes_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_incomes
    ADD CONSTRAINT credit_application_incomes_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3388 (class 2606 OID 16593)
-- Name: credit_application_incomes credit_application_incoms_credit_application_primary_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_incomes
    ADD CONSTRAINT credit_application_incoms_credit_application_primary_id_foreign FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3383 (class 2606 OID 16561)
-- Name: credit_application_preferences credit_application_preferences_credit_application_primary_id_fo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_preferences
    ADD CONSTRAINT credit_application_preferences_credit_application_primary_id_fo FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3384 (class 2606 OID 16637)
-- Name: credit_application_preferences credit_application_preferences_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_preferences
    ADD CONSTRAINT credit_application_preferences_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3382 (class 2606 OID 16632)
-- Name: credit_application_primaries credit_application_primaries_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_primaries
    ADD CONSTRAINT credit_application_primaries_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3389 (class 2606 OID 16611)
-- Name: credit_application_properties credit_application_properties_credit_application_primary_id_for; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_properties
    ADD CONSTRAINT credit_application_properties_credit_application_primary_id_for FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3390 (class 2606 OID 16652)
-- Name: credit_application_properties credit_application_properties_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_properties
    ADD CONSTRAINT credit_application_properties_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3385 (class 2606 OID 16577)
-- Name: credit_application_references credit_application_references_credit_application_primary_id_for; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_references
    ADD CONSTRAINT credit_application_references_credit_application_primary_id_for FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3386 (class 2606 OID 16642)
-- Name: credit_application_references credit_application_references_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_application_references
    ADD CONSTRAINT credit_application_references_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3395 (class 2606 OID 16856)
-- Name: credit_investigation_credit_references credit_investigation_credit_references_inquiry_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_credit_references
    ADD CONSTRAINT credit_investigation_credit_references_inquiry_id_foreign FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- TOC entry 3394 (class 2606 OID 16818)
-- Name: credit_investigation_other_source_incomes credit_investigation_other_source_incomes_inquiry_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_other_source_incomes
    ADD CONSTRAINT credit_investigation_other_source_incomes_inquiry_id_foreign FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- TOC entry 3393 (class 2606 OID 16801)
-- Name: credit_investigation_primaries credit_investigation_primaries_inquiry_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credit_investigation_primaries
    ADD CONSTRAINT credit_investigation_primaries_inquiry_id_foreign FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- TOC entry 3381 (class 2606 OID 16504)
-- Name: inquiries inquiries_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


-- Completed on 2026-02-06 18:13:15

--
-- PostgreSQL database dump complete
--

