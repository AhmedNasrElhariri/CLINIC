INSERT INTO public."Organization"
  (id,name)
VALUES
  ('47202e8c-86e3-11ea-bc55-0242ac130003', 'CinicR Test'),
  ('932e5685-be97-48ab-8e08-9ab453f7af11', 'CinicR 2'),
  ('6012bdfd-d3da-483f-877d-43420994e072', 'CinicR 100');

/* doctors */
INSERT INTO public."User"
  (id, name, email, password, "organizationId", "position", "permissions")
values
  /* Tahoon's */
  ('6625951a-3a69-46ee-ab5f-d0f523d463de', 'Eslam Tahoon', 'tahoon@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '47202e8c-86e3-11ea-bc55-0242ac130003', 'Doctor', '[{"action":"manage", "subject":"all"}]'),
  /* clinic one assistants */
  ('2e7b6b84-837b-478b-9603-abad331098b9', 'Assistant One', 'assistant1@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '47202e8c-86e3-11ea-bc55-0242ac130003', 'Assistant', '[]'),
  ('b1704e5f-c0d5-4ee7-bf14-6963adda907a', 'Assistant Two', 'assistant2@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '947202e8c-86e3-11ea-bc55-0242ac130003', 'Assistant', '[]'),
  /* clinic two assistants */
  ('adcd447c-bc6e-4019-8f27-bb6727338f27', 'Assistant Three', 'assistant3@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '47202e8c-86e3-11ea-bc55-0242ac130003', 'Assistant', '[]'),
  ('fd33d037-6310-45b5-b42a-555ad93c8474', 'Assistant Four', 'assistant4@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '47202e8c-86e3-11ea-bc55-0242ac130003', 'Assistant', '[]'),

  /* Ahmed's */
  ('ce2e9cd3-5d58-4866-b0b3-a9c03fcd4fbc', 'Ahmed Shehata', 'ahmed@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '932e5685-be97-48ab-8e08-9ab453f7af11', 'Doctor', '[{"action":"manage", "subject":"all"}]'),
  /* clinic one assistants */
  ('d63b28df-7ad9-4a4f-a03d-c27f845e27fa', 'Assistant One', 'assistant5@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '932e5685-be97-48ab-8e08-9ab453f7af11', 'Assistant', '[]'),
  ('fdca3476-9341-45ec-983b-70d611508746', 'Assistant Two', 'assistant6@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '932e5685-be97-48ab-8e08-9ab453f7af11', 'Assistant', '[]'),
  /* clinic two assistants */
  ('8b981d05-98cd-46cc-9cae-592a45cf5117', 'Assistant Three', 'assistant7@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '932e5685-be97-48ab-8e08-9ab453f7af11', 'Assistant', '[]'),
  ('a4db9746-d9cf-4584-baea-6d8a30a8f784', 'Assistant Four', 'assistant8@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '932e5685-be97-48ab-8e08-9ab453f7af11', 'Assistant', '[]'),

  /* Eslam's */
  ('2dd94135-b776-4c8e-b9ef-39ccafb3f4c9', 'Eslam Ayaad', 'eslam@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '46a7367b-728d-4a2b-9e06-8c6e90427399', 'Doctor', '[{"action":"manage", "subject":"all"}]'),
  /* clinic one assistants */
  ('b44d50d9-28cb-4625-a17e-20c7bf0976a7', 'Assistant One', 'assistant9@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '46a7367b-728d-4a2b-9e06-8c6e90427399', 'Assistant', '[]'),
  ('fa8afa4c-f895-4192-880b-9c20f4a2e17a', 'Assistant Two', 'assistant10@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '46a7367b-728d-4a2b-9e06-8c6e90427399', 'Assistant', '[]'),
  /* clinic two assistants */
  ('afda3b3c-5c7d-4301-ab74-01b5794645a7', 'Assistant Three', 'assistant11@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '446a7367b-728d-4a2b-9e06-8c6e90427399', 'Assistant', '[]'),
  ('58116787-470c-4929-8763-0bdaf28acd14', 'Assistant Four', 'assistant12@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '46a7367b-728d-4a2b-9e06-8c6e90427399', 'Assistant', '[]'),

  /* Mohga's */
  ('31642af2-9492-43f9-bf12-e9821e73f005', 'Mohga Mohyie', 'mohga@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '2aec2fc8-17e1-4965-928d-c38938e9450f', 'Doctor', '[{"action":"manage", "subject":"all"}]'),
  /* clinic one assistants */
  ('27b5608f-fb83-4c18-83db-42e6fe1b7677', 'Assistant One', 'assistant13@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '2aec2fc8-17e1-4965-928d-c38938e9450f', 'Assistant', '[]'),
  ('7054ac29-1389-4643-bdf6-ebe744720a63', 'Assistant Two', 'assistant14@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '2aec2fc8-17e1-4965-928d-c38938e9450f', 'Assistant', '[]'),
  /* clinic two assistants */
  ('c2a71fde-93ac-48a7-9e60-0869e80b70ae', 'Assistant Three', 'assistant15@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '2aec2fc8-17e1-4965-928d-c38938e9450f', 'Assistant', '[]'),
  ('bd09717a-8525-4c10-b107-b890772bfe93', 'Assistant Four', 'assistant16@clinicr.net', '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W', '2aec2fc8-17e1-4965-928d-c38938e9450f', 'Assistant', '[]');


INSERT INTO public."Clinic"
  (id, name, "organizationId")
VALUES
  /* Tahoon's clinic */
  ('ac9821c3-9a54-4dad-a0ef-dc3bb684d5e4', 'Nasr City', '47202e8c-86e3-11ea-bc55-0242ac130003'),
  ('029f5d96-bd21-4604-8148-69e7c6060840', 'Giza', '47202e8c-86e3-11ea-bc55-0242ac130003'),
  /* assistants */

  /* Ahmed's clinic */
  ('9457f4be-9e27-4889-84f5-6c599b7eec93', 'Nasr City', '932e5685-be97-48ab-8e08-9ab453f7af11'),
  ('cbc4c73f-608c-4f70-84fb-fbb92c287de9', 'Giza', '932e5685-be97-48ab-8e08-9ab453f7af11'),

  /* Eslam's clinic */
  ('c80ea800-e3be-4757-96fe-b691e2e1bb2b', 'Nasr City', '46a7367b-728d-4a2b-9e06-8c6e90427399'),
  ('24dc7d5d-bf82-4ce6-8507-7b92eea9b962', 'Giza', '46a7367b-728d-4a2b-9e06-8c6e90427399'),

  /* mohga's clinic */
  ('47ed0764-1238-469f-8059-c286e65d997f', 'Nasr City', '2aec2fc8-17e1-4965-928d-c38938e9450f'),
  ('39a0df5a-9c09-43c8-a590-096cd985007a', 'Giza', '2aec2fc8-17e1-4965-928d-c38938e9450f');

INSERT INTO public."_ClinicToUser"
  ("A", "B")
VALUES
  /* Tahoon's clinic */
  ('ac9821c3-9a54-4dad-a0ef-dc3bb684d5e4', '6625951a-3a69-46ee-ab5f-d0f523d463de'),
  ('029f5d96-bd21-4604-8148-69e7c6060840', '6625951a-3a69-46ee-ab5f-d0f523d463de'),
  /* assistants */
  ('ac9821c3-9a54-4dad-a0ef-dc3bb684d5e4', '2e7b6b84-837b-478b-9603-abad331098b9'),
  ('ac9821c3-9a54-4dad-a0ef-dc3bb684d5e4', 'b1704e5f-c0d5-4ee7-bf14-6963adda907a'),
  ('029f5d96-bd21-4604-8148-69e7c6060840', 'adcd447c-bc6e-4019-8f27-bb6727338f27'),
  ('029f5d96-bd21-4604-8148-69e7c6060840', 'fd33d037-6310-45b5-b42a-555ad93c8474'),


  /* Ahmed's clinic */
  ('9457f4be-9e27-4889-84f5-6c599b7eec93', 'ce2e9cd3-5d58-4866-b0b3-a9c03fcd4fbc'),
  ('cbc4c73f-608c-4f70-84fb-fbb92c287de9', 'ce2e9cd3-5d58-4866-b0b3-a9c03fcd4fbc'),
  /* assistants */
  ('9457f4be-9e27-4889-84f5-6c599b7eec93', 'd63b28df-7ad9-4a4f-a03d-c27f845e27fa'),
  ('9457f4be-9e27-4889-84f5-6c599b7eec93', 'fdca3476-9341-45ec-983b-70d611508746'),
  ('cbc4c73f-608c-4f70-84fb-fbb92c287de9', '8b981d05-98cd-46cc-9cae-592a45cf5117'),
  ('cbc4c73f-608c-4f70-84fb-fbb92c287de9', 'a4db9746-d9cf-4584-baea-6d8a30a8f784'),


  /* Eslam's clinic */
  ('c80ea800-e3be-4757-96fe-b691e2e1bb2b', '2dd94135-b776-4c8e-b9ef-39ccafb3f4c9'),
  ('24dc7d5d-bf82-4ce6-8507-7b92eea9b962', '2dd94135-b776-4c8e-b9ef-39ccafb3f4c9'),
  /* assistants */
  ('c80ea800-e3be-4757-96fe-b691e2e1bb2b', 'b44d50d9-28cb-4625-a17e-20c7bf0976a7'),
  ('c80ea800-e3be-4757-96fe-b691e2e1bb2b', 'fa8afa4c-f895-4192-880b-9c20f4a2e17a'),
  ('24dc7d5d-bf82-4ce6-8507-7b92eea9b962', 'afda3b3c-5c7d-4301-ab74-01b5794645a7'),
  ('24dc7d5d-bf82-4ce6-8507-7b92eea9b962', '58116787-470c-4929-8763-0bdaf28acd14'),

  /* mohga's clinic */
  ('47ed0764-1238-469f-8059-c286e65d997f', '31642af2-9492-43f9-bf12-e9821e73f005'),
  ('39a0df5a-9c09-43c8-a590-096cd985007a', '31642af2-9492-43f9-bf12-e9821e73f005'),

  /* assistants */
  ('47ed0764-1238-469f-8059-c286e65d997f', '27b5608f-fb83-4c18-83db-42e6fe1b7677'),
  ('47ed0764-1238-469f-8059-c286e65d997f', '7054ac29-1389-4643-bdf6-ebe744720a63'),
  ('39a0df5a-9c09-43c8-a590-096cd985007a', 'c2a71fde-93ac-48a7-9e60-0869e80b70ae'),
  ('39a0df5a-9c09-43c8-a590-096cd985007a', 'bd09717a-8525-4c10-b107-b890772bfe93');


DELETE FROM public."Appointment";
DELETE FROM public."AppointmentField";
DELETE FROM public."Clinic";
DELETE FROM public."Event";
DELETE FROM public."Expense";
DELETE FROM public."FamilyHistory";
DELETE FROM public."Field";
DELETE FROM public."FieldGroup";
DELETE FROM public."File";
DELETE FROM public."LabDocument";
DELETE FROM public."MedicalHistory";
DELETE FROM public."Organization";
DELETE FROM public."Patient";
DELETE FROM public."PatientLab";
DELETE FROM public."Revenue";
DELETE FROM public."User";
DELETE FROM public."View";
DELETE FROM public."ViewStatus";
DELETE FROM public."Week";
DELETE FROM public."WorkingHours";
DELETE FROM public."_ClinicToUser";
DELETE FROM public."_Migration";

sudo -u postgres psql
CREATE USER admin
WITH PASSWORD 'admin';
CREATE DATABASE clinicr
GRANT ALL PRIVILEGES ON DATABASE "clinicr" to admin;

