INSERT INTO public."Organization"(id,name) VALUES 
('47202e8c-86e3-11ea-bc55-0242ac130003','CinicR Test'),
('932e5685-be97-48ab-8e08-9ab453f7af11','CinicR 2'),
('6012bdfd-d3da-483f-877d-43420994e072','CinicR 100');
	
INSERT INTO public."User"(id, name, email, password, "organizationId") values 
('6625951a-3a69-46ee-ab5f-d0f523d463de','Eslam Tahoon', 'tahoon@clinicr.com','$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W','47202e8c-86e3-11ea-bc55-0242ac130003'),
('ce2e9cd3-5d58-4866-b0b3-a9c03fcd4fbc','Ahmed Shehata', 'ahmed@clinicr.com','$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W','932e5685-be97-48ab-8e08-9ab453f7af11'),
('2dd94135-b776-4c8e-b9ef-39ccafb3f4c9','Eslam Ayaad', 'eslam@clinicr.com','$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W','932e5685-be97-48ab-8e08-9ab453f7af11'),
('01dba83b-7747-4e8a-ba52-3ef2b7b11540','Mohamed Abushosha', 'abushosha@clinicr.com','$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W','6012bdfd-d3da-483f-877d-43420994e072');

INSERT INTO public."Clinic"(id,  name, "organizationId")VALUES 
('ac9821c3-9a54-4dad-a0ef-dc3bb684d5e4','Nasr City', '47202e8c-86e3-11ea-bc55-0242ac130003'),
('029f5d96-bd21-4604-8148-69e7c6060840','Giza','932e5685-be97-48ab-8e08-9ab453f7af11'),
('9457f4be-9e27-4889-84f5-6c599b7eec93','Maadi','932e5685-be97-48ab-8e08-9ab453f7af11'),
('cbc4c73f-608c-4f70-84fb-fbb92c287de9','Nasr City','6012bdfd-d3da-483f-877d-43420994e072');

INSERT INTO public."_ClinicToUser"("A", "B")VALUES 
('ac9821c3-9a54-4dad-a0ef-dc3bb684d5e4', '6625951a-3a69-46ee-ab5f-d0f523d463de'),
('029f5d96-bd21-4604-8148-69e7c6060840', 'ce2e9cd3-5d58-4866-b0b3-a9c03fcd4fbc'),
('029f5d96-bd21-4604-8148-69e7c6060840', '2dd94135-b776-4c8e-b9ef-39ccafb3f4c9'),
('9457f4be-9e27-4889-84f5-6c599b7eec93', 'ce2e9cd3-5d58-4866-b0b3-a9c03fcd4fbc'),
('cbc4c73f-608c-4f70-84fb-fbb92c287de9', '01dba83b-7747-4e8a-ba52-3ef2b7b11540');




DELETE FROM public."Appointment";
DELETE FROM public."AppointmentField";
DELETE FROM public."Clinic";
DELETE FROM public."Field";
DELETE FROM public."FieldGroup";
DELETE FROM public."File";
DELETE FROM public."Organization";
DELETE FROM public."Patient";
DELETE FROM public."User";
DELETE FROM public."View";
DELETE FROM public."ViewStatus";
DELETE FROM public."_Migration";

sudo -u postgres psql
CREATE USER admin WITH PASSWORD 'admin';
CREATE DATABASE clinicr
GRANT ALL PRIVILEGES ON DATABASE "clinicr" to admin;

