CREATE TABLE public."user" (
	id serial4 NOT NULL,
	"name" varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	"password" varchar(255) NULL,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_name_key UNIQUE (name),
	CONSTRAINT user_pkey PRIMARY KEY (id)
);


CREATE TABLE public.recipe (
	id serial4 NOT NULL,
	title varchar(255) NULL,
	img varchar(255) NULL,
	description varchar(2000) NULL,
	ingredients varchar(5000) NULL,
	instructions varchar(5000) NULL,
	CONSTRAINT recipe_pkey PRIMARY KEY (id)
);