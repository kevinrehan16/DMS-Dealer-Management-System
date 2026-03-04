--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2026-02-24 23:01:48

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
-- TOC entry 240 (class 1259 OID 17385)
-- Name: credit_application_attachments; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 239 (class 1259 OID 17384)
-- Name: credit_application_attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_application_attachments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3655 (class 0 OID 0)
-- Dependencies: 239
-- Name: credit_application_attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_application_attachments_id_seq OWNED BY public.credit_application_attachments.id;


--
-- TOC entry 236 (class 1259 OID 17351)
-- Name: credit_application_incomes; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 235 (class 1259 OID 17350)
-- Name: credit_application_incoms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_application_incoms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3656 (class 0 OID 0)
-- Dependencies: 235
-- Name: credit_application_incoms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_application_incoms_id_seq OWNED BY public.credit_application_incomes.id;


--
-- TOC entry 232 (class 1259 OID 17316)
-- Name: credit_application_preferences; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 231 (class 1259 OID 17315)
-- Name: credit_application_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_application_preferences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3657 (class 0 OID 0)
-- Dependencies: 231
-- Name: credit_application_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_application_preferences_id_seq OWNED BY public.credit_application_preferences.id;


--
-- TOC entry 230 (class 1259 OID 17302)
-- Name: credit_application_primaries; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 229 (class 1259 OID 17301)
-- Name: credit_application_primaries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_application_primaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3658 (class 0 OID 0)
-- Dependencies: 229
-- Name: credit_application_primaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_application_primaries_id_seq OWNED BY public.credit_application_primaries.id;


--
-- TOC entry 238 (class 1259 OID 17367)
-- Name: credit_application_properties; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 237 (class 1259 OID 17366)
-- Name: credit_application_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_application_properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3659 (class 0 OID 0)
-- Dependencies: 237
-- Name: credit_application_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_application_properties_id_seq OWNED BY public.credit_application_properties.id;


--
-- TOC entry 234 (class 1259 OID 17335)
-- Name: credit_application_references; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 233 (class 1259 OID 17334)
-- Name: credit_application_references_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_application_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3660 (class 0 OID 0)
-- Dependencies: 233
-- Name: credit_application_references_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_application_references_id_seq OWNED BY public.credit_application_references.id;


--
-- TOC entry 248 (class 1259 OID 17494)
-- Name: credit_investigation_credit_references; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 247 (class 1259 OID 17493)
-- Name: credit_investigation_credit_references_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_investigation_credit_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3661 (class 0 OID 0)
-- Dependencies: 247
-- Name: credit_investigation_credit_references_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_investigation_credit_references_id_seq OWNED BY public.credit_investigation_credit_references.id;


--
-- TOC entry 246 (class 1259 OID 17479)
-- Name: credit_investigation_other_source_incomes; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 245 (class 1259 OID 17478)
-- Name: credit_investigation_other_source_incomes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_investigation_other_source_incomes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3662 (class 0 OID 0)
-- Dependencies: 245
-- Name: credit_investigation_other_source_incomes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_investigation_other_source_incomes_id_seq OWNED BY public.credit_investigation_other_source_incomes.id;


--
-- TOC entry 252 (class 1259 OID 17529)
-- Name: credit_investigation_personal_properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.credit_investigation_personal_properties (
    id bigint NOT NULL,
    inquiry_id bigint NOT NULL,
    "creditPp_id" character varying(30) NOT NULL,
    ppkind character varying(50),
    pplocation text,
    ppvalue numeric(15,2),
    ppimbursement numeric(15,2),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- TOC entry 251 (class 1259 OID 17528)
-- Name: credit_investigation_personal_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_investigation_personal_properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3663 (class 0 OID 0)
-- Dependencies: 251
-- Name: credit_investigation_personal_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_investigation_personal_properties_id_seq OWNED BY public.credit_investigation_personal_properties.id;


--
-- TOC entry 250 (class 1259 OID 17513)
-- Name: credit_investigation_personal_references; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.credit_investigation_personal_references (
    id bigint NOT NULL,
    inquiry_id bigint NOT NULL,
    "creditPr_id" character varying(30) NOT NULL,
    prname character varying(100),
    praddress text,
    prcontact character varying(20),
    prrelation character varying(30),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- TOC entry 249 (class 1259 OID 17512)
-- Name: credit_investigation_personal_references_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_investigation_personal_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3664 (class 0 OID 0)
-- Dependencies: 249
-- Name: credit_investigation_personal_references_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_investigation_personal_references_id_seq OWNED BY public.credit_investigation_personal_references.id;


--
-- TOC entry 244 (class 1259 OID 17440)
-- Name: credit_investigation_primaries; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 243 (class 1259 OID 17439)
-- Name: credit_investigation_primaries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_investigation_primaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3665 (class 0 OID 0)
-- Dependencies: 243
-- Name: credit_investigation_primaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_investigation_primaries_id_seq OWNED BY public.credit_investigation_primaries.id;


--
-- TOC entry 224 (class 1259 OID 17264)
-- Name: customers; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 223 (class 1259 OID 17263)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3666 (class 0 OID 0)
-- Dependencies: 223
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- TOC entry 220 (class 1259 OID 17240)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 219 (class 1259 OID 17239)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 219
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 226 (class 1259 OID 17275)
-- Name: inquiries; Type: TABLE; Schema: public; Owner: -
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
    inquiry_status character varying(20) DEFAULT 'New'::character varying,
    userid character varying(30),
    date_creditinvestigation date,
    time_creditinvestigation time(0) without time zone
);


--
-- TOC entry 225 (class 1259 OID 17274)
-- Name: inquiries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inquiries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 225
-- Name: inquiries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inquiries_id_seq OWNED BY public.inquiries.id;


--
-- TOC entry 228 (class 1259 OID 17291)
-- Name: item_lists; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 227 (class 1259 OID 17290)
-- Name: item_lists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.item_lists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 227
-- Name: item_lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.item_lists_id_seq OWNED BY public.item_lists.id;


--
-- TOC entry 215 (class 1259 OID 17213)
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 17212)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3670 (class 0 OID 0)
-- Dependencies: 214
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 257 (class 1259 OID 17566)
-- Name: model_has_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.model_has_permissions (
    permission_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);


--
-- TOC entry 258 (class 1259 OID 17577)
-- Name: model_has_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.model_has_roles (
    role_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 17232)
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- TOC entry 254 (class 1259 OID 17545)
-- Name: permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permissions (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- TOC entry 253 (class 1259 OID 17544)
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3671 (class 0 OID 0)
-- Dependencies: 253
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- TOC entry 222 (class 1259 OID 17252)
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 221 (class 1259 OID 17251)
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3672 (class 0 OID 0)
-- Dependencies: 221
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- TOC entry 242 (class 1259 OID 17431)
-- Name: requirements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.requirements (
    id bigint NOT NULL,
    module character varying(2) DEFAULT 'CA'::character varying NOT NULL,
    "reqName" character varying(100) NOT NULL,
    "reqShortName" character varying(5) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- TOC entry 241 (class 1259 OID 17430)
-- Name: requirements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.requirements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3673 (class 0 OID 0)
-- Dependencies: 241
-- Name: requirements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.requirements_id_seq OWNED BY public.requirements.id;


--
-- TOC entry 259 (class 1259 OID 17588)
-- Name: role_has_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role_has_permissions (
    permission_id bigint NOT NULL,
    role_id bigint NOT NULL
);


--
-- TOC entry 256 (class 1259 OID 17556)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- TOC entry 255 (class 1259 OID 17555)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3674 (class 0 OID 0)
-- Dependencies: 255
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 217 (class 1259 OID 17220)
-- Name: users; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 216 (class 1259 OID 17219)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3675 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3311 (class 2604 OID 17388)
-- Name: credit_application_attachments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_attachments ALTER COLUMN id SET DEFAULT nextval('public.credit_application_attachments_id_seq'::regclass);


--
-- TOC entry 3307 (class 2604 OID 17354)
-- Name: credit_application_incomes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_incomes ALTER COLUMN id SET DEFAULT nextval('public.credit_application_incoms_id_seq'::regclass);


--
-- TOC entry 3302 (class 2604 OID 17319)
-- Name: credit_application_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_preferences ALTER COLUMN id SET DEFAULT nextval('public.credit_application_preferences_id_seq'::regclass);


--
-- TOC entry 3298 (class 2604 OID 17305)
-- Name: credit_application_primaries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_primaries ALTER COLUMN id SET DEFAULT nextval('public.credit_application_primaries_id_seq'::regclass);


--
-- TOC entry 3308 (class 2604 OID 17370)
-- Name: credit_application_properties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_properties ALTER COLUMN id SET DEFAULT nextval('public.credit_application_properties_id_seq'::regclass);


--
-- TOC entry 3306 (class 2604 OID 17338)
-- Name: credit_application_references id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_references ALTER COLUMN id SET DEFAULT nextval('public.credit_application_references_id_seq'::regclass);


--
-- TOC entry 3338 (class 2604 OID 17497)
-- Name: credit_investigation_credit_references id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_credit_references ALTER COLUMN id SET DEFAULT nextval('public.credit_investigation_credit_references_id_seq'::regclass);


--
-- TOC entry 3336 (class 2604 OID 17482)
-- Name: credit_investigation_other_source_incomes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_other_source_incomes ALTER COLUMN id SET DEFAULT nextval('public.credit_investigation_other_source_incomes_id_seq'::regclass);


--
-- TOC entry 3343 (class 2604 OID 17532)
-- Name: credit_investigation_personal_properties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_personal_properties ALTER COLUMN id SET DEFAULT nextval('public.credit_investigation_personal_properties_id_seq'::regclass);


--
-- TOC entry 3342 (class 2604 OID 17516)
-- Name: credit_investigation_personal_references id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_personal_references ALTER COLUMN id SET DEFAULT nextval('public.credit_investigation_personal_references_id_seq'::regclass);


--
-- TOC entry 3314 (class 2604 OID 17443)
-- Name: credit_investigation_primaries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_primaries ALTER COLUMN id SET DEFAULT nextval('public.credit_investigation_primaries_id_seq'::regclass);


--
-- TOC entry 3294 (class 2604 OID 17267)
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 3291 (class 2604 OID 17243)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 3295 (class 2604 OID 17278)
-- Name: inquiries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inquiries ALTER COLUMN id SET DEFAULT nextval('public.inquiries_id_seq'::regclass);


--
-- TOC entry 3297 (class 2604 OID 17294)
-- Name: item_lists id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item_lists ALTER COLUMN id SET DEFAULT nextval('public.item_lists_id_seq'::regclass);


--
-- TOC entry 3289 (class 2604 OID 17216)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3344 (class 2604 OID 17548)
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- TOC entry 3293 (class 2604 OID 17255)
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- TOC entry 3312 (class 2604 OID 17434)
-- Name: requirements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requirements ALTER COLUMN id SET DEFAULT nextval('public.requirements_id_seq'::regclass);


--
-- TOC entry 3345 (class 2604 OID 17559)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3290 (class 2604 OID 17223)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3630 (class 0 OID 17385)
-- Dependencies: 240
-- Data for Name: credit_application_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_application_attachments (id, credit_application_primary_id, "creditAppAttachments_id", "creditAppPrimary_id", "attModule", "attReq", "attFileName", "attFileType", "attFileSize", created_at, updated_at, customer_id) FROM stdin;
\.


--
-- TOC entry 3626 (class 0 OID 17351)
-- Dependencies: 236
-- Data for Name: credit_application_incomes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_application_incomes (id, credit_application_primary_id, "creditAppInc_id", "creditAppPrimary_id", "incNature", "incAddress", created_at, updated_at, customer_id) FROM stdin;
\.


--
-- TOC entry 3622 (class 0 OID 17316)
-- Dependencies: 232
-- Data for Name: credit_application_preferences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_application_preferences (id, credit_application_primary_id, "creditAppPref_id", "creditAppPrimary_id", "prefCreditor", "prefAddress", "prefDateGranted", "prefOrigBal", "prefPresBal", "prefMonInstallment", created_at, updated_at, customer_id) FROM stdin;
\.


--
-- TOC entry 3620 (class 0 OID 17302)
-- Dependencies: 230
-- Data for Name: credit_application_primaries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_application_primaries (id, "creditApp_id", "lastName", "firstName", "middleName", birthdate, age, gender, "civilStatus", education, "spouseName", "spouseBirthDate", "spouseAge", "numChildren", "numStudying", "otherDependetn", "presentAddress", mobile, created_at, updated_at, customer_id) FROM stdin;
\.


--
-- TOC entry 3628 (class 0 OID 17367)
-- Dependencies: 238
-- Data for Name: credit_application_properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_application_properties (id, credit_application_primary_id, "creditAppProps_id", "creditAppPrimary_id", "propsKind", "propsLocation", "propsValue", "propsImbursement", created_at, updated_at, customer_id) FROM stdin;
\.


--
-- TOC entry 3624 (class 0 OID 17335)
-- Dependencies: 234
-- Data for Name: credit_application_references; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_application_references (id, credit_application_primary_id, "creditAppRef_id", "creditAppPrimary_id", "refFullName", "refAddress", "refContact", "refRelation", created_at, updated_at, customer_id) FROM stdin;
\.


--
-- TOC entry 3638 (class 0 OID 17494)
-- Dependencies: 248
-- Data for Name: credit_investigation_credit_references; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_investigation_credit_references (id, inquiry_id, "creditCr_id", crcreditor, craddress, crdategranted, crorigbalance, crpresbalance, crmoinstallment, created_at, updated_at) FROM stdin;
1	2	CICR-0000001	Creditor	Address Creditor	2023-06-06	75000.00	50000.00	5000.00	2026-02-24 13:34:24	2026-02-24 13:34:24
\.


--
-- TOC entry 3636 (class 0 OID 17479)
-- Dependencies: 246
-- Data for Name: credit_investigation_other_source_incomes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_investigation_other_source_incomes (id, inquiry_id, "creditOsi_id", osisource, osiamount, created_at, updated_at) FROM stdin;
1	2	CISI-0000001	Source	49999.00	2026-02-24 13:34:24	2026-02-24 13:34:24
\.


--
-- TOC entry 3642 (class 0 OID 17529)
-- Dependencies: 252
-- Data for Name: credit_investigation_personal_properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_investigation_personal_properties (id, inquiry_id, "creditPp_id", ppkind, pplocation, ppvalue, ppimbursement, created_at, updated_at) FROM stdin;
1	2	CIPP-0000001	Kind	Location Kind	20000.00	5000.00	2026-02-24 13:34:24	2026-02-24 13:34:24
\.


--
-- TOC entry 3640 (class 0 OID 17513)
-- Dependencies: 250
-- Data for Name: credit_investigation_personal_references; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_investigation_personal_references (id, inquiry_id, "creditPr_id", prname, praddress, prcontact, prrelation, created_at, updated_at) FROM stdin;
1	2	CIPR-0000001	Name	Address Name	09153169518	Grand-Parent	2026-02-24 13:34:24	2026-02-24 13:34:24
\.


--
-- TOC entry 3634 (class 0 OID 17440)
-- Dependencies: 244
-- Data for Name: credit_investigation_primaries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_investigation_primaries (id, inquiry_id, "creditInv_id", "cicontactPerson", cigender, cibirthday, cicpage, "cispouseName", "cispouseGender", "cispouseBirthday", cisage, "cicivilStatus", cieducation, "citinNumber", cimobile, "cidependentChildren", "cistudyingChildren", "ciotherDependents", "ciPresAddress", "ciPresAddrLenStay", "ciPresAddrMonStay", "ciPresAddrType", "ciPresAddrRentFee", "ciPrevAddress", "ciPrevAddrLenStay", "ciPrevAddrMonStay", "ciProvAddress", "ciEmployedBy", "ciEmpAddrEmp", "ciEmpAddrLenStay", "ciEmpAddrMonStay", "ciEmpStatus", "ciEmpDesignation", "ciEmpTelNo", "ciEmpPrevEmp", "ciEmpPrevAddrEmp", "ciEmpSpouseEmp", "ciEmpSpouseEmpAddr", "ciEmpSpousePosition", "ciEmpPrevTelNo", "ciIncomeSalaryNet", "ciSpouseIncome", "ciRentalIncome", "ciBusinessNet", "ciOthers", "ciTotalIncome", "ciExpenseLiving", "ciExpenseRent", "ciExpenseSchooling", "ciExpenseInsurance", "ciExpenseElectWat", "ciExpenseObligation", "ciExpenseLoan", "ciExpenseTotal", "ciCheckingAccount", "ciCAAddrr", "ciSavingsAccount", "ciSAAddrr", created_at, updated_at) FROM stdin;
1	2	INV-0000001	Chua Trish Ann	Female	1998-02-06	28	Nivek Godnacam	Male	1995-07-06	30	Married	College	1214546565878	0915316518	0	0	4	Present Address	2	2 Months	Own	0.00	Previous Address	4	3 Months	Provincial Address	Gatessoft Corp	Address of Employer	9	4 Months	Regular	Software Developer	87000	Prev. Employment	Address  Address	Spouse Emp	Address  Spouse	Content Chef Creator	87000	60000.00	35000.00	0.00	25000.00	15000.00	135000.00	25000.00	0.00	0.00	10000.00	5000.00	3500.00	2500.00	46000.00	Checking Account	Address Checking Account	Savings Account	Address Savings Account	2026-02-24 13:34:24	2026-02-24 13:34:24
\.


--
-- TOC entry 3614 (class 0 OID 17264)
-- Dependencies: 224
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers (id, customer_id, "firstName", "lastName", "middleName", title, gender, birthdate, age, mobile, telno, email, addressnum, addressbldg, addressstreet, addressssubd, addressscity, addresssbrgy, addresssprovince, addresssregion, created_at, updated_at) FROM stdin;
1	C-0000001	Andrea	Estrella	Paredes	ms	female	2002-12-11	\N	+63-143-777-1434	\N	andi@gmail.com	\N	\N	\N	\N	\N	\N	\N	\N	2026-02-24 05:50:55	2026-02-24 05:50:55
2	C-0000002	Chua	Trish Ann	Siopao	ms	female	1998-02-12	\N	+63-184-889-4564	\N	trish@gmail.com	\N	\N	\N	\N	\N	\N	\N	\N	2026-02-24 10:45:19	2026-02-24 10:45:19
\.


--
-- TOC entry 3610 (class 0 OID 17240)
-- Dependencies: 220
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- TOC entry 3616 (class 0 OID 17275)
-- Dependencies: 226
-- Data for Name: inquiries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inquiries (id, customer_id, inquiry_id, "sourceInquiry", "salesPersonid", "employmentStatus", "motorBrand", "motorModel", "motorSeries", "motorColor", "motorChassis", "motorLcp", "motorCashprice", "motorRate", "motorDiscount", "motorPromnote", "motorBranchcode", "motorInstallmentterm", "motorDownpayment", "motorReservation", "motorSubsidy", "motorMonthlyinstallment", "motorInstallmentPrice", "motorAmountfinance", "motorMonthlyuid", "motorCustomertype", created_at, updated_at, inquiry_status, userid, date_creditinvestigation, time_creditinvestigation) FROM stdin;
2	2	INQ-0000002	Advertisement	USER-0000001	Self-employed	HONDA	PCX 160 CBS	2861IUDC	CHLOROPHYLL GREEN R	LGV378	2.79	68500.00	1.36	1500.00	633488.00	BTKS	3	8000.00	2000.00	500.00	211162.67	170000.00	465800.00	55896.00	Employee	2026-02-24 11:17:29	2026-02-24 13:58:06	New	\N	2026-03-02	15:00:00
1	1	INQ-0000001	Walk-in	USER-0000001	Employed	HONDA	CLICK 125 LIMITED EDITION	9446UYMK	PEARL ARTIC WHITE	GMQ274	2.79	68500.00	1.12	5000.00	519792.00	BTK	6	10000.00	2500.00	200.00	86632.00	170000.00	464100.00	9282.00	Regular	2026-02-24 06:05:44	2026-02-24 13:58:06	New	\N	2026-03-02	15:00:00
\.


--
-- TOC entry 3618 (class 0 OID 17291)
-- Dependencies: 228
-- Data for Name: item_lists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.item_lists (id, item_number, "itemName", "itemDescription", "itemPicture", units, "brandName", "modelName", color, "origPrice", "cashPrice", "unitCost", "srpValue", interest, created_at, updated_at, chassis, series) FROM stdin;
1	ITEM-0000005	CRF150L	160 CC	ITEM-0000005/picture	10	Honda	CRF150L	Green	190500	180200	150000	170000	2.79	2026-02-24 05:52:38	2026-02-24 05:52:38	ADS674	4525ASWE
2	ITEM-0000002	150 CC -4 STROKE	110 CC -4 STROKE	ITEM-0000002/picture	10	SUZUKI	SMASH DRUM -SPOKES	CANDY JACKAL GREEN	62400	68500	150000	170000	2.79	2026-02-24 05:57:13	2026-02-24 05:57:13	ERE455	8732MNEW
3	ITEM-0000003	150 CC -4 STROKE	110 CC -4 STROKE	ITEM-0000002/picture	10	SUZUKI	SMASH DRUM -SPOKES	METTALIC MATTE FIBROIN GRAY	62400	68500	150000	170000	2.79	2026-02-24 05:57:41	2026-02-24 05:57:41	NHG915	4589BNER
4	ITEM-0000004	SMASH FI SPOKES/DRUM	110 CC -4 STROKE	ITEM-0000002/picture	10	SUZUKI	SMASH FI SPOKES/DRUM	NEW TITAN BLACK	62400	68500	150000	170000	2.79	2026-02-24 05:58:25	2026-02-24 05:58:25	NKO953	3719HBEC
6	ITEM-0000006	ROUSER RS 200 ABS	200 CC- 4 STROKE	ITEM-0000002/picture	10	KAWASAKI	ROUSER RS 200 ABS	METTALIC MATTE STELLAR BLUE	62400	68500	150000	170000	2.79	2026-02-24 06:00:01	2026-02-24 06:00:01	WGI279	8137DTJU
8	ITEM-0000007	CLICK 125-2024 YEAR MODEL	160 CC -4 STROKE	ITEM-0000002/picture	10	HONDA	CLICK 125 LIMITED EDITION	PEARL ARTIC WHITE	62400	68500	150000	170000	2.79	2026-02-24 06:00:47	2026-02-24 06:00:47	GMQ274	9446UYMK
10	ITEM-0000008	PCX 160 CBS	125 CC -4 STROKE	ITEM-0000002/picture	10	HONDA	PCX 160 CBS	CHLOROPHYLL GREEN R	62400	68500	150000	170000	2.79	2026-02-24 06:26:06	2026-02-24 06:26:06	LGV378	2861IUDC
\.


--
-- TOC entry 3605 (class 0 OID 17213)
-- Dependencies: 215
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	2014_10_12_000000_create_users_table	1
2	2014_10_12_100000_create_password_reset_tokens_table	1
3	2019_08_19_000000_create_failed_jobs_table	1
4	2019_12_14_000001_create_personal_access_tokens_table	1
5	2025_11_05_044048_create_customers_table	1
6	2025_11_10_044000_create_inquiries_table	1
7	2025_11_10_052502_rename_customerid_to_customer_id_in_customers_table	1
8	2025_11_10_225647_make_userid_unique_in_users_table	1
9	2025_11_10_233829_create_item_lists_table	1
10	2025_11_12_021211_add_fields_to_item_lists_table	1
11	2025_11_13_001433_create_credit_application_primaries_table	1
12	2025_11_13_001442_create_credit_application_preferences_table	1
13	2025_11_13_001448_create_credit_application_references_table	1
14	2025_11_13_001454_create_credit_application_incoms_table	1
15	2025_11_13_001501_create_credit_application_properties_table	1
16	2025_11_13_001507_create_credit_application_attachments_table	1
17	2025_11_13_005122_rename_credit_application_incoms_to_incomes	1
18	2025_11_13_021004_add_customer_id_to_credit_application_tables	1
19	2025_11_15_144159_update_credit_application_attachments_columns	1
20	2025_11_18_031846_create_requirements_table	1
21	2025_11_18_040033_update_requirements_columns	1
22	2025_11_19_112308_add_fields_to_inquiries_table	1
23	2025_12_04_140332_create_credit_investigation_primaries_table	1
24	2026_02_06_081513_create_credit_investigation_other_source_incomes_table	1
25	2026_02_06_085738_create_credit_investigation_credit_references_table	1
26	2026_02_10_023636_create_credit_investigation_personal_references_table	1
27	2026_02_10_034026_create_credit_investigation_personal_properties_table	1
28	2026_02_24_024808_create_permission_tables	1
\.


--
-- TOC entry 3647 (class 0 OID 17566)
-- Dependencies: 257
-- Data for Name: model_has_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.model_has_permissions (permission_id, model_type, model_id) FROM stdin;
\.


--
-- TOC entry 3648 (class 0 OID 17577)
-- Dependencies: 258
-- Data for Name: model_has_roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.model_has_roles (role_id, model_type, model_id) FROM stdin;
1	App\\Models\\User	1
2	App\\Models\\User	2
3	App\\Models\\User	3
2	App\\Models\\User	4
\.


--
-- TOC entry 3608 (class 0 OID 17232)
-- Dependencies: 218
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- TOC entry 3644 (class 0 OID 17545)
-- Dependencies: 254
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permissions (id, name, guard_name, created_at, updated_at) FROM stdin;
1	view inquiry	sanctum	2026-02-24 04:35:00	2026-02-24 04:35:00
2	create inquiry	sanctum	2026-02-24 04:35:00	2026-02-24 04:35:00
3	edit inquiry	sanctum	2026-02-24 04:35:00	2026-02-24 04:35:00
4	delete inquiry	sanctum	2026-02-24 04:35:00	2026-02-24 04:35:00
9	view investigation	sanctum	2026-02-24 09:19:22	2026-02-24 09:19:22
10	create investigation	sanctum	2026-02-24 09:19:22	2026-02-24 09:19:22
11	edit investigation	sanctum	2026-02-24 09:19:22	2026-02-24 09:19:22
12	delete investigation	sanctum	2026-02-24 09:19:22	2026-02-24 09:19:22
13	view evaluation	sanctum	2026-02-24 09:19:22	2026-02-24 09:19:22
14	create evaluation	sanctum	2026-02-24 09:19:22	2026-02-24 09:19:22
15	edit evaluation	sanctum	2026-02-24 09:19:22	2026-02-24 09:19:22
16	delete evaluation	sanctum	2026-02-24 09:19:22	2026-02-24 09:19:22
5	view dashboard	sanctum	2026-02-24 09:00:43	2026-02-24 09:00:43
6	create dashboard	sanctum	2026-02-24 09:00:43	2026-02-24 09:00:43
7	edit dashboard	sanctum	2026-02-24 09:00:43	2026-02-24 09:00:43
8	delete dashboard	sanctum	2026-02-24 09:00:43	2026-02-24 09:00:43
\.


--
-- TOC entry 3612 (class 0 OID 17252)
-- Dependencies: 222
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
11	App\\Models\\User	1	api_test_token	c47358d0fef50ee33c9434d7400cd6136b988fe5e4f174e95cc4cc190ef603ef	["*"]	2026-02-24 05:48:07	\N	2026-02-24 05:47:41	2026-02-24 05:48:07
4	App\\Models\\User	2	auth_token	575be2caa31b0106588a086c348ed234c583d411ae4c7039d778c32f91f20faa	["*"]	\N	\N	2026-02-24 04:40:54	2026-02-24 04:40:54
15	App\\Models\\User	2	auth_token	163ac9c050c032de6c81db33219aa96d080e159d1b8ad13339480ccefca659d3	["*"]	2026-02-24 06:17:28	\N	2026-02-24 06:17:22	2026-02-24 06:17:28
36	App\\Models\\User	1	auth_token	beb7c7b829c406084f32d334fb1c5c571f47993b3002705b636715e130ca2402	["*"]	2026-02-24 14:23:27	\N	2026-02-24 12:51:38	2026-02-24 14:23:27
37	App\\Models\\User	2	auth_token	d7ada227828fa933ddab48723ccd6c8135af5debd3100a134b7f3902a9835365	["*"]	2026-02-24 14:23:41	\N	2026-02-24 14:23:38	2026-02-24 14:23:41
16	App\\Models\\User	2	auth_token	65e75cd7d384cc8f251a92de7a40e0f4b8758f0c0c93e000f54a9241c796461e	["*"]	2026-02-24 06:19:36	\N	2026-02-24 06:18:55	2026-02-24 06:19:36
25	App\\Models\\User	1	auth_token	2cf69c800cb100f503e6837d03935c742542846f0396381e316f45e515e2f4c8	["*"]	2026-02-24 10:40:29	\N	2026-02-24 10:26:31	2026-02-24 10:40:29
18	App\\Models\\User	1	auth_token	d9f48caa6458ae3a6adee06cdde86ccd63af6949603af3dfbe4d53ddea092c16	["*"]	2026-02-24 09:29:51	\N	2026-02-24 07:25:05	2026-02-24 09:29:51
38	App\\Models\\User	2	auth_token	9bca56f4e25e0c0ab9bc29e34afa7fd8059e2838c567768b5dd547c227514292	["*"]	\N	\N	2026-02-24 14:26:18	2026-02-24 14:26:18
26	App\\Models\\User	1	auth_token	c415a0dbaf354aeeb0178bf018abd0123c53b662077b87cee3f4e897c6d160f9	["*"]	2026-02-24 10:43:20	\N	2026-02-24 10:43:13	2026-02-24 10:43:20
19	App\\Models\\User	1	auth_token	87a65c627ba52b6dcd9d1c558a3ace2b4c0ad9d34fc65563aa2f3f5a213a5b41	["*"]	2026-02-24 09:30:11	\N	2026-02-24 09:29:59	2026-02-24 09:30:11
39	App\\Models\\User	2	auth_token	1b76ffabd5975d571bcd217bc676718db234c449cb4fd601a03c2d0fa2158263	["*"]	\N	\N	2026-02-24 14:26:36	2026-02-24 14:26:36
20	App\\Models\\User	2	auth_token	a5312a74ff55d4f4dd0287fe1d464ae427940e15d169e58e4812384a2ae08bea	["*"]	2026-02-24 10:10:29	\N	2026-02-24 09:30:41	2026-02-24 10:10:29
31	App\\Models\\User	1	auth_token	c3b666b6c066f63886360835034f7acf4951dbee62051a8428d12f7bd55b3df5	["*"]	2026-02-24 12:25:39	\N	2026-02-24 12:10:05	2026-02-24 12:25:39
21	App\\Models\\User	3	auth_token	e12e0450e67d50a8958b90f5e2f1e28435b70596ecd1f8710dffba8b405bc190	["*"]	2026-02-24 10:13:18	\N	2026-02-24 10:13:07	2026-02-24 10:13:18
13	App\\Models\\User	1	auth_token	c905f712a6dbad7d95ff0fd4f0cdea6498d5c472586d89e9a0522834c3970883	["*"]	2026-02-24 12:30:07	\N	2026-02-24 05:49:14	2026-02-24 12:30:07
22	App\\Models\\User	3	auth_token	e87f89b27a05fb02808238cbb9262218bd30118d431c35769fa02b351fbf2652	["*"]	2026-02-24 10:16:26	\N	2026-02-24 10:14:09	2026-02-24 10:16:26
27	App\\Models\\User	2	auth_token	a58e2b5669e0681b2c4afce26e6b64744fe6ba4611f3f7b8ced2e5ec5e02ebd6	["*"]	2026-02-24 10:43:52	\N	2026-02-24 10:43:45	2026-02-24 10:43:52
23	App\\Models\\User	3	auth_token	fa72426aec36e97584492e2978389f9565fc1eda334092f70817b56693fffcb5	["*"]	2026-02-24 10:25:46	\N	2026-02-24 10:16:41	2026-02-24 10:25:46
12	App\\Models\\User	1	auth_token	ecbdd34e748742c3846fcea7ca2344f679b66430255c602625908d4180f69049	["*"]	2026-02-24 06:05:45	\N	2026-02-24 05:48:53	2026-02-24 06:05:45
14	App\\Models\\User	2	auth_token	80d702d339e753c63edfe18343e80806d28968459a70b3306da9086f4192a855	["*"]	2026-02-24 06:17:08	\N	2026-02-24 06:12:02	2026-02-24 06:17:08
24	App\\Models\\User	3	auth_token	934f975b08d484edfab324bfb7f1c45be6d77dbd63ec6563e38d496715d2a211	["*"]	2026-02-24 10:26:03	\N	2026-02-24 10:25:59	2026-02-24 10:26:03
28	App\\Models\\User	1	auth_token	a9a0050314bbe8ce68c8aaf2e72b8157581f58762dbac72c1aeba17e8cfc741f	["*"]	2026-02-24 11:40:27	\N	2026-02-24 10:44:13	2026-02-24 11:40:27
29	App\\Models\\User	4	auth_token	05ce5c310f98ec663394296ae7e7af2bfe23e86990e679590474f73ef0629ed1	["*"]	\N	\N	2026-02-24 12:05:14	2026-02-24 12:05:14
32	App\\Models\\User	5	auth_token	85bb04c070f1ade174a2e63bfd0bd6de5ff3aba3f8f82caedce6dea03eb87790	["*"]	2026-02-24 12:30:45	\N	2026-02-24 12:30:33	2026-02-24 12:30:45
17	App\\Models\\User	2	auth_token	053179b72922d396ce9b17570e552c01ce9a239cb324cab785906e50a3fc7a46	["*"]	2026-02-24 07:24:29	\N	2026-02-24 06:19:48	2026-02-24 07:24:29
33	App\\Models\\User	3	auth_token	97525032cecf5dc95aec3d294edabc817be47215cae88d92551c472d95309d3e	["*"]	2026-02-24 12:31:49	\N	2026-02-24 12:31:33	2026-02-24 12:31:49
34	App\\Models\\User	1	auth_token	8418b9cc09b7d01204fd453ae67fa83641f084748b505d7fc0b28e398c8d0924	["*"]	2026-02-24 12:32:17	\N	2026-02-24 12:32:03	2026-02-24 12:32:17
35	App\\Models\\User	1	auth_token	81f332f4b45cc1a4839fb053e7aa2c8677f583bdfb3306b9224fb394899afb00	["*"]	2026-02-24 12:49:40	\N	2026-02-24 12:41:38	2026-02-24 12:49:40
30	App\\Models\\User	4	auth_token	f8811e05b79d6d8bae3134ef9f420d109d0ed7f4f9f09f7c942fdde8400500f2	["*"]	2026-02-24 12:09:26	\N	2026-02-24 12:07:51	2026-02-24 12:09:26
40	App\\Models\\User	2	auth_token	37645b4aa67f729f035d02d1268c4c4fa9783b1dfb6fb3e01f290aa3c5be153d	["*"]	2026-02-24 14:30:24	\N	2026-02-24 14:30:20	2026-02-24 14:30:24
47	App\\Models\\User	1	auth_token	5dafefb7f73a78f70d57b7507d6d645c0eb157d901505a6ea4f7e3dd296f4225	["*"]	\N	\N	2026-02-24 14:34:57	2026-02-24 14:34:57
42	App\\Models\\User	2	auth_token	62a344850cb700cbf0004d9782f75ed60064751554441fa1fa365fb7ab041742	["*"]	2026-02-24 14:31:21	\N	2026-02-24 14:31:19	2026-02-24 14:31:21
44	App\\Models\\User	1	auth_token	14cc28890765effe9b1db3f727b46d70b445d5cc52625aec32b499b4c6551122	["*"]	2026-02-24 14:33:36	\N	2026-02-24 14:32:02	2026-02-24 14:33:36
41	App\\Models\\User	1	auth_token	1680233c16fb6fb09cd9c4e3a5018ab33f8209ff82c7cd5bfb11bc328a2df6ec	["*"]	2026-02-24 14:31:09	\N	2026-02-24 14:30:38	2026-02-24 14:31:09
43	App\\Models\\User	1	auth_token	88f036e4539b659eea7097ffb919804c035bb7a8df95cc2d7cbaf72cbcf5af7f	["*"]	2026-02-24 14:31:34	\N	2026-02-24 14:31:30	2026-02-24 14:31:34
45	App\\Models\\User	1	auth_token	6c6ed097c4b5544fcaa853cd4f62245f71cdcebfedc6f043a081c27e321a3296	["*"]	\N	\N	2026-02-24 14:33:43	2026-02-24 14:33:43
48	App\\Models\\User	1	auth_token	62410384be591a425b7de4645e386d51c79545c3ac40fbfcad37ce43033785c7	["*"]	\N	\N	2026-02-24 14:40:31	2026-02-24 14:40:31
46	App\\Models\\User	1	auth_token	12673a8f8a7612c9653962ee21617f2758eadc7d83b6bac5f350c7810888ff6b	["*"]	2026-02-24 14:34:25	\N	2026-02-24 14:34:23	2026-02-24 14:34:25
50	App\\Models\\User	1	auth_token	8c450c9556463d2b146e9cad97c713a042086c836a2b4d12fc0665034bacf870	["*"]	\N	\N	2026-02-24 14:45:08	2026-02-24 14:45:08
49	App\\Models\\User	2	auth_token	213c139caeaf8313beecb96e78d07970ff897a25aeaa009cfd4496604b19b5de	["*"]	2026-02-24 14:42:00	\N	2026-02-24 14:41:54	2026-02-24 14:42:00
51	App\\Models\\User	3	auth_token	729d31d3dcc7292c10f94c80590385b3370101d7215034a54fdcc36ad937762e	["*"]	2026-02-24 14:47:53	\N	2026-02-24 14:47:46	2026-02-24 14:47:53
\.


--
-- TOC entry 3632 (class 0 OID 17431)
-- Dependencies: 242
-- Data for Name: requirements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.requirements (id, module, "reqName", "reqShortName", created_at, updated_at) FROM stdin;
1	CA	Voters ID	VID	2026-02-24 09:38:31	2026-02-24 09:38:31
2	CA	Certificate of Employment	COE	2026-02-24 09:38:44	2026-02-24 09:38:44
3	CA	2 Months Payslip	TMP	2026-02-24 09:38:56	2026-02-24 09:38:56
4	CA	Business Permit	BPR	2026-02-24 09:39:12	2026-02-24 09:39:12
5	CA	2 Months Latest Remittance	MLR	2026-02-24 09:39:25	2026-02-24 09:39:25
6	CA	Barangay Clearance	BCR	2026-02-24 09:40:39	2026-02-24 09:40:39
7	CA	Income Tax Return	ITR	2026-02-24 09:40:53	2026-02-24 09:40:53
8	CA	Cedula	CED	2026-02-24 09:41:05	2026-02-24 09:41:05
9	CA	SSS	SSS	2026-02-24 09:41:16	2026-02-24 09:41:16
10	CA	TIN Number	TIN	2026-02-24 09:41:29	2026-02-24 09:41:29
11	CA	NBI	NBI	2026-02-24 09:41:42	2026-02-24 09:41:42
12	CA	Drivers License	DLR	2026-02-24 09:41:51	2026-02-24 09:41:51
\.


--
-- TOC entry 3649 (class 0 OID 17588)
-- Dependencies: 259
-- Data for Name: role_has_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.role_has_permissions (permission_id, role_id) FROM stdin;
1	2
1	3
2	2
1	1
2	1
3	1
4	1
9	1
10	1
11	1
12	1
13	1
14	1
15	1
16	1
5	1
6	1
7	1
8	1
\.


--
-- TOC entry 3646 (class 0 OID 17556)
-- Dependencies: 256
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, name, guard_name, created_at, updated_at) FROM stdin;
1	admin	sanctum	2026-02-24 04:35:00	2026-02-24 04:35:00
2	user	sanctum	2026-02-24 04:35:00	2026-02-24 04:35:00
3	guest	sanctum	2026-02-24 06:16:56	2026-02-24 06:16:56
\.


--
-- TOC entry 3607 (class 0 OID 17220)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, userid, "firstName", "lastName", "middleName", email, email_verified_at, gender, "userName", password, "userType", remember_token, created_at, updated_at) FROM stdin;
1	USER-0000001	Kevin	Macandog	\N	kevinrehan16@gmail.com	\N	male	kevinrehan16	$2y$12$FkGXWjUdlpgNVmi7NwAte.LNgBPt1RI34YLIQ83kmsEt2SobZGmg2	administrator	\N	2026-02-24 04:30:06	2026-02-24 04:30:06
2	USER-0000002	Ivy Nicole	De Guzman	\N	ivydeguzman@gmail.com	\N	female	ivydeguzman	$2y$12$jhS5u4Brpp15xl73xuB5EOtt0n1YuXDwE0D8qfOBLrMAfiZwpTQJq	staff	\N	2026-02-24 04:40:31	2026-02-24 04:40:31
3	USER-0000003	Andrea	Estrella	\N	andiestrella@gmail.com	\N	female	andiestrella	$2y$12$l4Whp/VYbxCdaOy.KoKI/.nY3zOQCLa6/nxKBCx9H9bDtMF3onZzS	staff	\N	2026-02-24 10:12:02	2026-02-24 10:12:02
4	USER-0000004	Katherine	Monroy	\N	kath@gmail.com	\N	female	kathkath	$2y$12$/wTT2WcglxbNFf3M7Elu.uqe3wL3fftnPWE/lS2yZ13qlx13R/i7a	staff	\N	2026-02-24 12:04:48	2026-02-24 12:04:48
5	USER-0000005	Jeffery	Dominguez	\N	jeff@gmail.com	\N	male	popoy	$2y$12$Q4Tu3/vkn3w/mb90AFn7ieurxEyd8aO2ZtI4IfDht6XKw.WOGJaiC	staff	\N	2026-02-24 12:29:31	2026-02-24 12:29:31
\.


--
-- TOC entry 3676 (class 0 OID 0)
-- Dependencies: 239
-- Name: credit_application_attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_application_attachments_id_seq', 1, false);


--
-- TOC entry 3677 (class 0 OID 0)
-- Dependencies: 235
-- Name: credit_application_incoms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_application_incoms_id_seq', 1, false);


--
-- TOC entry 3678 (class 0 OID 0)
-- Dependencies: 231
-- Name: credit_application_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_application_preferences_id_seq', 1, false);


--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 229
-- Name: credit_application_primaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_application_primaries_id_seq', 1, false);


--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 237
-- Name: credit_application_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_application_properties_id_seq', 1, false);


--
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 233
-- Name: credit_application_references_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_application_references_id_seq', 1, false);


--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 247
-- Name: credit_investigation_credit_references_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_investigation_credit_references_id_seq', 1, true);


--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 245
-- Name: credit_investigation_other_source_incomes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_investigation_other_source_incomes_id_seq', 1, true);


--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 251
-- Name: credit_investigation_personal_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_investigation_personal_properties_id_seq', 1, true);


--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 249
-- Name: credit_investigation_personal_references_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_investigation_personal_references_id_seq', 1, true);


--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 243
-- Name: credit_investigation_primaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_investigation_primaries_id_seq', 1, true);


--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 223
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_id_seq', 2, true);


--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 219
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 225
-- Name: inquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inquiries_id_seq', 2, true);


--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 227
-- Name: item_lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.item_lists_id_seq', 10, true);


--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 214
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 28, true);


--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 253
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.permissions_id_seq', 16, true);


--
-- TOC entry 3693 (class 0 OID 0)
-- Dependencies: 221
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 51, true);


--
-- TOC entry 3694 (class 0 OID 0)
-- Dependencies: 241
-- Name: requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.requirements_id_seq', 12, true);


--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 255
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- TOC entry 3400 (class 2606 OID 17397)
-- Name: credit_application_attachments credit_application_attachments_creditappattachments_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_attachments
    ADD CONSTRAINT credit_application_attachments_creditappattachments_id_unique UNIQUE ("creditAppAttachments_id");


--
-- TOC entry 3402 (class 2606 OID 17390)
-- Name: credit_application_attachments credit_application_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_attachments
    ADD CONSTRAINT credit_application_attachments_pkey PRIMARY KEY (id);


--
-- TOC entry 3392 (class 2606 OID 17365)
-- Name: credit_application_incomes credit_application_incoms_creditappinc_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_incomes
    ADD CONSTRAINT credit_application_incoms_creditappinc_id_unique UNIQUE ("creditAppInc_id");


--
-- TOC entry 3394 (class 2606 OID 17358)
-- Name: credit_application_incomes credit_application_incoms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_incomes
    ADD CONSTRAINT credit_application_incoms_pkey PRIMARY KEY (id);


--
-- TOC entry 3384 (class 2606 OID 17333)
-- Name: credit_application_preferences credit_application_preferences_creditapppref_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_preferences
    ADD CONSTRAINT credit_application_preferences_creditapppref_id_unique UNIQUE ("creditAppPref_id");


--
-- TOC entry 3386 (class 2606 OID 17326)
-- Name: credit_application_preferences credit_application_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_preferences
    ADD CONSTRAINT credit_application_preferences_pkey PRIMARY KEY (id);


--
-- TOC entry 3380 (class 2606 OID 17314)
-- Name: credit_application_primaries credit_application_primaries_creditapp_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_primaries
    ADD CONSTRAINT credit_application_primaries_creditapp_id_unique UNIQUE ("creditApp_id");


--
-- TOC entry 3382 (class 2606 OID 17312)
-- Name: credit_application_primaries credit_application_primaries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_primaries
    ADD CONSTRAINT credit_application_primaries_pkey PRIMARY KEY (id);


--
-- TOC entry 3396 (class 2606 OID 17383)
-- Name: credit_application_properties credit_application_properties_creditappprops_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_properties
    ADD CONSTRAINT credit_application_properties_creditappprops_id_unique UNIQUE ("creditAppProps_id");


--
-- TOC entry 3398 (class 2606 OID 17376)
-- Name: credit_application_properties credit_application_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_properties
    ADD CONSTRAINT credit_application_properties_pkey PRIMARY KEY (id);


--
-- TOC entry 3388 (class 2606 OID 17349)
-- Name: credit_application_references credit_application_references_creditappref_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_references
    ADD CONSTRAINT credit_application_references_creditappref_id_unique UNIQUE ("creditAppRef_id");


--
-- TOC entry 3390 (class 2606 OID 17342)
-- Name: credit_application_references credit_application_references_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_references
    ADD CONSTRAINT credit_application_references_pkey PRIMARY KEY (id);


--
-- TOC entry 3414 (class 2606 OID 17511)
-- Name: credit_investigation_credit_references credit_investigation_credit_references_creditcr_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_credit_references
    ADD CONSTRAINT credit_investigation_credit_references_creditcr_id_unique UNIQUE ("creditCr_id");


--
-- TOC entry 3416 (class 2606 OID 17504)
-- Name: credit_investigation_credit_references credit_investigation_credit_references_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_credit_references
    ADD CONSTRAINT credit_investigation_credit_references_pkey PRIMARY KEY (id);


--
-- TOC entry 3410 (class 2606 OID 17492)
-- Name: credit_investigation_other_source_incomes credit_investigation_other_source_incomes_creditosi_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_other_source_incomes
    ADD CONSTRAINT credit_investigation_other_source_incomes_creditosi_id_unique UNIQUE ("creditOsi_id");


--
-- TOC entry 3412 (class 2606 OID 17485)
-- Name: credit_investigation_other_source_incomes credit_investigation_other_source_incomes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_other_source_incomes
    ADD CONSTRAINT credit_investigation_other_source_incomes_pkey PRIMARY KEY (id);


--
-- TOC entry 3422 (class 2606 OID 17543)
-- Name: credit_investigation_personal_properties credit_investigation_personal_properties_creditpp_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_personal_properties
    ADD CONSTRAINT credit_investigation_personal_properties_creditpp_id_unique UNIQUE ("creditPp_id");


--
-- TOC entry 3424 (class 2606 OID 17536)
-- Name: credit_investigation_personal_properties credit_investigation_personal_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_personal_properties
    ADD CONSTRAINT credit_investigation_personal_properties_pkey PRIMARY KEY (id);


--
-- TOC entry 3418 (class 2606 OID 17527)
-- Name: credit_investigation_personal_references credit_investigation_personal_references_creditpr_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_personal_references
    ADD CONSTRAINT credit_investigation_personal_references_creditpr_id_unique UNIQUE ("creditPr_id");


--
-- TOC entry 3420 (class 2606 OID 17520)
-- Name: credit_investigation_personal_references credit_investigation_personal_references_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_personal_references
    ADD CONSTRAINT credit_investigation_personal_references_pkey PRIMARY KEY (id);


--
-- TOC entry 3406 (class 2606 OID 17477)
-- Name: credit_investigation_primaries credit_investigation_primaries_creditinv_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_primaries
    ADD CONSTRAINT credit_investigation_primaries_creditinv_id_unique UNIQUE ("creditInv_id");


--
-- TOC entry 3408 (class 2606 OID 17470)
-- Name: credit_investigation_primaries credit_investigation_primaries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_primaries
    ADD CONSTRAINT credit_investigation_primaries_pkey PRIMARY KEY (id);


--
-- TOC entry 3368 (class 2606 OID 17273)
-- Name: customers customers_customer_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_customer_id_unique UNIQUE (customer_id);


--
-- TOC entry 3370 (class 2606 OID 17271)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 3359 (class 2606 OID 17248)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3361 (class 2606 OID 17250)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 3372 (class 2606 OID 17289)
-- Name: inquiries inquiries_inquiry_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_inquiry_id_unique UNIQUE (inquiry_id);


--
-- TOC entry 3374 (class 2606 OID 17282)
-- Name: inquiries inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_pkey PRIMARY KEY (id);


--
-- TOC entry 3376 (class 2606 OID 17300)
-- Name: item_lists item_lists_item_number_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item_lists
    ADD CONSTRAINT item_lists_item_number_unique UNIQUE (item_number);


--
-- TOC entry 3378 (class 2606 OID 17298)
-- Name: item_lists item_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item_lists
    ADD CONSTRAINT item_lists_pkey PRIMARY KEY (id);


--
-- TOC entry 3349 (class 2606 OID 17218)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3435 (class 2606 OID 17576)
-- Name: model_has_permissions model_has_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_pkey PRIMARY KEY (permission_id, model_id, model_type);


--
-- TOC entry 3438 (class 2606 OID 17587)
-- Name: model_has_roles model_has_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_pkey PRIMARY KEY (role_id, model_id, model_type);


--
-- TOC entry 3357 (class 2606 OID 17238)
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- TOC entry 3426 (class 2606 OID 17554)
-- Name: permissions permissions_name_guard_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_guard_name_unique UNIQUE (name, guard_name);


--
-- TOC entry 3428 (class 2606 OID 17552)
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 3363 (class 2606 OID 17259)
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3365 (class 2606 OID 17262)
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- TOC entry 3404 (class 2606 OID 17437)
-- Name: requirements requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requirements
    ADD CONSTRAINT requirements_pkey PRIMARY KEY (id);


--
-- TOC entry 3440 (class 2606 OID 17602)
-- Name: role_has_permissions role_has_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_pkey PRIMARY KEY (permission_id, role_id);


--
-- TOC entry 3430 (class 2606 OID 17565)
-- Name: roles roles_name_guard_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_guard_name_unique UNIQUE (name, guard_name);


--
-- TOC entry 3432 (class 2606 OID 17563)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3351 (class 2606 OID 17231)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 3353 (class 2606 OID 17227)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3355 (class 2606 OID 17229)
-- Name: users users_userid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_userid_unique UNIQUE (userid);


--
-- TOC entry 3433 (class 1259 OID 17569)
-- Name: model_has_permissions_model_id_model_type_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX model_has_permissions_model_id_model_type_index ON public.model_has_permissions USING btree (model_id, model_type);


--
-- TOC entry 3436 (class 1259 OID 17580)
-- Name: model_has_roles_model_id_model_type_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX model_has_roles_model_id_model_type_index ON public.model_has_roles USING btree (model_id, model_type);


--
-- TOC entry 3366 (class 1259 OID 17260)
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- TOC entry 3451 (class 2606 OID 17391)
-- Name: credit_application_attachments credit_application_attachments_credit_application_primary_id_fo; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_attachments
    ADD CONSTRAINT credit_application_attachments_credit_application_primary_id_fo FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3452 (class 2606 OID 17423)
-- Name: credit_application_attachments credit_application_attachments_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_attachments
    ADD CONSTRAINT credit_application_attachments_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3447 (class 2606 OID 17413)
-- Name: credit_application_incomes credit_application_incomes_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_incomes
    ADD CONSTRAINT credit_application_incomes_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3448 (class 2606 OID 17359)
-- Name: credit_application_incomes credit_application_incoms_credit_application_primary_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_incomes
    ADD CONSTRAINT credit_application_incoms_credit_application_primary_id_foreign FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3443 (class 2606 OID 17327)
-- Name: credit_application_preferences credit_application_preferences_credit_application_primary_id_fo; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_preferences
    ADD CONSTRAINT credit_application_preferences_credit_application_primary_id_fo FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3444 (class 2606 OID 17403)
-- Name: credit_application_preferences credit_application_preferences_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_preferences
    ADD CONSTRAINT credit_application_preferences_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3442 (class 2606 OID 17398)
-- Name: credit_application_primaries credit_application_primaries_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_primaries
    ADD CONSTRAINT credit_application_primaries_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3449 (class 2606 OID 17377)
-- Name: credit_application_properties credit_application_properties_credit_application_primary_id_for; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_properties
    ADD CONSTRAINT credit_application_properties_credit_application_primary_id_for FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3450 (class 2606 OID 17418)
-- Name: credit_application_properties credit_application_properties_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_properties
    ADD CONSTRAINT credit_application_properties_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3445 (class 2606 OID 17343)
-- Name: credit_application_references credit_application_references_credit_application_primary_id_for; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_references
    ADD CONSTRAINT credit_application_references_credit_application_primary_id_for FOREIGN KEY (credit_application_primary_id) REFERENCES public.credit_application_primaries(id) ON DELETE CASCADE;


--
-- TOC entry 3446 (class 2606 OID 17408)
-- Name: credit_application_references credit_application_references_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_application_references
    ADD CONSTRAINT credit_application_references_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 3455 (class 2606 OID 17505)
-- Name: credit_investigation_credit_references credit_investigation_credit_references_inquiry_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_credit_references
    ADD CONSTRAINT credit_investigation_credit_references_inquiry_id_foreign FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- TOC entry 3454 (class 2606 OID 17486)
-- Name: credit_investigation_other_source_incomes credit_investigation_other_source_incomes_inquiry_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_other_source_incomes
    ADD CONSTRAINT credit_investigation_other_source_incomes_inquiry_id_foreign FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- TOC entry 3457 (class 2606 OID 17537)
-- Name: credit_investigation_personal_properties credit_investigation_personal_properties_inquiry_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_personal_properties
    ADD CONSTRAINT credit_investigation_personal_properties_inquiry_id_foreign FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- TOC entry 3456 (class 2606 OID 17521)
-- Name: credit_investigation_personal_references credit_investigation_personal_references_inquiry_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_personal_references
    ADD CONSTRAINT credit_investigation_personal_references_inquiry_id_foreign FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- TOC entry 3453 (class 2606 OID 17471)
-- Name: credit_investigation_primaries credit_investigation_primaries_inquiry_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_investigation_primaries
    ADD CONSTRAINT credit_investigation_primaries_inquiry_id_foreign FOREIGN KEY (inquiry_id) REFERENCES public.inquiries(id) ON DELETE CASCADE;


--
-- TOC entry 3441 (class 2606 OID 17283)
-- Name: inquiries inquiries_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


--
-- TOC entry 3458 (class 2606 OID 17570)
-- Name: model_has_permissions model_has_permissions_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- TOC entry 3459 (class 2606 OID 17581)
-- Name: model_has_roles model_has_roles_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 3460 (class 2606 OID 17591)
-- Name: role_has_permissions role_has_permissions_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- TOC entry 3461 (class 2606 OID 17596)
-- Name: role_has_permissions role_has_permissions_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


-- Completed on 2026-02-24 23:01:48

--
-- PostgreSQL database dump complete
--

